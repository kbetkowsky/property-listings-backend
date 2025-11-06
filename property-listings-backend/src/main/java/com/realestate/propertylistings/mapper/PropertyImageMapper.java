package com.realestate.propertylistings.mapper;

import com.realestate.propertylistings.dto.PropertyImageRequest;
import com.realestate.propertylistings.dto.PropertyImageResponse;
import com.realestate.propertylistings.image.PropertyImage;
import com.realestate.propertylistings.property.Property;
import org.springframework.stereotype.Component;

@Component
public class PropertyImageMapper {

    public PropertyImage toEntity(PropertyImageRequest request, Property property) {
        PropertyImage image = new PropertyImage();
        image.setImageUrl(request.getImageUrl());
        image.setDisplayOrder(request.getDisplayOrder());
        image.setOriginalFileName(request.getOriginalFileName());
        image.setContentType(request.getContentType());
        image.setProperty(property);
        return image;
    }

    public PropertyImageResponse toResponse(PropertyImage image) {
        PropertyImageResponse response = new PropertyImageResponse();
        response.setId(image.getId());
        response.setImageUrl(image.getImageUrl());
        response.setOriginalFileName(image.getOriginalFileName());
        response.setContentType(image.getContentType());
        response.setDisplayOrder(image.getDisplayOrder());
        return response;
    }
}
