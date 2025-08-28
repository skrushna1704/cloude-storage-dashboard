export const formatSize = (sizeInGB: number): string => {
    if (sizeInGB >= 1000) {
      return `${(sizeInGB / 1000).toFixed(1)} TB`;
    }
    return `${sizeInGB.toFixed(1)} GB`;
  };

  export const getStorageClassColor = (storageClass: string) => {
    switch (storageClass) {
      case 'Standard':
        return 'green';
      case 'Standard-IA':
        return 'orange';
      case 'Glacier':
        return 'blue';
      case 'Glacier Deep Archive':
        return 'purple';
      default:
        return 'gray';
    }
  };

  export const getUsagePercentage = (bucket: any) => {
    if (!bucket.sizeLimit) return 0;
    return Math.min((bucket.size / bucket.sizeLimit) * 100, 100);
  };

  export const getUsageColor = (bucket: any) => {
    const percentage = getUsagePercentage(bucket);
    if (percentage >= 90) return 'red';
    if (percentage >= 75) return 'orange';
    return 'blue';
  };