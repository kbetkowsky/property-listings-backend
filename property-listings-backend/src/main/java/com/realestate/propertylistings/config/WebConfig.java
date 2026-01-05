package com.realestate.propertylistings.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.upload.dir:uploads/properties}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Stwórz folder jeśli nie istnieje
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            boolean created = uploadDirFile.mkdirs();
            System.out.println("📁 Folder uploads: " + (created ? "utworzony" : "już istnieje"));
        }

        // Pobierz absolutną ścieżkę
        String absolutePath = uploadDirFile.getAbsolutePath();

        // WAŻNE: Mapuj /uploads/** na PARENT folder (uploads/)
        // Nie na uploads/properties/, bo URL już zawiera /properties/
        File parentDir = uploadDirFile.getParentFile();
        if (parentDir == null) {
            parentDir = new File("uploads");
        }

        String parentPath = parentDir.getAbsolutePath();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + parentPath + "/");

        System.out.println("✅ Serwowanie /uploads/** z: " + parentPath);
        System.out.println("   Fizyczny folder zdjęć: " + absolutePath);
    }
}
