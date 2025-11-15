import api from './api';

const personalInfoService = {
  getPersonalInfo: () => api.get('/public/personal-info'),
  saveOrUpdatePersonalInfo: (info) => api.post('/admin/personal-info', info),
};

export default personalInfoService;