package com.fintech.backend.controller;

import com.fintech.backend.dto.AIAnalysisResponseDTO;
import com.fintech.backend.service.AIService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze/{userId}")
    public AIAnalysisResponseDTO analyze(@PathVariable Long userId) {
        return aiService.analyze(userId);
    }
}