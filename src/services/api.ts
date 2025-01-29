import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const BASEROW_API_URL = 'https://api.baserow.io/api/database/rows/table';
const BASEROW_TOKEN = import.meta.env.VITE_BASEROW_TOKEN;

const api = axios.create({
  baseURL: BASEROW_API_URL,
  headers: {
    'Authorization': `Token ${BASEROW_TOKEN}`,
    'Content-Type': 'application/json',
  },
  params: {
    user_field_names: true
  }
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific Baserow error responses
      const message = error.response.data?.error || 'Une erreur est survenue';
      throw new Error(message);
    }
    throw error;
  }
);

export default api;