package com.realestate.propertylistings.image;

import com.realestate.propertylistings.dto.ImageUploadResponse;
import com.realestate.propertylistings.exception.PropertyNotFoundException;
import com.realestate.propertylistings.exception.UnauthorizedException;
import com.realestate.propertylistings.property.Property;
import com.realestate.propertylistings.property.PropertyRepository;
import com.realestate.propertylistings.user.User;
import com.realestate.propertylistings.user.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ImageService {

    private static final long MAX_SIZE_BYTES = 5_242_880;
    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif"
    );

    private final ImageRepository imageRepository;
    private final PropertyRepository propertyRepository;

    @Value("${app.upload.dir:uploads/properties}")
    private String uploadDir;

    @Value("${app.upload.base-url:http://localhost:8080/uploads/properties}")
    private String baseUrl;

    public ImageUploadResponse uploadImage(Long propertyId, MultipartFile file, Integer displayOrder, User currentUser) {
        log.info("Upload rozpoczęty: property_id={}, user={}, file={}",
                propertyId, currentUser.getEmail(), file.getOriginalFilename());

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new PropertyNotFoundException("Ogłoszenie nie znalezione: " + propertyId));

        if (!canModifyProperty(property, currentUser)) {
            log.warn("Brak uprawnień: user={}, property_owner={}",
                    currentUser.getEmail(), property.getOwner().getEmail());
            throw new UnauthorizedException("Brak uprawnień do dodania zdjęcia do tego ogłoszenia");
        }

        validateFile(file);

        String fileName = saveFile(file);
        String imageUrl = baseUrl + "/" + fileName;

        PropertyImage image = PropertyImage.builder()
                .property(property)
                .fileName(fileName)
                .fileUrl(imageUrl)
                .originalFileName(file.getOriginalFilename())
                .contentType(file.getContentType())
                .displayOrder(displayOrder != null ? displayOrder : 0)
                .fileSize(file.getSize())
                .isPrimary(false)
                .build();

        PropertyImage saved = imageRepository.save(image);
        log.info("Zdjęcie zapisane: id={}, url={}", saved.getId(), imageUrl);

        return ImageUploadResponse.builder()
                .id(saved.getId())
                .imageUrl(saved.getFileUrl())  // ✅ Zmień getImageUrl() na getFileUrl()
                .originalFileName(saved.getOriginalFileName())
                .contentType(saved.getContentType())
                .displayOrder(saved.getDisplayOrder())
                .fileSize(saved.getFileSize())
                .build();
    }

    @Transactional(readOnly = true)
    public List<PropertyImage> getPropertyImages(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new PropertyNotFoundException("Ogłoszenie nie znalezione: " + propertyId));

        return property.getImages();
    }

    public void deleteImage(Long propertyId, Long imageId, User currentUser) {
        log.info("Usuwanie image_id={} dla property_id={}", imageId, propertyId);

        PropertyImage image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Zdjęcie nie znalezione: " + imageId));

        if (!image.getProperty().getId().equals(propertyId)) {
            throw new RuntimeException("Zdjęcie nie należy do tego ogłoszenia");
        }

        if (!canModifyProperty(image.getProperty(), currentUser)) {
            throw new UnauthorizedException("Brak uprawnień do usunięcia zdjęcia");
        }

        deleteFileFromDisk(image.getFileUrl());

        imageRepository.delete(image);
        log.info("Zdjęcie usunięte: id={}", imageId);
    }

    private String saveFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                log.info("Utworzono katalog: {}", uploadPath);
            }

            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName != null && originalFileName.contains(".")
                    ? originalFileName.substring(originalFileName.lastIndexOf("."))
                    : ".jpg";
            String uniqueFileName = UUID.randomUUID().toString() + extension;

            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            log.info("Plik zapisany: {}", filePath);
            return uniqueFileName;

        } catch (IOException e) {
            log.error("Błąd zapisu pliku: {}", e.getMessage(), e);
            throw new RuntimeException("Nie udało się zapisać pliku: " + e.getMessage());
        }
    }

    private void deleteFileFromDisk(String imageUrl) {
        try {
            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            Path filePath = Paths.get(uploadDir, fileName);

            if (Files.exists(filePath)) {
                Files.delete(filePath);
                log.info("Plik usunięty z dysku: {}", filePath);
            } else {
                log.warn("Plik nie istnieje: {}", filePath);
            }
        } catch (IOException e) {
            log.warn("Nie udało się usunąć pliku: {}", e.getMessage());
        }
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Plik jest pusty");
        }

        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new RuntimeException(String.format(
                    "Plik jest za duży. Maksymalnie: %.1f MB, otrzymano: %.1f MB",
                    MAX_SIZE_BYTES / 1024.0 / 1024.0,
                    file.getSize() / 1024.0 / 1024.0
            ));
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new RuntimeException(
                    "Nieprawidłowy typ pliku. Dozwolone: " + String.join(", ", ALLOWED_TYPES)
            );
        }

        log.debug("Walidacja pliku OK: type={}, size={} bytes", contentType, file.getSize());
    }

    private boolean canModifyProperty(Property property, User user) {
        boolean isOwner = property.getOwner().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == UserRole.ADMIN;

        return isOwner || isAdmin;
    }
}
