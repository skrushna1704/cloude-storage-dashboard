/**
 * Utils index file - exports all utility functions
 */

// Export all formatters
export {
    formatFileSize,
    formatDate,
    formatRelativeTime,
    formatNumber,
    formatCurrency,
    formatPercentage,
    truncateText,
    formatPath,
    toTitleCase,
  } from './formatters';
  
  // Export all helpers
  export {
    sleep,
    generateId,
    deepClone,
    debounce,
    throttle,
    getFileExtension,
    getMimeType,
    isImage,
    isTextFile,
    bytesToSize,
    sortByProperty,
    groupBy,
    shallowEqual,
    createSafeFilename,
  } from './helpers';
  
  // Export all validators
  export {
    isValidEmail,
    isValidUrl,
    isValidBucketName,
    isValidFileName,
    isValidFileSize,
    validateBucketName,
    validateFileName,
    validateFileSize,
    validateRequired,
    // ValidationResult,
  } from './validators';
  
  // Re-export commonly used types and interfaces
  export type {
    SortDirection,
    FileType,
    ValidationError,
  } from './validators';
  
  // Utility constants
  export const CONSTANTS = {
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
    MAX_BUCKET_NAME_LENGTH: 63,
    MIN_BUCKET_NAME_LENGTH: 3,
    SUPPORTED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    SUPPORTED_TEXT_TYPES: ['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts'],
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 1000,
  } as const;
  
  // Common regex patterns
  export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    URL: /^https?:\/\/.+/,
    BUCKET_NAME: /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
    SAFE_FILENAME: /^[a-zA-Z0-9._-]+$/,
  } as const;
  
  // Error messages
  export const ERROR_MESSAGES = {
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_BUCKET_NAME: 'Bucket name must be 3-63 characters, lowercase letters, numbers, and hyphens only',
    INVALID_FILE_NAME: 'File name contains invalid characters',
    FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
    REQUIRED_FIELD: 'This field is required',
  } as const;
  
  // Success messages
  export const SUCCESS_MESSAGES = {
    BUCKET_CREATED: 'Bucket created successfully',
    BUCKET_DELETED: 'Bucket deleted successfully',
    FILE_UPLOADED: 'File uploaded successfully',
    FILE_DELETED: 'File deleted successfully',
    OPERATION_COMPLETED: 'Operation completed successfully',
  } as const;