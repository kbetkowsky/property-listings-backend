package com.realestate.propertylistings.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Property Listings API",
                version = "1.0.0",
                description = "REST API for real estate listings platform (authentication, properties, images, contact).",
                contact = @Contact(
                        name = "Kamil Bętkowski",
                        email = "k.betkowsky@gmail.com",
                        url = "https://github.com/kbetkowsky"
                ),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"
                )
        )
)
public class OpenApiConfig {
}
