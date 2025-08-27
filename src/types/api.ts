/**
 * Type definitions for API communication
 */

// HTTP methods and status
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ApiResponseStatus = 'success' | 'error' | 'pending';

// Base API response interface
export interface ApiResponse<T = any> {
  status: ApiResponseStatus;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
  requestId: string;
}

// API error interface
export interface ApiError {
  code: string;
  message: string;
  details?: string;
  field?: string;
  timestamp: Date;
}

// API request interface
export interface ApiRequest<T = any> {
  method: HttpMethod;
  url: string;
  data?: T;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

// Upload/Download progress
export interface ProgressInfo {
  loaded: number;
  total: number;
  percentage: number;
  speed: number;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
}

// File upload request
export interface FileUploadApiRequest {
  file: File;
  bucketId: string;
  key: string;
  onProgress?: (progress: ProgressInfo) => void;
}

// File download request
export interface FileDownloadApiRequest {
  bucketId: string;
  key: string;
  onProgress?: (progress: ProgressInfo) => void;
}

// Search request
export interface SearchApiRequest {
  query: string;
  bucketIds?: string[];
  maxResults?: number;
  offset?: number;
}

// Search response
export interface SearchApiResponse {
  success: boolean;
  results: any[];
  totalCount: number;
  hasMore: boolean;
  error?: ApiError;
}
