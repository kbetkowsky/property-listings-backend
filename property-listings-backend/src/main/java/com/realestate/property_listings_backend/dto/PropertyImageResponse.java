package com.realestate.property_listings_backend.dto;

import lombok.Data;

@Data
public class PropertyImageResponse {
    private Long id;
    private String imageUrl;
    private String originalFileName;
    private String contentType;
    private Integer displayOrder;
}
