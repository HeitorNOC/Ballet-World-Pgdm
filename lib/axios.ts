// services/api.ts
import axios from 'axios';
import { getToken } from "../hooks/useSecureStorage";

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    "Content-Type": "application/json",
  },
});


 api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 
