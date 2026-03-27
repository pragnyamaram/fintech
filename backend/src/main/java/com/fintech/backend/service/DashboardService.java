package com.fintech.backend.service;

import com.fintech.backend.dto.DashboardResponseDTO;
import com.fintech.backend.dto.TransactionResponseDTO;
import com.fintech.backend.model.Transaction;
import com.fintech.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;

    public DashboardService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public DashboardResponseDTO getDashboard(Long userId) {
        List<Transaction> transactions = transactionRepository.findByUserId(userId);

        double totalIncome = 0.0;
        double totalSpent = 0.0;
        Map<String, Double> categoryBreakdown = new HashMap<>();

        for (Transaction txn : transactions) {
            String type = txn.getType() == null ? "DEBIT" : txn.getType().toUpperCase();
            double amount = txn.getAmount() == null ? 0.0 : txn.getAmount();
            String category = txn.getCategory() == null ? "other" : txn.getCategory();

            if ("CREDIT".equals(type)) {
                totalIncome += amount;
            } else {
                totalSpent += amount;
                categoryBreakdown.put(category, categoryBreakdown.getOrDefault(category, 0.0) + amount);
            }
        }

        String topCategory = categoryBreakdown.entrySet()
                .stream()
                .max(Comparator.comparingDouble(Map.Entry::getValue))
                .map(Map.Entry::getKey)
                .orElse("none");

        double netBalance = totalIncome - totalSpent;
        double savingsRate = totalIncome > 0 ? (netBalance / totalIncome) * 100.0 : 0.0;

        List<TransactionResponseDTO> recentTransactions = transactionRepository
                .findTop5ByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(txn -> {
                    TransactionResponseDTO dto = new TransactionResponseDTO();
                    dto.setId(txn.getId());
                    dto.setAmount(txn.getAmount());
                    dto.setCategory(txn.getCategory());
                    dto.setDescription(txn.getDescription());
                    dto.setType(txn.getType());
                    dto.setTimestamp(txn.getTimestamp());
                    return dto;
                })
                .collect(Collectors.toList());

        DashboardResponseDTO response = new DashboardResponseDTO();
        response.setTotalIncome(totalIncome);
        response.setTotalSpent(totalSpent);
        response.setNetBalance(netBalance);
        response.setSavingsRate(Math.round(savingsRate * 100.0) / 100.0);
        response.setTopCategory(topCategory);
        response.setCategoryBreakdown(categoryBreakdown);
        response.setRecentTransactions(recentTransactions);
        return response;
    }
}