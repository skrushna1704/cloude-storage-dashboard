import React from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  VStack,
  HStack,
  useColorModeValue,
  Badge,
  Flex,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,


  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  ViewIcon,
  DownloadIcon,
  WarningIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowUpIcon,
} from '@chakra-ui/icons';

export const Analytics: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const tableRowHoverBg = useColorModeValue('gray.50', 'gray.700');
  
  // Mock analytics data
  const analyticsData = {
    totalStorage: 83.4,
    storageLimit: 100,
    monthlyCost: 124.67,
    costTrend: 12.3,
    requests: 45678,
    requestsTrend: -5.2,
    bandwidth: 1.2,
    bandwidthTrend: 18.7,
    topBuckets: [
      { name: 'production-assets', size: 25.6, cost: 34.21, requests: 15420, trend: 'up' },
      { name: 'backup-data', size: 40.2, cost: 52.45, requests: 8930, trend: 'down' },
      { name: 'media-uploads', size: 15.8, cost: 28.91, requests: 18200, trend: 'up' },
      { name: 'logs-archive', size: 2.3, cost: 9.10, requests: 3128, trend: 'stable' },
    ],
    storageByType: [
      { type: 'Standard', size: 45.2, percentage: 54.2, cost: 65.43, color: 'blue' },
      { type: 'Standard-IA', size: 28.7, percentage: 34.4, cost: 42.18, color: 'orange' },
      { type: 'Glacier', size: 9.5, percentage: 11.4, cost: 17.06, color: 'teal' },
    ],
    costBreakdown: [
      { category: 'Storage', amount: 89.45, percentage: 71.8, icon: ViewIcon, color: 'blue' },
      { category: 'Requests', amount: 23.12, percentage: 18.5, icon: ArrowUpIcon, color: 'green' },
      { category: 'Data Transfer', amount: 12.10, percentage: 9.7, icon: DownloadIcon, color: 'orange' },
    ],
    alerts: [
      { type: 'warning', message: 'Storage usage is at 83% of limit', severity: 'medium' },
      { type: 'info', message: 'Monthly costs increased by 12.3%', severity: 'low' },
      { type: 'success', message: 'All backups completed successfully', severity: 'low' },
    ],
  };

  const formatSize = (sizeInGB: number): string => {
    if (sizeInGB >= 1000) {
      return `${(sizeInGB / 1000).toFixed(1)} TB`;
    }
    return `${sizeInGB.toFixed(1)} GB`;
  };

  const getStorageUsageColor = () => {
    const usage = (analyticsData.totalStorage / analyticsData.storageLimit) * 100;
    if (usage >= 90) return 'red';
    if (usage >= 75) return 'orange';
    return 'blue';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ChevronUpIcon color="green.500" boxSize={4} />;
      case 'down': return <ChevronDownIcon color="red.500" boxSize={4} />;
      default: return <ViewIcon color="gray.500" boxSize={4} />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <WarningIcon color="orange.500" />;
      case 'success': return <CheckCircleIcon color="green.500" />;
      default: return <ViewIcon color="blue.500" />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8} direction={{ base: "column", md: "row" }} gap={4}>
        <VStack align="start" spacing={1}>
          <Heading size={{ base: "lg", md: "xl" }} bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text">
            Analytics Dashboard
          </Heading>
          <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
            Monitor your storage usage, costs, and performance metrics
          </Text>
        </VStack>
        
        <HStack spacing={3}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" size={{ base: "sm", md: "md" }}>
              Last 30 Days
            </MenuButton>
            <MenuList>
              <MenuItem>Last 7 Days</MenuItem>
              <MenuItem>Last 30 Days</MenuItem>
              <MenuItem>Last 90 Days</MenuItem>
              <MenuItem>Last Year</MenuItem>
            </MenuList>
          </Menu>
          <Button leftIcon={<DownloadIcon />} variant="outline" size={{ base: "sm", md: "md" }}>
            Export Report
          </Button>
        </HStack>
      </Flex>

      {/* Alerts */}
      {analyticsData.alerts.length > 0 && (
        <Card bg={cardBg} shadow="md" borderRadius="xl" mb={8} border="1px solid" borderColor="orange.200">
          <CardHeader pb={2}>
            <HStack>
              <WarningIcon color="orange.500" />
              <Heading size="md">Recent Alerts</Heading>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={3} align="stretch">
              {analyticsData.alerts.map((alert, index) => (
                <HStack key={index} p={3} bg="orange.50" borderRadius="lg" spacing={3}>
                  {getAlertIcon(alert.type)}
                  <Text flex="1" fontSize="sm">
                    {alert.message}
                  </Text>
                  <Badge colorScheme={alert.severity === 'high' ? 'red' : alert.severity === 'medium' ? 'orange' : 'blue'}>
                    {alert.severity}
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Main Metrics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="blue.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>Total Storage</StatLabel>
              <StatNumber fontSize="2xl" color="blue.500" mb={2}>
                {formatSize(analyticsData.totalStorage)}
              </StatNumber>
              <Progress
                value={(analyticsData.totalStorage / analyticsData.storageLimit) * 100}
                colorScheme={getStorageUsageColor()}
                size="sm"
                borderRadius="full"
                mb={2}
              />
              <StatHelpText fontSize="xs">
                {((analyticsData.totalStorage / analyticsData.storageLimit) * 100).toFixed(1)}% of {formatSize(analyticsData.storageLimit)} limit
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="green.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>Monthly Cost</StatLabel>
              <StatNumber fontSize="2xl" color="green.500" mb={2}>
                ${analyticsData.monthlyCost}
              </StatNumber>
              <StatHelpText fontSize="xs">
                <StatArrow type={analyticsData.costTrend > 0 ? 'increase' : 'decrease'} />
                {Math.abs(analyticsData.costTrend)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="purple.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>API Requests</StatLabel>
              <StatNumber fontSize="2xl" color="purple.500" mb={2}>
                {analyticsData.requests.toLocaleString()}
              </StatNumber>
              <StatHelpText fontSize="xs">
                <StatArrow type={analyticsData.requestsTrend > 0 ? 'increase' : 'decrease'} />
                {Math.abs(analyticsData.requestsTrend)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="orange.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>Bandwidth</StatLabel>
              <StatNumber fontSize="2xl" color="orange.500" mb={2}>
                {analyticsData.bandwidth.toFixed(1)} TB
              </StatNumber>
              <StatHelpText fontSize="xs">
                <StatArrow type={analyticsData.bandwidthTrend > 0 ? 'increase' : 'decrease'} />
                {Math.abs(analyticsData.bandwidthTrend)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Charts Row */}
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={6} mb={8}>
        {/* Storage by Type */}
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardHeader>
            <Heading size="md">Storage by Class</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {analyticsData.storageByType.map((item) => (
                <Box key={item.type}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <HStack>
                      <Box w={3} h={3} bg={`${item.color}.500`} borderRadius="full" />
                      <Text fontSize="sm" fontWeight="medium">{item.type}</Text>
                    </HStack>
                    <VStack align="end" spacing={0}>
                      <Text fontSize="sm" fontWeight="semibold">{formatSize(item.size)}</Text>
                      <Text fontSize="xs" color="gray.500">${item.cost}</Text>
                    </VStack>
                  </Flex>
                  <Progress
                    value={item.percentage}
                    colorScheme={item.color}
                    size="sm"
                    borderRadius="full"
                  />
                  <Text fontSize="xs" color="gray.500" mt={1}>
                    {item.percentage.toFixed(1)}% of total storage
                  </Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Cost Breakdown */}
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardHeader>
            <Heading size="md">Cost Breakdown</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {analyticsData.costBreakdown.map((item) => (
                <Box key={item.category}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <HStack>
                      <Icon as={item.icon} color={`${item.color}.500`} boxSize={4} />
                      <Text fontSize="sm" fontWeight="medium">{item.category}</Text>
                    </HStack>
                    <VStack align="end" spacing={0}>
                      <Text fontSize="sm" fontWeight="semibold">${item.amount}</Text>
                      <Text fontSize="xs" color="gray.500">{item.percentage}%</Text>
                    </VStack>
                  </Flex>
                  <Progress
                    value={item.percentage}
                    colorScheme={item.color}
                    size="sm"
                    borderRadius="full"
                  />
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Top Buckets Table */}
      <Card bg={cardBg} shadow="md" borderRadius="xl">
        <CardHeader>
          <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={3}>
            <Heading size={{ base: "md", md: "md" }}>Top Buckets by Usage</Heading>
            <Button size={{ base: "sm", md: "sm" }} variant="outline" leftIcon={<ViewIcon />}>
              View All
            </Button>
          </Flex>
        </CardHeader>
        <CardBody pt={0}>
          <Box overflowX="auto">
            <Table variant="simple" size={{ base: "sm", md: "md" }}>
              <Thead>
                <Tr>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                    BUCKET NAME
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" isNumeric>
                    SIZE
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" isNumeric>
                    MONTHLY COST
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" isNumeric>
                    REQUESTS
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                    TREND
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {analyticsData.topBuckets.map((bucket, index) => (
                  <Tr
                    key={bucket.name}
                    _hover={{ bg: tableRowHoverBg }}
                  >
                    <Td border="none" py={4}>
                      <Text fontWeight="medium">{bucket.name}</Text>
                    </Td>
                    <Td border="none" py={4} isNumeric>
                      <Text fontSize="sm">{formatSize(bucket.size)}</Text>
                    </Td>
                    <Td border="none" py={4} isNumeric>
                      <Text fontSize="sm" fontWeight="semibold" color="green.600">
                        ${bucket.cost}
                      </Text>
                    </Td>
                    <Td border="none" py={4} isNumeric>
                      <Text fontSize="sm">{bucket.requests.toLocaleString()}</Text>
                    </Td>
                    <Td border="none" py={4}>
                      <HStack spacing={1}>
                        {getTrendIcon(bucket.trend)}
                        <Badge
                          colorScheme={
                            bucket.trend === 'up' ? 'green' : 
                            bucket.trend === 'down' ? 'red' : 'gray'
                          }
                          size="sm"
                        >
                          {bucket.trend}
                        </Badge>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Analytics;
