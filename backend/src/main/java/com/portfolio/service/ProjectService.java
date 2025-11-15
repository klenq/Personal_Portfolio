package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    public List<Project> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc();
    }
    
    public List<Project> getFeaturedProjects() {
        return projectRepository.findByIsFeaturedTrue();
    }
    
    public List<Project> getProjectsByStatus(String status) {
        return projectRepository.findByStatus(status);
    }
    
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    
    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        
        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setShortDescription(projectDetails.getShortDescription());
        project.setTechnologies(projectDetails.getTechnologies());
        project.setImageUrl(projectDetails.getImageUrl());
        project.setProjectUrl(projectDetails.getProjectUrl());
        project.setGithubUrl(projectDetails.getGithubUrl());
        project.setDemoUrl(projectDetails.getDemoUrl());
        project.setDisplayOrder(projectDetails.getDisplayOrder());
        project.setIsFeatured(projectDetails.getIsFeatured());
        project.setStatus(projectDetails.getStatus());
        
        return projectRepository.save(project);
    }
    
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}