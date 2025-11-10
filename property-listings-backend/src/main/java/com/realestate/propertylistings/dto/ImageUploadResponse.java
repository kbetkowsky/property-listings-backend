package com.realestate.propertylistings.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageUploadResponse {
    private Long id;
    private String imageUrl;
    private String originalFileName;
    private String contentType;
    private Integer displayOrder;
    private Long fileSize;
}
