package com.realestate.propertylistings.mapper;

import com.realestate.propertylistings.dto.CreatePropertyRequest;
import com.realestate.propertylistings.dto.UpdatePropertyRequest;
import com.realestate.propertylistings.image.PropertyImage;
import com.realestate.propertylistings.property.Property;
import com.realestate.propertylistings.property.PropertyResponse;
import com.realestate.propertylistings.user.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PropertyMapper {

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
        response.setType(property.getType());
        response.setCity(property.getCity());
        response.setAddress(property.getAddress());
        response.setArea(property.getArea());
        response.setRooms(property.getRooms());
        response.setBathrooms(property.getBathrooms());
        response.setFloor(property.getFloor());
        response.setIsActive(property.getIsActive());
        response.setCreatedAt(property.getCreatedAt());
        response.setUpdatedAt(property.getUpdatedAt());

        if (property.getOwner() != null) {
            PropertyResponse.OwnerInfo ownerInfo = PropertyResponse.OwnerInfo.builder()
                    .id(property.getOwner().getId())
                    .firstName(property.getOwner().getFirstName())
                    .lastName(property.getOwner().getLastName())
                    .email(property.getOwner().getEmail())
                    .phoneNumber(property.getOwner().getPhoneNumber())
                    .build();
            response.setOwner(ownerInfo);
        }

        if (property.getImages() != null && !property.getImages().isEmpty()) {
            List<String> imageUrls = property.getImages().stream()
                    .map(PropertyImage::getFileUrl)
                    .collect(Collectors.toList());
            response.setImageUrls(imageUrls);
        }

        return response;
    }

    public List<PropertyResponse> toResponseList(List<Property> properties) {
        return properties.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
