export const fetchAnalytics = async () => {
  // Mock analytics data
  return {
    storageUsage: {
      total: 1024 * 1024 * 1024 * 100, // 100GB
      used: 1024 * 1024 * 1024 * 65,   // 65GB
      available: 1024 * 1024 * 1024 * 35, // 35GB
    },
    costData: {
      monthly: 45.67,
      yearly: 548.04,
    },
    usageTrends: [
      { month: 'Jan', usage: 50 },
      { month: 'Feb', usage: 55 },
      { month: 'Mar', usage: 60 },
      { month: 'Apr', usage: 65 },
    ],
  };
};
