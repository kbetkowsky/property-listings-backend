package com.realestate.property_listings_backend.dto;

import com.realestate.property_listings_backend.property.PropertyType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
public class CreatePropertyRequest {
    
    @NotBlank(message = "Tytuł jest wymagany")
    @Size(max = 200, message = "Tytuł nie może być dłuższy niż 200 znaków")
    private String title;
    
    @NotBlank(message = "Opis jest wymagany")
    @Size(max = 3000, message = "Opis nie może być dłuższy niż 3000 znaków")
    private String description;
    
    @NotNull(message = "Cena jest wymagana")
    @Positive(message = "Cena musi być dodatnia")
    @DecimalMax(value = "99999999.99", message = "Cena nie może przekraczać 99,999,999.99")
    private BigDecimal price;
    
    @Positive(message = "Powierzchnia musi być dodatnia")
    @DecimalMax(value = "9999.99", message = "Powierzchnia nie może przekraczać 9999.99 m²")
    private Double areaSqm;
    
    @Positive(message = "Liczba pokoi musi być dodatnia")
    @Max(value = 50, message = "Liczba pokoi nie może przekraczać 50")
    private Integer roomCount;
    
    @Min(value = -5, message = "Piętro nie może być niższe niż -5")
    @Max(value = 200, message = "Piętro nie może być wyższe niż 200")
    private Integer floorNumber;
    
    @NotNull(message = "Typ nieruchomości jest wymagany")
    private PropertyType propertyType;
    
    @NotBlank(message = "Miasto jest wymagane")
    @Size(max = 100, message = "Nazwa miasta nie może być dłuższa niż 100 znaków")
    private String city;
    
    @Size(max = 200, message = "Nazwa ulicy nie może być dłuższa niż 200 znaków")
    private String street;
    
    @Pattern(regexp = "^\\d{2}-\\d{3}$", message = "Kod pocztowy musi mieć format XX-XXX")
    private String postalCode;
    
    @NotNull(message = "ID właściciela jest wymagane")
    @Positive(message = "ID właściciela musi być dodatnie")
    private Long ownerId;
    
    @Valid
    @Size(max = 10, message = "Można dodać maksymalnie 10 zdjęć")
    private List<PropertyImageRequest> images;
}