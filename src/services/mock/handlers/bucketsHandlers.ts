import { mockBucketsData } from '../fixtures/buckets';

export const bucketsHandlers = [
  {
    path: '/api/buckets',
    method: 'GET',
    response: () => mockBucketsData,
  },
];
