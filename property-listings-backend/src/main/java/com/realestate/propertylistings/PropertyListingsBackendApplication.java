package com.realestate.propertylistings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PropertyListingsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertyListingsBackendApplication.class, args);
	}

}
