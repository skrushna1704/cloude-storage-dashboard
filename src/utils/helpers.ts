/**
 * General utility helper functions
 */

/**
 * Sleep/delay function for async operations
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after specified time
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  /**
   * Generate a random ID string
   * @param length - Length of the ID (default: 8)
   * @returns Random alphanumeric string
   */
  export const generateId = (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  /**
   * Deep clone an object
   * @param obj - Object to clone
   * @returns Deep cloned object
   */
  export const deepClone = <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
    if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
    if (typeof obj === 'object') {
      const cloned = {} as { [key: string]: any };
      Object.keys(obj).forEach(key => {
        cloned[key] = deepClone((obj as { [key: string]: any })[key]);
      });
      return cloned as T;
    }
    return obj;
  };
  
  /**
   * Debounce function execution
   * @param func - Function to debounce
   * @param wait - Wait time in milliseconds
   * @returns Debounced function
   */
  export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  };
  
  /**
   * Throttle function execution
   * @param func - Function to throttle
   * @param limit - Time limit in milliseconds
   * @returns Throttled function
   */
  export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };
  
  /**
   * Get file extension from filename
   * @param filename - Name of the file
   * @returns File extension (without dot) or empty string
   */
  export const getFileExtension = (filename: string): string => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) return '';
    return filename.slice(lastDotIndex + 1).toLowerCase();
  };
  
  /**
   * Get MIME type from file extension
   * @param extension - File extension
   * @returns MIME type string
   */
  export const getMimeType = (extension: string): string => {
    const mimeTypes: Record<string, string> = {
      // Images
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      bmp: 'image/bmp',
      ico: 'image/x-icon',
      
      // Documents
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      
      // Text
      txt: 'text/plain',
      html: 'text/html',
      css: 'text/css',
      js: 'text/javascript',
      json: 'application/json',
      xml: 'text/xml',
      csv: 'text/csv',
      
      // Archives
      zip: 'application/zip',
      rar: 'application/x-rar-compressed',
      tar: 'application/x-tar',
      gz: 'application/gzip',
      
      // Audio/Video
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      mp4: 'video/mp4',
      avi: 'video/x-msvideo',
      mov: 'video/quicktime',
    };
    
    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
  };
  
  /**
   * Check if a file is an image based on its extension
   * @param filename - Name of the file
   * @returns True if file is an image
   */
  export const isImage = (filename: string): boolean => {
    const extension = getFileExtension(filename);
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
    return imageExtensions.includes(extension);
  };
  
  /**
   * Check if a file is a text file based on its extension
   * @param filename - Name of the file
   * @returns True if file is a text file
   */
  export const isTextFile = (filename: string): boolean => {
    const extension = getFileExtension(filename);
    const textExtensions = ['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts', 'jsx', 'tsx', 'csv'];
    return textExtensions.includes(extension);
  };
  
  /**
   * Convert bytes to human readable format
   * @param bytes - Number of bytes
   * @returns Object with value and unit
   */
  export const bytesToSize = (bytes: number): { value: number; unit: string } => {
    if (bytes === 0) return { value: 0, unit: 'Bytes' };
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return {
      value: parseFloat((bytes / Math.pow(k, i)).toFixed(2)),
      unit: sizes[i],
    };
  };
  
  /**
   * Sort array of objects by a specific property
   * @param array - Array to sort
   * @param property - Property to sort by
   * @param direction - Sort direction ('asc' or 'desc')
   * @returns Sorted array
   */
  export const sortByProperty = <T>(
    array: T[],
    property: keyof T,
    direction: 'asc' | 'desc' = 'asc'
  ): T[] => {
    return [...array].sort((a, b) => {
      const aVal = a[property];
      const bVal = b[property];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  /**
   * Group array of objects by a specific property
   * @param array - Array to group
   * @param property - Property to group by
   * @returns Object with grouped items
   */
  export const groupBy = <T, K extends keyof T>(
    array: T[],
    property: K
  ): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const key = String(item[property]);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  };
  
  /**
   * Check if two objects are equal (shallow comparison)
   * @param obj1 - First object
   * @param obj2 - Second object
   * @returns True if objects are equal
   */
  export const shallowEqual = (obj1: any, obj2: any): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) return false;
    }
    
    return true;
  };
  
  /**
   * Create a safe filename by removing invalid characters
   * @param filename - Original filename
   * @returns Safe filename
   */
  export const createSafeFilename = (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/^_+|_+$/g, '');
  };