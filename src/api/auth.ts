import { ROUTES } from '@/constants/routes';
import { api } from './config';
import { cookieService } from '@/services/cookie';

export interface User {
  id: string;
  email: string;
}

interface AuthPayload {
  token: string;
  user: User;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  timestamp: number;
  data: T;
}

export const auth = {
  register: async (email: string, password: string): Promise<AuthPayload> => {
    const response = await api.post<ApiResponse<AuthPayload>>('/api/auth/register', {
      email,
      password,
    });

    const { token, user } = response.data.data;
    await cookieService.setAuthToken(token);
    return { token, user };
  },

  login: async (email: string, password: string): Promise<AuthPayload> => {
    const response = await api.post<ApiResponse<AuthPayload>>('/api/auth/login', {
      email,
      password,
    });
    const { token, user } = response.data.data;
    await cookieService.setAuthToken(token);
    return { token, user };
  },

  logout: (): void => {
    cookieService.removeAuthToken();
    window.location.href = ROUTES.AUTH.SIGN_IN;
  },

  getToken: (): string | undefined => {
    return cookieService.getAuthToken();
  },
};
