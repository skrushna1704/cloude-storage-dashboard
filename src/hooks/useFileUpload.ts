/**
 * useFileUpload hook - provides file upload functionality with progress tracking
 */

import { useState, useCallback } from 'react';

interface FileUploadRequest {
  file: File;
  bucketId: string;
  key?: string;
}

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
}

export const useFileUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
  });

  const uploadFile = useCallback(async (request: FileUploadRequest) => {
    setUploadState(prev => ({
      ...prev,
      uploading: true,
      progress: 0,
      error: null,
    }));

    try {
      // Simulate file upload
      const result = await new Promise<{ success: boolean; key: string }>((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 20;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            resolve({ success: true, key: request.key || request.file.name });
          }
          setUploadState(prev => ({ ...prev, progress }));
        }, 200);
      });

      setUploadState(prev => ({
        ...prev,
        uploading: false,
        progress: 100,
      }));

      return result;
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      }));
      throw error;
    }
  }, []);

  const resetUploadState = useCallback(() => {
    setUploadState({
      uploading: false,
      progress: 0,
      error: null,
    });
  }, []);

  return {
    uploadFile,
    uploadState,
    resetUploadState,
  };
};
