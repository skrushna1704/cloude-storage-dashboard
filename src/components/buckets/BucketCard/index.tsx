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
  SimpleGrid,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import {
  LockIcon,
  RepeatIcon,
  TimeIcon,
  ExternalLinkIcon,
  ViewIcon,
  HamburgerIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { generateBucketDetailPath } from '../../../constants/routes';
import { BucketCardProps } from '../../../types/bucket';
import { formatSize, getStorageClassColor, getUsageColor, getUsagePercentage } from '../../../utils/bucket-card-utils';
import { formatRelativeTime, formatDate } from '../../../utils/formatters';

export const BucketCard: React.FC<BucketCardProps> = ({
  bucket,
  onDelete,
  onEdit,
  onRename,
  onClick,
}) => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBorderColor = useColorModeValue('#667eea', '#667eea');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)');

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
      bg={cardBg}
      shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: `0 20px 25px -5px ${shadowColor}, 0 10px 10px -5px ${shadowColor}`,
        borderColor: hoverBorderColor,
      }}
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      position="relative"
      overflow="hidden"
      textDecoration="none"
      _focus={{
        outline: 'none',
        boxShadow: `0 0 0 3px rgba(102, 126, 234, 0.2)`,
      }}
      opacity={isDeleting ? 0.6 : 1}
      pointerEvents={isDeleting ? 'none' : 'auto'}
    >
      {/* Animated gradient border */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="3px"
        bg="linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%)"
        backgroundSize="200% 100%"
        animation="gradientShift 3s ease infinite"
        opacity="0"
        _hover={{ opacity: "1" }}
        transition="opacity 0.3s ease"
      />

      {/* Background pattern */}
      <Box
        position="absolute"
        top="0"
        right="0"
        width="100px"
        height="100px"
        opacity="0.03"
        bg="radial-gradient(circle, #667eea 0%, transparent 70%)"
        transform="translate(30px, -30px)"
        _hover={{
          opacity: "0.08",
          transform: "translate(20px, -20px) scale(1.2)",
        }}
        transition="all 0.4s ease"
      />

      <CardHeader pb={3}>
        <Flex justify="space-between" align="start">
          {/* Context Menu */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              size="sm"
              position="absolute"
              top={2}
              right={2}
              zIndex={3}
              onClick={(e) => e.stopPropagation()}
              _hover={{ bg: 'gray.100' }}
              _dark={{ _hover: { bg: 'gray.700' } }}
            />
            <MenuList>
              <MenuItem icon={<EditIcon />} onClick={(e) => {
                e.stopPropagation();
                onRename?.(bucket.id, bucket.name);
              }}>
                Rename
              </MenuItem>
              <MenuItem icon={<DeleteIcon />} onClick={(e) => {
                e.stopPropagation();
                onDeleteOpen();
              }}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
          
          <VStack align="start" spacing={3} flex="1" pr={2}>
            {/* Bucket Icon and Name */}
            <HStack spacing={3} w="full">
                             <Box
                 p={2}
                 bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                 borderRadius="xl"
                 boxShadow="0 4px 12px rgba(102, 126, 234, 0.3)"
               >
                 <ViewIcon color="white" boxSize={5} />
               </Box>
              <VStack align="start" spacing={1} flex="1">
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.800"
                  noOfLines={1}
                  _dark={{ color: 'white' }}
                  _hover={{ color: '#667eea' }}
                  transition="color 0.3s ease"
                  data-test={'bucket_card_name'}
                >
                  {bucket.name}
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">
                  {bucket.region}
                </Text>
              </VStack>
            </HStack>
            
            {/* Enhanced Badges */}
            <HStack spacing={2} flexWrap="wrap">
              <Badge
                colorScheme={getStorageClassColor(bucket.storageClass)}
                size="sm"
                borderRadius="full"
                px={3}
                py={1}
                fontWeight="semibold"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              >
                {bucket.storageClass}
              </Badge>
              <Badge 
                variant="outline" 
                size="sm" 
                borderRadius="full"
                px={3}
                py={1}
                borderColor="gray.300"
                color="gray.600"
                fontWeight="medium"
              >
                {bucket.region}
              </Badge>
            </HStack>
          </VStack>
        </Flex>
      </CardHeader>
      
      <CardBody pt={0}
            as={Link}
            to={generateBucketDetailPath(bucket.id)}
            onClick={handleCardClick}
      >
        <VStack spacing={5} align="stretch">
          {/* Enhanced Storage Usage */}
          <Box>
            <Flex justify="space-between" mb={3}>
              <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                Storage Used
              </Text>
              <Text fontSize="sm" fontWeight="bold" color={`${getUsageColor(bucket)}.600`}>
                {formatSize(bucket.size)}
                {bucket.sizeLimit && (
                  <Text as="span" color="gray.500" fontWeight="normal" ml={1}>
                    / {formatSize(bucket.sizeLimit)}
                  </Text>
                )}
              </Text>
            </Flex>
            
            {bucket.sizeLimit ? (
              <Box position="relative">
                <Progress
                  value={getUsagePercentage(bucket)}
                  colorScheme={getUsageColor(bucket)}
                  size="md"
                  borderRadius="full"
                  bg="gray.100"
                  _dark={{ bg: 'gray.700' }}
                  overflow="hidden"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
                  animation="shimmer 2s infinite"
                  borderRadius="full"
                />
              </Box>
            ) : (
              <Box
                h="12px"
                bg="gray.100"
                _dark={{ bg: 'gray.700' }}
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
                  boxShadow="0 2px 4px rgba(102, 126, 234, 0.3)"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)"
                  animation="shimmer 2s infinite"
                  borderRadius="full"
                />
              </Box>
            )}
          </Box>

          {/* Enhanced Stats Grid */}
          <SimpleGrid columns={2} spacing={4}>
            <Box
              p={3}
              bg="gray.50"
              _dark={{ bg: 'gray.700' }}
              borderRadius="xl"
              textAlign="center"
              _hover={{
                bg: 'purple.50',
                _dark: { bg: 'purple.900' },
                transform: 'scale(1.05)',
              }}
              transition="all 0.3s ease"
            >
              <Text fontSize="lg" fontWeight="bold" color="purple.600">
                {(bucket.objects / 1000).toFixed(1)}K
              </Text>
              <Text fontSize="xs" color="gray.600" fontWeight="medium">
                Objects
              </Text>
            </Box>

            {bucket.cost && (
              <Box
                p={3}
                bg="gray.50"
                _dark={{ bg: 'gray.700' }}
                borderRadius="xl"
                textAlign="center"
                _hover={{
                  bg: 'green.50',
                  _dark: { bg: 'green.900' },
                  transform: 'scale(1.05)',
                }}
                transition="all 0.3s ease"
              >
                <Text fontSize="lg" fontWeight="bold" color="green.600">
                  ${bucket.cost.toFixed(2)}
                </Text>
                <Text fontSize="xs" color="gray.600" fontWeight="medium">
                  Monthly Cost
                </Text>
              </Box>
            )}
          </SimpleGrid>

          {/* Enhanced Security Features */}
          <HStack spacing={2} flexWrap="wrap" justify="center">
            {bucket.versioning && (
              <Tooltip label="Versioning enabled" placement="top">
                <Badge
                  colorScheme="blue"
                  size="sm"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  px={2}
                  py={1}
                  boxShadow="0 2px 4px rgba(59, 130, 246, 0.2)"
                >
                  <RepeatIcon boxSize={3} />
                  Versioning
                </Badge>
              </Tooltip>
            )}
            {bucket.encryption && (
              <Tooltip label="Encryption enabled" placement="top">
                <Badge
                  colorScheme="green"
                  size="sm"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  px={2}
                  py={1}
                  boxShadow="0 2px 4px rgba(34, 197, 94, 0.2)"
                >
                  <LockIcon boxSize={3} />
                  Encrypted
                </Badge>
              </Tooltip>
            )}
            {bucket.publicRead && (
              <Tooltip label="Public read access" placement="top">
                <Badge
                  colorScheme="orange"
                  size="sm"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                  px={2}
                  py={1}
                  boxShadow="0 2px 4px rgba(249, 115, 22, 0.2)"
                >
                  <ExternalLinkIcon boxSize={3} />
                  Public
                </Badge>
              </Tooltip>
            )}
          </HStack>

          {/* Enhanced Last Modified */}
          <Box
            pt={3}
            borderTop="1px solid"
            borderColor="gray.100"
            _dark={{ borderColor: 'gray.600' }}
          >
            <HStack fontSize="xs" color="gray.500" justify="center">
              <TimeIcon boxSize={3} />
              <Text fontWeight="medium">
                Modified {bucket.lastModified.includes('T') ? formatRelativeTime(bucket.lastModified) : bucket.lastModified}
              </Text>
              {bucket.created && (
                <>
                  <Text>•</Text>
                  <Text fontWeight="medium">
                    Created {bucket.created.includes('T') ? formatDate(bucket.created, { year: 'numeric', month: 'short', day: 'numeric' }) : bucket.created}
                  </Text>
                </>
              )}
            </HStack>
          </Box>
        </VStack>
      </CardBody>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Bucket
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{bucket.name}"? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose} isDisabled={isDeleting}>
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                isLoading={isDeleting}
                loadingText="Deleting..."
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await onDelete?.(bucket.id, bucket.name);
                    onDeleteClose();
                  } catch (error) {
                    console.error('Delete failed:', error);
                  } finally {
                    setIsDeleting(false);
                  }
                }} 
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Card>
  );
};
