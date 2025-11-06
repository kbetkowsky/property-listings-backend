package com.realestate.propertylistings.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePropertyRequest {

    @NotNull(message = "ID jest wymagane do edycji")
    private Long id;

    @NotBlank(message = "Tytuł jest wymagany")
    @Size(min = 5, max = 100, message = "Tytuł: 5-100 znaków")
    private String title;

    @NotBlank(message = "Opis jest wymagany")
    @Size(min = 10, max = 1000, message = "Opis: 10-1000 znaków")
    private String description;

    @NotNull(message = "Cena jest wymagana")
    @Min(value = 1000, message = "Minimalna cena: 1000 zł")
    private Long price;

    @NotBlank(message = "Miasto jest wymagane")
    private String city;
}
