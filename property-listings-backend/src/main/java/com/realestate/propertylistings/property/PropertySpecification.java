package com.realestate.propertylistings.property;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class PropertySpecification {

    public static Specification<Property> withFilters(PropertyFilterRequest filters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filters.getActiveOnly() != null && filters.getActiveOnly()) {
                predicates.add(criteriaBuilder.isTrue(root.get("isActive")));
            }

            if (filters.getCity() != null && !filters.getCity().isEmpty()) {
                predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get("city")),
                        filters.getCity().toLowerCase()
                ));
            }

            if (filters.getType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("transactionType"), filters.getType()));  // ZMIENIONE!
            }

            if (filters.getMinPrice() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("price"),
                        filters.getMinPrice()
                ));
            }

            if (filters.getMaxPrice() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("price"),
                        filters.getMaxPrice()
                ));
            }

            if (filters.getMinArea() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("areaSqm"),
                        filters.getMinArea()
                ));
            }

            if (filters.getMaxArea() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("areaSqm"),
                        filters.getMaxArea()
                ));
            }

            if (filters.getMinRooms() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("roomCount"),
                        filters.getMinRooms()
                ));
            }

            if (filters.getMaxRooms() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("roomCount"),
                        filters.getMaxRooms()
                ));
            }

            if (filters.getMinFloor() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("bathroomCount"), filters.getMinBathroom()));
            }

            if (filters.getMaxFloor() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("floorNumber"), filters.getMaxFloor()
                ));
            }

            if (filters.getMinBathroom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("bathroomCount"), filters.getMinBathroom()
                ));
            }

            if (filters.getMinBathroom() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("bathroomCount"), filters.getMaxBathroom()
                ));
            }

            if (filters.getStreet() != null && !filters.getStreet().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("street")),
                        "%" + filters.getStreet().toLowerCase() + "%"
                ));
            }

            if (filters.getPostalCode() != null && !filters.getPostalCode().isEmpty()) {
                predicates.add(criteriaBuilder.equal(
                        root.get("postalCode"), filters.getPostalCode()
                ));
            }

            if (filters.getSearch() != null && !filters.getSearch().isEmpty()) {
                String searchPattern = "%" + filters.getSearch().toLowerCase() + "%";

                Predicate titleMatch = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("title")),
                        searchPattern
                );

                Predicate descriptionMatch = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("description")),
                        searchPattern
                );

                Predicate cityMatch = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("city")), searchPattern
                );

                predicates.add(criteriaBuilder.or(titleMatch, descriptionMatch, cityMatch));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
