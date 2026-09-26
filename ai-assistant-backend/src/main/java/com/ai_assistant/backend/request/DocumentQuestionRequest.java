package com.ai_assistant.backend.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DocumentQuestionRequest {
    @NotBlank(message = "Document text cannot be empty")
    @Size(max = 100000, message = "Document exceeds maximum allowed length")
    private String documentText;
    private String question;

    public String getDocumentText() {
        return documentText;
    }

    public void setDocumentText(String documentText) {
        this.documentText = documentText;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}