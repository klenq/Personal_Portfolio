package com.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "personal_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 255)
    private String name;
    
    @Column(length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(columnDefinition = "TEXT")
    private String about;

    @Column(length = 255)
    private String email;
    
    @Column(length = 50)
    private String phone;
    
    @Column(length = 500)
    private String linkedinUrl;
    
    @Column(length = 500)
    private String githubUrl;
    
    @Column(length = 500)
    private String profileImageUrl;
    
    @Column(length = 500)
    private String resumeUrl;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}