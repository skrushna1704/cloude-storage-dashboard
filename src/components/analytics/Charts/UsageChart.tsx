import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Badge,
  useColorModeValue,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';

interface UsageData {
  label: string;
  used: number;
  total: number;
  unit: string;
  color: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
}

interface UsageChartProps {
  data?: UsageData[];
  title?: string;
  showCircular?: boolean;
}

export const UsageChart: React.FC<UsageChartProps> = ({
  data = [
    {
      label: 'Storage',
      used: 83.4,
      total: 100,
      unit: 'GB',
      color: 'blue',
      trend: { direction: 'up', percentage: 12.3 },
    },
    {
      label: 'API Calls',
      used: 45678,
      total: 100000,
      unit: 'requests',
      color: 'green',
      trend: { direction: 'down', percentage: 5.2 },
    },
    {
      label: 'Bandwidth',
      used: 1.2,
      total: 10,
      unit: 'TB',
      color: 'orange',
      trend: { direction: 'up', percentage: 18.7 },
    },
    {
      label: 'Objects',
      used: 4567,
      total: 10000,
      unit: 'files',
      color: 'purple',
      trend: { direction: 'stable', percentage: 0.8 },
    },
  ],
  title = 'Usage Overview',
  showCircular = false,
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const formatValue = (value: number, unit: string) => {
    if (unit === 'requests' && value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    if (value >= 1000 && (unit === 'GB' || unit === 'TB')) {
      return unit === 'GB' ? `${(value / 1000).toFixed(1)} TB` : `${value.toFixed(1)} ${unit}`;
    }
    return `${value.toFixed(1)} ${unit}`;
  };

  const getUsagePercentage = (used: number, total: number) => {
    return Math.min((used / total) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'red';
    if (percentage >= 75) return 'orange';
    return 'green';
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'red.500';
      case 'down': return 'green.500';
      default: return 'gray.500';
    }
  };

  if (showCircular) {
    return (
      <Card bg={cardBg} shadow="md" borderRadius="xl" border="1px solid" borderColor={borderColor}>
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        
        <CardBody>
          <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={6}>
            {data.map((item) => {
              const percentage = getUsagePercentage(item.used, item.total);
              
              return (
                <GridItem key={item.label}>
                  <VStack spacing={3}>
                    <CircularProgress
                      value={percentage}
                      color={`${item.color}.500`}
                      size="120px"
                      thickness="8px"
                    >
                      <CircularProgressLabel>
                        <VStack spacing={0}>
                          <Text fontSize="lg" fontWeight="bold" color={`${item.color}.600`}>
                            {percentage.toFixed(0)}%
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            used
                          </Text>
                        </VStack>
                      </CircularProgressLabel>
                    </CircularProgress>
                    
                    <VStack spacing={1} textAlign="center">
                      <Text fontSize="sm" fontWeight="semibold">
                        {item.label}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatValue(item.used, item.unit)} of {formatValue(item.total, item.unit)}
                      </Text>
                      {item.trend && (
                        <Badge
                          colorScheme={item.trend.direction === 'up' ? 'red' : item.trend.direction === 'down' ? 'green' : 'gray'}
                          size="sm"
                        >
                          {item.trend.direction === 'up' ? '↑' : item.trend.direction === 'down' ? '↓' : '→'} {item.trend.percentage}%
                        </Badge>
                      )}
                    </VStack>
                  </VStack>
                </GridItem>
              );
            })}
          </Grid>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card bg={cardBg} shadow="md" borderRadius="xl" border="1px solid" borderColor={borderColor}>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      
      <CardBody>
        <VStack spacing={6} align="stretch">
          {data.map((item) => {
            const percentage = getUsagePercentage(item.used, item.total);
            const usageColor = getUsageColor(percentage);
            
            return (
              <Box key={item.label}>
                <Flex justify="space-between" align="center" mb={3}>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                      {item.label}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatValue(item.used, item.unit)} of {formatValue(item.total, item.unit)}
                    </Text>
                  </VStack>
                  
                  <HStack spacing={3}>
                    {item.trend && (
                      <VStack align="end" spacing={0}>
                        <Text
                          fontSize="xs"
                          color={getTrendColor(item.trend.direction)}
                          fontWeight="medium"
                        >
                          {item.trend.direction === 'up' ? '↑' : item.trend.direction === 'down' ? '↓' : '→'} {item.trend.percentage}%
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          vs last month
                        </Text>
                      </VStack>
                    )}
                    
                    <VStack align="end" spacing={0}>
                      <Text fontSize="lg" fontWeight="bold" color={`${item.color}.600`}>
                        {percentage.toFixed(1)}%
                      </Text>
                      <Badge
                        colorScheme={usageColor}
                        size="sm"
                        variant="subtle"
                      >
                        {percentage >= 90 ? 'Critical' : percentage >= 75 ? 'High' : 'Normal'}
                      </Badge>
                    </VStack>
                  </HStack>
                </Flex>
                
                <Progress
                  value={percentage}
                  colorScheme={item.color}
                  size="lg"
                  borderRadius="full"
                  bg="gray.100"
                />
                
                <Flex justify="space-between" mt={2}>
                  <Text fontSize="xs" color="gray.500">
                    0 {item.unit}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {formatValue(item.total, item.unit)}
                  </Text>
                </Flex>
              </Box>
            );
          })}
          
          {/* Overall Usage Summary */}
          <Box
            p={4}
            bg="blue.50"
            borderRadius="lg"
            border="1px solid"
            borderColor="blue.200"
            borderLeft="4px solid"
            borderLeftColor="blue.500"
          >
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold" color="blue.700">
                  Overall Resource Usage
                </Text>
                <Text fontSize="xs" color="blue.600">
                  Across all services and regions
                </Text>
              </VStack>
              <Badge colorScheme="blue" variant="solid" px={3} py={1}>
                {data.length} Resources Monitored
              </Badge>
            </HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};
