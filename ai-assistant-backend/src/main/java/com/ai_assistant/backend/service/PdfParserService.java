package com.ai_assistant.backend.service;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class PdfParserService {

    public String extractText(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            String extractedText = stripper.getText(document);

            // DIAGNOSTIC LOG 1: Check PDF extraction
            System.out.println("--- EXTRACTED PDF TEXT ---");
            if (extractedText == null || extractedText.trim().isEmpty()) {
                System.out.println("FAILED: The PDF is empty or is a scanned image with no readable text.");
            } else {
                System.out.println("SUCCESS: Extracted " + extractedText.length() + " characters.");
            }
            System.out.println("--------------------------");

            return extractedText;
        }
    }
}