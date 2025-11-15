import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="project-image" />
      )}
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-description">{project.shortDescription}</p>
        <div className="project-technologies">
          {project.technologies && project.technologies.split(',').map((tech, index) => (
            <span key={index} className="tech-tag">{tech.trim()}</span>
          ))}
        </div>
        <div className="project-links">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaGithub /> Code
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaExternalLinkAlt /> Demo
            </a>
          )}
          {project.projectUrl && !project.demoUrl && (
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
              <FaExternalLinkAlt /> Visit
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;