package com.realestate.propertylistings.property;

import com.realestate.propertylistings.dto.CreatePropertyRequest;
import com.realestate.propertylistings.dto.UpdatePropertyRequest;
import com.realestate.propertylistings.image.PropertyImage;
import org.mapstruct.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "isActive", constant = "true")
    @Mapping(target = "bathroomCount", ignore = true)
    Property toEntity(CreatePropertyRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "transactionType", ignore = true)
    @Mapping(target = "areaSqm", ignore = true)
    @Mapping(target = "roomCount", ignore = true)
    @Mapping(target = "bathroomCount", ignore = true)
    @Mapping(target = "floorNumber", ignore = true)
    @Mapping(target = "street", ignore = true)
    @Mapping(target = "postalCode", ignore = true)
    @Mapping(target = "isActive", ignore = true)
    @Mapping(target = "price", source = "price")
    void updateEntity(@MappingTarget Property property, UpdatePropertyRequest request);

    @Mapping(target = "type", source = "transactionType")
    @Mapping(target = "area", source = "areaSqm")
    @Mapping(target = "rooms", source = "roomCount")
    @Mapping(target = "bathrooms", source = "bathroomCount")
    @Mapping(target = "floor", source = "floorNumber")
    @Mapping(target = "address", expression = "java(buildAddress(property))")
    @Mapping(target = "owner.id", source = "owner.id")
    @Mapping(target = "owner.firstName", source = "owner.firstName")
    @Mapping(target = "owner.lastName", source = "owner.lastName")
    @Mapping(target = "owner.email", source = "owner.email")
    @Mapping(target = "owner.phoneNumber", source = "owner.phoneNumber")
    @Mapping(target = "imageUrls", expression = "java(mapImageUrls(property))")
    PropertyResponse toResponse(Property property);

    default List<String> mapImageUrls(Property property) {
        if (property.getImages() == null || property.getImages().isEmpty()) {
            return List.of();
        }
        return property.getImages().stream()
                .sorted(Comparator.comparing(PropertyImage::getDisplayOrder))
                .map(PropertyImage::getFileUrl)
                .collect(Collectors.toList());
    }
    default String buildAddress(Property property) {
        if (property.getStreet() == null && property.getCity() == null) {
            return null;
        }
        StringBuilder address = new StringBuilder();
        if (property.getStreet() != null) {
            address.append(property.getStreet());
        }
        if (property.getCity() != null) {
            if (address.length() > 0) address.append(", ");
            address.append(property.getCity());
        }
        if (property.getPostalCode() != null) {
            if (address.length() > 0) address.append(", ");
            address.append(property.getPostalCode());
        }
        return address.toString();
    }
}
