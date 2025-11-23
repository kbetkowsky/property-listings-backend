package com.realestate.propertylistings.contact;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    Contact toEntity(ContactDTO dto);

    ContactDTO toDTO(Contact contact);
}
