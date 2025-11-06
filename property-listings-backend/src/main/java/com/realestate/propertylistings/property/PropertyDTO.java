package com.realestate.propertylistings.property;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {

    private Long id;

    @NotBlank(message = "Tytuł jest wymagany")
    @Size(min = 5, max = 100, message = "Tytuł musi mieć od 5 do 100 znaków")
    private String title;

    @NotBlank(message = "Opis jest wymagany")
    @Size(min = 10, max = 1000, message = "Opis musi mieć od 10 do 1000 znaków")
    private String description;

    @NotNull(message = "Cena jest wymagana")
    @Min(value = 1000, message = "Minimalna cena to 1000 zł")
    private Long price;

    @NotNull(message = "Typ nieruchomości jest wymagany")
    private PropertyType type;

    @NotBlank(message = "Adres jest wymagany")
    private String address;

    @NotNull(message = "Liczba pokoi jest wymagana")
    @Min(value = 1, message = "Minimum 1 pokój")
    @Max(value = 20, message = "Nie więcej niż 20 pokoi")
    private Integer rooms;

    @NotNull(message = "Powierzchnia jest wymagana")
    @DecimalMin(value = "10.0", message = "Powierzchnia minimum 10m²")
    private Double area;
}
