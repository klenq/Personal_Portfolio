package com.portfolio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public Map<String, Object> welcome() {
        Map<String, Object> response = new HashMap<>();
        response.put("application", "Portfolio Backend API");
        response.put("version", "1.0.0");
        response.put("status", "running");

        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("Personal Info (Public)", "GET /api/public/personal-info");
        endpoints.put("Projects (Public)", "GET /api/public/projects");
        endpoints.put("Featured Projects (Public)", "GET /api/public/projects/featured");
        endpoints.put("Login", "POST /api/auth/login");
        endpoints.put("Update Personal Info (Admin)", "POST /api/admin/personal-info");
        endpoints.put("Create Project (Admin)", "POST /api/admin/projects");
        endpoints.put("Update Project (Admin)", "PUT /api/admin/projects/{id}");
        endpoints.put("Delete Project (Admin)", "DELETE /api/admin/projects/{id}");
        endpoints.put("H2 Console", "GET /h2-console");

        response.put("availableEndpoints", endpoints);

        Map<String, String> authentication = new HashMap<>();
        authentication.put("defaultUsername", "admin");
        authentication.put("defaultPassword", "admin123");
        authentication.put("note", "Use POST /api/auth/login to get JWT token for admin endpoints");

        response.put("authentication", authentication);

        return response;
    }
}
