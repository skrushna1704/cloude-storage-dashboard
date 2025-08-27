import { mockAnalyticsData } from '../fixtures/analytics';

export const analyticsHandlers = [
  {
    path: '/api/analytics',
    method: 'GET',
    response: () => mockAnalyticsData,
  },
];
