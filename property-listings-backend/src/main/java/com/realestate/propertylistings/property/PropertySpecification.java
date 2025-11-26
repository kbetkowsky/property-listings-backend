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
                predicates.add(criteriaBuilder.equal(root.get("type"), filters.getType()));
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
                        root.get("area"),
                        filters.getMinArea()
                ));
            }

            if (filters.getMaxArea() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("area"),
                        filters.getMaxArea()
                ));
            }

            if (filters.getMinRooms() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("rooms"),
                        filters.getMinRooms()
                ));
            }

            if (filters.getMaxRooms() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("rooms"),
                        filters.getMaxRooms()
                ));
            }

            if (filters.getTransactionType() != null) {
                predicates.add(criteriaBuilder.equal(root.get("transactionType"), filters.getTransactionType()));
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

                predicates.add(criteriaBuilder.or(titleMatch, descriptionMatch));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
