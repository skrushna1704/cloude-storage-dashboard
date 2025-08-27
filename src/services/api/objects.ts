export const fetchObjects = async (bucketId: string, path: string = '/') => {
  // Mock objects data
  return [
    {
      key: 'documents/',
      name: 'documents',
      size: 0,
      isFolder: true,
      lastModified: new Date('2024-03-15'),
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
      lastModified: new Date('2024-03-14'),
      contentType: 'application/pdf',
      etag: 'abc123',
      storageClass: 'STANDARD',
      metadata: {},
    },
  ];
};
