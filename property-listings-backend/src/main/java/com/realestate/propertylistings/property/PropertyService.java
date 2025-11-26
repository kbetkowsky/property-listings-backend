package com.realestate.propertylistings.property;

import com.realestate.propertylistings.dto.CreatePropertyRequest;
import com.realestate.propertylistings.dto.PagedResponse;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public PagedResponse<PropertyResponse> getAllProperties(
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        log.info("Pobieranie ogłoszeń - strona: {}, rozmiar: {}, sortowanie: {} {}",
                page, size, sortBy, direction);

        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Property> propertyPage = propertyRepository.findAll(pageable);

        return buildPagedResponse(propertyPage);
    }

    @Transactional(readOnly = true)
    public PagedResponse<PropertyResponse> getPropertiesWithFilters(
            PropertyFilterRequest filters,
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        log.info("Pobieranie ogłoszeń z filtrami: {}", filters);

        Sort sort = direction.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Property> spec = PropertySpecification.withFilters(filters);
        Page<Property> propertyPage = propertyRepository.findAll(spec, pageable);

        return buildPagedResponse(propertyPage);
    }

    @Transactional(readOnly = true)
    public PagedResponse<PropertyResponse> getPropertiesByCity(
            String city,
            int page,
            int size
    ) {
        log.info("Pobieranie ogłoszeń dla miasta: {}", city);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Property> propertyPage = propertyRepository.findByCityAndIsActiveTrue(city, pageable);

        return buildPagedResponse(propertyPage);
    }

    @Transactional(readOnly = true)
    public PagedResponse<PropertyResponse> searchProperties(
            String search,
            int page,
            int size
    ) {
        log.info("Wyszukiwanie ogłoszeń: {}", search);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Property> propertyPage = propertyRepository.searchProperties(search, pageable);

        return buildPagedResponse(propertyPage);
    }

    @Transactional(readOnly = true)
    public PagedResponse<PropertyResponse> getUserProperties(
            Long userId,
            int page,
            int size
    ) {
        log.info("Pobieranie ogłoszeń użytkownika: {}", userId);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Property> propertyPage = propertyRepository.findByOwnerId(userId, pageable);

        return buildPagedResponse(propertyPage);
    }

    @Transactional(readOnly = true)
    public PagedResponse<PropertyResponse> getMyProperties(User currentUser, int page, int size) {
        log.info("Pobieranie moich ogłoszeń dla: {}", currentUser.getEmail());

        return getUserProperties(currentUser.getId(), page, size);
    }

    private boolean canModifyProperty(Property property, User user) {
        boolean isOwner = property.getOwner().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == UserRole.ADMIN;

        return isOwner || isAdmin;
    }

    private PagedResponse<PropertyResponse> buildPagedResponse(Page<Property> page) {
        List<PropertyResponse> content = page.getContent().stream()
                .map(propertyMapper::toResponse)
                .collect(Collectors.toList());

        return PagedResponse.<PropertyResponse>builder()
                .content(content)
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .first(page.isFirst())
                .build();
    }
}
