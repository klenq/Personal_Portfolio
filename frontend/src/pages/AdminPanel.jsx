import React, { useState, useEffect } from 'react';
import ProjectForm from '../components/admin/ProjectForm';
import ExperienceForm from '../components/admin/ExperienceForm';
import PersonalInfoForm from '../components/admin/PersonalInfoForm';
import Loading from '../components/common/Loading';
import projectService from '../services/projectService';
import experienceService from '../services/experienceService';
import personalInfoService from '../services/personalInfoService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    loadProjects();
    loadExperiences();
    loadPersonalInfo();
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

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleSubmitProject = async (projectData) => {
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, projectData);
      } else {
        await projectService.createProject(projectData);
      }
      setShowForm(false);
      setEditingProject(null);
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
    setEditingExperience(null);
  };

  const loadExperiences = async () => {
    try {
      const response = await experienceService.getAllExperiences();
      setExperiences(response.data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    setShowForm(true);
  };

  const handleEditExperience = (experience) => {
    setEditingExperience(experience);
    setShowForm(true);
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceService.deleteExperience(id);
        loadExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Failed to delete experience');
      }
    }
  };

  const handleSubmitExperience = async (experienceData) => {
    try {
      if (editingExperience) {
        await experienceService.updateExperience(editingExperience.id, experienceData);
      } else {
        await experienceService.createExperience(experienceData);
      }
      setShowForm(false);
      setEditingExperience(null);
      loadExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to save experience');
    }
  };

  const loadPersonalInfo = async () => {
    try {
      const response = await personalInfoService.getPersonalInfo();
      setPersonalInfo(response.data);
    } catch (error) {
      console.error('Error loading personal info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPersonalInfo = () => {
    setShowForm(true);
  };

  const handleSubmitPersonalInfo = async (infoData) => {
    try {
      await personalInfoService.saveOrUpdatePersonalInfo(infoData);
      setShowForm(false);
      loadPersonalInfo();
      alert('Personal information updated successfully!');
    } catch (error) {
      console.error('Error saving personal info:', error);
      alert('Failed to save personal information');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <div className="tab-buttons">
            <button
              onClick={() => {
                setActiveTab('personal-info');
                setShowForm(false);
                setEditingProject(null);
                setEditingExperience(null);
              }}
              className={`tab-btn ${activeTab === 'personal-info' ? 'active' : ''}`}
            >
              Personal Info
            </button>
            <button
              onClick={() => {
                setActiveTab('projects');
                setShowForm(false);
                setEditingProject(null);
                setEditingExperience(null);
              }}
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            >
              Projects
            </button>
            <button
              onClick={() => {
                setActiveTab('experiences');
                setShowForm(false);
                setEditingProject(null);
                setEditingExperience(null);
              }}
              className={`tab-btn ${activeTab === 'experiences' ? 'active' : ''}`}
            >
              Experiences
            </button>
          </div>
          {activeTab !== 'personal-info' && (
            <button
              onClick={activeTab === 'projects' ? handleAddProject : handleAddExperience}
              className="btn-add"
            >
              Add New {activeTab === 'projects' ? 'Project' : 'Experience'}
            </button>
          )}
        </div>

        {showForm && activeTab === 'personal-info' && (
          <PersonalInfoForm
            personalInfo={personalInfo}
            onSubmit={handleSubmitPersonalInfo}
            onCancel={handleCancel}
          />
        )}

        {showForm && activeTab === 'projects' && (
          <ProjectForm
            project={editingProject}
            onSubmit={handleSubmitProject}
            onCancel={handleCancel}
          />
        )}

        {showForm && activeTab === 'experiences' && (
          <ExperienceForm
            experience={editingExperience}
            onSubmit={handleSubmitExperience}
            onCancel={handleCancel}
          />
        )}

        {activeTab === 'personal-info' && (
          <div className="projects-table">
            <div className="personal-info-header">
              <h2>Personal Information</h2>
              <button onClick={handleEditPersonalInfo} className="btn-add">
                Edit Personal Info
              </button>
            </div>
            {personalInfo && !showForm && (
              <div className="personal-info-display">
                <div className="info-section">
                  <h3>Basic Information</h3>
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{personalInfo.name || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Title:</span>
                    <span className="info-value">{personalInfo.title || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Bio:</span>
                    <span className="info-value">{personalInfo.bio || 'Not set'}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>Contact Information</h3>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{personalInfo.email || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{personalInfo.phone || 'Not set'}</span>
                  </div>
                </div>

                <div className="info-section">
                  <h3>Links & URLs</h3>
                  <div className="info-row">
                    <span className="info-label">LinkedIn:</span>
                    <span className="info-value">{personalInfo.linkedinUrl || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">GitHub:</span>
                    <span className="info-value">{personalInfo.githubUrl || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Profile Image:</span>
                    <span className="info-value">{personalInfo.profileImageUrl || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Resume:</span>
                    <span className="info-value">{personalInfo.resumeUrl || 'Not set'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="projects-table">
            <h2>Manage Projects</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Technologies</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>{project.technologies}</td>
                    <td>
                      <span className={`status-badge ${project.status}`}>
                        {project.status}
                      </span>
                    </td>
                    <td>{project.isFeatured ? '⭐' : '-'}</td>
                    <td className="actions">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="btn-icon btn-delete"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'experiences' && (
          <div className="projects-table">
            <h2>Manage Experiences</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Period</th>
                  <th>Technologies</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map(experience => (
                  <tr key={experience.id}>
                    <td>{experience.title}</td>
                    <td>{experience.company}</td>
                    <td>{experience.startDate} - {experience.endDate}</td>
                    <td>{experience.technologies}</td>
                    <td>
                      <span className={`status-badge ${experience.status}`}>
                        {experience.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        onClick={() => handleEditExperience(experience)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(experience.id)}
                        className="btn-icon btn-delete"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;