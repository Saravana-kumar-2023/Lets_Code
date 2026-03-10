import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Language APIs
export const languageAPI = {
  getAll: () => api.get('/languages'),
};

// Topic APIs
export const topicAPI = {
  getByLanguage: (languageId) => api.get(`/topics/language/${languageId}`),
  getDetails: (topicId) => api.get(`/topics/${topicId}/details`),
};

// Quiz APIs
export const quizAPI = {
  getQuestionsByTopic: (topicId) => api.get(`/quiz/questions/${topicId}`),
  submit: (data) => api.post('/quiz/submit', data),
  getMyResults: () => api.get('/quiz/my-results'),
};

// Challenge APIs
export const challengeAPI = {
  getByTopic: (topicId) => api.get(`/challenges/topic/${topicId}`),
  submit: (data) => api.post('/challenges/submit', data),
  getMySubmissions: () => api.get('/challenges/my-submissions'),
};

// Progress APIs
export const progressAPI = {
  markVideoCompleted: (topicId) => api.patch(`/progress/${topicId}/video-completed`),
  markNotesCompleted: (topicId) => api.patch(`/progress/${topicId}/notes-completed`),
  getMyProgress: () => api.get('/progress/my-progress'),
};

// Admin APIs
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  getResults: () => api.get('/admin/results'),
};

// Admin Content APIs
export const adminContentAPI = {
  createLanguage: (data) => api.post('/admin/content/language', data),
  updateLanguage: (id, data) => api.put(`/admin/content/language/${id}`, data),
  deleteLanguage: (id) => api.delete(`/admin/content/language/${id}`),

  getAllTopics: () => api.get('/admin/content/topics'),
  createTopic: (data) => api.post('/admin/content/topic', data),
  updateTopic: (id, data) => api.put(`/admin/content/topic/${id}`, data),
  deleteTopic: (id) => api.delete(`/admin/content/topic/${id}`),

  getAllNotes: () => api.get('/admin/content/notes'),
  createNote: (data) => api.post('/admin/content/note', data),
  updateNote: (id, data) => api.put(`/admin/content/note/${id}`, data),
  deleteNote: (id) => api.delete(`/admin/content/note/${id}`),

  getAllVideos: () => api.get('/admin/content/videos'),
  createVideo: (data) => api.post('/admin/content/video', data),
  updateVideo: (id, data) => api.put(`/admin/content/video/${id}`, data),
  deleteVideo: (id) => api.delete(`/admin/content/video/${id}`),
};

export default api;