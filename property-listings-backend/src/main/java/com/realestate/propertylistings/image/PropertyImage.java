package com.realestate.propertylistings.image;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.realestate.propertylistings.property.Property;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "property_images")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    //Pod S3
    private String path;
    private String originalFileName;
    private String contentType;
    private Long sizeBytes;
    private String originalUrl;

    private Integer displayOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    @JsonIgnore
    private Property property;

    @Column(name = "file_size")
    private Long fileSize;
}
