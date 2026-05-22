package com.memora.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
public class HelloController {

    @PostMapping("/hello")
    public String hello(@RequestBody Memory memory) {

        return "Received: " + memory.getFileName();

    }
}