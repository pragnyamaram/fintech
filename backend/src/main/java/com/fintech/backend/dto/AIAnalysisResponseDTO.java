package com.fintech.backend.dto;

import java.util.List;

public class AIAnalysisResponseDTO {
    private String summary;
    private List<String> alerts;
    private List<String> suggestions;
    private Integer score;
    private Double predictedBalance;
    private String topCategory;

    public AIAnalysisResponseDTO() {
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getAlerts() {
        return alerts;
    }

    public void setAlerts(List<String> alerts) {
        this.alerts = alerts;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Double getPredictedBalance() {
        return predictedBalance;
    }

    public void setPredictedBalance(Double predictedBalance) {
        this.predictedBalance = predictedBalance;
    }

    public String getTopCategory() {
        return topCategory;
    }

    public void setTopCategory(String topCategory) {
        this.topCategory = topCategory;
    }
}