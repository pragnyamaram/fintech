package com.fintech.backend.dto;

import java.util.List;
import java.util.Map;

public class DashboardResponseDTO {

    // 🔹 Overall metrics
    private Double totalIncome;
    private Double totalSpent;
    private Double netBalance;
    private Double savingsRate;

    // 🔹 Insights
    private String topCategory;

    // 🔹 Category-wise spending
    private Map<String, Double> categoryBreakdown;

    // 🔹 Recent transactions
    private List<TransactionResponseDTO> recentTransactions;

    // 🔹 Default constructor
    public DashboardResponseDTO() {
    }

    // 🔹 Getters & Setters

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(Double totalSpent) {
        this.totalSpent = totalSpent;
    }

    public Double getNetBalance() {
        return netBalance;
    }

    public void setNetBalance(Double netBalance) {
        this.netBalance = netBalance;
    }

    public Double getSavingsRate() {
        return savingsRate;
    }

    public void setSavingsRate(Double savingsRate) {
        this.savingsRate = savingsRate;
    }

    public String getTopCategory() {
        return topCategory;
    }

    public void setTopCategory(String topCategory) {
        this.topCategory = topCategory;
    }

    public Map<String, Double> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(Map<String, Double> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }

    public List<TransactionResponseDTO> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<TransactionResponseDTO> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }
}