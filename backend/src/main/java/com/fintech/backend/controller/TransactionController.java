package com.fintech.backend.controller;

import com.fintech.backend.dto.TransactionRequestDTO;
import com.fintech.backend.dto.TransactionResponseDTO;
import com.fintech.backend.dto.TransactionUpdateDTO;
import com.fintech.backend.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public TransactionResponseDTO addTransaction(@RequestBody TransactionRequestDTO dto) {
        return transactionService.addTransaction(dto);
    }

    @GetMapping("/{userId}")
    public List<TransactionResponseDTO> getAllByUser(@PathVariable Long userId) {
        return transactionService.getAllTransactions(userId);
    }

    @GetMapping("/detail/{id}")
    public TransactionResponseDTO getById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }

    @PutMapping("/{id}")
    public TransactionResponseDTO updateTransaction(
            @PathVariable Long id,
            @RequestBody TransactionUpdateDTO dto) {
        return transactionService.updateTransaction(id, dto);
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return "Deleted successfully";
    }
}