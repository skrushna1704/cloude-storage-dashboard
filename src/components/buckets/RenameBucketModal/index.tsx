import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { renameBucket } from '../../../store/slices/bucketsSlice';
import { showSuccessNotification, showErrorNotification } from '../../../store/slices/uiSlice';

interface RenameBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
  bucketId: string;
  currentName: string;
}

export const RenameBucketModal: React.FC<RenameBucketModalProps> = ({
  isOpen,
  onClose,
  bucketId,
  currentName,
}) => {
  const [newName, setNewName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
    } else {
      setNewName('');
      setIsLoading(false);
    }
  }, [isOpen, currentName]);

  const handleRename = async () => {
    if (!newName.trim()) {
      toast({
        title: 'Error',
        description: 'Bucket name cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newName.trim() === currentName) {
      toast({
        title: 'No Changes',
        description: 'The new name is the same as the current name',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate bucket name format (AWS S3 naming rules)
    const bucketNameRegex = /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/;
    if (!bucketNameRegex.test(newName.trim())) {
      toast({
        title: 'Invalid Name',
        description: 'Bucket name must be 3-63 characters long, contain only lowercase letters, numbers, dots, and hyphens, and start and end with a letter or number',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(renameBucket({ id: bucketId, newName: newName.trim() }));
      
      dispatch(showSuccessNotification({
        title: 'Bucket Renamed',
        message: `Bucket "${currentName}" renamed to "${newName.trim()}" successfully`
      }));

      onClose();
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to rename bucket'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleRename();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Rename Bucket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              Enter a new name for the bucket "{currentName}"
            </Text>
            <FormControl>
              <FormLabel>Bucket Name</FormLabel>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter new bucket name"
                autoFocus
                isDisabled={isLoading}
              />
            </FormControl>
            <Text fontSize="xs" color="gray.500">
              Bucket names must be 3-63 characters long and contain only lowercase letters, numbers, dots, and hyphens.
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleRename}
            isLoading={isLoading}
            loadingText="Renaming..."
            isDisabled={!newName.trim() || newName.trim() === currentName}
          >
            Rename Bucket
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RenameBucketModal;
