package com.memora.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.memora.backend.model.Memory;
import com.memora.backend.repository.MemoryRepository;
import com.memora.backend.service.GeminiService;

@RestController
@CrossOrigin("http://localhost:5173")
public class DocumentFinderController {

    private final MemoryRepository memoryRepository;
    private final GeminiService geminiService;

    public DocumentFinderController(
            MemoryRepository memoryRepository,
            GeminiService geminiService) {

        this.memoryRepository = memoryRepository;
        this.geminiService = geminiService;
    }

    @PostMapping("/find-document")
    public Map<String, Object> findDocument(
            @RequestBody String question,
            Authentication authentication) {

        List<Memory> memories =
                memoryRepository.findByUserEmail(
                        authentication.getName());

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
You are an intelligent document finder.

A user has uploaded the following documents.

For every document you know:

- Filename
- First part of the document

Your task:

Find ALL relevant documents.

Return ONLY filenames.

One filename per line.

If nothing matches return

NONE

Documents:

""");

        for (Memory memory : memories) {

            prompt.append("Filename: ");
            prompt.append(memory.getFileName());
            prompt.append("\n");

            prompt.append("Preview:\n");

            String text =
                    memory.getExtractedText();

            if(text == null){

                text = "";

            }

            if(text.length() > 500){

                text = text.substring(0,500);

            }

            prompt.append(text);

            prompt.append("\n\n-----------------------\n\n");

        }

        prompt.append("\nUser Question:\n");
        prompt.append(question);

        String response =
                geminiService.findDocuments(
                        prompt.toString()
                );

        List<String> matchedFiles =
                new ArrayList<>();

        for(Memory memory : memories){

            if(response.toLowerCase().contains(
                    memory.getFileName().toLowerCase())){

                matchedFiles.add(
                        memory.getFileName()
                );

            }

        }
                Map<String, Object> result =
                new HashMap<>();

        if (matchedFiles.isEmpty()) {

            result.put("found", false);
            result.put(
                    "message",
                    "I couldn't find any matching documents."
            );

        } else {

            result.put("found", true);

            result.put(
                    "message",
                    "I found " + matchedFiles.size()
                            + " matching document(s)."
            );

            result.put(
                    "documents",
                    matchedFiles
            );

        }

        return result;

    }

}