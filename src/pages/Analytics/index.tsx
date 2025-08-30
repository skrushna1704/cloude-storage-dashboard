import React, { useState, useEffect } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import {
  ViewIcon,
  DownloadIcon,
  WarningIcon,
  ChevronDownIcon,
  ArrowUpIcon,
} from '@chakra-ui/icons';
import { testIds } from '../../shared/dataTestIds';
import { AnalyticsData } from '../../types/analytics';
import { analyticsApi } from '../../services/api/analytics';
import {
  formatSize,
  getStorageUsageColor,
  getTrendIcon,
  getAlertIcon,
  formatCurrency,
  formatNumber,
  getTrendColorScheme,
  getSeverityColor,
} from '../../utils/analytics';

export const Analytics: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const tableRowHoverBg = useColorModeValue('gray.50', 'gray.700');
  const toast = useToast();
  
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const data = await analyticsApi.getAnalyticsByPeriod(selectedPeriod);
      setAnalyticsData(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load analytics data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      const downloadUrl = await analyticsApi.exportReport(selectedPeriod);
      toast({
        title: 'Success',
        description: 'Report exported successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // In a real app, you would trigger the download here
      console.log('Download URL:', downloadUrl);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export report',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading || !analyticsData) {
    return (
      <Box data-testid={testIds.analytics_page}>
        <Text>Loading analytics data...</Text>
      </Box>
    );
  }

  return (
    <Box data-test={'analytics_page'}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={8} direction={{ base: "column", md: "row" }} gap={4}>
        <VStack align="start" spacing={1}>
          <Heading size={{ base: "lg", md: "xl" }} bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text" data-test={'analytics_header'}>
            Analytics Dashboard
          </Heading>
          <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} data-test={'analytics_description'}>
            Monitor your storage usage, costs, and performance metrics
          </Text>
        </VStack>
        
        <HStack spacing={3}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" size={{ base: "sm", md: "md" }} data-test={'analytics_period_selector'}>
              {selectedPeriod === '7d' ? 'Last 7 Days' : 
               selectedPeriod === '30d' ? 'Last 30 Days' : 
               selectedPeriod === '90d' ? 'Last 90 Days' : 
               selectedPeriod === '1y' ? 'Last Year' : 'Last 30 Days'}
            </MenuButton>
            <MenuList data-test={'period_options'}>
              <MenuItem onClick={() => setSelectedPeriod('7d')} data-test={'period_7d'}>Last 7 Days</MenuItem>
              <MenuItem onClick={() => setSelectedPeriod('30d')} data-test={'period_30d'}>Last 30 Days</MenuItem>
              <MenuItem onClick={() => setSelectedPeriod('90d')} data-test={'period_90d'}>Last 90 Days</MenuItem>
              <MenuItem onClick={() => setSelectedPeriod('1y')} data-test={'period_1y'}>Last Year</MenuItem>
            </MenuList>
          </Menu>
          <Button 
            leftIcon={<DownloadIcon />} 
            variant="outline" 
            size={{ base: "sm", md: "md" }} 
            data-test={'export_report_btn'}
            onClick={handleExportReport}
          >
            Export Report
          </Button>
        </HStack>
      </Flex>

      {/* Alerts */}
      {analyticsData.alerts.length > 0 && (
        <Card bg={cardBg} shadow="md" borderRadius="xl" mb={8} border="1px solid" borderColor="orange.200" data-test={'analytics_alerts'}>
          <CardHeader pb={2}>
            <HStack>
              <WarningIcon color="orange.500" />
              <Heading size="md" data-test={'alerts_header'}>Recent Alerts</Heading>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={3} align="stretch">
              {analyticsData.alerts.map((alert, index) => (
                <HStack key={index} p={3} bg="orange.50" borderRadius="lg" spacing={3} data-test={`alert_${index}`}>
                  {getAlertIcon(alert.type)}
                  <Text flex="1" fontSize="sm" data-test={`alert_message_${index}`}>
                    {alert.message}
                  </Text>
                  <Badge colorScheme={getSeverityColor(alert.severity)} data-test={`alert_severity_${index}`}>
                    {alert.severity}
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Main Metrics */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8} data-test={'analytics_metrics'}>
        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="blue.500" data-test={'total_storage_metric'}>
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1} data-test={'storage_label'}>Total Storage</StatLabel>
              <StatNumber fontSize="2xl" color="blue.500" mb={2} data-test={'storage_value'}>
                {formatSize(analyticsData.totalStorage)}
              </StatNumber>
              <Progress
                value={(analyticsData.totalStorage / analyticsData.storageLimit) * 100}
                colorScheme={getStorageUsageColor(analyticsData.totalStorage, analyticsData.storageLimit)}
                size="sm"
                borderRadius="full"
                mb={2}
                data-test={'storage_progress'}
              />
              <StatHelpText fontSize="xs" data-test={'storage_help_text'}>
                {((analyticsData.totalStorage / analyticsData.storageLimit) * 100).toFixed(1)}% of {formatSize(analyticsData.storageLimit)} limit
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="green.500" data-test={'monthly_cost_metric'}>
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1} data-test={'cost_label'}>Monthly Cost</StatLabel>
              <StatNumber fontSize="2xl" color="green.500" mb={2} data-test={'cost_value'}>
                {formatCurrency(analyticsData.monthlyCost)}
              </StatNumber>
              <StatHelpText fontSize="xs" data-test={'cost_help_text'}>
                <StatArrow type={analyticsData.costTrend > 0 ? 'increase' : 'decrease'} />
                {Math.abs(analyticsData.costTrend)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="purple.500" data-test={'requests_metric'}>
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1} data-test={'requests_label'}>API Requests</StatLabel>
              <StatNumber fontSize="2xl" color="purple.500" mb={2} data-test={'requests_value'}>
                {formatNumber(analyticsData.requests)}
              </StatNumber>
              <StatHelpText fontSize="xs" data-test={'requests_help_text'}>
                <StatArrow type={analyticsData.requestsTrend > 0 ? 'increase' : 'decrease'} />
                {Math.abs(analyticsData.requestsTrend)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="orange.500" data-test={'bandwidth_metric'}>
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1} data-test={'bandwidth_label'}>Bandwidth</StatLabel>
              <StatNumber fontSize="2xl" color="orange.500" mb={2} data-test={'bandwidth_value'}>
                {analyticsData.bandwidth.toFixed(1)} TB
              </StatNumber>
              <StatHelpText fontSize="xs" data-test={'bandwidth_help_text'}>
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
                      <Icon 
                        as={
                          item.icon === 'ViewIcon' ? ViewIcon :
                          item.icon === 'ArrowUpIcon' ? ArrowUpIcon :
                          item.icon === 'DownloadIcon' ? DownloadIcon : ViewIcon
                        } 
                        color={`${item.color}.500`} 
                        boxSize={4} 
                      />
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
                          colorScheme={getTrendColorScheme(bucket.trend)}
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
