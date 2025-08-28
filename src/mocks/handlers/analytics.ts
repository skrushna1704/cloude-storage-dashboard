import { http, HttpResponse } from 'msw';
import { analyticsData } from '../../constants/mockdata';

export const analyticsHandlers = [
  // Get analytics data
  http.get('/api/analytics', () => {
    return HttpResponse.json({
      success: true,
      data: analyticsData,
      timestamp: new Date().toISOString(),
    });
  }),

  // Get analytics data for specific time period
  http.get('/api/analytics/:period', ({ params }) => {
    const { period } = params;
    
    // Mock different data based on period
    const periodData = {
      '7d': { ...analyticsData, monthlyCost: 98.45, costTrend: -8.2 },
      '30d': analyticsData,
      '90d': { ...analyticsData, monthlyCost: 156.78, costTrend: 25.6 },
      '1y': { ...analyticsData, monthlyCost: 189.23, costTrend: 45.2 },
    };

    return HttpResponse.json({
      success: true,
      data: periodData[period as keyof typeof periodData] || analyticsData,
      period,
      timestamp: new Date().toISOString(),
    });
  }),

  // Export analytics report
  http.post('/api/analytics/export', async ({ request }) => {
    const body = await request.json() as { period: string };
    return HttpResponse.json({
      success: true,
      message: 'Report exported successfully',
      downloadUrl: `/api/analytics/export/report-${body.period}-${new Date().toISOString().split('T')[0]}.pdf`,
      timestamp: new Date().toISOString(),
    });
  }),

  // Get cost breakdown
  http.get('/api/analytics/costs', () => {
    return HttpResponse.json({
      success: true,
      data: {
        breakdown: analyticsData.costBreakdown,
        total: analyticsData.monthlyCost,
        trend: analyticsData.costTrend,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Get storage metrics
  http.get('/api/analytics/storage', () => {
    return HttpResponse.json({
      success: true,
      data: {
        total: analyticsData.totalStorage,
        limit: analyticsData.storageLimit,
        byType: analyticsData.storageByType,
        usage: (analyticsData.totalStorage / analyticsData.storageLimit) * 100,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // Get top buckets
  http.get('/api/analytics/buckets', () => {
    return HttpResponse.json({
      success: true,
      data: analyticsData.topBuckets,
      timestamp: new Date().toISOString(),
    });
  }),

  // Get alerts
  http.get('/api/analytics/alerts', () => {
    return HttpResponse.json({
      success: true,
      data: analyticsData.alerts,
      timestamp: new Date().toISOString(),
    });
  }),
];

