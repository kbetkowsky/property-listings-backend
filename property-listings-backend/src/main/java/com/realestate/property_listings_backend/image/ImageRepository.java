package com.realestate.property_listings_backend.image;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<PropertyImage, Long> {
}
