import api from './api';

const experienceService = {
  getAllExperiences: () => api.get('/public/experiences'),
  getExperienceById: (id) => api.get(`/public/experiences/${id}`),
  createExperience: (experience) => api.post('/admin/experiences', experience),
  updateExperience: (id, experience) => api.put(`/admin/experiences/${id}`, experience),
  deleteExperience: (id) => api.delete(`/admin/experiences/${id}`),
};

export default experienceService;
