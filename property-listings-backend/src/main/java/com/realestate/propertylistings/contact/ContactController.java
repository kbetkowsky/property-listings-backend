package com.realestate.propertylistings.contact;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Contact> createContact(@Valid @RequestBody ContactDTO dto) {
        Contact saved = contactService.saveContact(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
