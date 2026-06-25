package com.memora.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Memory {

    @Id
    private String fileName;

    private String uploadedAt;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String name) {
        fileName = name;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(String date) {
        uploadedAt = date;
    }
}