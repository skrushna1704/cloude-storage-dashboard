/**
 * Utility functions for handling file downloads
 */

/**
 * Downloads a single file from a blob
 */
export const downloadFile = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Downloads multiple files as a zip
 */
export const downloadFiles = (blob: Blob, filename: string): void => {
  downloadFile(blob, filename);
};

/**
 * Creates a download link for a file
 */
export const createDownloadLink = (blob: Blob, filename: string): string => {
  const url = URL.createObjectURL(blob);
  return url;
};

/**
 * Cleans up a download URL
 */
export const cleanupDownloadUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};
