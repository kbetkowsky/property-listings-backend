package com.realestate.propertylistings.mapper;

import com.realestate.propertylistings.dto.CreatePropertyRequest;
import com.realestate.propertylistings.dto.PropertyResponse;
import com.realestate.propertylistings.dto.UpdatePropertyRequest;
import com.realestate.propertylistings.property.Property;
import com.realestate.propertylistings.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PropertyMapper {

    private final PropertyImageMapper imageMapper;  // Oddzielny mapper dla images

    public Property toEntity(CreatePropertyRequest request, User owner) {
        Property property = new Property();
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setCity(request.getCity());
        property.setOwner(owner);
        property.setCreatedAt(LocalDateTime.now());
        property.setUpdatedAt(LocalDateTime.now());

        return property;
    }

    public void updateEntity(Property existing, UpdatePropertyRequest request) {
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setPrice(request.getPrice());
        existing.setCity(request.getCity());
        existing.setUpdatedAt(LocalDateTime.now());

    }

    public PropertyResponse toResponse(Property property) {
        PropertyResponse response = new PropertyResponse();
        response.setId(property.getId());
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setPrice(property.getPrice());
        response.setCity(property.getCity());
        response.setCreatedAt(property.getCreatedAt());
        response.setUpdatedAt(property.getUpdatedAt());

        // Owner info
        if (property.getOwner() != null) {
            response.setOwnerEmail(property.getOwner().getEmail());
            response.setOwnerName(property.getOwner().getFirstName() + " " + property.getOwner().getLastName());
        }

        // Images
        if (property.getImages() != null) {
            response.setImages(property.getImages().stream()
                    .map(imageMapper::toResponse)
                    .collect(Collectors.toList()));
        }

        return response;
    }

    public List<PropertyResponse> toResponseList(List<Property> properties) {
        return properties.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
