package com.memora.backend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
public class HelloController {

    List<Memory> memories = new ArrayList<>();

    @PostMapping("/hello")
    public String hello(@RequestBody Memory memory) {

        memories.add(memory);

        return "Saved " + memory.getFileName();
    }

    @GetMapping("/memories")
    public List<Memory> getMemories() {

        return memories;
    }

    @DeleteMapping("/memories/{index}")
    public void deleteMemory(@PathVariable int index) {

        memories.remove(index);
    }
}