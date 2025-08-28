/**
 * Type definitions for analytics and metrics
 */

// Analytics data types for the dashboard
export interface AnalyticsData {
  totalStorage: number;
  storageLimit: number;
  monthlyCost: number;
  costTrend: number;
  requests: number;
  requestsTrend: number;
  bandwidth: number;
  bandwidthTrend: number;
  topBuckets: TopBucket[];
  storageByType: StorageByType[];
  costBreakdown: CostBreakdown[];
  alerts: Alert[];
}

export interface TopBucket {
  name: string;
  size: number;
  cost: number;
  requests: number;
  trend: 'up' | 'down' | 'stable';
}

export interface StorageByType {
  type: string;
  size: number;
  percentage: number;
  cost: number;
  color: string;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
}

export interface Alert {
  type: 'warning' | 'info' | 'success';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

// Time periods for analytics
export type TimePeriod = '1h' | '6h' | '24h' | '7d' | '30d' | '90d' | '1y' | 'custom';
export type MetricGranularity = '1m' | '5m' | '15m' | '1h' | '6h' | '1d' | '1w' | '1M';

// Storage usage metrics
export interface StorageUsageMetrics {
  timestamp: Date;
  totalStorage: number; // in bytes
  objectCount: number;
  bucketCount: number;
  averageObjectSize: number;
  storageByClass: Record<string, number>;
  storageByRegion: Record<string, number>;
  storageByBucket: Record<string, number>;
}

// Cost metrics
export interface CostMetrics {
  timestamp: Date;
  totalCost: number;
  storageCost: number;
  requestCost: number;
  dataTransferCost: number;
  otherCosts: number;
  costByStorageClass: Record<string, number>;
  costByRegion: Record<string, number>;
  costByBucket: Record<string, number>;
  costByService: Record<string, number>;
}

// Request metrics
export interface RequestMetrics {
  timestamp: Date;
  totalRequests: number;
  getRequests: number;
  putRequests: number;
  deleteRequests: number;
  headRequests: number;
  listRequests: number;
  requestsByBucket: Record<string, number>;
  requestsByRegion: Record<string, number>;
  errorRate: number;
  averageResponseTime: number;
}

// Data transfer metrics
export interface DataTransferMetrics {
  timestamp: Date;
  totalDataIn: number; // bytes
  totalDataOut: number; // bytes
  dataInByBucket: Record<string, number>;
  dataOutByBucket: Record<string, number>;
  dataInByRegion: Record<string, number>;
  dataOutByRegion: Record<string, number>;
  peakBandwidth: number;
  averageBandwidth: number;
}

// Performance metrics
export interface PerformanceMetrics {
  timestamp: Date;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  availability: number;
  throughput: number;
  latencyByRegion: Record<string, number>;
  latencyByBucket: Record<string, number>;
}

// Analytics request
export interface AnalyticsRequest {
  timeRange: {
    start: Date;
    end: Date;
  };
  granularity: MetricGranularity;
  filters?: AnalyticsFilters;
  groupBy?: string[];
  metrics: string[];
  maxResults?: number;
}

// Analytics filters
export interface AnalyticsFilters {
  bucketIds?: string[];
  regions?: string[];
  storageClasses?: string[];
  objectTypes?: string[];
  tags?: Record<string, string>;
  sizeRange?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    createdAfter?: Date;
    createdBefore?: Date;
    modifiedAfter?: Date;
    modifiedBefore?: Date;
  };
}

// Analytics response
export interface AnalyticsResponse<T> {
  data: T[];
  metadata: {
    timeRange: {
      start: Date;
      end: Date;
    };
    granularity: MetricGranularity;
    totalPoints: number;
    hasMore: boolean;
    nextToken?: string;
  };
  summary?: {
    total: number;
    average: number;
    min: number;
    max: number;
    count: number;
  };
}

// Dashboard metrics
export interface DashboardMetrics {
  overview: {
    totalStorage: number;
    totalObjects: number;
    totalBuckets: number;
    totalCost: number;
    storageGrowth: number; // percentage
    costGrowth: number; // percentage
  };
  topBuckets: BucketUsageSummary[];
  topRegions: RegionUsageSummary[];
  recentActivity: ActivitySummary[];
  alerts: AlertSummary[];
}

// Bucket usage summary
export interface BucketUsageSummary {
  bucketId: string;
  bucketName: string;
  storageUsed: number;
  objectCount: number;
  cost: number;
  growth: number; // percentage
  lastAccess: Date;
}

