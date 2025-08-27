/**
 * Main types index file - exports all type definitions
 */

// Export all bucket types
export type {
  BucketStatus,
  BucketVersioning,
  BucketEncryption,
  BucketAccess,
  BucketPolicy,
  LifecycleRuleStatus,
  StorageClass as BucketStorageClass,
} from './bucket';

export type {
  BucketMetadata,
  CreateBucketRequest,
  UpdateBucketRequest,
  DeleteBucketRequest,
  RenameBucketRequest,
  BucketOperationResult,
  BucketListResponse,
  BucketFilterOptions,
  BucketSortOptions,
  BucketStats,
  BucketPermissions,
  BucketShare,
  BucketBackupConfig,
  BucketMonitoringConfig,
  BucketAlert,
  BucketEvent,
  BucketReplication,
  ReplicationRule,
  BucketImportExport,
  BucketCostAnalysis,
} from './bucket';

// Export all object types
export type {
  FileType,
  ObjectStatus,
  StorageClass as ObjectStorageClass,
} from './object';

export type {
  ObjectMetadata,
  FileUploadRequest,
  FileUploadResponse,
  FileDownloadRequest,
  FileDownloadResponse,
  FileDeleteRequest,
  FileDeleteResponse,
  FileMoveRequest,
  FileCopyRequest,
  FileListRequest,
  FileListResponse,
  FileSearchRequest,
  FileSearchFilters,
  FileSortOptions,
  FilePreviewRequest,
  FilePreviewResponse,
  FolderCreateRequest,
  BulkOperationRequest,
  BulkOperation,
  BulkOperationOptions,
  BulkOperationResponse,
  BulkOperationResult,
  FileShare,
  FilePermissions,
  FileVersion,
  FileRestoreRequest,
  FileRestoreResponse,
  FileAccessLog,
  FileStats,
} from './object';

// Export all analytics types
export type {
  TimePeriod,
  MetricGranularity,
} from './analytics';

export type {
  StorageUsageMetrics,
  CostMetrics,
  RequestMetrics,
  DataTransferMetrics,
  PerformanceMetrics,
  AnalyticsRequest,
  AnalyticsFilters,
  AnalyticsResponse,
  DashboardMetrics,
  BucketUsageSummary,
  RegionUsageSummary,
  ActivitySummary,
  AlertSummary,
  CostAnalysis,
  CostBreakdown,
  CostTrend,
  CostForecast,
  CostRecommendation,
  StorageOptimizationMetrics,
  StorageOptimizationRecommendation,
  LifecyclePolicyMetrics,
  UsagePatterns,
  TimePattern,
  SeasonalityAnalysis,
  TrendAnalysis,
  AnomalyDetection,
} from './analytics';

// Export all API types
export type {
  HttpMethod,
  ApiResponseStatus,
  ApiResponse,
  ApiError,
  ApiRequest,
  ProgressInfo,
  FileUploadApiRequest,
  FileDownloadApiRequest,
  SearchApiRequest,
  SearchApiResponse,
} from './api';

// Re-export common utility types from utils
export type {
  SortDirection,
  FileType as UtilsFileType,
  ValidationError,
  ValidationResult,
} from '../utils/validators';

// Common types used across the application
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: string[];
  createdAt: Date;
  lastLogin?: Date;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

export interface ListResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  filters?: FilterParams;
  sort?: SortParams;
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId?: string;
}

export interface SuccessResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

// UI state types
export interface UIState {
  loading: boolean;
  error: string | null;
  notifications: Notification[];
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
  progress?: number;
}

export interface ModalState {
  isOpen: boolean;
  type: string;
  data?: any;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => string | null;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Table types
export interface TableColumn<T = any> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableState<T = any> {
  data: T[];
  loading: boolean;
  pagination: PaginationParams;
  sort: SortParams;
  filters: FilterParams;
  selection: string[];
}

// Chart types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  title: string;
  data: ChartDataPoint[];
  options?: Record<string, any>;
}

// Event types
export interface AppEvent {
  type: string;
  payload: any;
  timestamp: Date;
  source: string;
}

export interface EventHandler<T = any> {
  (event: AppEvent): void;
}

// Context types
export interface AppContext {
  user: User | null;
  theme: 'light' | 'dark';
  language: string;
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

// Hook return types
export interface UseStateReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
}

export interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

// Generic types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
