package com.fintech.backend.controller;

import com.fintech.backend.dto.DashboardResponseDTO;
import com.fintech.backend.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{userId}")
    public DashboardResponseDTO getDashboard(@PathVariable Long userId) {
        return dashboardService.getDashboard(userId);
    }
}