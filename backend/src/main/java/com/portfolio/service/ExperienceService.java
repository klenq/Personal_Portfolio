package com.portfolio.service;

import com.portfolio.model.Experience;
import com.portfolio.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc();
    }

    public List<Experience> getExperiencesByStatus(String status) {
        return experienceRepository.findByStatus(status);
    }

    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public Experience updateExperience(Long id, Experience experienceDetails) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found with id: " + id));

        experience.setTitle(experienceDetails.getTitle());
        experience.setCompany(experienceDetails.getCompany());
        experience.setStartDate(experienceDetails.getStartDate());
        experience.setEndDate(experienceDetails.getEndDate());
        experience.setDescription(experienceDetails.getDescription());
        experience.setTechnologies(experienceDetails.getTechnologies());
        experience.setCompanyUrl(experienceDetails.getCompanyUrl());
        experience.setDisplayOrder(experienceDetails.getDisplayOrder());
        experience.setStatus(experienceDetails.getStatus());

        return experienceRepository.save(experience);
    }

    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}
