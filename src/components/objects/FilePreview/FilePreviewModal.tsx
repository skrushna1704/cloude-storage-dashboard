import React from 'react';
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
  Image,
  Badge,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  DownloadIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';

interface FileObject {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modified: string;
  storageClass: string;
  path: string;
  mimeType?: string;
  url?: string;
}

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileObject | null;
  onDownload: (fileId: string) => void;
  onOpen: (file: FileObject) => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  file,
  onDownload,
  onOpen,
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgColor = useColorModeValue('white', 'gray.800');

  if (!file) return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string, mimeType?: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (mimeType?.startsWith('image/')) return '🖼️';
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return '🖼️';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📊';
      case 'zip':
      case 'rar':
      case '7z':
        return '📦';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎥';
      case 'mp3':
      case 'wav':
      case 'flac':
        return '🎵';
      case 'txt':
        return '📄';
      default:
        return '📄';
    }
  };

  const isImage = file.mimeType?.startsWith('image/') || 
    ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(file.name.split('.').pop()?.toLowerCase() || '');

  const isVideo = file.mimeType?.startsWith('video/') || 
    ['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(file.name.split('.').pop()?.toLowerCase() || '');

  const isAudio = file.mimeType?.startsWith('audio/') || 
    ['mp3', 'wav', 'flac', 'aac'].includes(file.name.split('.').pop()?.toLowerCase() || '');

  const isPDF = file.mimeType === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  const renderPreview = () => {
    if (isImage) {
      return (
        <Box
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          overflow="hidden"
          bg="gray.50"
          minH="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={file.url || '/placeholder-image.jpg'}
            alt={file.name}
            maxH="400px"
            maxW="100%"
            objectFit="contain"
            fallback={
              <VStack spacing={4}>
                <Text fontSize="6xl">{getFileIcon(file.name, file.mimeType)}</Text>
                <Text color="gray.500">Image preview not available</Text>
              </VStack>
            }
          />
        </Box>
      );
    }

    if (isVideo) {
      return (
        <Box
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          overflow="hidden"
          bg="black"
          minH="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <video
            controls
            style={{ maxHeight: '400px', maxWidth: '100%' }}
            src={file.url}
          >
            Your browser does not support the video tag.
          </video>
        </Box>
      );
    }

    if (isAudio) {
      return (
        <Box
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          p={8}
          bg="gray.50"
          minH="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={4}>
            <Text fontSize="6xl">🎵</Text>
            <audio controls style={{ width: '100%' }} src={file.url}>
              Your browser does not support the audio tag.
            </audio>
          </VStack>
        </Box>
      );
    }

    if (isPDF) {
      return (
        <Box
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          p={8}
          bg="gray.50"
          minH="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={4}>
            <Text fontSize="6xl">📄</Text>
            <Text color="gray.500">PDF preview not available</Text>
            <Button
              leftIcon={<ExternalLinkIcon />}
              colorScheme="blue"
              variant="outline"
              onClick={() => onOpen(file)}
            >
              Open PDF
            </Button>
          </VStack>
        </Box>
      );
    }

    // Default file preview
    return (
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        p={8}
        bg="gray.50"
        minH="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Text fontSize="6xl">{getFileIcon(file.name, file.mimeType)}</Text>
          <Text color="gray.500">Preview not available for this file type</Text>
          <Button
            leftIcon={<ExternalLinkIcon />}
            colorScheme="blue"
            variant="outline"
            onClick={() => onOpen(file)}
          >
            Open File
          </Button>
        </VStack>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>
          <HStack>
            <Text fontSize="lg">{getFileIcon(file.name, file.mimeType)}</Text>
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold">{file.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {formatFileSize(file.size)} • {file.modified}
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* File Preview */}
            {renderPreview()}

            {/* File Details */}
            <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="lg"
              p={4}
              bg={bgColor}
            >
              <Text fontWeight="semibold" mb={3}>File Details</Text>
              <VStack spacing={2} align="stretch">
                <Flex justify="space-between">
                  <Text fontSize="sm" color="gray.600">Name:</Text>
                  <Text fontSize="sm" fontWeight="medium">{file.name}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm" color="gray.600">Size:</Text>
                  <Text fontSize="sm">{formatFileSize(file.size)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm" color="gray.600">Type:</Text>
                  <Badge colorScheme="blue" size="sm">
                    {file.mimeType || 'Unknown'}
                  </Badge>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm" color="gray.600">Storage Class:</Text>
                  <Badge colorScheme="green" size="sm">
                    {file.storageClass}
                  </Badge>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="sm" color="gray.600">Modified:</Text>
                  <Text fontSize="sm">{file.modified}</Text>
                </Flex>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              leftIcon={<DownloadIcon />}
              colorScheme="blue"
              onClick={() => onDownload(file.id)}
            >
              Download
            </Button>
            {(isPDF || !isImage) && (
              <Button
                leftIcon={<ExternalLinkIcon />}
                variant="outline"
                onClick={() => onOpen(file)}
              >
                Open
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
