package com.memora.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Memory {

    @Id
    private String fileName;

    private String uploadedAt;

    private String userEmail;

    public Memory() {
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(String uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

}