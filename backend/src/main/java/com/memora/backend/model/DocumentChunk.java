package com.memora.backend.model;

import jakarta.persistence.*;

@Entity
public class DocumentChunk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Memory memory;

    private int chunkIndex;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String chunkText;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String embedding;

    public DocumentChunk() {
    }

    public Long getId() {
        return id;
    }

    public Memory getMemory() {
        return memory;
    }

    public void setMemory(Memory memory) {
        this.memory = memory;
    }

    public int getChunkIndex() {
        return chunkIndex;
    }

    public void setChunkIndex(int chunkIndex) {
        this.chunkIndex = chunkIndex;
    }

    public String getChunkText() {
        return chunkText;
    }

    public void setChunkText(String chunkText) {
        this.chunkText = chunkText;
    }

    public String getEmbedding() {
        return embedding;
    }

    public void setEmbedding(String embedding) {
        this.embedding = embedding;
    }
}