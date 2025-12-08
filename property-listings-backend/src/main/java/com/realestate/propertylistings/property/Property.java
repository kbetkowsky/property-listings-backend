package com.realestate.propertylistings.property;

import com.realestate.propertylistings.image.PropertyImage;
import com.realestate.propertylistings.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "properties",
        indexes = {
                @Index(name = "idx_city", columnList = "city"),
                @Index(name = "idx_price", columnList = "price"),
                @Index(name = "idx_transaction_type", columnList = "transaction_type"),
                @Index(name = "idx_is_active", columnList = "is_active"),
                @Index(name = "idx_created_at", columnList = "created_at"),
                @Index(name = "idx_user_id", columnList = "user_id"),
                @Index(name = "idx_city_price", columnList = "city, price"),
                @Index(name = "idx_city_active", columnList = "city, is_active"),
                @Index(name = "idx_active_created", columnList = "is_active, created_at")
        })
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 3000)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    private Double areaSqm;
    private Integer roomCount;
    private Integer bathroomCount;
    private Integer floorNumber;

    @Column(length = 100)
    private String city;

    @Column(length = 200)
    private String street;

    private String postalCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private TransactionType transactionType;

    @Column(nullable = false)
    private Boolean isActive = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User owner;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyImage> images = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
