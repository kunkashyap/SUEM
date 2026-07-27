// import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
// export const API = `${BACKEND_URL}/api`;

// const api = axios.create({ baseURL: API });

// api.interceptors.request.use((cfg) => {
//   const t = localStorage.getItem('medsim_token');
//   if (t) cfg.headers.Authorization = `Bearer ${t}`;
//   return cfg;
// });

// export default api;



import axios from 'axios';

const BACKEND_URL =
  (process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

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