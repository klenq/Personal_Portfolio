import React, { useState, useEffect } from 'react';
import './ProjectForm.css';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    technologies: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    demoUrl: '',
    displayOrder: 0,
    isFeatured: false,
    status: 'active'
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="project-form-container">
      <form onSubmit={handleSubmit} className="project-form">
        <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
        
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Short Description *</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            maxLength="500"
            required
          />
        </div>

        <div className="form-group">
          <label>Full Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <div className="form-group">
          <label>Technologies (comma-separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Java, Spring Boot"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Project URL</label>
          <input
            type="url"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Demo URL</label>
          <input
            type="url"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Display Order</label>
            <input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>

        <div className="form-group-checkbox">
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Featured Project
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {project ? 'Update' : 'Create'} Project
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;