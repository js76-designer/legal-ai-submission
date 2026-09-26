package com.ai_assistant.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.Map;

@Service
public class GroqDirectService {

    private static final Logger logger = LoggerFactory.getLogger(GroqDirectService.class);

    private final RestClient restClient;

    @Value("${legal.ai.prompt.analyze}")
    private String analyzePromptTemplate;

    @Value("${legal.ai.prompt.question}")
    private String questionPromptTemplate;

    public GroqDirectService(@Value("${groq.api.key}") String apiKey) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(5000); // 5 seconds to connect
        factory.setReadTimeout(20000);   // 20 seconds max to wait for Groq AI

        this.restClient = RestClient.builder()
                .requestFactory(factory)
                .baseUrl("https://api.groq.com/openai/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    @Cacheable(value = "documentAnalysis", key = "#text.hashCode()")
    public String analyzeContract(String text) {
        String prompt = analyzePromptTemplate + "\n\nContract Text:\n" + text;
        return callGroq(prompt);
    }

    @Cacheable(value = "documentQuestions", key = "(#documentText + #question).hashCode()")
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
            logger.error("Groq API connection failed: {}", e.getMessage());
            throw new RuntimeException("Failed to get response from Groq: " + e.getMessage());
        }
    }
}