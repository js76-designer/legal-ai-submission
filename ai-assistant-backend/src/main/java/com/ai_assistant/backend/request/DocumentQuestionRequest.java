package com.ai_assistant.backend.request;

public class DocumentQuestionRequest {
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