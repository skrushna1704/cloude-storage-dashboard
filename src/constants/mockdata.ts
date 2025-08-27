import { FileObject } from "../types/bucket";
import { Bucket } from "../types/header";

export const BUCKETS = [
    {
      id: '1',
      name: 'production-assets',
      region: 'us-east-1',
      size: 25.6,
      sizeLimit: 100,
      objects: 1250,
      lastModified: '2 hours ago',
      created: '2023-08-15',
      storageClass: 'Standard',
      versioning: true,
      encryption: true,
      publicRead: false,
      cost: 12.45,
    },
    {
      id: '2',
      name: 'backup-data',
      region: 'us-west-2',
      size: 40.2,
      sizeLimit: 200,
      objects: 2100,
      lastModified: '1 day ago',
      created: '2023-08-10',
      storageClass: 'Standard-IA',
      versioning: false,
      encryption: true,
      publicRead: false,
      cost: 8.75,
    },
    {
      id: '3',
      name: 'media-uploads',
      region: 'eu-west-1',
      size: 15.8,
      sizeLimit: 50,
      objects: 856,
      lastModified: '3 hours ago',
      created: '2023-08-20',
      storageClass: 'Standard',
      versioning: true,
      encryption: false,
      publicRead: true,
      cost: 5.20,
    },
    {
      id: '4',
      name: 'logs-archive',
      region: 'ap-south-1',
      size: 2.3,
      sizeLimit: 10,
      objects: 345,
      lastModified: '1 week ago',
      created: '2023-07-15',
      storageClass: 'Glacier',
      versioning: false,
      encryption: true,
      publicRead: false,
      cost: 1.85,
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
    