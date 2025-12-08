package com.realestate.propertylistings.property;

import org.springframework.stereotype.Component;

@Component
public class PaginationValidator {
    private static final int MAX_PAGE_SIZE = 50;
    private static final int DEFAULT_PAGE_SIZE = 20;
    private static final int MIN_PAGE_SIZE = 1;

    public int validatePageSize(Integer size) {
        if (size == null || size < MIN_PAGE_SIZE) {
            return DEFAULT_PAGE_SIZE;
        }
        if (size > MAX_PAGE_SIZE) {
            return MAX_PAGE_SIZE;
        }
        return size;
    }

    public int validatePageNumber(Integer page) {
        if (page == null || page < 0) {
            return 0;
        }
        return page;
    }

    public String validateSortDirection(String direction) {
        if (direction == null) {
            return "DESC";
        }
        String normalized = direction.toUpperCase();
        return normalized.equals("ASC") ? "ASC" : "DESC";
    }

    public String validateSortField(String sortBy) {
        if (sortBy == null) {
            return "createdAt";
        }

        return switch (sortBy.toLowerCase()) {
            case "price" -> "price";
            case "createdat", "created_at" -> "createdAt";
            case "updatedat", "updated_at" -> "updatedAt";
            case "city" -> "city";
            case "areasqm", "area" -> "areaSqm";
            case "roomcount", "rooms" -> "roomCount";
            case "title" -> "title";
            default -> "createdAt";
        };
    }
}
