package com.realestate.property_listings_backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PropertyResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String city;
    private List<PropertyImageResponse> images;
}
