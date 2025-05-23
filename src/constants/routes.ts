export const ROUTES = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up'
  },
  DASHBOARD: {
    HOME: '/drive',
  },
  HOME: '/'
} as const;

export type Routes = typeof ROUTES;