import React, { useState, useEffect } from 'react';
import personalInfoService from '../../services/personalInfoService';
import './Hero.css';

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      const response = await personalInfoService.getPersonalInfo();
      setPersonalInfo(response.data);
    } catch (error) {
      console.error('Error loading personal info:', error);
    }
  };

  if (!personalInfo) return null;

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{personalInfo.name}</h1>
        <h2>{personalInfo.title}</h2>
        <p>{personalInfo.bio}</p>
        <div className="hero-links">
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              LinkedIn
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              GitHub
            </a>
          )}
          {personalInfo.resumeUrl && (
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Resume
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;