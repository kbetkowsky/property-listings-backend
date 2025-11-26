package com.realestate.propertylistings.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PropertyImageResponse {
    private Long id;
    private String fileName;
    private String originalFileName;
    private String contentType;
    private Long fileSize;
    private String fileUrl;
    private boolean isPrimary;
    private Integer displayOrder;
    private LocalDateTime uploadedAt;
}
