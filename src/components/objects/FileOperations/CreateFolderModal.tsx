import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Icon,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  AddIcon,
} from '@chakra-ui/icons';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (name: string) => void;
  currentPath: string;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onCreateFolder,
  currentPath,
}) => {
  const [folderName, setFolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const toast = useToast();
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const validateFolderName = (name: string): string => {
    if (!name.trim()) {
      return 'Folder name is required';
    }
    
    if (name.length > 255) {
      return 'Folder name must be less than 255 characters';
    }
    
    // Check for invalid characters
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(name)) {
      return 'Folder name contains invalid characters';
    }
    
    // Check for reserved names
    const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];
    if (reservedNames.includes(name.toUpperCase())) {
      return 'Folder name is reserved';
    }
    
    return '';
  };

  const handleInputChange = (value: string) => {
    setFolderName(value);
    setError(validateFolderName(value));
  };

  const handleCreateFolder = async () => {
    const validationError = validateFolderName(folderName);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    
    try {
      await onCreateFolder(folderName.trim());
      
      toast({
        title: 'Folder Created',
        description: `Folder "${folderName.trim()}" created successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setFolderName('');
      setError('');
      onClose();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create folder. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFolderName('');
    setError('');
    onClose();
  };

  const getCurrentPathDisplay = () => {
    if (currentPath === '/') {
      return 'root';
    }
    return currentPath.split('/').filter(Boolean).join(' / ') || 'root';
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Box
              p={2}
              borderRadius="lg"
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              color="white"
            >
              <Icon as={AddIcon} boxSize={5} />
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold">Create New Folder</Text>
              <Text fontSize="sm" color="gray.500">
                Enter a name for the new folder in <strong>{getCurrentPathDisplay()}</strong>
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={!!error}>
              <FormLabel fontWeight="medium">Folder name</FormLabel>
              <Input
                placeholder="Enter folder name..."
                value={folderName}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading && !error) {
                    handleCreateFolder();
                  }
                }}
                autoFocus
                size="lg"
                borderColor={error ? 'red.300' : borderColor}
                _focus={{
                  borderColor: error ? 'red.500' : 'blue.500',
                  boxShadow: error ? '0 0 0 1px #E53E3E' : '0 0 0 1px #3182CE',
                }}
              />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            
            <Box
              p={3}
              bg="blue.50"
              borderRadius="md"
              border="1px solid"
              borderColor="blue.200"
            >
              <Text fontSize="sm" color="blue.700">
                <strong>Tip:</strong> Use descriptive names that help organize your files. 
                Avoid special characters like &lt; &gt; : " / \ | ? *
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              color="white"
              onClick={handleCreateFolder}
              isLoading={isLoading}
              loadingText="Creating..."
              isDisabled={!folderName.trim() || !!error}
              _hover={{
                bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              }}
              _active={{
                bg: 'linear-gradient(135deg, #4c51bf 0%, #553c9a 100%)',
              }}
            >
              Create Folder
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
