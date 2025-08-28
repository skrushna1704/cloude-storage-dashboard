import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Text,
  Badge,
  Progress,
  useColorModeValue,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import {
  LockIcon,
  RepeatIcon,
  TimeIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import { generateBucketDetailPath } from '../../../constants/routes';
import { BucketCardProps } from '../../../types/bucket';
import { formatSize, getStorageClassColor, getUsageColor, getUsagePercentage } from '../../../utils/bucket-card-utils';


export const BucketCard: React.FC<BucketCardProps> = ({
  bucket,
  onDelete,
  onEdit,
  onRename,
  onClick,
}) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = useColorModeValue('#667eea', '#667eea');


  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the menu or its children
    if ((e.target as HTMLElement).closest('[data-menu]')) {
      return;
    }
    onClick?.(bucket.id);
  };

  return (
    <Card
      data-test={'bucket_card'}
      as={Link}
      to={generateBucketDetailPath(bucket.id)}
      bg={cardBg}
      shadow="md"
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: hoverBorderColor,
      }}
      transition="all 0.3s ease"
      cursor="pointer"
      onClick={handleCardClick}
      position="relative"
      overflow="hidden"
      textDecoration="none"
      _focus={{
        outline: 'none',
        boxShadow: `0 0 0 3px rgba(102, 126, 234, 0.1)`,
      }}
    >
      {/* Gradient overlay on hover */}
      <Box
        position="absolute"
        top="0"
        left="-100%"
        width="100%"
        height="2px"
        bg="linear-gradient(90deg, transparent, #667eea, transparent)"
        transition="left 0.5s ease"
        _groupHover={{ left: '100%' }}
        data-test='bucket-box'
      />

      <CardHeader pb={2}>
        <Flex justify="space-between" align="start">
          <VStack align="start" spacing={2} flex="1" pr={2}>
            {/* Bucket Name */}
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="gray.800"
              noOfLines={1}
              _dark={{ color: 'white' }}
              marginTop={"20px"}
              data-test={'bucket_card_name'}
            >
              {bucket.name}
            </Text>
            
            {/* Badges */}
            <HStack spacing={2} flexWrap="wrap">
              <Badge
                colorScheme={getStorageClassColor(bucket.storageClass)}
                size="sm"
                borderRadius="md"
              >
                {bucket.storageClass}
              </Badge>
              <Badge variant="outline" size="sm" borderRadius="md">
                {bucket.region}
              </Badge>
            </HStack>
          </VStack>
          

        </Flex>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack spacing={4} align="stretch">
          {/* Storage Usage */}
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Storage Used
              </Text>
              <Text fontSize="sm" fontWeight="bold" color={`${getUsageColor(bucket)}.500`}>
                {formatSize(bucket.size)}
                {bucket.sizeLimit && (
                  <Text as="span" color="gray.500" fontWeight="normal">
                    {' '}/ {formatSize(bucket.sizeLimit)}
                  </Text>
                )}
              </Text>
            </Flex>
            
            {bucket.sizeLimit ? (
              <Progress
                value={getUsagePercentage(bucket)}
                colorScheme={getUsageColor(bucket)}
                size="sm"
                borderRadius="full"
                bg="gray.100"
              />
            ) : (
              <Box
                h="8px"
                bg="gray.100"
                borderRadius="full"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  h="100%"
                  w="60%"
                  bg="linear-gradient(90deg, #667eea, #764ba2)"
                  borderRadius="full"
                />
              </Box>
            )}
          </Box>

          {/* Objects Count */}
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              Objects
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="purple.500">
              {(bucket.objects / 1000).toFixed(1)}K
            </Text>
          </Flex>

          {/* Cost (if available) */}
          {bucket.cost && (
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="gray.600" fontWeight="medium">
                Monthly Cost
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="green.500">
                ${bucket.cost.toFixed(2)}
              </Text>
            </Flex>
          )}

          {/* Security Features */}
          <HStack spacing={2} flexWrap="wrap">
            {bucket.versioning && (
              <Tooltip label="Versioning enabled">
                <Badge
                  colorScheme="blue"
                  size="sm"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <RepeatIcon boxSize={2} />
                  Versioning
                </Badge>
              </Tooltip>
            )}
            {bucket.encryption && (
              <Tooltip label="Encryption enabled">
                <Badge
                  colorScheme="green"
                  size="sm"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <LockIcon boxSize={2} />
                  Encrypted
                </Badge>
              </Tooltip>
            )}
            {bucket.publicRead && (
              <Tooltip label="Public read access">
                <Badge
                  colorScheme="orange"
                  size="sm"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <ExternalLinkIcon boxSize={2} />
                  Public
                </Badge>
              </Tooltip>
            )}
          </HStack>

          {/* Last Modified */}
          <HStack fontSize="xs" color="gray.500" pt={2} borderTop="1px solid" borderColor="gray.100">
            <TimeIcon boxSize={3} />
            <Text>Modified {bucket.lastModified}</Text>
            {bucket.created && (
              <>
                <Text>•</Text>
                <Text>Created {bucket.created}</Text>
              </>
            )}
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