// Region usage summary
export interface RegionUsageSummary {
  region: string;
  storageUsed: number;
  objectCount: number;
  cost: number;
  bucketCount: number;
  growth: number; // percentage
}

// Activity summary
export interface ActivitySummary {
  id: string;
  type: 'upload' | 'download' | 'delete' | 'create' | 'modify';
  bucketId: string;
  bucketName: string;
  objectKey?: string;
  userId: string;
  timestamp: Date;
  size?: number;
  status: 'success' | 'failed' | 'pending';
}

// Alert summary
export interface AlertSummary {
  id: string;
  type: 'cost' | 'storage' | 'performance' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  bucketId?: string;
  region?: string;
}

// Cost analysis
export interface CostAnalysis {
  period: string;
  totalCost: number;
  breakdown: {
    storage: CostBreakdown;
    requests: CostBreakdown;
    dataTransfer: CostBreakdown;
    other: CostBreakdown;
  };
  trends: CostTrend[];
  forecasts: CostForecast[];
  recommendations: CostRecommendation[];
}

// Cost breakdown
export interface CostBreakdown {
  amount: number;
  percentage: number;
  details: Record<string, number>;
  change: number; // percentage change from previous period
}

// Cost trend
export interface CostTrend {
  date: Date;
  amount: number;
  change: number; // percentage change from previous day
  movingAverage: number;
}

// Cost forecast
export interface CostForecast {
  period: string;
  predictedCost: number;
  confidence: number;
  factors: string[];
}

// Cost recommendation
export interface CostRecommendation {
  id: string;
  type: 'storage_optimization' | 'lifecycle_policy' | 'storage_class' | 'compression' | 'deduplication';
  title: string;
  description: string;
  potentialSavings: number;
  implementationEffort: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
  actions: string[];
}

// Storage optimization metrics
export interface StorageOptimizationMetrics {
  timestamp: Date;
  totalOptimizableStorage: number;
  potentialSavings: number;
  recommendations: StorageOptimizationRecommendation[];
  lifecyclePolicies: LifecyclePolicyMetrics[];
}

// Storage optimization recommendation
export interface StorageOptimizationRecommendation {
  id: string;
  bucketId: string;
  bucketName: string;
  currentStorageClass: string;
  recommendedStorageClass: string;
  currentCost: number;
  estimatedCost: number;
  potentialSavings: number;
  objectsAffected: number;
  totalSize: number;
  implementationSteps: string[];
}

// Lifecycle policy metrics
export interface LifecyclePolicyMetrics {
  id: string;
  bucketId: string;
  policyName: string;
  status: 'active' | 'inactive' | 'error';
  objectsProcessed: number;
  storageFreed: number;
  costSavings: number;
  lastExecution: Date;
  nextExecution: Date;
  errors: string[];
}

// Usage patterns
export interface UsagePatterns {
  timestamp: Date;
  patterns: {
    uploadPattern: TimePattern;
    downloadPattern: TimePattern;
    accessPattern: TimePattern;
    storageGrowthPattern: TimePattern;
  };
  seasonality: SeasonalityAnalysis;
  anomalies: AnomalyDetection[];
}

// Time pattern
export interface TimePattern {
  hourly: number[];
  daily: number[];
  weekly: number[];
  monthly: number[];
  peakHours: number[];
  peakDays: string[];
  trends: TrendAnalysis;
}

// Seasonality analysis
export interface SeasonalityAnalysis {
  daily: boolean;
  weekly: boolean;
  monthly: boolean;
  yearly: boolean;
  strength: number; // 0-1
  patterns: string[];
}

// Trend analysis
export interface TrendAnalysis {
  direction: 'increasing' | 'decreasing' | 'stable';
  strength: number; // 0-1
  slope: number;
  confidence: number;
}

// Anomaly detection
export interface AnomalyDetection {
  id: string;
  type: 'spike' | 'drop' | 'trend_change' | 'seasonal_break';
  metric: string;
  timestamp: Date;
  value: number;
  expectedValue: number;
  deviation: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  bucketId?: string;
  region?: string;
}



export interface CostData {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  previousAmount?: number;
}

export interface CostChartProps {
  data?: CostData[];
  title?: string;
  totalCost?: number;
}

export interface UsageData {
  label: string;
  used: number;
  total: number;
  unit: string;
  color: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
}

export interface UsageChartProps {
  data?: UsageData[];
  title?: string;
  showCircular?: boolean;
}

export interface CostAnalyticsProps {
  timeRange?: 'week' | 'month' | 'quarter' | 'year';
}

export interface StorageUsageProps {
  showDetailed?: boolean;
}