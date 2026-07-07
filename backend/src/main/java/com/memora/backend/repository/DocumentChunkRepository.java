package com.memora.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.memora.backend.model.DocumentChunk;
import com.memora.backend.model.Memory;

public interface DocumentChunkRepository
        extends JpaRepository<DocumentChunk, Long> {

    List<DocumentChunk> findByMemory(Memory memory);

    List<DocumentChunk> findByMemoryUserEmail(String userEmail);

}