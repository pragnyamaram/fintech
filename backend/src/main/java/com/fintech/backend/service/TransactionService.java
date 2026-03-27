package com.fintech.backend.service;

import com.fintech.backend.dto.TransactionRequestDTO;
import com.fintech.backend.dto.TransactionResponseDTO;
import com.fintech.backend.dto.TransactionUpdateDTO;
import com.fintech.backend.exception.ResourceNotFoundException;
import com.fintech.backend.model.Transaction;
import com.fintech.backend.model.User;
import com.fintech.backend.repository.TransactionRepository;
import com.fintech.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public TransactionResponseDTO addTransaction(TransactionRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Transaction transaction = new Transaction();
        transaction.setAmount(dto.getAmount());
        transaction.setCategory(dto.getCategory());
        transaction.setDescription(dto.getDescription());
        transaction.setType(dto.getType() == null ? "DEBIT" : dto.getType().toUpperCase());
        transaction.setTimestamp(LocalDateTime.now());
        transaction.setUser(user);

        Transaction saved = transactionRepository.save(transaction);
        return mapToDTO(saved);
    }

    public List<TransactionResponseDTO> getAllTransactions(Long userId) {
        return transactionRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public TransactionResponseDTO getTransactionById(Long id) {
        Transaction txn = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        return mapToDTO(txn);
    }

    public TransactionResponseDTO updateTransaction(Long id, TransactionUpdateDTO dto) {
        Transaction txn = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        txn.setAmount(dto.getAmount());
        txn.setCategory(dto.getCategory());
        txn.setDescription(dto.getDescription());
        if (dto.getType() != null) {
            txn.setType(dto.getType().toUpperCase());
        }

        Transaction updated = transactionRepository.save(txn);
        return mapToDTO(updated);
    }

    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Transaction not found");
        }
        transactionRepository.deleteById(id);
    }

    public List<TransactionResponseDTO> getRecentTransactions(Long userId) {
        return transactionRepository.findTop5ByUserIdOrderByTimestampDesc(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private TransactionResponseDTO mapToDTO(Transaction txn) {
        TransactionResponseDTO dto = new TransactionResponseDTO();
        dto.setId(txn.getId());
        dto.setAmount(txn.getAmount());
        dto.setCategory(txn.getCategory());
        dto.setDescription(txn.getDescription());
        dto.setType(txn.getType());
        dto.setTimestamp(txn.getTimestamp());
        return dto;
    }
}