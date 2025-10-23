package com.realestate.property_listings_backend.mapper;

import com.realestate.property_listings_backend.dto.CreatePropertyRequest;
import com.realestate.property_listings_backend.dto.PropertyImageRequest;
import com.realestate.property_listings_backend.dto.PropertyImageResponse;
import com.realestate.property_listings_backend.dto.PropertyResponse;
import com.realestate.property_listings_backend.image.PropertyImage;
import com.realestate.property_listings_backend.property.Property;

import java.util.List;
import java.util.stream.Collectors;

public class PropertyMapper {
    public static Property mapToEntity(CreatePropertyRequest request) {
        Property property = new Property();
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setCity(request.getCity());

        if (request.getImages() != null) {
            List<PropertyImage> images = request.getImages().stream()
                    .map(PropertyMapper::mapToImageEntity)
                    .collect(Collectors.toList());
            images.forEach(img -> img.setProperty(property));
            property.setImages(images);
        }
        return property;
    }

    public static PropertyImage mapToImageEntity(PropertyImageRequest req) {
        PropertyImage img = new PropertyImage();
        img.setImageUrl(req.getImageUrl());
        img.setDisplayOrder(req.getDisplayOrder());
        img.setOriginalFileName(req.getOriginalFileName());
        img.setContentType(req.getContentType());
        return img;
    }

    public static PropertyResponse mapToResponse(Property property) {
        PropertyResponse response = new PropertyResponse();
        response.setId(property.getId());
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setPrice(property.getPrice());
        response.setCity(property.getCity());

        if(property.getImages() != null) {
            List<PropertyImageResponse> images = property.getImages().stream()
                    .map(PropertyMapper::mapToImageResponse)
                    .collect(Collectors.toList());
            response.setImages(images);
        }
        return response;
    }

    public static PropertyImageResponse mapToImageResponse(PropertyImage img) {
        PropertyImageResponse resp = new PropertyImageResponse();
        resp.setId(img.getId());
        resp.setImageUrl(img.getImageUrl());
        resp.setOriginalFileName(img.getOriginalFileName());
        resp.setContentType(img.getContentType());
        resp.setDisplayOrder(img.getDisplayOrder());
        return resp;
    }
}
