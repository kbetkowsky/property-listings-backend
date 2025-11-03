package com.realestate.propertylistings.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PropertyImageRequest {
    
    @NotBlank(message = "URL obrazka jest wymagane")
    @Size(max = 500, message = "URL obrazka nie może być dłuższe niż 500 znaków")
    @Pattern(regexp = "^https?://.*\\.(jpg|jpeg|png|gif|webp)$", 
             message = "URL musi być poprawnym linkiem do obrazka (jpg, jpeg, png, gif, webp)")
    private String imageUrl;
    
    @NotNull(message = "Kolejność wyświetlania jest wymagana")
    @Min(value = 1, message = "Kolejność wyświetlania musi być większa od 0")
    @Max(value = 100, message = "Kolejność wyświetlania nie może przekraczać 100")
    private Integer displayOrder;
    
    @Size(max = 255, message = "Nazwa pliku nie może być dłuższa niż 255 znaków")
    private String originalFileName;
    
    @Size(max = 100, message = "Typ zawartości nie może być dłuższy niż 100 znaków")
    @Pattern(regexp = "^image/(jpeg|jpg|png|gif|webp)$", 
             message = "Typ zawartości musi być poprawnym typem obrazka")
    private String contentType;
}