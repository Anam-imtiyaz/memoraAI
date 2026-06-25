package com.memora.backend;

import java.util.List;

import org.springframework.web.bind.annotation.*;

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
    public String hello(@RequestBody Memory memory) {

        memoryRepository.save(memory);

        return "Saved " + memory.getFileName();
    }

    @GetMapping("/memories")
    public List<Memory> getMemories() {

        return memoryRepository.findAll();
    }

    @GetMapping("/memories/search")
    public List<Memory> searchMemories(
            @RequestParam String query) {

        return memoryRepository.findByFileNameContainingIgnoreCase(query);

    }

    @DeleteMapping("/memories/{fileName}")
    public void deleteMemory(
            @PathVariable String fileName) {

        memoryRepository.deleteById(fileName);

    }
}