package com.realestate.property_listings_backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
public class CreatePropertyRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotNull
    @Positive
    private BigDecimal price;
    @NotBlank
    private String city;
    @Valid
    private List<PropertyImageRequest> images;
}
