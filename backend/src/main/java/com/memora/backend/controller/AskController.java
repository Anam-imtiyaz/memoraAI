package com.memora.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.memora.backend.model.DocumentChunk;
import com.memora.backend.repository.DocumentChunkRepository;
import com.memora.backend.service.GeminiService;
import com.memora.backend.service.SearchService;

@RestController
@RequestMapping("/ask")
@CrossOrigin("http://localhost:5173")
public class AskController {

    private final DocumentChunkRepository chunkRepository;
    private final SearchService searchService;
    private final GeminiService geminiService;

    public AskController(
            DocumentChunkRepository chunkRepository,
            SearchService searchService,
            GeminiService geminiService) {

        this.chunkRepository = chunkRepository;
        this.searchService = searchService;
        this.geminiService = geminiService;
    }

    @PostMapping
    public String askQuestion(
            @RequestBody String question,
            Authentication authentication) {

        List<DocumentChunk> chunks =
                chunkRepository.findByMemoryUserEmail(
                        authentication.getName()
                );

        List<DocumentChunk> bestChunks =
                searchService.findBestChunks(
                        chunks,
                        question
                );

        StringBuilder context = new StringBuilder();

        for (DocumentChunk chunk : bestChunks) {

            context.append("Document: ")
                   .append(chunk.getMemory().getFileName())
                   .append("\n\n");

            context.append(chunk.getChunkText());

            context.append("\n");
            context.append("----------------------------------------");
            context.append("\n\n");

        }

String prompt =
        """
You are MemoraAI, an AI assistant for personal documents.

Answer ONLY from the provided context.

Rules:

- Never invent information.
- If the answer isn't found, say:
"I couldn't find that information in your uploaded documents."

- Format answers nicely.

Use headings if needed.

Use bullet points when listing items.

At the end write:

Source Document(s):
<List document names used>

Context:

%s

Question:

%s
""".formatted(
        context.toString(),
        question
);

        return geminiService.askGemini(prompt);
    }
}