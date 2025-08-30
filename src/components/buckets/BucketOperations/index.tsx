import React from 'react';
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
  Badge,
  Tooltip,
  Flex,
  Card,
  CardBody,
} from '@chakra-ui/react';
import {
  AddIcon,
  SettingsIcon,
  DownloadIcon,
  DeleteIcon,
  EditIcon,
  CopyIcon,
  RepeatIcon,
  ChevronDownIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { testIds } from '../../../shared/dataTestIds';
import { BucketOperationsProps } from '../../../types/bucket';

export const BucketOperations: React.FC<BucketOperationsProps> = ({
  selectedBuckets = [],
  onCreateBucket,
  onDeleteBuckets,
  onExportBuckets,
  onConfigureBucket,
  onSyncBuckets,
  onToggleEncryption,
  onToggleVersioning,
  onMakePublic,
  onMakePrivate,
  onRenameBuckets,
  totalBuckets = 0,
}) => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)');
  
  const hasSelection = selectedBuckets.length > 0;

  const handleDeleteConfirm = () => {
    onDeleteBuckets?.(selectedBuckets);
    onDeleteClose();
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'export':
        onExportBuckets?.(selectedBuckets);
        break;
      case 'sync':
        onSyncBuckets?.(selectedBuckets);
        break;
      case 'encrypt':
        onToggleEncryption?.(selectedBuckets);
        break;
      case 'versioning':
        onToggleVersioning?.(selectedBuckets);
        break;
      case 'public':
        onMakePublic?.(selectedBuckets);
        break;
      case 'private':
        onMakePrivate?.(selectedBuckets);
        break;
      case 'rename':
        onRenameBuckets?.(selectedBuckets);
        // Don't show toast for rename - let the modal handle it
        return;
      default:
        return;
    }
  };

  return (
    <>
      <Card
        bg={bgColor}
        shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        borderRadius="2xl"
        border="1px solid"
        borderColor={borderColor}
        mb={8}
      >
        <CardBody py={6}>
          <Flex justify="space-between" align="center" direction={{ base: "column", lg: "row" }} gap={6}>
            {/* Left side - Selection info */}
            <VStack align={{ base: "center", lg: "start" }} spacing={3}>
              {hasSelection ? (
                <VStack align={{ base: "center", lg: "start" }} spacing={1}>
                  <HStack spacing={3}>
                    <Box
                      p={2}
                      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      borderRadius="xl"
                      boxShadow="0 4px 12px rgba(102, 126, 234, 0.3)"
                    >
                      <ViewIcon color="white" boxSize={4} />
                    </Box>
                    <Text fontSize="lg" fontWeight="bold" color="blue.600">
                      {selectedBuckets.length} bucket(s) selected
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500" textAlign={{ base: "center", lg: "start" }}>
                    Choose an action to perform on selected buckets
                  </Text>
                </VStack>
              ) : (
                <VStack align={{ base: "center", lg: "start" }} spacing={1}>
                  <HStack spacing={3}>
                    <Box
                      p={2}
                      bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      borderRadius="xl"
                      boxShadow="0 4px 12px rgba(16, 185, 129, 0.3)"
                    >
                      <SettingsIcon color="white" boxSize={4} />
                    </Box>
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      Bucket Operations
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500" textAlign={{ base: "center", lg: "start" }}>
                    {totalBuckets} total buckets available
                  </Text>
                </VStack>
              )}

              {hasSelection && (
                <Badge 
                  colorScheme="blue" 
                  borderRadius="full" 
                  px={4} 
                  py={2}
                  fontSize="sm"
                  fontWeight="semibold"
                  boxShadow="0 2px 4px rgba(59, 130, 246, 0.2)"
                >
                  {selectedBuckets.length} selected
                </Badge>
              )}
            </VStack>

            {/* Right side - Action buttons */}
            <HStack spacing={3} flexWrap="wrap" justify={{ base: "center", lg: "flex-end" }}>
              {/* Create Bucket Button */}
              <Button
                leftIcon={<AddIcon />}
                onClick={onCreateBucket}
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                size="lg"
                px={8}
                py={6}
                borderRadius="xl"
                fontWeight="semibold"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 20px 25px -5px ${shadowColor}, 0 10px 10px -5px ${shadowColor}`,
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.3s ease"
                data-test={testIds.create_bucket_btns}
              >
                Create Bucket
              </Button>

              {/* Bulk Actions - only show when buckets are selected */}
              {hasSelection && (
                <>
                  {/* Quick Actions */}
                  <Tooltip label="Export selected buckets" placement="top">
                    <IconButton
                      icon={<DownloadIcon />}
                      onClick={() => handleBulkAction('export')}
                      variant="outline"
                      size="lg"
                      aria-label="Export buckets"
                      borderRadius="xl"
                      borderColor="gray.200"
                      _dark={{ borderColor: 'gray.600' }}
                      _hover={{
                        bg: 'blue.50',
                        _dark: { bg: 'blue.900' },
                        borderColor: 'blue.300',
                        transform: 'translateY(-1px)',
                      }}
                      transition="all 0.2s ease"
                    />
                  </Tooltip>

                  <Tooltip label="Sync selected buckets" placement="top">
                    <IconButton
                      icon={<RepeatIcon />}
                      onClick={() => handleBulkAction('sync')}
                      variant="outline"
                      size="lg"
                      aria-label="Sync buckets"
                      borderRadius="xl"
                      borderColor="gray.200"
                      _dark={{ borderColor: 'gray.600' }}
                      _hover={{
                        bg: 'green.50',
                        _dark: { bg: 'green.900' },
                        borderColor: 'green.300',
                        transform: 'translateY(-1px)',
                      }}
                      transition="all 0.2s ease"
                    />
                  </Tooltip>

                  {/* Advanced Actions Menu */}
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<SettingsIcon />}
                      variant="outline"
                      size="lg"
                      aria-label="More actions"
                      borderRadius="xl"
                      borderColor="gray.200"
                      _dark={{ borderColor: 'gray.600' }}
                      _hover={{
                        bg: 'purple.50',
                        _dark: { bg: 'purple.900' },
                        borderColor: 'purple.300',
                        transform: 'translateY(-1px)',
                      }}
                      transition="all 0.2s ease"
                    />  
                    <MenuList borderRadius="xl" shadow="xl">
                      <MenuItem
                        icon={<EditIcon />}
                        onClick={() => handleBulkAction('rename')}
                        borderRadius="md"
                        _hover={{ bg: 'blue.50' }}
                      >
                        Rename Buckets
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        icon={<DeleteIcon />}
                        color="red.500"
                        onClick={onDeleteOpen}
                        borderRadius="md"
                        _hover={{ bg: 'red.50' }}
                      >
                        Delete Selected
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}

              {/* Bulk Operations Menu - alternative layout */}
              {!hasSelection && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                    size="lg"
                    borderRadius="xl"
                    borderColor="gray.200"
                    _dark={{ borderColor: 'gray.600' }}
                    _hover={{
                      bg: 'gray.50',
                      _dark: { bg: 'gray.700' },
                      borderColor: 'gray.300',
                    }}
                    transition="all 0.2s ease"
                  >
                    Bulk Actions
                  </MenuButton>
                  <MenuList borderRadius="xl" shadow="xl">
                    <MenuItem icon={<DownloadIcon />} isDisabled borderRadius="md">
                      Export Buckets
                    </MenuItem>
                    <MenuItem icon={<RepeatIcon />} isDisabled borderRadius="md">
                      Sync Buckets
                    </MenuItem>
                    <MenuItem icon={<CopyIcon />} isDisabled borderRadius="md">
                      Copy Names
                    </MenuItem>
                    <MenuDivider />
                    <Box px={3} py={2}>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Select buckets to enable bulk actions
                      </Text>
                    </Box>
                  </MenuList>
                </Menu>
              )}
            </HStack>
          </Flex>

          {/* Selection Summary */}
          {hasSelection && (
            <Box 
              mt={6} 
              pt={6} 
              borderTop="1px solid" 
              borderColor="gray.100"
              _dark={{ borderColor: 'gray.600' }}
            >
              <Flex 
                justify="space-between" 
                align="center" 
                direction={{ base: "column", md: "row" }}
                gap={3}
              >
                <HStack spacing={4} fontSize="sm" color="gray.500" flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                  <Text fontWeight="medium">
                    {selectedBuckets.length} of {totalBuckets} buckets selected
                  </Text>
                  <Text>•</Text>
                  <Text fontWeight="medium">
                    Actions will apply to all selected buckets
                  </Text>
                </HStack>
                
                <Badge 
                  colorScheme="blue" 
                  variant="subtle" 
                  borderRadius="full" 
                  px={3} 
                  py={1}
                  fontSize="xs"
                >
                  Bulk Operations Enabled
                </Badge>
              </Flex>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Enhanced Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay backdropFilter="blur(4px)" />
        <AlertDialogContent borderRadius="2xl" maxW="500px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" pb={4}>
            <HStack spacing={3}>
              <Box
                p={2}
                bg="red.500"
                borderRadius="xl"
                boxShadow="0 4px 12px rgba(239, 68, 68, 0.3)"
              >
                <DeleteIcon color="white" boxSize={4} />
              </Box>
              <Text>Delete {selectedBuckets.length} Bucket(s)</Text>
            </HStack>
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack align="start" spacing={4}>
              <Text fontSize="md">
                Are you sure you want to delete the selected bucket(s)? This action cannot be undone.
              </Text>
              
              <Box
                p={4}
                                 bg="red.50"
                 _dark={{ bg: 'red.900', borderColor: 'red.700' }}
                 borderRadius="xl"
                 border="1px solid"
                 borderColor="red.200"
                width="100%"
              >
                <Text fontSize="sm" color="red.600" _dark={{ color: 'red.200' }} fontWeight="semibold">
                  ⚠️ Warning: All objects within these buckets will be permanently deleted.
                </Text>
              </Box>

              <HStack spacing={4} fontSize="sm" color="gray.600">
                <Badge colorScheme="red" borderRadius="full" px={3} py={1}>
                  {selectedBuckets.length} buckets
                </Badge>
                <Text>•</Text>
                <Text>Permanent deletion</Text>
                <Text>•</Text>
                <Text>No recovery possible</Text>
              </HStack>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter gap={3}>
            <Button 
              ref={cancelRef} 
              onClick={onDeleteClose}
              variant="outline"
              borderRadius="xl"
              px={6}
            >
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleDeleteConfirm} 
              borderRadius="xl"
              px={6}
              bg="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.3)',
              }}
              transition="all 0.2s ease"
            >
              Delete Buckets
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
