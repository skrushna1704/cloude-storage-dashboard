import { http, HttpResponse } from 'msw';
import { analyticsData } from '../constants/mockdata';

// Mock data
const mockBuckets: Array<{
  id: string;
  name: string;
  region: string;
  size: number;
  objectCount: number;
  status: string;
  createdAt: string;
}> = [
  {
    id: '1',
    name: 'my-bucket-1',
    region: 'us-east-1',
    size: 25600, // 25 TB in GB
    objectCount: 1250000,
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'my-bucket-2',
    region: 'us-west-2',
    size: 40200, // 40.2 TB in GB
    objectCount: 2100000,
    status: 'active',
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    id: '3',
    name: 'backup-bucket',
    region: 'eu-west-1',
    size: 15800, // 15.8 TB in GB
    objectCount: 856000,
    status: 'active',
    createdAt: '2024-03-10T00:00:00Z',
  },
];

const mockObjects: Record<string, Array<{
  key: string;
  name: string;
  size: number;
  isFolder: boolean;
  lastModified: string;
  contentType: string;
  etag: string;
  storageClass: string;
  metadata: Record<string, any>;
}>> = {
  '1': [
    {
      key: 'documents/',
      name: 'documents',
      size: 0,
      isFolder: true,
      lastModified: '2024-03-15T10:30:00Z',
      contentType: 'application/x-directory',
      etag: '',
      storageClass: 'STANDARD',
      metadata: {},
    },
    {
      key: 'documents/report.pdf',
      name: 'report.pdf',
      size: 1024 * 1024 * 2.5, // 2.5MB
      isFolder: false,
      lastModified: '2024-03-14T15:45:00Z',
      contentType: 'application/pdf',
      etag: 'abc123',
      storageClass: 'STANDARD',
      metadata: {},
    },
    {
      key: 'images/',
      name: 'images',
      size: 0,
      isFolder: true,
      lastModified: '2024-03-13T09:20:00Z',
      contentType: 'application/x-directory',
      etag: '',
      storageClass: 'STANDARD',
      metadata: {},
    },
    {
      key: 'images/logo.png',
      name: 'logo.png',
      size: 1024 * 512, // 512KB
      isFolder: false,
      lastModified: '2024-03-12T14:15:00Z',
      contentType: 'image/png',
      etag: 'def456',
      storageClass: 'STANDARD',
      metadata: {},
    },
  ],
  '2': [
    {
      key: 'backups/',
      name: 'backups',
      size: 0,
      isFolder: true,
      lastModified: '2024-03-16T08:00:00Z',
      contentType: 'application/x-directory',
      etag: '',
      storageClass: 'STANDARD',
      metadata: {},
    },
    {
      key: 'backups/database-backup.sql',
      name: 'database-backup.sql',
      size: 1024 * 1024 * 50, // 50MB
      isFolder: false,
      lastModified: '2024-03-16T07:30:00Z',
      contentType: 'application/sql',
      etag: 'ghi789',
      storageClass: 'STANDARD-IA',
      metadata: {},
    },
  ],
};

// const mockAnalytics = {
//   storageUsage: {
//     total: 1024 * 1024 * 1024 * 100, // 100GB
//     used: 1024 * 1024 * 1024 * 65,   // 65GB
//     available: 1024 * 1024 * 1024 * 35, // 35GB
//   },
//   costData: {
//     monthly: 45.67,
//     yearly: 548.04,
//   },
//   usageTrends: [
//     { month: 'Jan', usage: 50 },
//     { month: 'Feb', usage: 55 },
//     { month: 'Mar', usage: 60 },
//     { month: 'Apr', usage: 65 },
//   ],
//   bucketUsage: [
//     { bucket: 'my-bucket-1', usage: 25, cost: 12.50 },
//     { bucket: 'my-bucket-2', usage: 40, cost: 20.00 },
//     { bucket: 'backup-bucket', usage: 15, cost: 7.50 },
//   ],
// };

const mockBilling = {
  invoices: [
    {
      id: '1',
      date: '2024-03-01',
      amount: 124.67,
      status: 'paid',
      description: 'March 2024 - Cloud Storage Services',
      invoiceNumber: 'INV-202403-001',
    },
    {
      id: '2',
      date: '2024-02-01',
      amount: 98.45,
      status: 'paid',
      description: 'February 2024 - Cloud Storage Services',
      invoiceNumber: 'INV-202402-001',
    },
    {
      id: '3',
      date: '2024-01-01',
      amount: 156.78,
      status: 'paid',
      description: 'January 2024 - Cloud Storage Services',
      invoiceNumber: 'INV-202401-001',
    },
    {
      id: '4',
      date: '2024-04-01',
      amount: 145.23,
      status: 'pending',
      description: 'April 2024 - Cloud Storage Services',
      invoiceNumber: 'INV-202404-001',
    },
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryDate: '08/26',
      isDefault: false,
    },
  ],
  currentMonth: 124.67,
  previousMonth: 98.45,
  trend: 26.7,
  totalStorage: 83.4,
  storageLimit: 100,
  upcomingPayment: 145.23,
  dueDate: '2024-04-15',
};

