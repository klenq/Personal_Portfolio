package com.portfolio.controller;

import com.portfolio.model.Project;
import com.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    // Public endpoints
    @GetMapping("/public/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }
    
    @GetMapping("/public/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/public/projects/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        return ResponseEntity.ok(projectService.getFeaturedProjects());
    }
    
    // Admin endpoints
    @PostMapping("/admin/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.ok(projectService.createProject(project));
    }
    
    @PutMapping("/admin/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
        return ResponseEntity.ok(projectService.updateProject(id, project));
    }
    
    @DeleteMapping("/admin/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }
}