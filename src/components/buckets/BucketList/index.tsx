import React, { useState, useMemo } from 'react';
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Card,
  CardBody,
  useColorModeValue,
  Flex,
  Checkbox,
  Badge,
} from '@chakra-ui/react';
import {
  SearchIcon,
  ChevronDownIcon,
  ViewIcon,
  AddIcon,
  TriangleUpIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import { BucketCard } from '../BucketCard';
import { testIds } from '../../../shared/dataTestIds';
import { BucketListProps, SortField, SortOrder } from '../../../types/bucket';

export const BucketList: React.FC<BucketListProps> = ({
  buckets,
  onCreateBucket,
  onDeleteBucket,
  onEditBucket,
  onRenameBucket,
  onBucketClick,
  onBucketSelect,
  selectedBuckets = [],
  loading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [storageClassFilter, setStorageClassFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  // Get unique regions and storage classes for filters
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(buckets.map(b => b.region)));
    return uniqueRegions.sort();
  }, [buckets]);

  const storageClasses = useMemo(() => {
    const uniqueClasses = Array.from(new Set(buckets.map(b => b.storageClass)));
    return uniqueClasses.sort();
  }, [buckets]);

  // Filter and sort buckets
  const filteredAndSortedBuckets = useMemo(() => {
    let filtered = buckets.filter(bucket => {
      const matchesSearch = bucket.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = regionFilter === 'all' || bucket.region === regionFilter;
      const matchesStorageClass = storageClassFilter === 'all' || bucket.storageClass === storageClassFilter;
      
      return matchesSearch && matchesRegion && matchesStorageClass;
    });

    // Sort buckets
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle special cases
      if (sortField === 'lastModified') {
        // Convert to dates for comparison (this is simplified - you'd want proper date parsing)
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [buckets, searchQuery, regionFilter, storageClassFilter, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <TriangleUpIcon boxSize={3} /> : <TriangleDownIcon boxSize={3} />;
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onBucketSelect?.(filteredAndSortedBuckets.map(b => b.id));
    } else {
      onBucketSelect?.([]);
    }
  };

  const handleSelectBucket = (bucketId: string, checked: boolean) => {
    if (checked) {
      onBucketSelect?.([...selectedBuckets, bucketId]);
    } else {
      onBucketSelect?.(selectedBuckets.filter(id => id !== bucketId));
    }
  };

  // Calculate realistic total storage (convert GB to TB for display)
  const totalStorageGB = buckets.reduce((sum, bucket) => sum + bucket.size, 0);
  const totalStorageTB = totalStorageGB / 1024; // Convert GB to TB
  const totalObjects = buckets.reduce((sum, bucket) => sum + bucket.objects, 0);
  const totalCost = buckets.reduce((sum, bucket) => sum + (bucket.cost || 0), 0);

  const allSelected = filteredAndSortedBuckets.length > 0 && 
    filteredAndSortedBuckets.every(b => selectedBuckets.includes(b.id));
  const someSelected = selectedBuckets.length > 0 && !allSelected;

  return (
    <Box>
      {/* Enhanced Summary Stats */}
      <Card 
        bg={cardBg} 
        shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        borderRadius="2xl" 
        border="1px solid"
        borderColor={borderColor}
        mb={8}
      >
        <CardBody p={10}>
          <Flex 
            direction={{ base: "column", md: "row" }} 
            justify='space-between' 
            align="center" 
            gap={8}
            flexWrap="wrap"
          >
            <VStack spacing={2} align="center" minW="120px">
              <Box
                p={3}
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                borderRadius="xl"
                boxShadow="0 4px 12px rgba(102, 126, 234, 0.3)"
              >
                <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
                  {buckets.length}
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.600" fontWeight="semibold" data-test={testIds.total_buckets_text} textAlign="center">
                Total Buckets
              </Text>
            </VStack>
            
            <VStack spacing={2} align="center" minW="120px">
              <Box
                p={3}
                bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                borderRadius="xl"
                boxShadow="0 4px 12px rgba(16, 185, 129, 0.3)"
              >
                <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
                  {totalStorageTB.toFixed(1)} GB
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.600" fontWeight="semibold" data-test={testIds.total_storage_text} textAlign="center">
                Total Storage
              </Text>
            </VStack>
            
            <VStack spacing={2} align="center" minW="120px">
              <Box
                p={3}
                bg="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
                borderRadius="xl"
                boxShadow="0 4px 12px rgba(139, 92, 246, 0.3)"
              >
                <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
                  {(totalObjects / 1000).toFixed(1)}K
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.600" fontWeight="semibold" data-test={testIds.total_objects_text} textAlign="center">
                Total Objects
              </Text>
            </VStack>
            
            {totalCost > 0 && (
              <VStack spacing={2} align="center" minW="120px">
                <Box
                  p={3}
                  bg="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                  borderRadius="xl"
                  boxShadow="0 4px 12px rgba(245, 158, 11, 0.3)"
                >
                  <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
                    ${totalCost.toFixed(2)}
                  </Text>
                </Box>
                <Text fontSize="sm" color="gray.600" fontWeight="semibold" data-test={testIds.total_cost_text} textAlign="center">
                  Monthly Cost
                </Text>
              </VStack>
            )}
          </Flex>
        </CardBody>
      </Card>

      {/* Enhanced Filters and Search */}
      <Card 
        bg={cardBg} 
        shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        borderRadius="2xl" 
        border="1px solid"
        borderColor={borderColor}
        mb={8}
      >
        <CardBody py={6}>
          <VStack spacing={6} align="stretch">
            {/* Bulk Selection */}
            <Flex gap={4} align="center" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
              <Checkbox
                isChecked={allSelected}
                isIndeterminate={someSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                colorScheme="blue"
                size="lg"
              >
                <Text fontSize="sm" fontWeight="semibold">
                  {selectedBuckets.length > 0 ? `${selectedBuckets.length} selected` : 'Select All'}
                </Text>
              </Checkbox>

              {selectedBuckets.length > 0 && (
                <Badge 
                  colorScheme="blue" 
                  borderRadius="full" 
                  px={3} 
                  py={1}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  {selectedBuckets.length} selected
                </Badge>
              )}
            </Flex>

            {/* Search and Filters */}
            <Flex gap={4} align="center" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
              {/* Search */}
              <Box flex="1" minW="250px">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                                     <Input
                     placeholder="Search buckets by name..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     bg="gray.50"
                     _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
                     border="1px solid"
                     borderColor="gray.200"
                     borderRadius="xl"
                    _focus={{
                      borderColor: '#667eea',
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                    }}
                    _hover={{
                      borderColor: 'gray.300',
                    }}
                  />
                </InputGroup>
              </Box>

                             {/* Region Filter */}
               <Box minW="150px">
                 <InputGroup>
                  <Select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    bg="gray.50"
                    _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    _focus={{
                      borderColor: '#667eea',
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                    }}
                    _hover={{
                      borderColor: 'gray.300',
                    }}
                  >
                    <option value="all">All Regions</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </Select>
                </InputGroup>
              </Box>

              {/* Storage Class Filter */}
              <Box minW="150px">
                <InputGroup>
                  <Select
                    value={storageClassFilter}
                    onChange={(e) => setStorageClassFilter(e.target.value)}
                    bg="gray.50"
                    _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    _focus={{
                      borderColor: '#667eea',
                      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                    }}
                    _hover={{
                      borderColor: 'gray.300',
                    }}
                  >
                    <option value="all">All Classes</option>
                    {storageClasses.map(storageClass => (
                      <option key={storageClass} value={storageClass}>{storageClass}</option>
                    ))}
                  </Select>
                </InputGroup>
              </Box>

              {/* Sort Menu */}
              <Menu>
                <MenuButton 
                  as={Button} 
                  rightIcon={<ChevronDownIcon />} 
                  variant="outline" 
                  minW="120px" 
                  fontSize="sm"
                  bg="gray.50"
                  _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="xl"
                  _focus={{
                    borderColor: '#667eea',
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                  }}
                  _hover={{
                    borderColor: 'gray.300',
                  }}
                  leftIcon={<ViewIcon boxSize={4} />}
                >
                  Sort by {sortField}
                </MenuButton>
                <MenuList>  
                  <MenuItem onClick={() => handleSort('name')}>
                    <HStack>
                      <Text>Name</Text>
                      {getSortIcon('name')}
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleSort('size')}>
                    <HStack>
                      <Text>Size</Text>
                      {getSortIcon('size')}
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleSort('objects')}>
                    <HStack>
                      <Text>Objects</Text>
                      {getSortIcon('objects')}
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => handleSort('lastModified')}>
                    <HStack>
                      <Text>Last Modified</Text>
                      {getSortIcon('lastModified')}
                    </HStack>
                  </MenuItem>
                  {totalCost > 0 && (
                    <MenuItem onClick={() => handleSort('cost')}>
                      <HStack>
                        <Text>Cost</Text>
                        {getSortIcon('cost')}
                      </HStack>
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>

              {/* Results Count */}
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap" fontWeight="medium">
                {filteredAndSortedBuckets.length} of {buckets.length} buckets
              </Text>
            </Flex>
          </VStack>
        </CardBody>
      </Card>

      {/* Enhanced Bucket Grid */}
      {loading ? (
        <Card 
          bg={cardBg} 
          shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
        >
          <CardBody py={16} textAlign="center">
            <Box
              p={4}
              bg="gray.50"
              _dark={{ bg: 'gray.700' }}
              borderRadius="xl"
              display="inline-block"
              mb={4}
            >
              <ViewIcon boxSize={8} color="gray.400" />
            </Box>
            <Text color="gray.500" fontWeight="semibold">Loading buckets...</Text>
          </CardBody>
        </Card>
      ) : filteredAndSortedBuckets.length === 0 ? (
        <Card 
          bg={cardBg} 
          shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
        >
          <CardBody py={16} textAlign="center">
            <Box
              p={4}
              bg="gray.50"
              _dark={{ bg: 'gray.700' }}
              borderRadius="xl"
              display="inline-block"
              mb={6}
            >
              <ViewIcon boxSize={12} color="gray.400" />
            </Box>
            <Text fontSize="lg" fontWeight="semibold" color="gray.500" mb={2}>
              {searchQuery || regionFilter !== 'all' || storageClassFilter !== 'all' 
                ? 'No buckets found' 
                : 'No buckets yet'
              }
            </Text>
            <Text color="gray.400" mb={8} maxW="400px" mx="auto">
              {searchQuery || regionFilter !== 'all' || storageClassFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first bucket to get started with cloud storage'
              }
            </Text>
            {(!searchQuery && regionFilter === 'all' && storageClassFilter === 'all') && (
              <Button
                onClick={onCreateBucket}
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                leftIcon={<AddIcon />}
                size="lg"
                px={8}
                py={6}
                borderRadius="xl"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                transition="all 0.3s ease"
              >
                Create Your First Bucket
              </Button>
            )}
          </CardBody>
        </Card>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredAndSortedBuckets.map((bucket) => (
            <Box key={bucket.id} position="relative">
              {/* Selection Checkbox */}
              <Checkbox
                position="absolute"
                top={4}
                left={4}
                zIndex={2}
                isChecked={selectedBuckets.includes(bucket.id)}
                onChange={(e) => handleSelectBucket(bucket.id, e.target.checked)}
                colorScheme="blue"
                bg="white"
                _dark={{ bg: 'gray.800' }}
                borderRadius="md"
                p={1}
                shadow="lg"
                size="lg"
              />
              
              <BucketCard
                bucket={bucket}
                onDelete={onDeleteBucket}
                onEdit={onEditBucket}
                onRename={onRenameBucket}
                onClick={onBucketClick}
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
