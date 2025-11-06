package com.realestate.propertylistings.property;

import com.realestate.propertylistings.dto.CreatePropertyRequest;
import com.realestate.propertylistings.dto.PropertyResponse;
import com.realestate.propertylistings.dto.UpdatePropertyRequest;
import com.realestate.propertylistings.exception.PropertyNotFoundException;
import com.realestate.propertylistings.exception.UnauthorizedException;
import com.realestate.propertylistings.mapper.PropertyMapper;
import com.realestate.propertylistings.user.User;
import com.realestate.propertylistings.user.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;

    public PropertyResponse createProperty(CreatePropertyRequest request, User currentUser) {
        log.info("Tworzenie ogłoszenia przez: {}", currentUser.getEmail());

        Property property = propertyMapper.toEntity(request, currentUser);
        Property saved = propertyRepository.save(property);

        log.info("Ogłoszenie utworzone: id={}", saved.getId());
        return propertyMapper.toResponse(saved);
    }

    public PropertyResponse updateProperty(Long id, UpdatePropertyRequest request, User currentUser) {
        log.info("Aktualizacja ogłoszenia id={} przez: {}", id, currentUser.getEmail());

        // Znajdź property lub rzuć 404
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Ogłoszenie nie znalezione: " + id));

        if (!canModifyProperty(property, currentUser)) {
            log.warn("Brak uprawnień: user={}, property owner={}",
                    currentUser.getEmail(), property.getOwner().getEmail());
            throw new UnauthorizedException("Brak uprawnień do edycji tego ogłoszenia");
        }

        propertyMapper.updateEntity(property, request);
        Property updated = propertyRepository.save(property);

        log.info("Ogłoszenie zaktualizowane: id={}", updated.getId());
        return propertyMapper.toResponse(updated);
    }

    public void deleteProperty(Long id, User currentUser) {
        log.info("Usuwanie ogłoszenia id={} przez: {}", id, currentUser.getEmail());

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Ogłoszenie nie znalezione: " + id));

        if (!canModifyProperty(property, currentUser)) {
            log.warn("Brak uprawnień do usunięcia: user={}, property owner={}",
                    currentUser.getEmail(), property.getOwner().getEmail());
            throw new UnauthorizedException("Brak uprawnień do usunięcia tego ogłoszenia");
        }

        propertyRepository.delete(property);
        log.info("Ogłoszenie usunięte: id={}", id);
    }

    @Transactional(readOnly = true)
    public PropertyResponse getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new PropertyNotFoundException("Ogłoszenie nie znalezione: " + id));

        return propertyMapper.toResponse(property);
    }

    @Transactional(readOnly = true)
    public Page<PropertyResponse> getAllProperties(Pageable pageable) {
        log.debug("Pobieranie ogłoszeń: page={}, size={}", pageable.getPageNumber(), pageable.getPageSize());

        return propertyRepository.findAll(pageable)
                .map(propertyMapper::toResponse);
    }

    private boolean canModifyProperty(Property property, User user) {
        boolean isOwner = property.getOwner().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == UserRole.ADMIN;

        return isOwner || isAdmin;
    }
}
