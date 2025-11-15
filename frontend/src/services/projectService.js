import api from './api';

const projectService = {
  getAllProjects: () => api.get('/public/projects'),
  getProjectById: (id) => api.get(`/public/projects/${id}`),
  getFeaturedProjects: () => api.get('/public/projects/featured'),
  createProject: (project) => api.post('/admin/projects', project),
  updateProject: (id, project) => api.put(`/admin/projects/${id}`, project),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
};

export default projectService;