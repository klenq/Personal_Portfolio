import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/portfolio/ProjectCard';
import Loading from '../components/common/Loading';
import projectService from '../services/projectService';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectService.getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>All Projects</h1>
        <p>Browse through my complete portfolio of projects</p>
      </div>
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;