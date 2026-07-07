package com.memora.backend;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.memora.backend.model.DocumentChunk;
import com.memora.backend.model.Memory;
import com.memora.backend.repository.DocumentChunkRepository;
import com.memora.backend.repository.MemoryRepository;
import com.memora.backend.service.ChunkService;
import com.memora.backend.service.PdfService;

@RestController
@CrossOrigin("http://localhost:5173")
public class HelloController {

    private final MemoryRepository memoryRepository;
    private final DocumentChunkRepository chunkRepository;
    private final PdfService pdfService;
    private final ChunkService chunkService;

    public HelloController(
            MemoryRepository memoryRepository,
            DocumentChunkRepository chunkRepository,
            PdfService pdfService,
            ChunkService chunkService) {

        this.memoryRepository = memoryRepository;
        this.chunkRepository = chunkRepository;
        this.pdfService = pdfService;
        this.chunkService = chunkService;
    }

    @PostMapping("/hello")
    public String uploadMemory(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {
                        String uploadPath =
                System.getProperty("user.dir")
                        + File.separator
                        + "uploads";

        File uploadDir = new File(uploadPath);

        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String fileName = file.getOriginalFilename();

        File destination = new File(uploadDir, fileName);

        try (FileOutputStream output =
                     new FileOutputStream(destination)) {

            output.write(file.getBytes());

        }

        String extractedText = "";

        if (fileName != null &&
                fileName.toLowerCase().endsWith(".pdf")) {

            extractedText =
                    pdfService.extractText(
                            destination.getAbsolutePath());

        }

        Memory memory = new Memory();

        memory.setFileName(fileName);
        memory.setUploadedAt(LocalDate.now().toString());
        memory.setUserEmail(authentication.getName());
        memory.setFilePath(destination.getAbsolutePath());
        memory.setExtractedText(extractedText);

        memory = memoryRepository.save(memory);

        List<String> chunks =
                chunkService.splitIntoChunks(extractedText);

        for (int i = 0; i < chunks.size(); i++) {

            DocumentChunk chunk = new DocumentChunk();

            chunk.setMemory(memory);
            chunk.setChunkIndex(i);
            chunk.setChunkText(chunks.get(i));

            chunkRepository.save(chunk);
        }

        return "File uploaded successfully";
    }

    @GetMapping("/memories")
    public List<Memory> getMemories(
            Authentication authentication) {

        return memoryRepository.findByUserEmail(
                authentication.getName()
        );
    }

    @GetMapping("/memories/search")
    public List<Memory> searchMemories(
            @RequestParam String query,
            Authentication authentication) {

        return memoryRepository
                .findByUserEmailAndFileNameContainingIgnoreCase(
                        authentication.getName(),
                        query
                );
    }

    @DeleteMapping("/memories/{fileName}")
    public void deleteMemory(
            @PathVariable String fileName,
            Authentication authentication) {

        Memory memory =
                memoryRepository.findByFileNameAndUserEmail(
                        fileName,
                        authentication.getName()
                );

        if (memory == null) {
            return;
        }

        chunkRepository.deleteAll(
                chunkRepository.findByMemory(memory)
        );

        File file = new File(memory.getFilePath());

        if (file.exists()) {
            file.delete();
        }

        memoryRepository.delete(memory);
    }

}