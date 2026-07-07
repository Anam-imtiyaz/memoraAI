package com.memora.backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.memora.backend.model.Memory;
import com.memora.backend.repository.MemoryRepository;

@RestController
@CrossOrigin("http://localhost:5173")
public class DocumentViewController {

    private final MemoryRepository memoryRepository;

    public DocumentViewController(
            MemoryRepository memoryRepository) {

        this.memoryRepository = memoryRepository;
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<ByteArrayResource> viewDocument(
            @PathVariable String fileName,
            Authentication authentication) throws IOException {

        Memory memory =
                memoryRepository.findByFileNameAndUserEmail(
                        fileName,
                        authentication.getName());

        if (memory == null) {
            return ResponseEntity.notFound().build();
        }

        File file = new File(memory.getFilePath());

        ByteArrayResource resource =
                new ByteArrayResource(
                        Files.readAllBytes(file.toPath()));

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + file.getName() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(file.length())
                .body(resource);
    }
}