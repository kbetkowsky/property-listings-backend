package com.realestate.propertylistings.property;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    @Mapping(target = "owner.id", source = "owner.id")
    @Mapping(target = "owner.firstName", source = "owner.firstName")
    @Mapping(target = "owner.lastName", source = "owner.lastName")
    @Mapping(target = "owner.email", source = "owner.email")
    @Mapping(target = "owner.phoneNumber", source = "owner.phoneNumber")
    @Mapping(target = "imageUrls", ignore = true)  // dodam pozniej jak bedzie upload zdjec
    PropertyResponse toResponse(Property property);
}
