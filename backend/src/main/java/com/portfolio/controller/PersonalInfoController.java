package com.portfolio.controller;

import com.portfolio.model.PersonalInfo;
import com.portfolio.service.PersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PersonalInfoController {
    
    @Autowired
    private PersonalInfoService personalInfoService;
    
    @GetMapping("/public/personal-info")
    public ResponseEntity<PersonalInfo> getPersonalInfo() {
        return personalInfoService.getPersonalInfo()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/admin/personal-info")
    public ResponseEntity<PersonalInfo> saveOrUpdatePersonalInfo(@RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(personalInfoService.saveOrUpdatePersonalInfo(personalInfo));
    }
}