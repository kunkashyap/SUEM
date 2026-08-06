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

// Map raw Axios/HTTP errors to descriptive messages so the UI can display
// useful context instead of a generic "Network Error".
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // No HTTP response received — the backend is unreachable.
      const msg = `backend offline – cannot reach ${BACKEND_URL}. Check that the backend service is running.`;
      console.error('[MedSim API] Network error:', msg, error);
      error.message = msg;
    } else {
      const status = error.response.status;
      if (status === 404) {
        const msg = `endpoint missing – ${error.config?.url} returned 404`;
        console.error('[MedSim API] 404:', msg);
        error.message = msg;
      } else if (status === 500) {
        const detail = error.response?.data?.detail || '';
        const isDbError = /mongo|database|collection|pymongo/i.test(detail);
        const msg = isDbError
          ? `database unavailable – ${detail}`
          : `internal server error (500) – ${detail || 'check backend logs'}`;
        console.error('[MedSim API] 500:', msg);
        error.message = msg;
      } else {
        console.error(`[MedSim API] HTTP ${status}:`, error.response?.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api;