import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  AUTH_TOKEN: 'auth_token',
} as const;

export const cookieService = {
  // Set a cookie with optional configuration
  set: (key: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(key, value, {
      ...options,
      // Default to 7 days if not specified
      expires: options?.expires || 7,
      // Ensure secure and httpOnly by default
      secure: true,
      sameSite: 'strict',
    });
  },

  // Get a cookie value
  get: (key: string): string | undefined => {
    return Cookies.get(key);
  },

  // Remove a cookie
  remove: (key: string) => {
    Cookies.remove(key);
  },

  // Authentication specific methods
  setAuthToken: (token: string) => {
    cookieService.set(COOKIE_KEYS.AUTH_TOKEN, token);
  },

  getAuthToken: (): string | undefined => {
    return cookieService.get(COOKIE_KEYS.AUTH_TOKEN);
  },

  removeAuthToken: () => {
    cookieService.remove(COOKIE_KEYS.AUTH_TOKEN);
  },
};