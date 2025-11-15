import React, { useState, useEffect } from 'react';
import ProjectForm from '../components/admin/ProjectForm';
import Loading from '../components/common/Loading';
import projectService from '../services/projectService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button onClick={handleAddProject} className="btn-add">
            Add New Project
          </button>
        </div>

        {showForm && (
          <ProjectForm
            project={editingProject}
            onSubmit={handleSubmitProject}
            onCancel={handleCancel}
          />
        )}

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
      </div>
    </div>
  );
};

export default AdminPanel;