export * from './analytics';
export * from './buckets';
export * from './objects';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const API_TIMEOUT = 30000;
