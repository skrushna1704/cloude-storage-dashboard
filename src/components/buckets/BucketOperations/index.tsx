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
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
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
      <Box
        p={4}
        bg={bgColor}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        shadow="sm"
      >
        <HStack justify="space-between" align="center">
          {/* Left side - Selection info */}
          <HStack spacing={4}>
            {hasSelection ? (
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="semibold" color="blue.600">
                  {selectedBuckets.length} bucket(s) selected
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Choose an action to perform
                </Text>
              </VStack>
            ) : (
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="semibold">
                  Bucket Operations
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {totalBuckets} total buckets
                </Text>
              </VStack>
            )}

            {hasSelection && (
              <Badge colorScheme="blue" borderRadius="full">
                {selectedBuckets.length}
              </Badge>
            )}
          </HStack>

          {/* Right side - Action buttons */}
          <HStack spacing={2}>
            {/* Create Bucket Button */}
            <Button
              leftIcon={<AddIcon />}
              onClick={onCreateBucket}
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              color="white"
              size="md"
              _hover={{
                transform: 'translateY(-1px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
              data-test={testIds.create_bucket_btns}
            >
              Create Bucket
            </Button>

            {/* Bulk Actions - only show when buckets are selected */}
            {hasSelection && (
              <>
                {/* Quick Actions */}
                <Tooltip label="Export selected buckets">
                  <IconButton
                    icon={<DownloadIcon />}
                    onClick={() => handleBulkAction('export')}
                    variant="outline"
                    size="md"
                    aria-label="Export buckets"
                  />
                </Tooltip>

                <Tooltip label="Sync selected buckets">
                  <IconButton
                    icon={<RepeatIcon />}
                    onClick={() => handleBulkAction('sync')}
                    variant="outline"
                    size="md"
                    aria-label="Sync buckets"
                  />
                </Tooltip>

                {/* Advanced Actions Menu */}
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<SettingsIcon />}
                    variant="outline"
                    size="md"
                    aria-label="More actions"
                  />  
                  <MenuList>
                    <MenuItem
                      icon={<EditIcon />}
                      onClick={() => handleBulkAction('rename')}
                    >
                      Rename Buckets
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      icon={<DeleteIcon />}
                      color="red.500"
                      onClick={onDeleteOpen}
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
                  size="md"
                >
                  Bulk Actions
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<DownloadIcon />} isDisabled>
                    Export Buckets
                  </MenuItem>
                  <MenuItem icon={<RepeatIcon />} isDisabled>
                    Sync Buckets
                  </MenuItem>
                  <MenuItem icon={<CopyIcon />} isDisabled>
                    Copy Names
                  </MenuItem>
                  <MenuDivider />
                  <Text px={3} py={2} fontSize="xs" color="gray.500">
                    Select buckets to enable bulk actions
                  </Text>
                </MenuList>
              </Menu>
            )}
          </HStack>
        </HStack>

        {/* Selection Summary */}
        {hasSelection && (
          <Box mt={3} pt={3} borderTop="1px solid" borderColor="gray.100">
            <HStack spacing={4} fontSize="xs" color="gray.500">
              <Text>
                {selectedBuckets.length} of {totalBuckets} buckets selected
              </Text>
              <Text>•</Text>
              <Text>
                Actions will apply to all selected buckets
              </Text>
            </HStack>
          </Box>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {selectedBuckets.length} Bucket(s)
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack align="start" spacing={3}>
                <Text>
                  Are you sure you want to delete the selected bucket(s)? This action cannot be undone.
                </Text>
                
                <Box
                  p={3}
                  bg="red.50"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="red.200"
                  width="100%"
                >
                  <Text fontSize="sm" color="red.600" fontWeight="medium">
                    Warning: All objects within these buckets will be permanently deleted.
                  </Text>
                </Box>

                <Text fontSize="sm" color="gray.600">
                  Buckets to be deleted: {selectedBuckets.length}
                </Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete Buckets
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
