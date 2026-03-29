package com.fintech.backend.controller;

import com.fintech.backend.dto.*;
import com.fintech.backend.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")
public class GoalController {

    private final GoalService service;

    public GoalController(GoalService service) {
        this.service = service;
    }

    @PostMapping
    public GoalResponseDTO create(@RequestBody GoalRequestDTO dto) {
        return service.createGoal(dto);
    }

    @GetMapping("/{userId}")
    public List<GoalResponseDTO> getGoals(@PathVariable Long userId) {
        return service.getGoals(userId);
    }

    @PutMapping("/{id}/add")
    public GoalResponseDTO addProgress(
            @PathVariable Long id,
            @RequestParam Double amount
    ) {
        return service.addProgress(id, amount);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteGoal(id);
    }
}