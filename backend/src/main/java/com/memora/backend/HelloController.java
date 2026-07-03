package com.memora.backend;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.memora.backend.model.Memory;
import com.memora.backend.repository.MemoryRepository;

@RestController
@CrossOrigin("http://localhost:5173")
public class HelloController {

    private final MemoryRepository memoryRepository;

    public HelloController(MemoryRepository memoryRepository) {
        this.memoryRepository = memoryRepository;
    }

    @PostMapping("/hello")
    public String hello(
            @RequestBody Memory memory,
            Authentication authentication) {

        memory.setUserEmail(authentication.getName());

        memoryRepository.save(memory);

        return "Saved " + memory.getFileName();
    }

    @GetMapping("/memories")
    public List<Memory> getMemories(Authentication authentication) {

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

        Memory memory = memoryRepository.findById(fileName).orElse(null);

        if (memory == null) {
            return;
        }

        if (!memory.getUserEmail().equals(authentication.getName())) {
            return;
        }

        memoryRepository.delete(memory);
    }

}