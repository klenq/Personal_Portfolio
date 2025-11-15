import api from './api';

const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
    }
    return response.data;
  },

  register: async (username, password) => {
    return await api.post('/auth/register', { username, password });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },

  getCurrentUser: () => {
    return localStorage.getItem('username');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;