// src/services/api.jsx
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({ baseURL: API_BASE_URL });

// 최종 데이터(Survey) API
export const surveyAPI = {
  getSurveys: async () => {
    const response = await api.get('/api/surveys');
    return response.data;
  },
  getSurveyStats: async () => {
    const response = await api.get('/api/surveys/stats');
    return response.data;
  },
};

// 관리용 데이터(Submission) API
export const submissionAPI = {
  createSubmission: async (payload) => {
    const response = await api.post('/api/submissions', payload);
    return response.data;
  },
  listSubmissions: async (status) => {
    const response = await api.get('/api/submissions', { params: { status } });
    return response.data;
  },
  approveSubmission: async (id) => {
    const response = await api.put(`/api/submissions/${id}/approve`);
    return response.data;
  },
  rejectSubmission: async (id) => {
    const response = await api.put(`/api/submissions/${id}/reject`);
    return response.data;
  },
  deleteSubmission: async (id) => {
    const response = await api.delete(`/api/submissions/${id}`);
    return response.status;
  },
};