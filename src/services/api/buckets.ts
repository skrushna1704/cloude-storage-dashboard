export const fetchBuckets = async () => {
  // Mock buckets data
  return [
    {
      id: '1',
      name: 'my-bucket-1',
      region: 'us-east-1',
      size: 1024 * 1024 * 1024 * 25, // 25GB
      objectCount: 1250,
      status: 'active',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'my-bucket-2',
      region: 'us-west-2',
      size: 1024 * 1024 * 1024 * 40, // 40GB
      objectCount: 2100,
      status: 'active',
      createdAt: new Date('2024-02-20'),
    },
  ];
};