export const handlers = [
  // Buckets API
  http.get('/api/buckets', () => {
    return HttpResponse.json(mockBuckets);
  }),

  http.post('/api/buckets', async ({ request }) => {
    const body = await request.json() as { name: string; region?: string };
    const newBucket = {
      id: String(Date.now()), // Use timestamp for unique ID
      name: body.name,
      region: body.region || 'us-east-1',
      size: 0,
      objectCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    mockBuckets.push(newBucket);
    return HttpResponse.json(newBucket, { status: 201 });
  }),

  http.delete('/api/buckets/:id', ({ params }) => {
    const { id } = params;
    console.log('MSW: Attempting to delete bucket with ID:', id);
    console.log('MSW: Available bucket IDs:', mockBuckets.map(b => b.id));
    
    const index = mockBuckets.findIndex(bucket => bucket.id === id);
    if (index !== -1) {
      const deletedBucket = mockBuckets.splice(index, 1)[0];
      console.log('MSW: Successfully deleted bucket:', deletedBucket.name);
      return new HttpResponse(null, { status: 204 });
    }
    
    console.log('MSW: Bucket not found with ID:', id);
    return new HttpResponse(null, { status: 404 });
  }),

  // Objects API
  http.get('/api/buckets/:bucketId/objects', ({ params }) => {
    const { bucketId } = params;
    const objects = mockObjects[bucketId as string] || [];
    return HttpResponse.json(objects);
  }),

  http.post('/api/buckets/:bucketId/objects', async ({ params, request }) => {
    const { bucketId } = params;
    const body = await request.json() as {
      key: string;
      name: string;
      size?: number;
      isFolder?: boolean;
      contentType?: string;
      metadata?: Record<string, any>;
    };
    
    if (!mockObjects[bucketId as string]) {
      mockObjects[bucketId as string] = [];
    }
    
    const newObject = {
      key: body.key,
      name: body.name,
      size: body.size || 0,
      isFolder: body.isFolder || false,
      lastModified: new Date().toISOString(),
      contentType: body.contentType || 'application/octet-stream',
      etag: Math.random().toString(36).substring(7),
      storageClass: 'STANDARD',
      metadata: body.metadata || {},
    };
    
    mockObjects[bucketId as string].push(newObject);
    return HttpResponse.json(newObject, { status: 201 });
  }),

  http.delete('/api/buckets/:bucketId/objects/:key', ({ params }) => {
    const { bucketId, key } = params;
    const objects = mockObjects[bucketId as string];
    if (objects) {
      const index = objects.findIndex(obj => obj.key === key);
      if (index !== -1) {
        objects.splice(index, 1);
        return new HttpResponse(null, { status: 204 });
      }
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Analytics API
  http.get('/api/analytics', () => {
    return HttpResponse.json({
      success: true,
      data: analyticsData,
      timestamp: new Date().toISOString(),
    });
  }),

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

  http.post('/api/analytics/export', async ({ request }) => {
    const body = await request.json() as { period: string };
    return HttpResponse.json({
      success: true,
      message: 'Report exported successfully',
      downloadUrl: `/api/analytics/export/report-${body.period}-${new Date().toISOString().split('T')[0]}.pdf`,
      timestamp: new Date().toISOString(),
    });
  }),

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

  http.get('/api/analytics/buckets', () => {
    return HttpResponse.json({
      success: true,
      data: analyticsData.topBuckets,
      timestamp: new Date().toISOString(),
    });
  }),

  http.get('/api/analytics/alerts', () => {
    return HttpResponse.json({
      success: true,
      data: analyticsData.alerts,
      timestamp: new Date().toISOString(),
    });
  }),

  // Billing API
  http.get('/api/billing', () => {
    return HttpResponse.json(mockBilling);
  }),

  http.get('/api/billing/invoices', () => {
    return HttpResponse.json(mockBilling.invoices);
  }),

  http.get('/api/billing/payment-methods', () => {
    return HttpResponse.json(mockBilling.paymentMethods);
  }),

  http.post('/api/billing/payment-methods', async ({ request }) => {
    const body = await request.json() as {
      type: 'card' | 'bank';
      last4: string;
      brand: string;
      expiryDate: string;
      isDefault?: boolean;
    };
    const newPaymentMethod = {
      id: String(mockBilling.paymentMethods.length + 1),
      type: body.type,
      last4: body.last4,
      brand: body.brand,
      expiryDate: body.expiryDate,
      isDefault: body.isDefault || false,
    };
    mockBilling.paymentMethods.push(newPaymentMethod);
    return HttpResponse.json(newPaymentMethod, { status: 201 });
  }),

  // File upload simulation
  http.post('/api/upload', async ({ request }) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucketId = formData.get('bucketId') as string;
    const key = formData.get('key') as string;
    
    const uploadedObject = {
      key: key || file.name,
      name: file.name,
      size: file.size,
      isFolder: false,
      lastModified: new Date().toISOString(),
      contentType: file.type,
      etag: Math.random().toString(36).substring(7),
      storageClass: 'STANDARD',
      metadata: {},
    };
    
    if (!mockObjects[bucketId]) {
      mockObjects[bucketId] = [];
    }
    mockObjects[bucketId].push(uploadedObject);
    
    return HttpResponse.json({
      success: true,
      object: uploadedObject,
    });
  }),
];
