import React, { useState, useEffect } from 'react';
import personalInfoService from '../services/personalInfoService';
import projectService from '../services/projectService';
import experienceService from '../services/experienceService';
import Loading from '../components/common/Loading';

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'about';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadData = async () => {
    try {
      const [infoResponse, projectsResponse, experiencesResponse] = await Promise.all([
        personalInfoService.getPersonalInfo(),
        projectService.getFeaturedProjects(),
        experienceService.getAllExperiences()
      ]);
      setPersonalInfo(infoResponse.data);
      setProjects(projectsResponse.data);
      setExperiences(experiencesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
      // Set fallback data if API fails
      setPersonalInfo({
        name: 'Your Name',
        title: 'Full Stack Developer',
        bio: 'Building elegant, accessible web experiences with a focus on clean design, robust functionality, and pixel-perfect execution.',
        email: 'your.email@example.com',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        resumeUrl: '/resume.pdf'
      });
      setProjects([]);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!personalInfo) {
    return (
      <div className="min-h-screen bg-dark-primary flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-cream font-mono text-lg">No data available</p>
          <p className="text-slate-400 mt-2">Please start the backend server</p>
        </div>
      </div>
    );
  }

  // Split bio into paragraphs if needed
  const bioText = personalInfo.bio || 'Building elegant, accessible web experiences with a focus on clean design, robust functionality, and pixel-perfect execution.';

  return (
    <>
      {/* Skip to Content Link (Accessibility) */}
      <a
        href="#main-content"
        className="absolute -left-full top-4 z-[100] px-6 py-3
                   bg-teal-accent text-dark-primary
                   font-mono font-bold text-sm uppercase tracking-widest
                   border-2 border-cream rounded-sm
                   focus:left-4 transition-all"
      >
        Skip to Content
      </a>

      {/* Main Container */}
      <div className="min-h-screen max-w-screen-xl mx-auto px-6 py-12 md:px-12 md:py-16 lg:py-0">
        {/* Two-Column Layout */}
        <div className="lg:flex lg:gap-12 lg:justify-between">

          {/* LEFT SIDEBAR (Sticky on Desktop) */}
          <aside className="lg:sticky lg:top-0 lg:w-[42%] lg:max-h-screen lg:flex lg:flex-col lg:justify-between lg:py-24">
            <div>
              {/* Name */}
              <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold text-cream tracking-tight">
                {personalInfo.name}
              </h1>

              {/* Job Title */}
              <h2 className="mt-3 font-mono text-lg sm:text-xl lg:text-2xl text-slate-300 tracking-tight">
                {personalInfo.title}
              </h2>

              {/* Tagline */}
              <p className="mt-6 max-w-sm text-base leading-relaxed">
                {bioText.split('\n')[0]}
              </p>

              {/* Desktop Navigation (Hidden on Mobile) */}
              <nav className="hidden lg:block mt-16" aria-label="In-page navigation">
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className={`nav-link group flex flex-col items-start py-3 transition-all ${activeSection === 'about' ? 'active' : ''}`}>
                      <span className="nav-indicator"></span>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-accent mt-1">
                        About
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#experience" className={`nav-link group flex flex-col items-start py-3 transition-all ${activeSection === 'experience' ? 'active' : ''}`}>
                      <span className="nav-indicator"></span>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-accent mt-1">
                        Experience
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className={`nav-link group flex flex-col items-start py-3 transition-all ${activeSection === 'projects' ? 'active' : ''}`}>
                      <span className="nav-indicator"></span>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-accent mt-1">
                        Projects
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className={`nav-link group flex flex-col items-start py-3 transition-all ${activeSection === 'contact' ? 'active' : ''}`}>
                      <span className="nav-indicator"></span>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-teal-accent mt-1">
                        Contact
                      </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <ul className="flex gap-6 mt-12 lg:mt-0" aria-label="Social media">
              {personalInfo.githubUrl && (
                <li>
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-cream transition-colors"
                    aria-label="GitHub (opens in new tab)"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              )}
              {personalInfo.linkedinUrl && (
                <li>
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-cream transition-colors"
                    aria-label="LinkedIn (opens in new tab)"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </li>
              )}
            </ul>
          </aside>

          {/* MAIN CONTENT (Scrollable) */}
          <main id="main-content" className="pt-16 lg:w-[58%] lg:py-24">

            {/* ABOUT SECTION */}
            <section id="about" className="mb-16 lg:mb-24 scroll-mt-16 lg:scroll-mt-24">
              {/* Mobile Section Header (Sticky) */}
              <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-4 w-screen bg-dark-primary/85 backdrop-blur-custom px-6 py-5 border-b-2 border-slate-700 md:-mx-12 md:px-12">
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-cream">
                  About
                </h2>
              </div>

              <div className="group/list">
                <p className="mb-4 text-base leading-relaxed">
                  {bioText}
                </p>
              </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="mb-16 lg:mb-24 scroll-mt-16 lg:scroll-mt-24">
              {/* Mobile Section Header (Sticky) */}
              <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-4 w-screen bg-dark-primary/85 backdrop-blur-custom px-6 py-5 border-b-2 border-slate-700 md:-mx-12 md:px-12">
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-cream">
                  Experience
                </h2>
              </div>

              <ol className="group/list space-y-12">
                {experiences.map(experience => (
                  <li key={experience.id}>
                    <div className="group relative grid grid-cols-1 sm:grid-cols-8 gap-4 sm:gap-6
                                p-6 lg:p-8
                                bg-dark-secondary border-2 border-cream rounded-sm
                                shadow-geometric-md
                                transition-all duration-200
                                hover:translate-x-[4px] hover:-translate-y-[4px]
                                hover:shadow-geometric-lg
                                hover:bg-dark-tertiary">

                      <header className="sm:col-span-2 mb-2 sm:mb-0">
                        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {experience.startDate} — {experience.endDate}
                        </p>
                      </header>

                      <div className="sm:col-span-6">
                        {experience.companyUrl ? (
                          <a
                            href={experience.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                          >
                            <h3 className="font-mono text-xl lg:text-2xl font-medium text-cream
                                         group-hover:text-teal-accent transition-colors">
                              {experience.title}
                              <svg className="inline-block w-5 h-5 ml-2 transition-transform
                                           group-hover:translate-x-1 group-hover:-translate-y-1"
                                   fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                              </svg>
                            </h3>
                          </a>
                        ) : (
                          <h3 className="font-mono text-xl lg:text-2xl font-medium text-cream">
                            {experience.title}
                          </h3>
                        )}

                        <p className="mt-1 text-sm font-medium text-slate-300">
                          {experience.company}
                        </p>

                        <p className="mt-3 text-sm leading-relaxed">
                          {experience.description}
                        </p>

                        {experience.technologies && (
                          <ul className="flex flex-wrap gap-2 mt-4" aria-label="Technologies used">
                            {experience.technologies.split(',').map((tech, index) => (
                              <li key={index} className="px-3 py-1 bg-teal-accent/10 border border-teal-accent rounded-sm
                                         text-xs font-medium text-teal-accent font-mono uppercase tracking-wide">
                                {tech.trim()}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              {personalInfo.resumeUrl && (
                <div className="mt-12">
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2
                           font-mono text-sm font-medium
                           text-slate-300 hover:text-teal-accent
                           border-b-2 border-transparent hover:border-teal-accent
                           transition-all duration-150"
                  >
                    View Full Resume
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1"
                         fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              )}
            </section>

            {/* PROJECTS SECTION */}
            <section id="projects" className="mb-16 lg:mb-24 scroll-mt-16 lg:scroll-mt-24">
              {/* Mobile Section Header (Sticky) */}
              <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-4 w-screen bg-dark-primary/85 backdrop-blur-custom px-6 py-5 border-b-2 border-slate-700 md:-mx-12 md:px-12">
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-cream">
                  Projects
                </h2>
              </div>

              <ol className="group/list space-y-12">
                {projects.map(project => (
                  <li key={project.id}>
                    <div className="group relative p-6 lg:p-8
                                bg-dark-secondary border-2 border-cream rounded-sm
                                shadow-geometric-md
                                transition-all duration-200
                                hover:translate-x-[4px] hover:-translate-y-[4px]
                                hover:shadow-geometric-lg
                                hover:bg-dark-tertiary">

                      <h3 className="font-mono text-xl lg:text-2xl font-medium text-cream
                                     group-hover:text-teal-accent transition-colors">
                        {project.title}
                        <svg className="inline-block w-5 h-5 ml-2 transition-transform
                                       group-hover:translate-x-1 group-hover:-translate-y-1"
                             fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed">
                        {project.shortDescription || project.description}
                      </p>

                      {project.technologies && (
                        <ul className="flex flex-wrap gap-2 mt-4" aria-label="Technologies used">
                          {project.technologies.split(',').map((tech, index) => (
                            <li key={index} className="px-3 py-1 bg-teal-accent/10 border border-teal-accent rounded-sm
                                       text-xs font-medium text-teal-accent font-mono uppercase tracking-wide">
                              {tech.trim()}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex gap-6 mt-4">
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
                            View Code
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
                              <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                              <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              {/* View Full Project Archive Link */}
              <div className="mt-12">
                <a
                  href="/projects-archive"
                  className="group inline-flex items-center gap-2
                         font-mono text-sm font-medium
                         text-slate-300 hover:text-teal-accent
                         border-b-2 border-transparent hover:border-teal-accent
                         transition-all duration-150"
                >
                  View Full Project Archive
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1"
                       fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="mb-16 lg:mb-24 scroll-mt-16 lg:scroll-mt-24">
              {/* Mobile Section Header (Sticky) */}
              <div className="lg:hidden sticky top-0 z-20 -mx-6 mb-4 w-screen bg-dark-primary/85 backdrop-blur-custom px-6 py-5 border-b-2 border-slate-700 md:-mx-12 md:px-12">
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-cream">
                  Contact
                </h2>
              </div>

              <div className="p-6 lg:p-8 bg-dark-secondary border-2 border-cream rounded-sm shadow-geometric-md">
                <h3 className="font-mono text-2xl font-medium text-cream mb-4">
                  Let's Connect
                </h3>

                <p className="text-base leading-relaxed mb-6">
                  I'm currently open to new opportunities and collaborations. Whether you have a
                  project in mind or just want to say hello, feel free to reach out!
                </p>

                <div className="space-y-4">
                  {personalInfo.email && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-teal-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                      </svg>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-slate-300 hover:text-teal-accent transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  )}

                  {personalInfo.githubUrl && (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-teal-accent" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <a
                        href={personalInfo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-teal-accent transition-colors"
                      >
                        {personalInfo.githubUrl.replace('https://github.com/', 'github.com/')}
                      </a>
                    </div>
                  )}
                </div>

                {personalInfo.email && (
                  <div className="mt-8">
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="font-mono text-base font-medium
                                 inline-block px-8 py-4
                                 bg-teal-accent text-dark-primary
                                 border-2 border-cream rounded-sm
                                 shadow-geometric-btn
                                 transition-all duration-200
                                 hover:translate-x-[6px] hover:-translate-y-[6px]
                                 hover:shadow-geometric-btn-hover
                                 active:translate-x-0 active:translate-y-0 active:shadow-none
                                 active:bg-blue-active"
                    >
                      Get in Touch
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-12 pb-6 text-center">
              <p className="text-sm text-slate-500">
                Built with React, Spring Boot & Tailwind CSS. Designed with geometric precision.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                © 2025 {personalInfo.name}. All rights reserved.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
