import axios from 'axios';

// Dynamically determine the backend URL based on env variables and environment fallbacks
const getBackendUrl = () => {
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://suem-backend.onrender.com';
  }
  return 'http://localhost:5000';
};

const BACKEND_URL = getBackendUrl().replace(/\/$/, '');

console.log("[MedSim API] BACKEND_URL =", BACKEND_URL);
console.log("[MedSim API] API BaseURL =", `${BACKEND_URL}/api`);

export const API = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem('medsim_token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default api;