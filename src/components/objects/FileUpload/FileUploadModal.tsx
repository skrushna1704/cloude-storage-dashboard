import React, { useState, useCallback } from 'react';
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
  Box,
  Icon,
  Progress,
  IconButton,
  Badge,
  Flex,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import {
  CloseIcon,
  DownloadIcon,
  CheckIcon,
} from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  currentPath: string;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  currentPath,
}) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const toast = useToast();
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.600');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newUploadFiles: UploadFile[] = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'pending',
    }));
    
    setUploadFiles(prev => [...prev, ...newUploadFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload progress for each file
    for (let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i];
      if (file.status === 'pending') {
        setUploadFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'uploading' }
              : f
          )
        );
        
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, progress }
                : f
            )
          );
        }
        
        setUploadFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'completed', progress: 100 }
              : f
          )
        );
      }
    }
    
    setIsUploading(false);
    toast({
      title: 'Upload Complete',
      description: `${uploadFiles.length} file(s) uploaded successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    onUpload(uploadFiles.map(f => f.file));
    setUploadFiles([]);
    onClose();
  };

  const removeFile = (fileId: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📄';
    }
  };

  const getStatusColor = (status: UploadFile['status']) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'error':
        return 'red';
      case 'uploading':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Icon as={DownloadIcon} color="blue.500" />
            <Text data-test='upload_folder_model_text'>Upload Files</Text>
          </HStack>
        </ModalHeader>
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Dropzone */}
            <Box
              {...getRootProps()}
              border="2px dashed"
              borderColor={isDragActive ? 'blue.400' : borderColor}
              borderRadius="lg"
              p={8}
              textAlign="center"
              bg={isDragActive ? 'blue.50' : bgColor}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ borderColor: 'blue.400', bg: hoverBg }}
            >
              <input {...getInputProps()} />
              <VStack spacing={4}>
                <Icon as={DownloadIcon} boxSize={12} color="blue.500" />
                <Text fontSize="lg" fontWeight="semibold">
                  {isDragActive ? 'Drop files here' : 'Drop files here or click to browse'}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Support for multiple files
                </Text>
                <Button colorScheme="blue" variant="outline" size="sm">
                  Choose Files
                </Button>
              </VStack>
            </Box>

            {/* Upload Progress */}
            {uploadFiles.length > 0 && (
              <VStack spacing={4} align="stretch">
                <Text fontWeight="semibold">Upload Progress</Text>
                {uploadFiles.map((uploadFile) => (
                  <Box
                    key={uploadFile.id}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="md"
                    p={4}
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <HStack>
                        <Text fontSize="lg">{getFileIcon(uploadFile.file.name)}</Text>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium" fontSize="sm">
                            {uploadFile.file.name}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {formatFileSize(uploadFile.file.size)}
                          </Text>
                        </VStack>
                      </HStack>
                      
                      <HStack spacing={2}>
                        <Badge colorScheme={getStatusColor(uploadFile.status)} size="sm">
                          {uploadFile.status === 'completed' && <CheckIcon boxSize={3} mr={1} />}
                          {uploadFile.status}
                        </Badge>
                        <IconButton
                          icon={<CloseIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFile(uploadFile.id)}
                          aria-label="Remove file"
                        />
                      </HStack>
                    </Flex>
                    
                    {uploadFile.status === 'uploading' && (
                      <Progress 
                        value={uploadFile.progress} 
                        colorScheme="blue" 
                        size="sm" 
                        borderRadius="full"
                      />
                    )}
                    
                    {uploadFile.error && (
                      <Text fontSize="sm" color="red.500" mt={2}>
                        {uploadFile.error}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleUpload}
              isLoading={isUploading}
              loadingText="Uploading..."
              isDisabled={uploadFiles.length === 0}
            >
              Upload {uploadFiles.length > 0 ? `(${uploadFiles.length})` : ''}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
