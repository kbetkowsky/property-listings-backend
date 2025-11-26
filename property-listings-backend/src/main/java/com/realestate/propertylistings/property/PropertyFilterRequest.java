package com.realestate.propertylistings.property;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyFilterRequest {
    private String city;
    private TransactionType type;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Double minArea;
    private Double maxArea;
    private Integer minRooms;
    private Integer maxRooms;
    private String search;
    private Boolean activeOnly = true;
}
