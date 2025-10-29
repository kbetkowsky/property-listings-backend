package com.realestate.property_listings_backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PropertyImageUploadResponse {
    private Long imageId;
    private String url;
    private String contentType;
    private long sizeBytes;
    private Integer displayOrder;
}
