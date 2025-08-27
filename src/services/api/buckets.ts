import { API_BASE_URL } from './constants';

export interface Bucket {
  id: string;
  name: string;
  region: string;
  size: number;
  objectCount: number;
  status: string;
  createdAt: string;
}

export interface CreateBucketRequest {
  name: string;
  region?: string;
}

export const fetchBuckets = async (): Promise<Bucket[]> => {
  const response = await fetch(`${API_BASE_URL}/buckets`);
  if (!response.ok) {
    throw new Error('Failed to fetch buckets');
  }
  return response.json();
};

export const createBucket = async (bucketData: CreateBucketRequest): Promise<Bucket> => {
  const response = await fetch(`${API_BASE_URL}/buckets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bucketData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create bucket');
  }
  return response.json();
};

export const deleteBucket = async (bucketId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/buckets/${bucketId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete bucket');
  }
};
