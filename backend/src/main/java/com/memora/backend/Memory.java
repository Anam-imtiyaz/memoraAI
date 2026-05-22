package com.memora.backend;

public class Memory {

    String fileName;
    String uploadedAt;

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