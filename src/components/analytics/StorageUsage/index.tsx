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
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { UsageChart } from '../Charts/UsageChart';
import { StorageUsageProps } from '../../../types/analytics';
import { storageData } from '../../../constants/mockdata';
import { getUsageColors, formatSizes } from '../../../utils/analytics';

export const StorageUsage: React.FC<StorageUsageProps> = ({
  showDetailed = true
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');




  const overallUsagePercentage = (storageData.totalUsed / storageData.totalLimit) * 100;

  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" spacing={1}>
          <Heading size="lg" bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text">
            Storage Usage
          </Heading>
          <Text color="gray.600">
            Monitor your storage consumption across all buckets and regions
          </Text>
        </VStack>
        
        <HStack spacing={3}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline">
              {viewMode === 'overview' ? 'Overview' : 'Detailed View'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setViewMode('overview')}>
                Overview
              </MenuItem>
              <MenuItem onClick={() => setViewMode('detailed')}>
                Detailed View
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Storage Alerts */}
      {storageData.alerts.length > 0 && (
        <VStack spacing={3} mb={6}>
          {storageData.alerts.map((alert, index) => (
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

      {/* Overall Storage Usage */}
      <Card bg={cardBg} shadow="md" borderRadius="xl" border="1px solid" borderColor={borderColor} mb={6}>
        <CardHeader>
          <Heading size="md">Overall Storage Usage</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {/* Circular Progress */}
            <VStack spacing={4}>
              <CircularProgress
                value={overallUsagePercentage}
                color={`${getUsageColors(overallUsagePercentage)}.500`}
                size="120px"
                thickness="12px"
              >
                <CircularProgressLabel>
                  <VStack spacing={0}>
                    <Text fontSize="xl" fontWeight="bold" color={`${getUsageColors(overallUsagePercentage)}.600`}>
                      {overallUsagePercentage.toFixed(0)}%
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      used
                    </Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
              <VStack spacing={0} textAlign="center">
                <Text fontSize="lg" fontWeight="semibold">
                  {formatSizes(storageData.totalUsed)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  of {formatSizes(storageData.totalLimit)}
                </Text>
              </VStack>
            </VStack>

            {/* Usage Breakdown */}
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                STORAGE BY TYPE
              </Text>
              {storageData.byType.map((type) => (
                <Box key={type.type}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <HStack spacing={2}>
                      <Box w={3} h={3} bg={`${type.color}.500`} borderRadius="full" />
                      <Text fontSize="sm" fontWeight="medium">
                        {type.type}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="semibold" color={`${type.color}.600`}>
                      {formatSizes(type.used)}
                    </Text>
                  </Flex>
                  <Progress
                    value={type.percentage}
                    colorScheme={type.color}
                    size="sm"
                    borderRadius="full"
                    bg="gray.100"
                  />
                  <Flex justify="space-between" mt={1}>
                    <Text fontSize="xs" color="gray.500">
                      {type.files} files
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      ${type.cost}/month
                    </Text>
                  </Flex>
                </Box>
              ))}
            </VStack>

            {/* Growth Trend */}
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                GROWTH TREND
              </Text>
              <VStack spacing={3}>
                <Box w="100%" p={3} bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="blue.700">This Month</Text>
                    <Badge colorScheme="blue" variant="solid">
                      +{storageData.growthTrend.thisMonth}%
                    </Badge>
                  </HStack>
                </Box>
                <Box w="100%" p={3} bg="gray.50" borderRadius="lg" border="1px solid" borderColor="gray.200">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.700">Last Month</Text>
                    <Badge colorScheme="gray" variant="solid">
                      +{storageData.growthTrend.lastMonth}%
                    </Badge>
                  </HStack>
                </Box>
                <Box w="100%" p={3} bg="green.50" borderRadius="lg" border="1px solid" borderColor="green.200">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="green.700">3 Months Ago</Text>
                    <Badge colorScheme="green" variant="solid">
                      +{storageData.growthTrend.threeMonthsAgo}%
                    </Badge>
                  </HStack>
                </Box>
              </VStack>
            </VStack>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Usage Charts */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mb={6}>
        <UsageChart title="Resource Usage" />
        <UsageChart title="Usage Distribution" showCircular />
      </SimpleGrid>

      {/* Regional Distribution */}
      <Card bg={cardBg} shadow="md" borderRadius="xl" border="1px solid" borderColor={borderColor}>
        <CardHeader>
          <Heading size="md">Storage by Region</Heading>
        </CardHeader>
        <CardBody pt={0}>
          <TableContainer>
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                    REGION
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" isNumeric>
                    STORAGE USED
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" isNumeric>
                    PERCENTAGE
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" isNumeric>
                    BUCKETS
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {storageData.byRegion.map((region) => (
                  <Tr key={region.region} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                    <Td border="none" py={4}>
                      <Text fontWeight="medium">{region.region}</Text>
                    </Td>
                    <Td border="none" py={4} isNumeric>
                      <Text fontSize="sm">{formatSizes(region.used)}</Text>
                    </Td>
                    <Td border="none" py={4} isNumeric>
                      <Badge colorScheme="purple" variant="subtle">
                        {region.percentage}%
                      </Badge>
                    </Td>
                    <Td border="none" py={4} isNumeric>
                      <Text fontSize="sm">{region.buckets}</Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};
