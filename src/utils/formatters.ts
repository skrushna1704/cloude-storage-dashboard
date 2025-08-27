/**
 * Utility functions for formatting data display
 */

/**
 * Format file size in bytes to human readable format
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
  
  /**
   * Format date to a readable string
   * @param date - Date object or string
   * @param options - Intl.DateTimeFormatOptions
   * @returns Formatted date string
   */
  export const formatDate = (
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  ): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  };
  
  /**
   * Format relative time (e.g., "2 hours ago", "3 days ago")
   * @param date - Date object or string
   * @returns Relative time string
   */
  export const formatRelativeTime = (date: Date | string): string => {
    const now = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }
  
    return 'just now';
  };
  
  /**
   * Format number with thousand separators
   * @param num - Number to format
   * @returns Formatted number string
   */
  export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  /**
   * Format currency amount
   * @param amount - Amount in cents or dollars
   * @param currency - Currency code (default: 'USD')
   * @param inCents - Whether amount is in cents (default: false)
   * @returns Formatted currency string
   */
  export const formatCurrency = (
    amount: number,
    currency: string = 'USD',
    inCents: boolean = false
  ): string => {
    const value = inCents ? amount / 100 : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value);
  };
  
  /**
   * Format percentage
   * @param value - Value between 0 and 1 (or 0 and 100 if isPercent is true)
   * @param decimals - Number of decimal places
   * @param isPercent - Whether input is already in percentage format
   * @returns Formatted percentage string
   */
  export const formatPercentage = (
    value: number,
    decimals: number = 1,
    isPercent: boolean = false
  ): string => {
    const percentage = isPercent ? value : value * 100;
    return `${percentage.toFixed(decimals)}%`;
  };
  
  /**
   * Truncate text with ellipsis
   * @param text - Text to truncate
   * @param maxLength - Maximum length before truncation
   * @returns Truncated text with ellipsis if needed
   */
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };
  
  /**
   * Format file path for display (show only filename or last few directories)
   * @param path - Full file path
   * @param maxSegments - Maximum number of path segments to show
   * @returns Formatted path string
   */
  export const formatPath = (path: string, maxSegments: number = 3): string => {
    const segments = path.split('/').filter(segment => segment.length > 0);
    
    if (segments.length <= maxSegments) {
      return path;
    }
  
    const displaySegments = segments.slice(-maxSegments);
    return `.../${displaySegments.join('/')}`;
  };
  
  /**
   * Convert camelCase or snake_case to Title Case
   * @param str - String to convert
   * @returns Title cased string
   */
  export const toTitleCase = (str: string): string => {
    return str
      .replace(/[_-]/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim();
  };