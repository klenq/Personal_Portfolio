import React, { useState, useEffect } from 'react';
import './ProjectForm.css';

const PersonalInfoForm = ({ personalInfo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    about: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    githubUrl: '',
    profileImageUrl: '',
    resumeUrl: ''
  });

  useEffect(() => {
    if (personalInfo) {
      setFormData({
        name: personalInfo.name || '',
        title: personalInfo.title || '',
        bio: personalInfo.bio || '',
        about: personalInfo.about || '',
        email: personalInfo.email || '',
        phone: personalInfo.phone || '',
        linkedinUrl: personalInfo.linkedinUrl || '',
        githubUrl: personalInfo.githubUrl || '',
        profileImageUrl: personalInfo.profileImageUrl || '',
        resumeUrl: personalInfo.resumeUrl || ''
      });
    }
  }, [personalInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="project-form-container">
      <form onSubmit={handleSubmit} className="project-form">
        <h2>Edit Personal Information</h2>

        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Full Stack Developer"
            required
          />
        </div>

        <div className="form-group">
          <label>Bio (Tagline/Short Description) *</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="2"
            placeholder="A short tagline or one-line description (appears below your name)"
            required
          />
        </div>

        <div className="form-group">
          <label>About (Full Description) *</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="8"
            placeholder="Write a detailed description about yourself, your background, and interests. This appears in the About section."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="form-group">
          <label>LinkedIn URL</label>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/username"
          />
        </div>

        <div className="form-group">
          <label>GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="form-group">
          <label>Profile Image URL</label>
          <input
            type="url"
            name="profileImageUrl"
            value={formData.profileImageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label>Resume URL</label>
          <input
            type="text"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            placeholder="/resume.pdf or https://example.com/resume.pdf"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Update Personal Info
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
