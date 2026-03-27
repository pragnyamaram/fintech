package com.fintech.backend.dto;

import java.util.List;

public class AIAnalysisRequestDTO {
    private Long userId;
    private Double salary;
    private List<TransactionResponseDTO> transactions;

    public AIAnalysisRequestDTO() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public List<TransactionResponseDTO> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<TransactionResponseDTO> transactions) {
        this.transactions = transactions;
    }
}