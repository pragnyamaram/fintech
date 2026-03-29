package com.fintech.backend.service;

import com.fintech.backend.dto.*;
import com.fintech.backend.model.Goal;
import com.fintech.backend.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoalService {

    private final GoalRepository repo;

    public GoalService(GoalRepository repo) {
        this.repo = repo;
    }

    public GoalResponseDTO createGoal(GoalRequestDTO dto) {
        Goal g = new Goal();

        g.setName(dto.name);
        g.setCategory(dto.category);
        g.setTargetAmount(dto.targetAmount);
        g.setCurrentAmount(dto.currentAmount);
        g.setMonthlyTarget(dto.monthlyTarget);
        g.setPriority(dto.priority);
        g.setDeadline(dto.deadline);
        g.setUserId(dto.userId);

        return map(repo.save(g));
    }

    public List<GoalResponseDTO> getGoals(Long userId) {
        return repo.findByUserId(userId)
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    public GoalResponseDTO addProgress(Long id, Double amount) {
        Goal g = repo.findById(id).orElseThrow();
        g.setCurrentAmount(g.getCurrentAmount() + amount);
        return map(repo.save(g));
    }

    public void deleteGoal(Long id) {
        repo.deleteById(id);
    }

    private GoalResponseDTO map(Goal g) {
        GoalResponseDTO dto = new GoalResponseDTO();
        dto.id = g.getId();
        dto.name = g.getName();
        dto.category = g.getCategory();
        dto.targetAmount = g.getTargetAmount();
        dto.currentAmount = g.getCurrentAmount();
        dto.monthlyTarget = g.getMonthlyTarget();
        dto.priority = g.getPriority();
        dto.deadline = g.getDeadline();
        return dto;
    }
}