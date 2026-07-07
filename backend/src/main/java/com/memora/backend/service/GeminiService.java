package com.memora.backend.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String askGemini(String prompt) {

        try {

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                            + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String body = """
            {
              "contents": [
                {
                  "parts": [
                    {
                      "text": "%s"
                    }
                  ]
                }
              ]
            }
            """.formatted(prompt.replace("\"", "\\\""));

            HttpEntity<String> entity =
                    new HttpEntity<>(body, headers);

            String response = restTemplate.postForObject(
                    url,
                    entity,
                    String.class
            );

            JSONObject json = new JSONObject(response);

            JSONArray candidates = json.getJSONArray("candidates");

            JSONObject firstCandidate = candidates.getJSONObject(0);

            JSONObject content = firstCandidate.getJSONObject("content");

            JSONArray parts = content.getJSONArray("parts");

            return parts.getJSONObject(0).getString("text");

        } catch (Exception e) {

            e.printStackTrace();

            return "Sorry, I couldn't generate an answer.";

        }
 
    }        public String findDocuments(String prompt) {

    return askGemini(prompt);

}

}