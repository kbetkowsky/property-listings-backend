package com.realestate.propertylistings.property;

import com.realestate.propertylistings.dto.CreatePropertyRequest;
import com.realestate.propertylistings.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PropertyServiceTest {

    private PropertyRepository propertyRepository;
    private PropertyMapper propertyMapper;
    private PaginationValidator paginationValidator;
    private PropertyService propertyService;

    @BeforeEach
    void setUp() {
        propertyRepository = mock(PropertyRepository.class);
        propertyMapper = mock(PropertyMapper.class);
        paginationValidator = mock(PaginationValidator.class);

        propertyService = new PropertyService(
                propertyRepository,
                propertyMapper,
                paginationValidator
        );
    }

    @Test
    void createProperty_shouldMapRequestSetOwnerSaveAndReturnResponse() {
        //given
        CreatePropertyRequest request = new CreatePropertyRequest();
        request.setTitle("Test property");
        request.setPrice(BigDecimal.valueOf(350000));

        User currentUser = new User();
        currentUser.setId(1L);
        currentUser.setEmail("agent@example.com");

        Property mappedEntity = new Property();
        mappedEntity.setTitle("Test property");

        Property savedEntity = new Property();
        savedEntity.setId(10L);
        savedEntity.setTitle("Test property");

        PropertyResponse response = new PropertyResponse();
        response.setId(10L);
        response.setTitle("Test property");

        when(propertyMapper.toEntity(request)).thenReturn(mappedEntity);
        when(propertyRepository.save(mappedEntity)).thenReturn(savedEntity);
        when(propertyMapper.toResponse(savedEntity)).thenReturn(response);

        //when
        PropertyResponse result = propertyService.createProperty(request, currentUser);

        //then
        assertNotNull(result);
        assertEquals(10L, result.getId());
        assertEquals("Test property", result.getTitle());
        verify(propertyMapper).toEntity(request);
        assertSame(currentUser, mappedEntity.getOwner());
        verify(propertyRepository).save(mappedEntity);
        verify(propertyMapper).toResponse(savedEntity);

        verifyNoMoreInteractions(propertyMapper, propertyRepository, paginationValidator);
    }
}
