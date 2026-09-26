package com.ai_assistant.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.Map;

@Service
public class GroqDirectService {

    private final RestClient restClient;

    @Value("${legal.ai.prompt.analyze}")
    private String analyzePromptTemplate;

    @Value("${legal.ai.prompt.question}")
    private String questionPromptTemplate;

    public GroqDirectService(@Value("${groq.api.key}") String apiKey) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.groq.com/openai/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String analyzeContract(String text) {
        String prompt = analyzePromptTemplate + "\n\nContract Text:\n" + text;
        return callGroq(prompt);
    }

    public String answerQuestion(String documentText, String question) {
        String prompt = questionPromptTemplate + "\n\nDocument:\n" + documentText + "\n\nUser Question: " + question + "\n\nAnswer the question directly based ONLY on the document provided.";
        return callGroq(prompt);
    }

    private String callGroq(String prompt) {
        try {
            Map<String, Object> requestBody = Map.of(
                    "model", "openai/gpt-oss-20b",
                    "messages", List.of(
                            Map.of("role", "system", "content", "You are a precise legal assistant. Format your responses in clean Markdown."),
                            Map.of("role", "user", "content", prompt)
                    ),
                    "temperature", 0.1
            );

            Map response = restClient.post()
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");

        } catch (Exception e) {
            System.err.println("--- GROQ API ERROR ---");
            e.printStackTrace();
            throw new RuntimeException("Failed to get response from Groq: " + e.getMessage());
        }
    }
}