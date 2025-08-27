import React, { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Flex,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { ChevronDownIcon, DownloadIcon, CalendarIcon, WarningIcon } from '@chakra-ui/icons';
import { CostChart } from '../Charts/CostChart';

interface CostAnalyticsProps {
  timeRange?: 'week' | 'month' | 'quarter' | 'year';
}

export const CostAnalytics: React.FC<CostAnalyticsProps> = ({
  timeRange = 'month'
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mock data - replace with real data
  const costData = {
    current: {
      total: 124.67,
      storage: 89.45,
      requests: 23.12,
      transfer: 12.10,
    },
    previous: {
      total: 111.23,
      storage: 82.30,
      requests: 28.45,
      transfer: 10.25,
    },
    forecast: 138.50,
    bucketCosts: [
      { name: 'production-assets', cost: 45.23, percentage: 36.3 },
      { name: 'backup-data', cost: 32.18, percentage: 25.8 },
      { name: 'media-uploads', cost: 28.91, percentage: 23.2 },
      { name: 'logs-archive', cost: 18.35, percentage: 14.7 },
    ],
    costAlerts: [
      {
        type: 'warning',
        title: 'Budget Alert',
        description: 'Monthly spend is projected to exceed budget by 15%',
        severity: 'medium',
      },
      {
        type: 'info',
        title: 'Cost Optimization',
        description: 'Consider moving infrequently accessed data to Standard-IA',
        severity: 'low',
      },
    ],
  };

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const timeRanges = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' },
  ];

  const totalChange = calculateChange(costData.current.total, costData.previous.total);
  const storageChange = calculateChange(costData.current.storage, costData.previous.storage);
  const requestsChange = calculateChange(costData.current.requests, costData.previous.requests);
  const transferChange = calculateChange(costData.current.transfer, costData.previous.transfer);

  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" spacing={1}>
          <Heading size="lg" bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text">
            Cost Analytics
          </Heading>
          <Text color="gray.600">
            Monitor and optimize your cloud storage costs
          </Text>
        </VStack>
        
        <HStack spacing={3}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline">
              {timeRanges.find(t => t.value === selectedTimeRange)?.label}
            </MenuButton>
            <MenuList>
              {timeRanges.map((range) => (
                <MenuItem
                  key={range.value}
                  onClick={() => setSelectedTimeRange(range.value as any)}
                >
                  {range.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          
          <Button leftIcon={<DownloadIcon />} variant="outline">
            Export Report
          </Button>
        </HStack>
      </Flex>

      {/* Cost Alerts */}
      {costData.costAlerts.length > 0 && (
        <VStack spacing={3} mb={6}>
          {costData.costAlerts.map((alert, index) => (
            <Alert
              key={index}
              status={alert.type as any}
              borderRadius="lg"
              variant="left-accent"
            >
              <AlertIcon />
              <Box flex="1">
                <AlertTitle fontSize="sm">{alert.title}</AlertTitle>
                <AlertDescription fontSize="xs">{alert.description}</AlertDescription>
              </Box>
              <Badge
                colorScheme={alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'orange' : 'blue'}
              >
                {alert.severity}
              </Badge>
            </Alert>
          ))}
        </VStack>
      )}

      {/* Cost Overview Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="blue.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Total Cost</StatLabel>
              <StatNumber fontSize="2xl" color="blue.500">
                ${costData.current.total.toFixed(2)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={totalChange > 0 ? 'increase' : 'decrease'} />
                {Math.abs(totalChange).toFixed(1)}% from last period
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="green.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Storage Cost</StatLabel>
              <StatNumber fontSize="2xl" color="green.500">
                ${costData.current.storage.toFixed(2)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={storageChange > 0 ? 'increase' : 'decrease'} />
                {Math.abs(storageChange).toFixed(1)}% from last period
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="purple.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Request Cost</StatLabel>
              <StatNumber fontSize="2xl" color="purple.500">
                ${costData.current.requests.toFixed(2)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={requestsChange > 0 ? 'increase' : 'decrease'} />
                {Math.abs(requestsChange).toFixed(1)}% from last period
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="orange.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Forecast</StatLabel>
              <StatNumber fontSize="2xl" color="orange.500">
                ${costData.forecast.toFixed(2)}
              </StatNumber>
              <StatHelpText>
                Next month projection
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Charts Row */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Cost Breakdown Chart */}
        <CostChart
          title="Cost Distribution"
          totalCost={costData.current.total}
        />

        {/* Cost by Bucket */}
        <Card bg={cardBg} shadow="md" borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <CardHeader>
            <Heading size="md">Cost by Bucket</Heading>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={4} align="stretch">
              {costData.bucketCosts.map((bucket) => (
                <Box key={bucket.name}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      {bucket.name}
                    </Text>
                    <VStack align="end" spacing={0}>
                      <Text fontSize="sm" fontWeight="bold" color="green.600">
                        ${bucket.cost.toFixed(2)}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {bucket.percentage}%
                      </Text>
                    </VStack>
                  </Flex>
                  <Box
                    h="6px"
                    bg="gray.100"
                    borderRadius="full"
                    overflow="hidden"
                  >
                    <Box
                      h="100%"
                      bg="linear-gradient(90deg, #667eea 0%, #764ba2 100%)"
                      width={`${bucket.percentage}%`}
                      borderRadius="full"
                    />
                  </Box>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Cost Optimization Recommendations */}
      <Card bg={cardBg} shadow="md" borderRadius="xl" border="1px solid" borderColor={borderColor}>
        <CardHeader>
          <Heading size="md">Cost Optimization Recommendations</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <VStack spacing={4} align="stretch">
            <Box
              p={4}
              bg="green.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="green.200"
              borderLeft="4px solid"
              borderLeftColor="green.500"
            >
              <HStack spacing={3}>
                <CalendarIcon color="green.600" boxSize={5} />
                <VStack align="start" spacing={1} flex="1">
                  <Text fontSize="sm" fontWeight="semibold" color="green.700">
                    Move to Standard-IA Storage
                  </Text>
                  <Text fontSize="xs" color="green.600">
                    Save up to $23/month by moving infrequently accessed files to Standard-IA storage class
                  </Text>
                </VStack>
                <Badge colorScheme="green" variant="solid">
                  $23 savings
                </Badge>
              </HStack>
            </Box>

            <Box
              p={4}
              bg="blue.50"
              borderRadius="lg"
              border="1px solid"
              borderColor="blue.200"
              borderLeft="4px solid"
              borderLeftColor="blue.500"
            >
              <HStack spacing={3}>
                <WarningIcon color="blue.600" boxSize={5} />
                <VStack align="start" spacing={1} flex="1">
                  <Text fontSize="sm" fontWeight="semibold" color="blue.700">
                    Lifecycle Policies
                  </Text>
                  <Text fontSize="xs" color="blue.600">
                    Set up automatic transitions to Glacier for long-term archival data
                  </Text>
                </VStack>
                <Badge colorScheme="blue" variant="solid">
                  $15 savings
                </Badge>
              </HStack>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};
