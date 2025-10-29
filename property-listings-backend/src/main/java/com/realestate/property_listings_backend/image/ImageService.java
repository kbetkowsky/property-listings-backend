package com.realestate.property_listings_backend.image;

import com.realestate.property_listings_backend.property.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class ImageService {
    private static final long MAX_SIZE_BYTES = 5_242_880;
    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif"
    );


}
