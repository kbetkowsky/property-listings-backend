package com.realestate.propertylistings.image;

import com.realestate.propertylistings.dto.ImageUploadResponse;
import com.realestate.propertylistings.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/properties/{propertyId}/images")
@RequiredArgsConstructor
@Slf4j
public class ImageController {

    private final ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public ResponseEntity<ImageUploadResponse> uploadImage(
            @PathVariable Long propertyId,
            @RequestParam("file")MultipartFile file,
            @RequestParam(value = "displayOrder", required = false, defaultValue = "0") Integer displayOrder,
            @AuthenticationPrincipal User currentUser
            ) {
                log.info("Upload zdjęcia dla property_id={} przez user={}", propertyId, currentUser.getEmail());

                ImageUploadResponse response = imageService.uploadImage(propertyId, file, displayOrder, currentUser);
                return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PropertyImage>> getPropertyImages(@PathVariable Long propertyId) {
        return ResponseEntity.ok(imageService.getPropertyImages(propertyId));
    }

    @DeleteMapping("/{imageId}")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public ResponseEntity<Void> deleteImage(
            @PathVariable Long propertyId,
            @PathVariable Long imageId,
            @AuthenticationPrincipal User currentUser
    ) {
        log.info("Usuwanie image_id={} dla property_id={}", imageId, propertyId);
        imageService.deleteImage(propertyId, imageId, currentUser);
        return ResponseEntity.noContent().build();
    }
}
