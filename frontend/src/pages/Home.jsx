import React, { useState, useEffect } from 'react';
import Hero from '../components/portfolio/Hero';
import ProjectCard from '../components/portfolio/ProjectCard';
import Loading from '../components/common/Loading';
import projectService from '../services/projectService';
import './Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    try {
      const response = await projectService.getFeaturedProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Hero />
      <section className="featured-projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
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
      </section>
    </div>
  );
};

export default Home;