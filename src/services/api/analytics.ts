import { AnalyticsData } from '../../types/analytics';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

export interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsData;
  timestamp: string;
}

export interface AnalyticsPeriodResponse extends AnalyticsResponse {
  period: string;
}

export interface ExportResponse {
  success: boolean;
  message: string;
  downloadUrl: string;
  timestamp: string;
}

export const analyticsApi = {
  /**
   * Get analytics data for the current period
   */
  async getAnalytics(): Promise<AnalyticsData> {
    const response = await fetch(`${API_BASE_URL}/api/analytics`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    const result: AnalyticsResponse = await response.json();
    return result.data;
  },

  /**
   * Get analytics data for a specific time period
   */
  async getAnalyticsByPeriod(period: string): Promise<AnalyticsData> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/${period}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch analytics data for period: ${period}`);
    }
    const result: AnalyticsPeriodResponse = await response.json();
    return result.data;
  },

  /**
   * Export analytics report
   */
  async exportReport(period: string = '30d'): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/analytics/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ period }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to export analytics report');
    }
    
    const result: ExportResponse = await response.json();
    return result.downloadUrl;
  },

  /**
   * Get cost breakdown data
   */
  async getCostBreakdown() {
    const response = await fetch(`${API_BASE_URL}/api/analytics/costs`);
    if (!response.ok) {
      throw new Error('Failed to fetch cost breakdown');
    }
    return response.json();
  },

  /**
   * Get storage metrics
   */
  async getStorageMetrics() {
    const response = await fetch(`${API_BASE_URL}/api/analytics/storage`);
    if (!response.ok) {
      throw new Error('Failed to fetch storage metrics');
    }
    return response.json();
  },

  /**
   * Get top buckets data
   */
  async getTopBuckets() {
    const response = await fetch(`${API_BASE_URL}/api/analytics/buckets`);
    if (!response.ok) {
      throw new Error('Failed to fetch top buckets');
    }
    return response.json();
  },

  /**
   * Get alerts
   */
  async getAlerts() {
    const response = await fetch(`${API_BASE_URL}/api/analytics/alerts`);
    if (!response.ok) {
      throw new Error('Failed to fetch alerts');
    }
    return response.json();
  },
};
