package com.realestate.propertylistings.property;

import com.realestate.propertylistings.dto.CreatePropertyRequest;
import com.realestate.propertylistings.dto.PagedResponse;
import com.realestate.propertylistings.dto.UpdatePropertyRequest;
import com.realestate.propertylistings.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    public ResponseEntity<PagedResponse<PropertyResponse>> getAllProperties(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction
    ) {
        PagedResponse<PropertyResponse> response = propertyService.getAllProperties(
                page, size, sortBy, direction
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyResponse> getPropertyById(@PathVariable Long id) {
        PropertyResponse response = propertyService.getPropertyByIdOptimized(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<PropertyResponse> createProperty(
            @Valid @RequestBody CreatePropertyRequest request,
            @AuthenticationPrincipal User currentUser
    ) {
        PropertyResponse response = propertyService.createProperty(request, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyResponse> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePropertyRequest request,
            @AuthenticationPrincipal User currentUser
    ) {
        PropertyResponse response = propertyService.updateProperty(id, request, currentUser);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser
    ) {
        propertyService.deleteProperty(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/search")
    public ResponseEntity<PagedResponse<PropertyResponse>> searchPropertiesWithFilters(
            @RequestBody PropertyFilterRequest filters,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction
    ) {
        PagedResponse<PropertyResponse> response = propertyService.getPropertiesWithFilters(
                filters, page, size, sortBy, direction
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<PagedResponse<PropertyResponse>> searchProperties(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        PagedResponse<PropertyResponse> response = propertyService.searchProperties(
                q, page, size
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<PagedResponse<PropertyResponse>> getPropertiesByCity(
            @PathVariable String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        PagedResponse<PropertyResponse> response = propertyService.getPropertiesByCity(
                city, page, size
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my")
    public ResponseEntity<PagedResponse<PropertyResponse>> getMyProperties(
            @AuthenticationPrincipal User currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        PagedResponse<PropertyResponse> response = propertyService.getMyProperties(
                currentUser, page, size
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<PagedResponse<PropertyResponse>> getUserProperties(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        PagedResponse<PropertyResponse> response = propertyService.getUserProperties(
                userId, page, size
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<PropertyResponse>> filterProperties(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Double minArea,
            @RequestParam(required = false) Double maxArea,
            @RequestParam(required = false) Integer minRooms,
            @RequestParam(required = false) Integer maxRooms,
            @RequestParam(required = false) Integer minBathrooms,
            @RequestParam(required = false) Integer maxBathrooms,
            @RequestParam(required = false) Integer minFloor,
            @RequestParam(required = false) Integer maxFloor,
            @RequestParam(required = false) String street,
            @RequestParam(required = false) String postalCode,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "true") Boolean activeOnly,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size
    ) {
        PropertyFilterRequest filters = new PropertyFilterRequest();
        filters.setCity(city);
        filters.setType(type);
        filters.setMinPrice(minPrice);
        filters.setMaxPrice(maxPrice);
        filters.setMinArea(minArea);
        filters.setMaxArea(maxArea);
        filters.setMinRooms(minRooms);
        filters.setMaxRooms(maxRooms);
        filters.setMinBathroom(minBathrooms);
        filters.setMaxBathroom(maxBathrooms);
        filters.setMinFloor(minFloor);
        filters.setMaxFloor(maxFloor);
        filters.setStreet(street);
        filters.setPostalCode(postalCode);
        filters.setSearch(search);
        filters.setActiveOnly(activeOnly);
        filters.setSortBy(sortBy);
        filters.setSortDirection(sortDirection);
        filters.setPage(page);
        filters.setSize(size);

        return ResponseEntity.ok(propertyService.filterProperties(filters));
    }
}
