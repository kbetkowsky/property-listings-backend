package com.realestate.propertylistings.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<PropertyImage, Long> {

    List<PropertyImage> findByPropertyIdOrderByDisplayOrderAsc(Long propertyId);

    Optional<PropertyImage> findByPropertyIdAndIsPrimaryTrue(Long propertyId);

    Optional<PropertyImage> findByFileName(String fileName);

    long countByPropertyId(Long propertyId);

    void deleteByPropertyId(Long propertyId);
}
