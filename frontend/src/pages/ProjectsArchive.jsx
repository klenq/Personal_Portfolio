import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';
import Loading from '../components/common/Loading';

const ProjectsArchive = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProjects();
  }, []);

  const loadAllProjects = async () => {
    try {
      const response = await projectService.getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Set fallback sample projects if API fails
      setProjects([
        {
          id: 1,
          title: 'Sample Project 1',
          shortDescription: 'A sample project to demonstrate the archive layout.',
          technologies: 'React, Node.js, MongoDB',
          githubUrl: 'https://github.com',
          demoUrl: 'https://example.com',
          featured: true
        },
        {
          id: 2,
          title: 'Sample Project 2',
          shortDescription: 'Another sample project for the archive.',
          technologies: 'Vue.js, Express, PostgreSQL',
          projectUrl: 'https://example.com',
          featured: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-primary/95 backdrop-blur-custom border-b-2 border-slate-700">
        <div className="max-w-screen-xl mx-auto px-6 py-6 md:px-12">
          <div className="flex items-center justify-between">
            <h1 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-cream tracking-tight">
              Project Archive
            </h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2
                       font-mono text-sm font-medium
                       text-slate-300 hover:text-teal-accent
                       border-2 border-slate-600 hover:border-teal-accent
                       rounded-sm transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-16">
        <div className="mb-8">
          <p className="text-base text-slate-400 leading-relaxed max-w-3xl">
            A comprehensive collection of all projects I've worked on. From personal experiments to
            professional work, each project represents a step in my journey as a developer.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-sm text-slate-500">
              Total Projects: <span className="text-teal-accent font-mono font-semibold">{projects.length}</span>
            </span>
            <span className="text-sm text-slate-500">
              Featured: <span className="text-teal-accent font-mono font-semibold">
                {projects.filter(p => p.featured).length}
              </span>
            </span>
          </div>
        </div>

        {/* Projects Table/Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-slate-400 font-mono">No projects found</p>
            <p className="text-slate-500 text-sm mt-2">Start the backend server to load your projects</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="hidden lg:table w-full border-2 border-cream rounded-sm shadow-geometric-md">
              <thead>
                <tr className="bg-dark-secondary border-b-2 border-cream">
                  <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                    Built With
                  </th>
                  <th className="px-6 py-4 text-left font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                    Links
                  </th>
                </tr>
              </thead>
              <tbody className="bg-dark-secondary">
                {projects.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`group border-b-2 border-slate-700 transition-all duration-200
                              hover:bg-dark-tertiary ${index === projects.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <td className="px-6 py-4 font-mono text-sm text-slate-500 whitespace-nowrap">
                      {new Date().getFullYear()}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-mono text-lg font-medium text-cream group-hover:text-teal-accent transition-colors">
                          {project.title}
                          {project.featured && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-bold bg-yellow-accent/20 border border-yellow-accent text-yellow-accent rounded-sm">
                              FEATURED
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                          {project.shortDescription || project.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.split(',').slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-teal-accent/10 border border-teal-accent/30 rounded-sm
                                       text-xs font-medium text-teal-accent font-mono"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                          {project.technologies.split(',').length > 3 && (
                            <span className="px-2 py-1 text-xs text-slate-500 font-mono">
                              +{project.technologies.split(',').length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-teal-accent transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {(project.demoUrl || project.projectUrl) && (
                          <a
                            href={project.demoUrl || project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-teal-accent transition-colors"
                            aria-label="Live Demo"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group p-6 bg-dark-secondary border-2 border-cream rounded-sm
                           shadow-geometric-md transition-all duration-200
                           hover:translate-x-[4px] hover:-translate-y-[4px]
                           hover:shadow-geometric-lg hover:bg-dark-tertiary"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-mono text-xl font-medium text-cream group-hover:text-teal-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-bold bg-yellow-accent/20 border border-yellow-accent text-yellow-accent rounded-sm whitespace-nowrap">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {project.shortDescription || project.description}
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.split(',').map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-teal-accent/10 border border-teal-accent/30 rounded-sm
                                   text-xs font-medium text-teal-accent font-mono"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-6">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-teal-accent transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                    )}
                    {(project.demoUrl || project.projectUrl) && (
                      <a
                        href={project.demoUrl || project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-teal-accent transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-12 border-t-2 border-slate-700 text-center">
          <p className="text-sm text-slate-500">
            Showing all {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default ProjectsArchive;
