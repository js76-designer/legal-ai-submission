package com.ai_assistant.backend.controller;

import com.ai_assistant.backend.service.GroqDirectService;
import com.ai_assistant.backend.service.PdfParserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/legal")
@CrossOrigin(origins = "http://localhost:5173")
public class LegalAiController {

    private final PdfParserService pdfParserService;
    private final GroqDirectService groqDirectService;

    public LegalAiController(PdfParserService pdfParserService, GroqDirectService groqDirectService) {
        this.pdfParserService = pdfParserService;
        this.groqDirectService = groqDirectService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeDocument(@RequestParam("file") MultipartFile file) {
        try {
            // SECURITY VALIDATION: Reject non-PDF files immediately
            if (file.getContentType() == null || !file.getContentType().equals("application/pdf")) {
                return ResponseEntity.badRequest().body("Security Error: Only PDF files are permitted.");
            }

            String extractedText = pdfParserService.extractText(file);

            if (extractedText == null || extractedText.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Error: The PDF is empty or contains unreadable scanned images.");
            }

            String analysis = groqDirectService.analyzeContract(extractedText);
            return ResponseEntity.ok(analysis);

        } catch (Exception e) {
            System.err.println("Controller Error during analysis:");
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("");
        }
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String, String> request) {
        try {
            String documentText = request.get("documentText");
            String question = request.get("question");

            String answer = groqDirectService.answerQuestion(documentText, question);
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to process question.");
        }
    }
}