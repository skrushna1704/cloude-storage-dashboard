import { API_BASE_URL } from './constants';

export interface StorageUsage {
  total: number;
  used: number;
  available: number;
}

export interface CostData {
  monthly: number;
  yearly: number;
}

export interface UsageTrend {
  month: string;
  usage: number;
}

export interface BucketUsage {
  bucket: string;
  usage: number;
  cost: number;
}

export interface AnalyticsData {
  storageUsage: StorageUsage;
  costData: CostData;
  usageTrends: UsageTrend[];
  bucketUsage: BucketUsage[];
}

export const fetchAnalytics = async (): Promise<AnalyticsData> => {
  const response = await fetch(`${API_BASE_URL}/analytics`);
  if (!response.ok) {
    throw new Error('Failed to fetch analytics');
  }
  return response.json();
};

export const fetchStorageUsage = async (): Promise<StorageUsage> => {
  const response = await fetch(`${API_BASE_URL}/analytics/storage`);
  if (!response.ok) {
    throw new Error('Failed to fetch storage usage');
  }
  return response.json();
};

export const fetchCostData = async (): Promise<CostData> => {
  const response = await fetch(`${API_BASE_URL}/analytics/costs`);
  if (!response.ok) {
    throw new Error('Failed to fetch cost data');
  }
  return response.json();
};

export const fetchUsageTrends = async (): Promise<UsageTrend[]> => {
  const response = await fetch(`${API_BASE_URL}/analytics/trends`);
  if (!response.ok) {
    throw new Error('Failed to fetch usage trends');
  }
  return response.json();
};
