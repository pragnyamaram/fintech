// package com.fintech.backend.service;

// import com.fintech.backend.dto.AIAnalysisRequestDTO;
// import com.fintech.backend.dto.AIAnalysisResponseDTO;
// import com.fintech.backend.dto.TransactionResponseDTO;
// import com.fintech.backend.model.Transaction;
// import com.fintech.backend.model.User;
// import com.fintech.backend.repository.TransactionRepository;
// import com.fintech.backend.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import java.util.*;
// import java.util.stream.Collectors;

// @Service
// public class AIService {

//     private final UserRepository userRepository;
//     private final TransactionRepository transactionRepository;
//     private final RestTemplate restTemplate;

//     @Value("${ai.service.url}")
//     private String aiUrl;

//     public AIService(UserRepository userRepository,
//                      TransactionRepository transactionRepository,
//                      RestTemplate restTemplate) {
//         this.userRepository = userRepository;
//         this.transactionRepository = transactionRepository;
//         this.restTemplate = restTemplate;
//     }

//     public AIAnalysisResponseDTO analyze(Long userId) {
//         User user = userRepository.findById(userId)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         List<TransactionResponseDTO> transactions =
//                 transactionRepository.findByUserId(userId)
//                         .stream()
//                         .map(txn -> {
//                             TransactionResponseDTO dto = new TransactionResponseDTO();
//                             dto.setAmount(txn.getAmount());
//                             dto.setCategory(txn.getCategory());
//                             dto.setType(txn.getType());
//                             dto.setDescription(txn.getDescription());
//                             return dto;
//                         })
//                         .collect(Collectors.toList());

//         AIAnalysisRequestDTO request = new AIAnalysisRequestDTO();
//         request.setUserId(userId);
//         request.setSalary(user.getSalary());
//         request.setTransactions(transactions);

//         return restTemplate.postForObject(aiUrl, request, AIAnalysisResponseDTO.class);
//     }

//     public String chat(Long userId, String message) {
//         User user = userRepository.findById(userId)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         List<Transaction> txns = transactionRepository.findByUserId(userId);

//         double totalIncome = 0.0;
//         double totalSpent = 0.0;
//         Map<String, Double> categoryBreakdown = new HashMap<>();
//         List<Map<String, Object>> recent = new ArrayList<>();

//         for (Transaction t : txns) {
//             String type = t.getType() == null ? "DEBIT" : t.getType().toUpperCase();
//             double amount = t.getAmount() == null ? 0.0 : t.getAmount();
//             String category = t.getCategory() == null ? "other" : t.getCategory();

//             Map<String, Object> row = new HashMap<>();
//             row.put("amount", amount);
//             row.put("category", category);
//             row.put("description", t.getDescription());
//             row.put("type", type);
//             row.put("timestamp", t.getTimestamp());
//             recent.add(row);

//             if ("CREDIT".equals(type)) {
//                 totalIncome += amount;
//             } else {
//                 totalSpent += amount;
//                 categoryBreakdown.put(category, categoryBreakdown.getOrDefault(category, 0.0) + amount);
//             }
//         }

//         String topCategory = categoryBreakdown.entrySet().stream()
//                 .max(Map.Entry.comparingByValue())
//                 .map(Map.Entry::getKey)
//                 .orElse("none");

//         Map<String, Object> financeContext = new HashMap<>();
//         financeContext.put("salary", user.getSalary());
//         financeContext.put("totalIncome", totalIncome);
//         financeContext.put("totalSpent", totalSpent);
//         financeContext.put("netBalance", totalIncome - totalSpent);
//         financeContext.put("topCategory", topCategory);
//         financeContext.put("categoryBreakdown", categoryBreakdown);
//         financeContext.put("recentTransactions", recent.stream().limit(8).toList());

//         Map<String, Object> req = new HashMap<>();
//         req.put("userId", userId);
//         req.put("message", message);
//         req.put("financeContext", financeContext);

//         Map response = restTemplate.postForObject(
//                 "http://localhost:8000/chat",
//                 req,
//                 Map.class
//         );

//         if (response == null || response.get("reply") == null) {
//             return "No reply from AI.";
//         }
//         return response.get("reply").toString();
//     }
// }

package com.fintech.backend.service;

import com.fintech.backend.dto.AIAnalysisRequestDTO;
import com.fintech.backend.dto.AIAnalysisResponseDTO;
import com.fintech.backend.dto.TransactionResponseDTO;
import com.fintech.backend.model.Transaction;
import com.fintech.backend.model.User;
import com.fintech.backend.repository.TransactionRepository;
import com.fintech.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiUrl;

    public AIService(UserRepository userRepository,
                     TransactionRepository transactionRepository,
                     RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.restTemplate = restTemplate;
    }

    public AIAnalysisResponseDTO analyze(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<TransactionResponseDTO> transactions = transactionRepository.findByUserId(userId)
                .stream()
                .map(txn -> {
                    TransactionResponseDTO dto = new TransactionResponseDTO();
                    dto.setAmount(txn.getAmount());
                    dto.setCategory(txn.getCategory());
                    dto.setType(txn.getType());
                    dto.setDescription(txn.getDescription());
                    return dto;
                })
                .collect(Collectors.toList());

        AIAnalysisRequestDTO request = new AIAnalysisRequestDTO();
        request.setUserId(userId);
        request.setSalary(user.getSalary());
        request.setTransactions(transactions);

        return restTemplate.postForObject(aiUrl, request, AIAnalysisResponseDTO.class);
    }

    public String chat(Long userId, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> txns = transactionRepository.findByUserId(userId);

        double totalIncome = 0.0;
        double totalSpent = 0.0;
        Map<String, Double> categoryBreakdown = new HashMap<>();
        List<Map<String, Object>> recent = new ArrayList<>();

        for (Transaction t : txns) {
            String type = t.getType() == null ? "DEBIT" : t.getType().toUpperCase();
            double amount = t.getAmount() == null ? 0.0 : t.getAmount();
            String category = t.getCategory() == null ? "other" : t.getCategory();

            Map<String, Object> row = new HashMap<>();
            row.put("amount", amount);
            row.put("category", category);
            row.put("description", t.getDescription());
            row.put("type", type);
            row.put("timestamp", t.getTimestamp());
            recent.add(row);

            if ("CREDIT".equals(type)) {
                totalIncome += amount;
            } else {
                totalSpent += amount;
                categoryBreakdown.put(category, categoryBreakdown.getOrDefault(category, 0.0) + amount);
            }
        }

        String topCategory = categoryBreakdown.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("none");

        Map<String, Object> financeContext = new HashMap<>();
        financeContext.put("salary", user.getSalary());
        financeContext.put("totalIncome", totalIncome);
        financeContext.put("totalSpent", totalSpent);
        financeContext.put("netBalance", totalIncome - totalSpent);
        financeContext.put("topCategory", topCategory);
        financeContext.put("categoryBreakdown", categoryBreakdown);
        financeContext.put("recentTransactions", recent.stream().limit(8).collect(Collectors.toList()));

        Map<String, Object> req = new HashMap<>();
        req.put("userId", userId);
        req.put("message", message);
        req.put("financeContext", financeContext);

        Map<?, ?> response = restTemplate.postForObject(
                "http://localhost:8000/chat",
                req,
                Map.class
        );

        if (response == null || response.get("reply") == null) {
            return "No reply from AI.";
        }

        return response.get("reply").toString();
    }
}