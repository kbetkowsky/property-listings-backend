package com.realestate.propertylistings.contact;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;
    private final ContactMapper contactMapper;

    public Contact saveContact(ContactDTO dto) {
        Contact contact = contactMapper.toEntity(dto);
        return contactRepository.save(contact);
    }

}
