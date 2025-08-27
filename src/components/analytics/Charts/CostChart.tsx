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
  SimpleGrid,
  Badge,
  Icon,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { ViewIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface CostData {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  previousAmount?: number;
}

interface CostChartProps {
  data?: CostData[];
  title?: string;
  totalCost?: number;
}

export const CostChart: React.FC<CostChartProps> = ({
  data = [
    {
      category: 'Storage',
      amount: 89.45,
      percentage: 71.8,
      trend: 'up',
      color: 'blue',
      previousAmount: 82.30,
    },
    {
      category: 'API Requests',
      amount: 23.12,
      percentage: 18.5,
      trend: 'down',
      color: 'green',
      previousAmount: 28.45,
    },
    {
      category: 'Data Transfer',
      amount: 12.10,
      percentage: 9.7,
      trend: 'up',
      color: 'orange',
      previousAmount: 10.25,
    },
  ],
  title = 'Cost Breakdown',
  totalCost = 124.67,
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <ChevronUpIcon color="red.500" boxSize={3} />;
    } else if (trend === 'down') {
      return <ChevronDownIcon color="green.500" boxSize={3} />;
    }
    return <ViewIcon color="gray.500" boxSize={3} />;
  };

  const calculateChange = (current: number, previous?: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <Card bg={cardBg} shadow="md" borderRadius="xl" border="1px solid" borderColor={borderColor}>
      <CardHeader pb={2}>
        <Flex justify="space-between" align="center">
          <Heading size="md">{title}</Heading>
          <Badge colorScheme="green" px={3} py={1} borderRadius="full" fontSize="sm">
            ${totalCost.toFixed(2)}
          </Badge>
        </Flex>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack spacing={5} align="stretch">
          {data.map((item) => {
            const change = calculateChange(item.amount, item.previousAmount);
            
            return (
              <Box key={item.category}>
                <Flex justify="space-between" align="center" mb={3}>
                  <HStack spacing={3}>
                    <Box
                      w={4}
                      h={4}
                      bg={`${item.color}.500`}
                      borderRadius="full"
                      shadow="sm"
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                        {item.category}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.percentage}% of total
                      </Text>
                    </VStack>
                  </HStack>
                  
                  <VStack align="end" spacing={0}>
                    <HStack spacing={2}>
                      <Text fontSize="lg" fontWeight="bold" color={`${item.color}.600`}>
                        ${item.amount.toFixed(2)}
                      </Text>
                      {item.previousAmount && (
                        <HStack spacing={1}>
                          {getTrendIcon(item.trend, change)}
                          <Text
                            fontSize="xs"
                            color={item.trend === 'up' ? 'red.500' : item.trend === 'down' ? 'green.500' : 'gray.500'}
                            fontWeight="medium"
                          >
                            {Math.abs(change).toFixed(1)}%
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  </VStack>
                </Flex>
                
                <Progress
                  value={item.percentage}
                  colorScheme={item.color}
                  size="md"
                  borderRadius="full"
                  bg="gray.100"
                />
                
                <Flex justify="space-between" mt={2}>
                  <Text fontSize="xs" color="gray.500">
                    0%
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {item.percentage.toFixed(1)}%
                  </Text>
                </Flex>
              </Box>
            );
          })}
          
          {/* Summary */}
          <Box
            p={4}
            bg="gray.50"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            mt={2}
          >
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                  Total Monthly Cost
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Current billing period
                </Text>
              </VStack>
              <Text fontSize="xl" fontWeight="bold" color="purple.600">
                ${totalCost.toFixed(2)}
              </Text>
            </Flex>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};
