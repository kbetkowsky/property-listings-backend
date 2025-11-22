package com.realestate.propertylistings.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactDTO(
        @NotBlank(message = "Imię jest wymagane")
        @Size(min = 2, max = 50, message = "Imię musi mieć od 2 do 50 znaków")
        String name,

        @NotBlank(message = "Email jest wymagany")
        @Email(message = "Email musi być poprawny")
        String email,

        @NotBlank(message = "Temat jest wymagany")
        @Size(min = 5, max = 200, message = "Temat musi mieć od 5 do 200 znaków")
        String subject,

        @NotBlank(message = "Wiadomość jest wymagana")
        @Size(min = 10, max = 1000, message = "Wiadomość musi mieć od 10 do 1000 znaków")
        String message
) {
}
