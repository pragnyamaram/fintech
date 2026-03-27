package com.fintech.backend.service;

import com.fintech.backend.dto.AIAnalysisRequestDTO;
import com.fintech.backend.dto.AIAnalysisResponseDTO;
import com.fintech.backend.dto.TransactionResponseDTO;
import com.fintech.backend.model.User;
import com.fintech.backend.repository.TransactionRepository;
import com.fintech.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
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

        // 🔥 STEP 1: Get user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 STEP 2: Get transactions
        List<TransactionResponseDTO> transactions =
                transactionRepository.findByUserId(userId)
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

        // 🔥 STEP 3: Build request
        AIAnalysisRequestDTO request = new AIAnalysisRequestDTO();
        request.setUserId(userId);
        request.setSalary(user.getSalary());
        request.setTransactions(transactions);

        System.out.println("Sending to AI: " + request);

        // 🔥 STEP 4: CALL FASTAPI
        AIAnalysisResponseDTO response =
                restTemplate.postForObject(aiUrl, request, AIAnalysisResponseDTO.class);

        System.out.println("AI Response: " + response);

        return response;
    }
}