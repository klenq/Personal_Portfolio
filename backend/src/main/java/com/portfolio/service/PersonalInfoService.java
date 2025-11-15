package com.portfolio.service;

import com.portfolio.model.PersonalInfo;
import com.portfolio.repository.PersonalInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalInfoService {
    
    @Autowired
    private PersonalInfoRepository personalInfoRepository;
    
    public Optional<PersonalInfo> getPersonalInfo() {
        List<PersonalInfo> infoList = personalInfoRepository.findAll();
        return infoList.isEmpty() ? Optional.empty() : Optional.of(infoList.get(0));
    }
    
    public PersonalInfo saveOrUpdatePersonalInfo(PersonalInfo personalInfo) {
        List<PersonalInfo> existing = personalInfoRepository.findAll();
        if (!existing.isEmpty()) {
            personalInfo.setId(existing.get(0).getId());
        }
        return personalInfoRepository.save(personalInfo);
    }
}