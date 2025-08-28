/**
 * Type definitions for cloud storage buckets
 */

// Bucket status and state
export type BucketStatus = 'active' | 'inactive' | 'deleting' | 'error';
export type BucketVersioning = 'enabled' | 'disabled' | 'suspended';
export type BucketEncryption = 'AES256' | 'aws:kms' | 'none';

// Bucket access control
export type BucketAccess = 'private' | 'public-read' | 'public-read-write' | 'authenticated-read';
export type BucketPolicy = 'deny' | 'allow';

// Bucket lifecycle and retention
export type LifecycleRuleStatus = 'enabled' | 'disabled';
export type StorageClass = 'STANDARD' | 'STANDARD_IA' | 'ONEZONE_IA' | 'INTELLIGENT_TIERING' | 'GLACIER' | 'DEEP_ARCHIVE';

// Bucket metadata interface
export interface BucketMetadata {
  id: string;
  name: string;
  region: string;
  creationDate: Date;
  lastModified: Date;
  owner: string;
  status: BucketStatus;
  versioning: BucketVersioning;
  encryption: BucketEncryption;
  accessControl: BucketAccess;
  tags: Record<string, string>;
  size: number; // Total size in bytes
  objectCount: number;
  lastAccessTime?: Date;
}

// Bucket creation request
export interface CreateBucketRequest {
  name: string;
  region: string;
  accessControl?: BucketAccess;
  versioning?: BucketVersioning;
  encryption?: BucketEncryption;
  tags?: Record<string, string>;
}

// Bucket update request
export interface UpdateBucketRequest {
  id: string;
  name?: string;
  accessControl?: BucketAccess;
  versioning?: BucketVersioning;
  encryption?: BucketEncryption;
  tags?: Record<string, string>;
}

// Bucket deletion request
export interface DeleteBucketRequest {
  id: string;
  force?: boolean; // Force deletion even if not empty
}

// Bucket rename request
export interface RenameBucketRequest {
  id: string;
  newName: string;
}

// Bucket operation result
export interface BucketOperationResult {
  success: boolean;
  bucket?: BucketMetadata;
  error?: string;
  operationId?: string;
}

// Bucket list response
export interface BucketListResponse {
  buckets: BucketMetadata[];
  totalCount: number;
  hasMore: boolean;
  nextToken?: string;
}

// Bucket filter options
export interface BucketFilterOptions {
  name?: string;
  region?: string;
  status?: BucketStatus;
  accessControl?: BucketAccess;
  tags?: Record<string, string>;
  createdAfter?: Date;
  createdBefore?: Date;
  sizeMin?: number;
  sizeMax?: number;
}

// Bucket sort options
export interface BucketSortOptions {
  field: keyof BucketMetadata;
  direction: 'asc' | 'desc';
}

// Bucket statistics
export interface BucketStats {
  id: string;
  name: string;
  totalSize: number;
  objectCount: number;
  averageObjectSize: number;
  largestObject: number;
  smallestObject: number;
  lastAccessTime: Date;
  accessCount: number;
  costPerMonth: number;
}

// Bucket permissions
export interface BucketPermissions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canManage: boolean;
  canShare: boolean;
}

// Bucket sharing
export interface BucketShare {
  id: string;
  bucketId: string;
  sharedWith: string;
  permissions: BucketPermissions;
  sharedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'expired' | 'revoked';
}

// Bucket backup configuration
export interface BucketBackupConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  retentionDays: number;
  includeDeleted: boolean;
  compression: boolean;
  encryption: boolean;
}

// Bucket monitoring configuration
export interface BucketMonitoringConfig {
  enabled: boolean;
  metrics: string[];
  alerts: BucketAlert[];
  logRetention: number;
}

// Bucket alert configuration
export interface BucketAlert {
  id: string;
  name: string;
  condition: 'size_threshold' | 'object_count_threshold' | 'access_frequency';
  threshold: number;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  action: 'email' | 'webhook' | 'sms';
  recipients: string[];
  enabled: boolean;
}

// Bucket event configuration
export interface BucketEvent {
  id: string;
  name: string;
  eventType: 'object_created' | 'object_deleted' | 'object_updated' | 'object_accessed';
  filters: {
    prefix?: string;
    suffix?: string;
    size?: {
      min?: number;
      max?: number;
    };
  };
  destination: {
    type: 'lambda' | 'sqs' | 'sns' | 'webhook';
    arn: string;
  };
  enabled: boolean;
}

