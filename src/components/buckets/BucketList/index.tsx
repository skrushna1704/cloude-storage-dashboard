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

interface Bucket {
  id: string;
  name: string;
  region: string;
  size: number;
  sizeLimit?: number;
  objects: number;
  lastModified: string;
  storageClass: string;
  versioning: boolean;
  encryption: boolean;
  publicRead: boolean;
  created?: string;
  cost?: number;
}

interface BucketListProps {
  buckets: Bucket[];
  onCreateBucket?: () => void;
  onDeleteBucket?: (bucketId: string, bucketName: string) => void;
  onEditBucket?: (bucketId: string) => void;
  onRenameBucket?: (bucketId: string, currentName: string) => void;
  onBucketClick?: (bucketId: string) => void;
  onBucketSelect?: (bucketIds: string[]) => void;
  selectedBuckets?: string[];
  loading?: boolean;
}

type SortField = 'name' | 'size' | 'objects' | 'lastModified' | 'cost';
type SortOrder = 'asc' | 'desc';

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
  
  const cardBg = useColorModeValue('white', 'gray.700');

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

  const totalStorage = buckets.reduce((sum, bucket) => sum + bucket.size, 0);
  const totalObjects = buckets.reduce((sum, bucket) => sum + bucket.objects, 0);
  const totalCost = buckets.reduce((sum, bucket) => sum + (bucket.cost || 0), 0);

  const allSelected = filteredAndSortedBuckets.length > 0 && 
    filteredAndSortedBuckets.every(b => selectedBuckets.includes(b.id));
  const someSelected = selectedBuckets.length > 0 && !allSelected;

  return (
    <Box>
      {/* Summary Stats */}
      <Card bg={cardBg} shadow="md" borderRadius="xl" mb={6}>
        <CardBody>
          <HStack spacing={8} justify="space-around">
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {buckets.length}
              </Text>
              <Text fontSize="sm" color="gray.500" data-test={testIds.total_buckets_text}>Total Buckets</Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {totalStorage >= 1000 ? `${(totalStorage / 1000).toFixed(1)} TB` : `${totalStorage.toFixed(1)} GB`}
              </Text>
              <Text fontSize="sm" color="gray.500" data-test={testIds.total_storage_text}>Total Storage</Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                {totalObjects.toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.500" data-test={testIds.total_objects_text}>Total Objects</Text>
            </VStack>
            {totalCost > 0 && (
              <VStack spacing={1}>
                <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                  ${totalCost.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.500" data-test={testIds.total_cost_text}>Monthly Cost</Text>
              </VStack>
            )}
          </HStack>
        </CardBody>
      </Card>

      {/* Filters and Search */}
      <Card bg={cardBg} shadow="md" borderRadius="xl" mb={6}>
        <CardBody>
          <Flex gap={4} align="center" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
            {/* Bulk Selection */}
            <Checkbox
              isChecked={allSelected}
              isIndeterminate={someSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              colorScheme="blue"
            >
              <Text fontSize="sm" fontWeight="medium">
                {selectedBuckets.length > 0 ? `${selectedBuckets.length} selected` : 'Select All'}
              </Text>
            </Checkbox>

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
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: '#667eea',
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                  }}
                />
              </InputGroup>
            </Box>

            {/* Region Filter */}
            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              minW="150px"
              bg="gray.50"
              _focus={{
                borderColor: '#667eea',
                boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
              }}
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </Select>

            {/* Storage Class Filter */}
            <Select
              value={storageClassFilter}
              onChange={(e) => setStorageClassFilter(e.target.value)}
              minW="150px"
              bg="gray.50"
              _focus={{
                borderColor: '#667eea',
                boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
              }}
            >
              <option value="all">All Classes</option>
              {storageClasses.map(storageClass => (
                <option key={storageClass} value={storageClass}>{storageClass}</option>
              ))}
            </Select>

            {/* Sort Menu */}
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" minW="120px" fontSize={"12px"}>
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
            <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
              {filteredAndSortedBuckets.length} of {buckets.length} buckets
            </Text>
          </Flex>
        </CardBody>
      </Card>

      {/* Bucket Grid */}
      {loading ? (
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardBody py={16} textAlign="center">
            <Text color="gray.500">Loading buckets...</Text>
          </CardBody>
        </Card>
      ) : filteredAndSortedBuckets.length === 0 ? (
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardBody py={16} textAlign="center">
            <ViewIcon boxSize={12} color="gray.400" mb={4} />
            <Text fontSize="lg" fontWeight="semibold" color="gray.500" mb={2}>
              {searchQuery || regionFilter !== 'all' || storageClassFilter !== 'all' 
                ? 'No buckets found' 
                : 'No buckets yet'
              }
            </Text>
            <Text color="gray.400" mb={6}>
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
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                }}
              >
                Create Your First Bucket
              </Button>
            )}
          </CardBody>
        </Card>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredAndSortedBuckets.map((bucket) => (
            <Box key={bucket.id} position="relative">
              {/* Selection Checkbox */}
              <Checkbox
                position="absolute"
                top={3}
                left={3}
                zIndex={2}
                isChecked={selectedBuckets.includes(bucket.id)}
                onChange={(e) => handleSelectBucket(bucket.id, e.target.checked)}
                colorScheme="blue"
                bg="white"
                borderRadius="md"
                p={1}
                shadow="sm"
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
