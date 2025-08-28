import { StarIcon, ViewIcon } from "@chakra-ui/icons";
import { FileObject } from "../types/bucket";
import { Bucket } from "../types/header";

export const BUCKETS = [
    {
      id: '1',
      name: 'production-assets',
      region: 'us-east-1',
      size: 25600, // 25 TB in GB
      sizeLimit: 100000, // 100 TB limit
      objects: 1250000,
      lastModified: '2 hours ago',
      created: '2023-08-15',
      storageClass: 'Standard',
      versioning: true,
      encryption: true,
      publicRead: false,
      cost: 1245.50,
    },
    {
      id: '2',
      name: 'backup-data',
      region: 'us-west-2',
      size: 40200, // 40.2 TB in GB
      sizeLimit: 200000, // 200 TB limit
      objects: 2100000,
      lastModified: '1 day ago',
      created: '2023-08-10',
      storageClass: 'Standard-IA',
      versioning: false,
      encryption: true,
      publicRead: false,
      cost: 875.25,
    },
    {
      id: '3',
      name: 'media-uploads',
      region: 'eu-west-1',
      size: 15800, // 15.8 TB in GB
      sizeLimit: 50000, // 50 TB limit
      objects: 856000,
      lastModified: '3 hours ago',
      created: '2023-08-20',
      storageClass: 'Standard',
      versioning: true,
      encryption: false,
      publicRead: true,
      cost: 520.75,
    },
    {
      id: '4',
      name: 'logs-archive',
      region: 'ap-south-1',
      size: 2300, // 2.3 TB in GB
      sizeLimit: 10000, // 10 TB limit
      objects: 345000,
      lastModified: '1 week ago',
      created: '2023-07-15',
      storageClass: 'Glacier',
      versioning: false,
      encryption: true,
      publicRead: false,
      cost: 185.30,
    },
  ]

    // Mock data
    export const notifications = [
      { id: 1, title: 'Upload completed', message: 'document.pdf uploaded to my-bucket successfully', time: '2 min ago', unread: true, type: 'upload' },
      { id: 2, title: 'Storage usage alert', message: 'Bucket "media-files" is 85% full', time: '1 hour ago', unread: true, type: 'storage' },
      { id: 3, title: 'Bucket created', message: 'New bucket "backup-2025" created successfully', time: '3 hours ago', unread: false, type: 'bucket' },
      { id: 4, title: 'File shared', message: 'presentation.pptx shared with team@company.com', time: '1 day ago', unread: false, type: 'sharing' },
    ];
  
    export const mockBuckets: Bucket[] = [
      { id: '1', name: 'my-documents', region: 'us-east-1', size: '2.3 GB' },
      { id: '2', name: 'media-files', region: 'us-west-2', size: '15.7 GB' },
      { id: '3', name: 'backup-2025', region: 'eu-central-1', size: '8.2 GB' },
      { id: '4', name: 'project-assets', region: 'ap-south-1', size: '4.1 GB' },
    ];


    export const filesMockdata: FileObject[] = [
      {
        id: '1',
        name: 'images',
        type: 'folder',
        size: 0,
        modified: '2 hours ago',
        storageClass: 'Standard',
        path: '/images',
      },
      {
        id: '2',
        name: 'documents',
        type: 'folder',
        size: 0,
        modified: '1 day ago',
        storageClass: 'Standard',
        path: '/documents',
      },
      {
        id: '3',
        name: 'config.json',
        type: 'file',
        size: 2048,
        modified: '3 hours ago',
        storageClass: 'Standard',
        path: '/config.json',
        mimeType: 'application/json',
      },
      {
        id: '4',
        name: 'backup.zip',
        type: 'file',
        size: 157286400,
        modified: '1 week ago',
        storageClass: 'Standard-IA',
        path: '/backup.zip',
        mimeType: 'application/zip',
      },
      {
        id: '5',
        name: 'logs.txt',
        type: 'file',
        size: 4096,
        modified: '2 days ago',
        storageClass: 'Standard',
        path: '/logs.txt',
        mimeType: 'text/plain',
      },
    ]
    

   export  const REGIONS = [
      { value: 'us-east-1', label: 'US East (N. Virginia)', description: 'Lowest latency for US East Coast' },
      { value: 'us-west-2', label: 'US West (Oregon)', description: 'Lowest latency for US West Coast' },
      { value: 'eu-west-1', label: 'Europe (Ireland)', description: 'Lowest latency for Europe' },
      { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)', description: 'Lowest latency for India' },
      { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)', description: 'Lowest latency for Southeast Asia' },
    ];
    
    export const STORAGE_CLASSES = [
      {
        value: 'Standard',
        label: 'Standard',
        description: 'For frequently accessed data',
        cost: '$0.023/GB/month',
        color: 'green',
      },
      {
        value: 'Standard-IA',
        label: 'Standard-IA',
        description: 'For infrequently accessed data',
        cost: '$0.0125/GB/month',
        color: 'orange',
      },
      {
        value: 'Glacier',
        label: 'Glacier',
        description: 'For long-term archival',
        cost: '$0.004/GB/month',
        color: 'blue',
      },
    ];

    export const plans = [
      {
        id: 'pro',
        name: 'Pro',
        icon: StarIcon,
        price: '$29.99',
        period: '/month',
        description: 'Perfect for growing teams and businesses',
        features: [
          'Unlimited storage',
          'Advanced analytics',
          'Priority support',
          'Custom branding',
          'Team collaboration',
          'API access',
        ],
        popular: true,
        color: 'purple',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        icon: ViewIcon,
        price: '$99.99',
        period: '/month',
        description: 'For large organizations with complex needs',
        features: [
          'Everything in Pro',
          'Dedicated account manager',
          'Custom integrations',
          'Advanced security',
          'SLA guarantees',
          'On-premise options',
        ],
        popular: false,
        color: 'orange',
      },
    ];

