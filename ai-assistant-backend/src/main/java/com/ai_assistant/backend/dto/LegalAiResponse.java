package com.ai_assistant.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LegalAiResponse {
    private String simplifiedSummary;
    private List<RiskClause> highRiskClauses;
    private List<String> actionableChecklist;
    private List<String> attorneyPrepQuestions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RiskClause {
        private String originalClause;
        private String riskLevel;
        private String explanation;
        private String suggestion;
    }
}