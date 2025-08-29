import { API_BASE_URL } from './constants';

export interface ObjectMetadata {
  key: string;
  name: string;
  size: number;
  isFolder: boolean;
  lastModified: string;
  contentType: string;
  etag: string;
  storageClass: string;
  metadata: Record<string, any>;
}

export interface CreateObjectRequest {
  key: string;
  name: string;
  size?: number;
  isFolder?: boolean;
  contentType?: string;
  metadata?: Record<string, any>;
}

export const fetchObjects = async (bucketId: string, path: string = '/'): Promise<ObjectMetadata[]> => {
  const response = await fetch(`${API_BASE_URL}/buckets/${bucketId}/objects?path=${encodeURIComponent(path)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch objects');
  }
  return response.json();
};

export const createObject = async (bucketId: string, objectData: CreateObjectRequest): Promise<ObjectMetadata> => {
  const response = await fetch(`${API_BASE_URL}/buckets/${bucketId}/objects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objectData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create object');
  }
  return response.json();
};

export const deleteObject = async (bucketId: string, key: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/buckets/${bucketId}/objects/${encodeURIComponent(key)}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete object');
  }
};

export const downloadObject = async (bucketId: string, key: string, filename?: string): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/buckets/${bucketId}/objects/${encodeURIComponent(key)}/download`);
  
  if (!response.ok) {
    throw new Error('Failed to download object');
  }
  
  return response.blob();
};

export const downloadObjects = async (bucketId: string, keys: string[]): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/buckets/${bucketId}/objects/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keys }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to download objects');
  }
  
  return response.blob();
};

export const uploadFile = async (bucketId: string, file: File, key?: string): Promise<{ success: boolean; object: ObjectMetadata }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucketId', bucketId);
  if (key) {
    formData.append('key', key);
  }

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
  return response.json();
};
