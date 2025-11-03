package com.realestate.propertylistings.dto;

import lombok.Data;

@Data
public class PropertyImageResponse {
    private Long id;
    private String imageUrl;
    private String originalFileName;
    private String contentType;
    private Integer displayOrder;
}
