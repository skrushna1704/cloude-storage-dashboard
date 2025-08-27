/**
 * Type definitions for cloud storage objects/files
 */

// File/object types
export type FileType = 'image' | 'text' | 'document' | 'archive' | 'video' | 'audio' | 'other';
export type ObjectStatus = 'active' | 'deleted' | 'archived' | 'restoring' | 'error';
export type StorageClass = 'STANDARD' | 'STANDARD_IA' | 'ONEZONE_IA' | 'INTELLIGENT_TIERING' | 'GLACIER' | 'DEEP_ARCHIVE';

// Object metadata interface
export interface ObjectMetadata {
  id: string;
  key: string; // Full path/key of the object
  bucketId: string;
  bucketName: string;
  name: string; // Just the filename
  size: number; // Size in bytes
  contentType: string;
  fileType: FileType;
  storageClass: StorageClass;
  status: ObjectStatus;
  createdAt: Date;
  lastModified: Date;
  lastAccessed?: Date;
  etag: string;
  versionId?: string;
  encryption?: string;
  tags: Record<string, string>;
  metadata: Record<string, string>;
  checksum?: string;
  isFolder: boolean;
  parentPath?: string;
  children?: string[]; // For folders
}

// File upload request
export interface FileUploadRequest {
  file: File;
  bucketId: string;
  key: string;
  storageClass?: StorageClass;
  tags?: Record<string, string>;
  metadata?: Record<string, string>;
  encryption?: string;
  overwrite?: boolean;
}

// File upload response
export interface FileUploadResponse {
  success: boolean;
  object?: ObjectMetadata;
  error?: string;
  uploadId?: string;
  progress?: number;
}

// File download request
export interface FileDownloadRequest {
  bucketId: string;
  key: string;
  versionId?: string;
  responseContentType?: string;
  responseContentDisposition?: string;
}

// File download response
export interface FileDownloadResponse {
  success: boolean;
  data?: Blob | ArrayBuffer;
  error?: string;
  contentType?: string;
  contentLength?: number;
  lastModified?: Date;
  etag?: string;
}

// File delete request
export interface FileDeleteRequest {
  bucketId: string;
  key: string;
  versionId?: string;
  force?: boolean; // Force deletion even if it's a folder with contents
}

// File delete response
export interface FileDeleteResponse {
  success: boolean;
  deletedObjects: string[];
  error?: string;
}

// File rename/move request
export interface FileMoveRequest {
  bucketId: string;
  sourceKey: string;
  destinationKey: string;
  overwrite?: boolean;
  preserveMetadata?: boolean;
}

// File copy request
export interface FileCopyRequest {
  sourceBucketId: string;
  sourceKey: string;
  destinationBucketId: string;
  destinationKey: string;
  storageClass?: StorageClass;
  metadata?: Record<string, string>;
  tags?: Record<string, string>;
}

// File list request
export interface FileListRequest {
  bucketId: string;
  prefix?: string;
  delimiter?: string;
  maxKeys?: number;
  continuationToken?: string;
  startAfter?: string;
  includeVersions?: boolean;
  includeDeleted?: boolean;
}

// File list response
export interface FileListResponse {
  objects: ObjectMetadata[];
  folders: string[];
  commonPrefixes: string[];
  totalCount: number;
  hasMore: boolean;
  nextContinuationToken?: string;
  startAfter?: string;
}

// File search request
export interface FileSearchRequest {
  bucketId: string;
  query: string;
  filters?: FileSearchFilters;
  sortBy?: FileSortOptions;
  maxResults?: number;
  offset?: number;
}

// File search filters
export interface FileSearchFilters {
  fileType?: FileType[];
  sizeMin?: number;
  sizeMax?: number;
  createdAfter?: Date;
  createdBefore?: Date;
  modifiedAfter?: Date;
  modifiedBefore?: Date;
  tags?: Record<string, string>;
  metadata?: Record<string, string>;
}

// File sort options
export interface FileSortOptions {
  field: keyof ObjectMetadata;
  direction: 'asc' | 'desc';
}

// File preview request
export interface FilePreviewRequest {
  bucketId: string;
  key: string;
  versionId?: string;
  maxSize?: number; // Maximum size to preview
}

// File preview response
export interface FilePreviewResponse {
  success: boolean;
  content?: string | ArrayBuffer;
  contentType?: string;
  error?: string;
  truncated?: boolean;
  originalSize?: number;
}

// Folder creation request
export interface FolderCreateRequest {
  bucketId: string;
  path: string;
  tags?: Record<string, string>;
  metadata?: Record<string, string>;
}

// Bulk operations
export interface BulkOperationRequest {
  bucketId: string;
  operations: BulkOperation[];
  options?: BulkOperationOptions;
}

export interface BulkOperation {
  type: 'delete' | 'move' | 'copy' | 'tag' | 'metadata';
  sourceKey: string;
  destinationKey?: string;
  destinationBucketId?: string;
  tags?: Record<string, string>;
  metadata?: Record<string, string>;
}

export interface BulkOperationOptions {
  overwrite?: boolean;
  preserveMetadata?: boolean;
  storageClass?: StorageClass;
  encryption?: string;
}

export interface BulkOperationResponse {
  success: boolean;
  results: BulkOperationResult[];
  summary: {
    total: number;
    successful: number;
    failed: number;
    errors: string[];
  };
}

export interface BulkOperationResult {
  operation: BulkOperation;
  success: boolean;
  error?: string;
  objectId?: string;
}

// File sharing
export interface FileShare {
  id: string;
  objectId: string;
  bucketId: string;
  sharedWith: string;
  permissions: FilePermissions;
  sharedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'expired' | 'revoked';
  accessCount: number;
  lastAccessed?: Date;
}

export interface FilePermissions {
  canRead: boolean;
  canDownload: boolean;
  canPreview: boolean;
  canShare: boolean;
  canDelete: boolean;
}

// File versioning
export interface FileVersion {
  id: string;
  objectId: string;
  versionId: string;
  size: number;
  createdAt: Date;
  isLatest: boolean;
  isDeleteMarker: boolean;
  storageClass: StorageClass;
  etag: string;
}

// File restore request
export interface FileRestoreRequest {
  bucketId: string;
  key: string;
  versionId: string;
  days: number;
  storageClass?: StorageClass;
}

// File restore response
export interface FileRestoreResponse {
  success: boolean;
  restoreId?: string;
  estimatedCompletion?: Date;
  error?: string;
}

// File access logs
export interface FileAccessLog {
  id: string;
  objectId: string;
  bucketId: string;
  userId: string;
  action: 'read' | 'write' | 'delete' | 'download' | 'preview';
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  error?: string;
  responseTime?: number;
}

// File statistics
export interface FileStats {
  id: string;
  key: string;
  bucketId: string;
  accessCount: number;
  lastAccessTime: Date;
  downloadCount: number;
  lastDownloadTime?: Date;
  previewCount: number;
  lastPreviewTime?: Date;
  shareCount: number;
  versionCount: number;
  totalSize: number; // Including all versions
}
