package com.fintech.backend.dto;


import java.time.LocalDate;

public class GoalRequestDTO {
    public String name;
    public String category;
    public Double targetAmount;
    public Double currentAmount;
    public Double monthlyTarget;
    public String priority;
    public LocalDate deadline;
    public Long userId;
}