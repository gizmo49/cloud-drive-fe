import { ROUTES } from '@/constants/routes';
import { COOKIE_KEYS, cookieService } from '@/services/cookie';
import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = cookieService.get(COOKIE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
     cookieService.remove(COOKIE_KEYS.AUTH_TOKEN);
      window.location.href = ROUTES.AUTH.SIGN_IN;
    }
    return Promise.reject(error);
  }
);