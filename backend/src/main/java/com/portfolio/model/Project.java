package com.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 500)
    private String shortDescription;
    
    @Column(length = 500)
    private String technologies;
    
    @Column(length = 500)
    private String imageUrl;
    
    @Column(length = 500)
    private String projectUrl;
    
    @Column(length = 500)
    private String githubUrl;
    
    @Column(length = 500)
    private String demoUrl;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    @Column(length = 50)
    private String status = "active";
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}