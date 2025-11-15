package com.portfolio.config;

import com.portfolio.model.PersonalInfo;
import com.portfolio.model.Project;
import com.portfolio.model.User;
import com.portfolio.repository.PersonalInfoRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private PersonalInfoRepository personalInfoRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@portfolio.com");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin user created: username=admin, password=admin123");
        }
        
        // Create sample personal info if not exists
        if (personalInfoRepository.findAll().isEmpty()) {
            PersonalInfo info = new PersonalInfo();
            info.setName("Jianyu Qiu");
            info.setTitle("Full Stack Developer");
            info.setBio("Experienced Full-stack developer with 2+ years of expertise in Java, python and React.js. Passionate about building scalable web applications and learning new tech.");
            info.setEmail("kalen.career.03@gmail.com");
            info.setPhone("+1 ((555) 123-4567)");
            info.setLinkedinUrl("https://www.linkedin.com/in/jianyu-qiu/");
            info.setGithubUrl("https://github.com/klenq");
            info.setProfileImageUrl("https://via.placeholder.com/300");
            personalInfoRepository.save(info);
            System.out.println("Default personal info created");
        }
        
        // Create sample projects if not exists
        if (projectRepository.findAll().isEmpty()) {
            Project project1 = new Project();
            project1.setTitle("E-Commerce Platform");
            project1.setShortDescription("Full-stack e-commerce solution with payment integration");
            project1.setDescription("A comprehensive e-commerce platform built with Spring Boot and React. Features include user authentication, product management, shopping cart, payment integration with Stripe, and admin dashboard.");
            project1.setTechnologies("Java, Spring Boot, React, PostgreSQL, Redis, Stripe API");
            project1.setImageUrl("https://via.placeholder.com/600x400");
            project1.setGithubUrl("https://github.com/klenq/ecommerce");
            project1.setDemoUrl("https://demo-ecommerce.example.com");
            project1.setDisplayOrder(1);
            project1.setIsFeatured(true);
            project1.setStatus("active");
            projectRepository.save(project1);
            
            Project project2 = new Project();
            project2.setTitle("Task Management System");
            project2.setShortDescription("Collaborative project management tool");
            project2.setDescription("A task management application similar to Trello, featuring drag-and-drop functionality, real-time updates using WebSockets, team collaboration, and progress tracking.");
            project2.setTechnologies("Java, Spring Boot, React, WebSocket, MongoDB");
            project2.setImageUrl("https://via.placeholder.com/600x400");
            project2.setGithubUrl("https://github.com/klenq/taskmanager");
            project2.setProjectUrl("https://taskmanager.example.com");
            project2.setDisplayOrder(2);
            project2.setIsFeatured(true);
            project2.setStatus("active");
            projectRepository.save(project2);
            
            Project project3 = new Project();
            project3.setTitle("Social Media Analytics Dashboard");
            project3.setShortDescription("Real-time analytics for social media platforms");
            project3.setDescription("An analytics dashboard that aggregates data from multiple social media platforms, providing insights on engagement, reach, and audience demographics with beautiful data visualizations.");
            project3.setTechnologies("React, D3.js, Node.js, Express, Twitter API, Instagram API");
            project3.setImageUrl("https://via.placeholder.com/600x400");
            project3.setGithubUrl("https://github.com/klenq/social-analytics");
            project3.setDisplayOrder(3);
            project3.setIsFeatured(false);
            project3.setStatus("active");
            projectRepository.save(project3);
            
            System.out.println("Sample projects created");
        }
    }
}