// Bucket replication configuration
export interface BucketReplication {
  id: string;
  sourceBucket: string;
  destinationBucket: string;
  status: 'enabled' | 'disabled' | 'error';
  rules: ReplicationRule[];
  lastSyncTime?: Date;
}

// Replication rule
export interface ReplicationRule {
  id: string;
  prefix?: string;
  destination: string;
  storageClass?: StorageClass;
  encryption?: BucketEncryption;
  status: 'enabled' | 'disabled';
}

// Bucket import/export configuration
export interface BucketImportExport {
  id: string;
  type: 'import' | 'export';
  source: string;
  destination: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

// Bucket cost analysis
export interface BucketCostAnalysis {
  id: string;
  name: string;
  month: string;
  storageCost: number;
  requestCost: number;
  dataTransferCost: number;
  totalCost: number;
  costBreakdown: {
    standard: number;
    ia: number;
    glacier: number;
    deepArchive: number;
  };
  usageBreakdown: {
    standard: number;
    ia: number;
    glacier: number;
    deepArchive: number;
  };
}

// export interface Bucket {
//   id: string;
//   name: string;
//   region: string;
//   size: number;
//   sizeLimit?: number;
//   objects: number;
//   lastModified: string;
//   storageClass: string;
//   versioning: boolean;
//   encryption: boolean;
//   publicRead: boolean;
//   created?: string;
//   cost?: number;
// }

export interface FileObject {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modified: string;
  storageClass: string;
  path: string;
  mimeType?: string;
  url?: string;
}


export interface BucketCardProps {
  bucket: {
    id: string;
    name: string;
    region: string;
    size: number;
    sizeLimit?: number;
    objects: number;
    lastModified: string;
    storageClass: string;
    versioning: boolean;
    encryption: boolean;
    publicRead: boolean;
    created?: string;
    cost?: number;
  };
  onDelete?: (bucketId: string, bucketName: string) => void;
  onEdit?: (bucketId: string) => void;
  onRename?: (bucketId: string, newName: string) => void;
  onClick?: (bucketId: string) => void;
}


export interface Bucket {
  id: string;
  name: string;
  region: string;
  size: number;
  sizeLimit?: number;
  objects: number;
  lastModified: string;
  storageClass: string;
  versioning: boolean;
  encryption: boolean;
  publicRead: boolean;
  created?: string;
  cost?: number;
}

export interface BucketListProps {
  buckets: Bucket[];
  onCreateBucket?: () => void;
  onDeleteBucket?: (bucketId: string, bucketName: string) => void;
  onEditBucket?: (bucketId: string) => void;
  onRenameBucket?: (bucketId: string, currentName: string) => void;
  onBucketClick?: (bucketId: string) => void;
  onBucketSelect?: (bucketIds: string[]) => void;
  selectedBuckets?: string[];
  loading?: boolean;
}


export interface BucketOperationsProps {
  selectedBuckets?: string[];
  onCreateBucket?: () => void;
  onDeleteBuckets?: (bucketIds: string[]) => void;
  onExportBuckets?: (bucketIds: string[]) => void;
  onConfigureBucket?: (bucketId: string) => void;
  onSyncBuckets?: (bucketIds: string[]) => void;
  onToggleEncryption?: (bucketIds: string[]) => void;
  onToggleVersioning?: (bucketIds: string[]) => void;
  onMakePublic?: (bucketIds: string[]) => void;
  onMakePrivate?: (bucketIds: string[]) => void;
  onRenameBuckets?: (bucketIds: string[]) => void;
  totalBuckets?: number;
}

export type SortField = 'name' | 'size' | 'objects' | 'lastModified' | 'cost';
export type SortOrder = 'asc' | 'desc';


export interface CreateBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBucket: (bucketData: BucketFormData) => void;
  loading?: boolean;
}

export interface BucketFormData {
  name: string;
  region: string;
  storageClass: string;
  versioning: boolean;
  encryption: boolean;
  publicRead: boolean;
  description?: string;
  tags?: { key: string; value: string }[];
}


export interface RenameBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
  bucketId: string;
  currentName: string;
}