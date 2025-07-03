
import axios from 'axios';

export const createApiWithAuth = (baseURL) => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("🚫 No token found in localStorage");
    }
    return config;
  });

  return api;
};
