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
    private Integer minBathroom;
    private Integer maxBathroom;
    private Integer minFloor;
    private Integer maxFloor;
    private String street;
    private String postalCode;
    private String sortBy = "createdAt";
    private String sortDirection = "DESC";
    private Integer page = 0;
    private Integer size = 20;
}