// Analytics mock data
export const analyticsData = {
  totalStorage: 83.4,
  storageLimit: 100,
  monthlyCost: 124.67,
  costTrend: 12.3,
  requests: 45678,
  requestsTrend: -5.2,
  bandwidth: 1.2,
  bandwidthTrend: 18.7,
  topBuckets: [
    { name: 'production-assets', size: 25.6, cost: 34.21, requests: 15420, trend: 'up' },
    { name: 'backup-data', size: 40.2, cost: 52.45, requests: 8930, trend: 'down' },
    { name: 'media-uploads', size: 15.8, cost: 28.91, requests: 18200, trend: 'up' },
    { name: 'logs-archive', size: 2.3, cost: 9.10, requests: 3128, trend: 'stable' },
  ],
  storageByType: [
    { type: 'Standard', size: 45.2, percentage: 54.2, cost: 65.43, color: 'blue' },
    { type: 'Standard-IA', size: 28.7, percentage: 34.4, cost: 42.18, color: 'orange' },
    { type: 'Glacier', size: 9.5, percentage: 11.4, cost: 17.06, color: 'teal' },
  ],
  costBreakdown: [
    { category: 'Storage', amount: 89.45, percentage: 71.8, icon: 'ViewIcon', color: 'blue' },
    { category: 'Requests', amount: 23.12, percentage: 18.5, icon: 'ArrowUpIcon', color: 'green' },
    { category: 'Data Transfer', amount: 12.10, percentage: 9.7, icon: 'DownloadIcon', color: 'orange' },
  ],
  alerts: [
    { type: 'warning', message: 'Storage usage is at 83% of limit', severity: 'medium' },
    { type: 'info', message: 'Monthly costs increased by 12.3%', severity: 'low' },
    { type: 'success', message: 'All backups completed successfully', severity: 'low' },
  ],
};

 // Mock data - replace with real data
 export const costData = {
  current: {
    total: 124.67,
    storage: 89.45,
    requests: 23.12,
    transfer: 12.10,
  },
  previous: {
    total: 111.23,
    storage: 82.30,
    requests: 28.45,
    transfer: 10.25,
  },
  forecast: 138.50,
  bucketCosts: [
    { name: 'production-assets', cost: 45.23, percentage: 36.3 },
    { name: 'backup-data', cost: 32.18, percentage: 25.8 },
    { name: 'media-uploads', cost: 28.91, percentage: 23.2 },
    { name: 'logs-archive', cost: 18.35, percentage: 14.7 },
  ],
  costAlerts: [
    {
      type: 'warning',
      title: 'Budget Alert',
      description: 'Monthly spend is projected to exceed budget by 15%',
      severity: 'medium',
    },
    {
      type: 'info',
      title: 'Cost Optimization',
      description: 'Consider moving infrequently accessed data to Standard-IA',
      severity: 'low',
    },
  ],
};


export const timeRanges = [
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'quarter', label: 'Last Quarter' },
  { value: 'year', label: 'Last Year' },
];


  // Mock data - replace with real data
  export const storageData = {
    totalUsed: 83.4,
    totalLimit: 100,
    byType: [
      {
        type: 'Standard',
        used: 45.2,
        total: 100,
        percentage: 54.2,
        cost: 65.43,
        color: 'blue',
        files: 1250,
      },
      {
        type: 'Standard-IA',
        used: 28.7,
        total: 100,
        percentage: 34.4,
        cost: 42.18,
        color: 'orange',
        files: 856,
      },
      {
        type: 'Glacier',
        used: 9.5,
        total: 100,
        percentage: 11.4,
        cost: 17.06,
        color: 'teal',
        files: 234,
      },
    ],
    byRegion: [
      { region: 'us-east-1', used: 35.2, percentage: 42.2, buckets: 5 },
      { region: 'us-west-2', used: 28.1, percentage: 33.7, buckets: 3 },
      { region: 'eu-west-1', used: 20.1, percentage: 24.1, buckets: 4 },
    ],
    growthTrend: {
      thisMonth: 12.3,
      lastMonth: 8.7,
      threeMonthsAgo: 5.2,
    },
    alerts: [
      {
        type: 'warning',
        title: 'Storage Limit Warning',
        description: 'You are using 83% of your storage limit',
        severity: 'medium',
      },
      {
        type: 'info',
        title: 'Growth Trend',
        description: 'Storage usage has increased by 12.3% this month',
        severity: 'low',
      },
    ],
  };