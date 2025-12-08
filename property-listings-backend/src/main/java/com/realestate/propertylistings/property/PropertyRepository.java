package com.realestate.propertylistings.property;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>,
        JpaSpecificationExecutor<Property> {
    Page<Property> findByIsActiveTrue(Pageable pageable);
    Page<Property> findByCityAndIsActiveTrue(String city, Pageable pageable);
    Page<Property> findByOwnerId(Long ownerId, Pageable pageable);

    @Query("SELECT p FROM Property p WHERE " +
            "(LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "p.isActive = true")
    Page<Property> searchProperties(@Param("search") String search, Pageable pageable);

    @Query("SELECT p FROM Property p " +
            "LEFT JOIN FETCH p.owner " +
            "LEFT JOIN FETCH p.images " +
            "WHERE p.id = :id")
    Optional<Property> findByIdWithDetails(@Param("id") Long id);

    @Query("SELECT COUNT(p) FROM Property p WHERE p.city = :city AND p.isActive = true")
    long countByCityAndIsActiveTrue(@Param("city") String city);

    @Query("SELECT COUNT(p) FROM Property p WHERE p.isActive = true")
    long countByIsActiveTrue();
}
