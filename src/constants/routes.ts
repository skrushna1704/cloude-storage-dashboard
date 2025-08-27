/**
 * Application routes configuration
 */

export const ROUTES = {
  // Main pages
  HOME: '/',
  BUCKETS: '/buckets',
  BUCKET_DETAIL: '/buckets/:bucketId',
  OBJECTS: '/buckets/:bucketId/objects',
  ANALYTICS: '/analytics',
  BILLING: '/billing',
  SETTINGS: '/settings',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // API routes
  API_BUCKETS: '/api/buckets',
  API_OBJECTS: '/api/objects',
  API_ANALYTICS: '/api/analytics',
  API_AUTH: '/api/auth',
  
  // Error pages
  NOT_FOUND: '/404',
  ERROR: '/error',
  UNAUTHORIZED: '/unauthorized',
  FORBIDDEN: '/forbidden',
} as const;

export const ROUTE_PARAMS = {
  BUCKET_ID: 'bucketId',
  OBJECT_KEY: 'objectKey',
  PATH: 'path',
} as const;

export const ROUTE_TITLES = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.BUCKETS]: 'Buckets',
  [ROUTES.ANALYTICS]: 'Analytics',
  [ROUTES.BILLING]: 'Billing',
  [ROUTES.SETTINGS]: 'Settings',
  [ROUTES.LOGIN]: 'Login',
  [ROUTES.REGISTER]: 'Register',
} as const;



export const generateBucketDetailPath = (bucketId: string): string => 
  `/buckets/${encodeURIComponent(bucketId)}`;

export const generateFilePath = (bucketId: string, path?: string): string => {
  const basePath = generateBucketDetailPath(bucketId);
  return path ? `${basePath}/${path}` : basePath;
};
