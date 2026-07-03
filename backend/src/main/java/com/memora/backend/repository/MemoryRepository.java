package com.memora.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.memora.backend.model.Memory;

public interface MemoryRepository extends JpaRepository<Memory, String> {

    List<Memory> findByFileNameContainingIgnoreCase(String fileName);

    List<Memory> findByUserEmail(String userEmail);

    List<Memory> findByUserEmailAndFileNameContainingIgnoreCase(
            String userEmail,
            String fileName
    );

}