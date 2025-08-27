/**
 * Constants index file - exports all constants
 */

// Export all file type constants
export * from './fileTypes';

// Export all route constants
export * from './routes';

// Application constants
export const APP_CONFIG = {
  NAME: 'Cloud Storage Dashboard',
  VERSION: '1.0.0',
  DESCRIPTION: 'A comprehensive cloud storage management dashboard',
  AUTHOR: 'Your Company',
  SUPPORT_EMAIL: 'support@yourcompany.com',
} as const;

// Storage constants
export const STORAGE_CONSTANTS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  MAX_BUCKET_NAME_LENGTH: 63,
  MIN_BUCKET_NAME_LENGTH: 3,
  MAX_OBJECT_KEY_LENGTH: 1024,
  SUPPORTED_REGIONS: [
    'us-east-1', 'us-west-1', 'us-west-2', 'eu-west-1', 'eu-central-1',
    'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'sa-east-1'
  ],
} as const;

// UI constants
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 280,
  SIDEBAR_COLLAPSED_WIDTH: 80,
  HEADER_HEIGHT: 64,
  FOOTER_HEIGHT: 48,
  MODAL_Z_INDEX: 1000,
  TOOLTIP_Z_INDEX: 1001,
  NOTIFICATION_Z_INDEX: 1002,
  DROPDOWN_Z_INDEX: 999,
} as const;

// Pagination constants
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 1000,
} as const;

// Time constants
export const TIME_CONSTANTS = {
  REFRESH_INTERVALS: {
    FAST: 5,      // 5 seconds
    NORMAL: 30,   // 30 seconds
    SLOW: 300,    // 5 minutes
    MANUAL: 0,    // Manual refresh only
  },
  CACHE_TTL: {
    SHORT: 60,    // 1 minute
    MEDIUM: 300,  // 5 minutes
    LONG: 3600,   // 1 hour
  },
} as const;

// Validation constants
export const VALIDATION_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 254,
  BUCKET_NAME_PATTERN: /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
  OBJECT_KEY_PATTERN: /^[^<>:"/\\|?*\x00-\x1f]+$/,
} as const;

// Error constants
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. You do not have permission for this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  QUOTA_EXCEEDED: 'Storage quota exceeded. Please upgrade your plan.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'File type not supported.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  BUCKET_CREATED: 'Bucket created successfully!',
  BUCKET_DELETED: 'Bucket deleted successfully!',
  BUCKET_UPDATED: 'Bucket updated successfully!',
  FILE_UPLOADED: 'File uploaded successfully!',
  FILE_DELETED: 'File deleted successfully!',
  FILE_MOVED: 'File moved successfully!',
  FILE_COPIED: 'File copied successfully!',
  FOLDER_CREATED: 'Folder created successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  OPERATION_COMPLETED: 'Operation completed successfully!',
} as const;

// Notification constants
export const NOTIFICATION_CONSTANTS = {
  AUTO_HIDE_DURATION: 5000, // 5 seconds
  MAX_NOTIFICATIONS: 5,
  POSITIONS: {
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
  },
} as const;

// Theme constants
export const THEME_CONSTANTS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
  COLORS: {
    PRIMARY: '#1976d2',
    SECONDARY: '#dc004e',
    SUCCESS: '#4caf50',
    WARNING: '#ff9800',
    ERROR: '#f44336',
    INFO: '#2196f3',
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'cloud-storage-theme',
  LANGUAGE: 'cloud-storage-language',
  VIEW_MODE: 'cloud-storage-view-mode',
  SIDEBAR_COLLAPSED: 'cloud-storage-sidebar-collapsed',
  USER_PREFERENCES: 'cloud-storage-user-preferences',
  AUTH_TOKEN: 'cloud-storage-auth-token',
  REFRESH_TOKEN: 'cloud-storage-refresh-token',
} as const;
