
import { ChevronUpIcon, ChevronDownIcon, ViewIcon, WarningIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { ReactElement } from 'react';

/**
 * Format storage size from GB to human readable format
 */
export const formatSize = (sizeInGB: number): string => {
  if (sizeInGB >= 1000) {
    return `${(sizeInGB / 1000).toFixed(1)} TB`;
  }
  return `${sizeInGB.toFixed(1)} GB`;
};

/**
 * Get storage usage color based on percentage
 */
export const getStorageUsageColor = (used: number, limit: number): string => {
  const usage = (used / limit) * 100;
  if (usage >= 90) return 'red';
  if (usage >= 75) return 'orange';
  return 'blue';
};

/**
 * Get trend icon based on trend direction
 */
export const getTrendIcon = (trend: string): ReactElement => {
  switch (trend) {
    case 'up': 
      return <ChevronUpIcon color="green.500" boxSize={4} />;
    case 'down': 
      return <ChevronDownIcon color="red.500" boxSize={4} />;
    default: 
      return <ViewIcon color="gray.500" boxSize={4} />;
  }
};

/** 
 * Get alert icon based on alert type
 */
export const getAlertIcon = (type: string): ReactElement => {
  switch (type) {
    case 'warning': 
      return <WarningIcon color="orange.500" />;
    case 'success': 
      return <CheckCircleIcon color="green.500" />;
    default: 
      return <ViewIcon color="blue.500" />;
  }
};

/**
 * Calculate percentage change between two values
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Format currency values
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Get color scheme for trend badges
 */
export const getTrendColorScheme = (trend: string): string => {
  switch (trend) {
    case 'up': return 'green';
    case 'down': return 'red';
    default: return 'gray';
  }
};

/**
 * Get severity color for alerts
 */
export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'blue';
    default: return 'gray';
  }
};


export const getTrendIcons = (trend: string, change: number) => {
  if (trend === 'up') {
    return <ChevronUpIcon color="red.500" boxSize={3} />;
  } else if (trend === 'down') {
    return <ChevronDownIcon color="green.500" boxSize={3} />;
  }
  return <ViewIcon color="gray.500" boxSize={3} />;
};

export const calculateChange = (current: number, previous?: number) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};



export const formatValue = (value: number, unit: string) => {
  if (unit === 'requests' && value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  if (value >= 1000 && (unit === 'GB' || unit === 'TB')) {
    return unit === 'GB' ? `${(value / 1000).toFixed(1)} TB` : `${value.toFixed(1)} ${unit}`;
  }
  return `${value.toFixed(1)} ${unit}`;
};

export const getUsagePercentage = (used: number, total: number) => {
  return Math.min((used / total) * 100, 100);
};

export const getUsageColor = (percentage: number) => {
  if (percentage >= 90) return 'red';
  if (percentage >= 75) return 'orange';
  return 'green';
};

export const getTrendColor = (direction: string) => {
  switch (direction) {
    case 'up': return 'red.500';
    case 'down': return 'green.500';
    default: return 'gray.500';
  }
};


export const getUsageColors = (percentage: number) => {
  if (percentage >= 90) return 'red';
  if (percentage >= 75) return 'orange';
  if (percentage >= 50) return 'yellow';
  return 'green';
};

export const formatSizes = (sizeInGB: number): string => {
  if (sizeInGB >= 1000) {
    return `${(sizeInGB / 1000).toFixed(1)} TB`;
  }
  return `${sizeInGB.toFixed(1)} GB`;
};
