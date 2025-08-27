/**
 * Validation utility functions for forms and data
 */

// Types for validation
export type SortDirection = 'asc' | 'desc';
export type FileType = 'image' | 'text' | 'document' | 'archive' | 'video' | 'audio' | 'other';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Bucket name validation (following AWS S3 naming rules)
export const isValidBucketName = (name: string): boolean => {
  // Must be between 3 and 63 characters
  if (name.length < 3 || name.length > 63) return false;
  
  // Must start and end with lowercase letter or number
  if (!/^[a-z0-9]/.test(name) || !/[a-z0-9]$/.test(name)) return false;
  
  // Can contain lowercase letters, numbers, and hyphens
  if (!/^[a-z0-9-]+$/.test(name)) return false;
  
  // Cannot contain consecutive hyphens
  if (name.includes('--')) return false;
  
  // Cannot be formatted as an IP address
  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (ipRegex.test(name)) return false;
  
  return true;
};

// File name validation
export const isValidFileName = (filename: string): boolean => {
  if (!filename || filename.length === 0) return false;
  
  // Check for invalid characters
  const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
  if (invalidChars.test(filename)) return false;
  
  // Check for reserved names (Windows)
  const reservedNames = [
    'CON', 'PRN', 'AUX', 'NUL',
    'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
    'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
  ];
  
  const nameWithoutExtension = filename.split('.')[0].toUpperCase();
  if (reservedNames.includes(nameWithoutExtension)) return false;
  
  // Cannot end with space or dot
  if (filename.endsWith(' ') || filename.endsWith('.')) return false;
  
  // Maximum length check
  if (filename.length > 255) return false;
  
  return true;
};

// File size validation
export const isValidFileSize = (size: number, maxSize: number = 100 * 1024 * 1024): boolean => {
  return size > 0 && size <= maxSize;
};

// Comprehensive bucket name validation with detailed error
export const validateBucketName = (name: string): ValidationResult => {
  if (!name || name.length === 0) {
    return { isValid: false, error: 'Bucket name is required' };
  }
  
  if (name.length < 3) {
    return { isValid: false, error: 'Bucket name must be at least 3 characters long' };
  }
  
  if (name.length > 63) {
    return { isValid: false, error: 'Bucket name must not exceed 63 characters' };
  }
  
  if (!/^[a-z0-9]/.test(name)) {
    return { isValid: false, error: 'Bucket name must start with a lowercase letter or number' };
  }
  
  if (!/[a-z0-9]$/.test(name)) {
    return { isValid: false, error: 'Bucket name must end with a lowercase letter or number' };
  }
  
  if (!/^[a-z0-9-]+$/.test(name)) {
    return { isValid: false, error: 'Bucket name can only contain lowercase letters, numbers, and hyphens' };
  }
  
  if (name.includes('--')) {
    return { isValid: false, error: 'Bucket name cannot contain consecutive hyphens' };
  }
  
  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (ipRegex.test(name)) {
    return { isValid: false, error: 'Bucket name cannot be formatted as an IP address' };
  }
  
  return { isValid: true };
};

// Comprehensive file name validation with detailed error
export const validateFileName = (filename: string): ValidationResult => {
  if (!filename || filename.length === 0) {
    return { isValid: false, error: 'File name is required' };
  }
  
  if (filename.length > 255) {
    return { isValid: false, error: 'File name must not exceed 255 characters' };
  }
  
  const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
  if (invalidChars.test(filename)) {
    return { isValid: false, error: 'File name contains invalid characters' };
  }
  
  const reservedNames = [
    'CON', 'PRN', 'AUX', 'NUL',
    'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
    'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
  ];
  
  const nameWithoutExtension = filename.split('.')[0].toUpperCase();
  if (reservedNames.includes(nameWithoutExtension)) {
    return { isValid: false, error: 'File name cannot be a reserved system name' };
  }
  
  if (filename.endsWith(' ') || filename.endsWith('.')) {
    return { isValid: false, error: 'File name cannot end with a space or dot' };
  }
  
  return { isValid: true };
};

// File size validation with detailed error
export const validateFileSize = (size: number, maxSize: number = 100 * 1024 * 1024): ValidationResult => {
  if (size <= 0) {
    return { isValid: false, error: 'File size must be greater than 0' };
  }
  
  if (size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return { isValid: false, error: `File size must not exceed ${maxSizeMB}MB` };
  }
  
  return { isValid: true };
};

// Required field validation
export const validateRequired = (value: any, fieldName: string = 'Field'): ValidationResult => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return { isValid: false, error: `${fieldName} cannot be empty` };
  }
  
  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character (@$!%*?&)' };
  }
  
  return { isValid: true };
};

// Form validation helper
export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, (value: any) => ValidationResult>
): { isValid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];
  
  Object.entries(rules).forEach(([field, validator]) => {
    const result = validator(data[field]);
    if (!result.isValid && result.error) {
      errors.push({ field, message: result.error });
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Path validation
export const validatePath = (path: string): ValidationResult => {
  if (!path) {
    return { isValid: false, error: 'Path is required' };
  }
  
  // Check for invalid characters in path
  const invalidChars = /[<>:"|?*\x00-\x1f]/;
  if (invalidChars.test(path)) {
    return { isValid: false, error: 'Path contains invalid characters' };
  }
  
  // Check path length
  if (path.length > 1024) {
    return { isValid: false, error: 'Path is too long (maximum 1024 characters)' };
  }
  
  // Validate each segment of the path
  const segments = path.split('/').filter(segment => segment.length > 0);
  for (const segment of segments) {
    const segmentValidation = validateFileName(segment);
    if (!segmentValidation.isValid) {
      return { isValid: false, error: `Invalid path segment "${segment}": ${segmentValidation.error}` };
    }
  }
  
  return { isValid: true };
};

// File type validation
export const getFileType = (filename: string): FileType => {
  const extension = filename.toLowerCase().split('.').pop() || '';
  
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
  const textTypes = ['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts', 'jsx', 'tsx', 'csv'];
  const documentTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  const archiveTypes = ['zip', 'rar', 'tar', 'gz', '7z'];
  const videoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];
  const audioTypes = ['mp3', 'wav', 'flac', 'aac', 'ogg'];
  
  if (imageTypes.includes(extension)) return 'image';
  if (textTypes.includes(extension)) return 'text';
  if (documentTypes.includes(extension)) return 'document';
  if (archiveTypes.includes(extension)) return 'archive';
  if (videoTypes.includes(extension)) return 'video';
  if (audioTypes.includes(extension)) return 'audio';
  
  return 'other';
};

// Check if file type is allowed
export const isAllowedFileType = (filename: string, allowedTypes: FileType[]): boolean => {
  const fileType = getFileType(filename);
  return allowedTypes.includes(fileType);
};