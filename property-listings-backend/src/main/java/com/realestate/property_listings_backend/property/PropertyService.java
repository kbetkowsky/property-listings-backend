package com.realestate.property_listings_backend.property;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Transactional(readOnly = true)
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    @Transactional
    public Optional<Property> updateProperty(Long id, Property updated) {
        return propertyRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setPrice(updated.getPrice());
            existing.setDescription(updated.getDescription());
            existing.setCity(updated.getCity());
            existing.setRoomCount(updated.getRoomCount());
            existing.setPropertyType(updated.getPropertyType());
            return propertyRepository.save(existing);
        });
    }

    @Transactional
    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    @Transactional
    public boolean deleteProperty(Long id) {
        if (propertyRepository.existsById(id)) {
            propertyRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
