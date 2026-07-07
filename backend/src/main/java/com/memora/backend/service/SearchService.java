package com.memora.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.memora.backend.model.DocumentChunk;

@Service
public class SearchService {

    public List<DocumentChunk> findBestChunks(
            List<DocumentChunk> chunks,
            String question) {

        String[] words = question.toLowerCase().split("\\s+");

        List<ScoredChunk> scored = new ArrayList<>();

        for (DocumentChunk chunk : chunks) {

            int score = 0;

            String text = chunk.getChunkText().toLowerCase();

            for (String word : words) {

                if (word.length() < 3)
                    continue;

                if (text.contains(word))
                    score++;
            }

            scored.add(new ScoredChunk(chunk, score));
        }

        scored.sort(
                Comparator.comparingInt(ScoredChunk::getScore)
                          .reversed()
        );

        List<DocumentChunk> result = new ArrayList<>();

        for (int i = 0; i < Math.min(3, scored.size()); i++) {

            result.add(scored.get(i).getChunk());

        }

        return result;
    }

    private static class ScoredChunk {

        private final DocumentChunk chunk;
        private final int score;

        public ScoredChunk(DocumentChunk chunk, int score) {
            this.chunk = chunk;
            this.score = score;
        }

        public DocumentChunk getChunk() {
            return chunk;
        }

        public int getScore() {
            return score;
        }
    }
}