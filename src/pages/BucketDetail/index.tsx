import React, { useState, useRef} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectBucketById } from '../../store/selectors';
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Flex,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  SettingsIcon,
  DownloadIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
  LockIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import { ROUTES } from '../../constants/routes';
import { FileUploadModal } from '../../components/objects/FileUpload/FileUploadModal';
import { FilePreviewModal } from '../../components/objects/FilePreview/FilePreviewModal';
import { CreateFolderModal } from '../../components/objects/FileOperations/CreateFolderModal';
import { FileObject } from '../../types/bucket';
import { filesMockdata } from '../../constants/mockdata';
import { formatSize, formatStorageSize, getStorageClassColor, FileIcon } from '../../utils/bucket-utils';
import { downloadObject } from '../../services/api/objects';
import { downloadFile} from '../../utils/downloadUtils';

export const BucketDetail: React.FC = () => {
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [files, setFiles] = useState<FileObject[]>(filesMockdata);
  const { bucketId } = useParams<{ bucketId: string }>();
  const navigate = useNavigate();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const tableRowHoverBg = useColorModeValue('gray.50', 'gray.700');

  // Get bucket data from Redux store
  const bucket = useAppSelector(state => selectBucketById(state, bucketId || ''));
  
  // Calculate dynamic bucket info based on files
  const calculateBucketInfo = () => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const totalObjects = files.length;
    
    return bucket ? {
      name: bucket.name,
      region: bucket.region,
      size: totalSize, // Use only the files size for realistic display
      objects: totalObjects, // Use only the files count
      created: bucket.created,
      storageClass: bucket.storageClass,
      versioning: bucket.versioning,
      encryption: bucket.encryption,
      publicRead: bucket.publicRead,
      costThisMonth: bucket.cost || 0,
      requestsThisMonth: 15420, // Mock data for now
    } : {
      name: 'Unknown Bucket',
      region: 'us-east-1',
      size: totalSize,
      objects: totalObjects,
      created: 'Unknown',
      storageClass: 'Standard',
      versioning: false,
      encryption: false,
      publicRead: false,
      costThisMonth: 0,
      requestsThisMonth: 0,
    };
  };

  const bucketInfo = calculateBucketInfo();
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isViewPropertiesModalOpen, setIsViewPropertiesModalOpen] = useState(false);
  const [selectedFileToRename, setSelectedFileToRename] = useState<FileObject | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileObject | null>(null);
  const [isDeleteFileAlertOpen, setIsDeleteFileAlertOpen] = useState(false);

  const handleUploadFiles = () => {
    setIsUploadModalOpen(true);
  };

  const handleCreateFolder = () => {
    setIsCreateFolderModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleCloseCreateFolderModal = () => {
    setIsCreateFolderModalOpen(false);
  };

  const handleUploadFilesSubmit = (uploadedFiles: File[]) => {
    // Add uploaded files to the files list
    const newFiles: FileObject[] = uploadedFiles.map((file, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      name: file.name,
      type: 'file' as const,
      size: file.size,
      modified: 'Just now',
      storageClass: 'Standard',
      path: `/${file.name}`,
      mimeType: file.type,
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    toast({
      title: 'Upload Complete',
      description: `${uploadedFiles.length} file(s) uploaded successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    handleCloseUploadModal();
  };

  const handleCreateFolderSubmit = async (name: string) => {
    // Add new folder to the files list
    const newFolder: FileObject = {
      id: `folder-${Date.now()}`,
      name: name,
      type: 'folder',
      size: 0,
      modified: 'Just now',
      storageClass: 'Standard',
      path: `/${name}`,
    };

    setFiles(prevFiles => [...prevFiles, newFolder]);
    
    toast({
      title: 'Folder Created',
      description: `Folder "${name}" created successfully`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    handleCloseCreateFolderModal();
  };

  const handlePreviewFile = (file: FileObject) => {
    setPreviewFile(file);
    setIsPreviewModalOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewModalOpen(false);
    setPreviewFile(null);
  };

  const handleOpenFile = (file: FileObject) => {
    // Handle opening file in new tab or download
    if (file.type === 'file') {
      // TODO: Implement file opening logic
      console.log('Opening file:', file.name);
    }
  };

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const onDelete = () => {
    // TODO: Implement bucket deletion logic
    console.log('Deleting bucket:', bucketId);
    setIsDeleteAlertOpen(false);
    navigate(ROUTES.BUCKETS);
  };

  const [isEditPropertiesModalOpen, setIsEditPropertiesModalOpen] = useState(false);
  const [isExportDataModalOpen, setIsExportDataModalOpen] = useState(false);

  // const handleEditProperties = () => {
  //   setIsEditPropertiesModalOpen(true);
  // };

  // const handleExportData = () => {
  //   setIsExportDataModalOpen(true);
  // };

  const handleCloseEditPropertiesModal = () => {
    setIsEditPropertiesModalOpen(false);
  };

  const handleCloseExportDataModal = () => {
    setIsExportDataModalOpen(false);
  };

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedFileToDownload, setSelectedFileToDownload] = useState<FileObject | null>(null);

  const handleDownloadFile = async (file: FileObject) => {
    if (file.type === 'folder') {
      toast({
        title: 'Cannot Download Folder',
        description: 'Folders cannot be downloaded directly. Please select individual files.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setSelectedFileToDownload(file);
      setIsDownloadModalOpen(true);
    } catch (error) {
      console.error('Error preparing download:', error);
      toast({
        title: 'Download Error',
        description: 'Failed to prepare download.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
    setSelectedFileToDownload(null);
  };

  const handleRenameFile = (file: FileObject) => {
    setSelectedFileToRename(file);
    setNewFileName(file.name);
    setIsRenameModalOpen(true);
  };

  const handleCloseRenameModal = () => {
    setIsRenameModalOpen(false);
    setSelectedFileToRename(null);
    setNewFileName('');
  };

  const handleConfirmRename = () => {
    if (selectedFileToRename && newFileName.trim()) {
      // Update file name in the files list
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.id === selectedFileToRename.id 
            ? { ...file, name: newFileName.trim() }
            : file
        )
      );
      
      toast({
        title: 'File Renamed',
        description: `"${selectedFileToRename.name}" has been renamed to "${newFileName.trim()}"`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    handleCloseRenameModal();
  };

  const handleCloseViewPropertiesModal = () => {
    setIsViewPropertiesModalOpen(false);
    setSelectedFileToRename(null);
  };

  const handleDeleteFile = (file: FileObject) => {
    setSelectedFileToRename(file); // Reusing selectedFileToRename for deletion
    setIsDeleteFileAlertOpen(true);
  };

  const handleCloseDeleteFileAlert = () => {
    setIsDeleteFileAlertOpen(false);
    setSelectedFileToRename(null);
  };

  const handleConfirmDeleteFile = () => {
    if (selectedFileToRename) {
      // Remove file from the files list
      setFiles(prevFiles => prevFiles.filter(file => file.id !== selectedFileToRename.id));
      
      toast({
        title: 'File Deleted',
        description: `"${selectedFileToRename.name}" has been deleted`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    handleCloseDeleteFileAlert();
  };

  return (
    <Container maxW="full" px={{ base: 4, md: 8 }} py={8}>
      <Box>
        {/* Enhanced Breadcrumb Navigation */}
        <Breadcrumb 
          spacing={2} 
          separator={<ChevronRightIcon color="gray.500" />} 
          mb={8}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink 
              as={Link} 
              to={ROUTES.BUCKETS} 
              color="gray.500" 
              fontSize="sm" 
              data-test='bucket_breadcrumb'
              _hover={{ color: '#667eea' }}
              transition="color 0.2s ease"
            >
              Buckets
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700">
              {bucketInfo.name}
            </Text>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Enhanced Header */}
        <Flex 
          justify="space-between" 
          align="start" 
          mb={10} 
          direction={{ base: "column", md: "row" }} 
          gap={6}
        >
          <VStack align="start" spacing={4} flex="1">
            <HStack spacing={4} align="center">
              <Box
                p={3}
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                borderRadius="2xl"
                boxShadow="0 8px 25px rgba(102, 126, 234, 0.3)"
              >
                                 <ViewIcon color="white" boxSize={6} />
              </Box>
              <VStack align="start" spacing={1}>
                <Heading 
                  size={{ base: "xl", md: "2xl" }} 
                  bgGradient="linear(to-r, #667eea, #764ba2)" 
                  bgClip="text"
                  fontWeight="bold"
                >
                  {bucketInfo.name}
                </Heading>
                <Text fontSize="sm" color="gray.500" fontWeight="medium">
                  Bucket ID: {bucketId}
                </Text>
              </VStack>
            </HStack>
            
            <HStack spacing={3} flexWrap="wrap">
              <Badge 
                colorScheme={getStorageClassColor(bucketInfo.storageClass)}
                borderRadius="full"
                px={3}
                py={1}
                fontWeight="semibold"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              >
                {bucketInfo.storageClass}
              </Badge>
              <Badge 
                variant="outline" 
                borderRadius="full"
                px={3}
                py={1}
                borderColor="gray.300"
                color="gray.600"
                fontWeight="medium"
              >
                {bucketInfo.region}
              </Badge>
              {bucketInfo.encryption && (
                <Badge 
                  colorScheme="green" 
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontWeight="semibold"
                  boxShadow="0 2px 4px rgba(34, 197, 94, 0.2)"
                >
                  Encrypted
                </Badge>
              )}
              {bucketInfo.versioning && (
                <Badge 
                  colorScheme="blue" 
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontWeight="semibold"
                  boxShadow="0 2px 4px rgba(59, 130, 246, 0.2)"
                >
                  Versioning
                </Badge>
              )}
              {bucketInfo.publicRead && (
                <Badge 
                  colorScheme="orange" 
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontWeight="semibold"
                  boxShadow="0 2px 4px rgba(249, 115, 22, 0.2)"
                >
                  Public
                </Badge>
              )}
            </HStack>
          </VStack>
        </Flex>

        {/* Enhanced Stats Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={10}>
          <Card 
            bg={cardBg} 
            shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
            transition="all 0.3s ease"
          >
            <CardBody py={6}>
              <Stat>
                <StatLabel fontSize="sm" color="gray.500" fontWeight="semibold">Total Size</StatLabel>
                <StatNumber fontSize="2xl" color="#667eea" fontWeight="bold">
                  {formatStorageSize(bucketInfo.size)}
                </StatNumber>
                <StatHelpText fontSize="xs" color="gray.400">Storage used</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card 
            bg={cardBg} 
            shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
            transition="all 0.3s ease"
          >
            <CardBody py={6}>
              <Stat>
                <StatLabel fontSize="sm" color="gray.500" fontWeight="semibold">Objects</StatLabel>
                <StatNumber fontSize="2xl" color="#667eea" fontWeight="bold">
                  {bucketInfo.objects.toLocaleString()}
                </StatNumber>
                <StatHelpText fontSize="xs" color="gray.400">Files & folders</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card 
            bg={cardBg} 
            shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
            transition="all 0.3s ease"
          >
            <CardBody py={6}>
              <Stat>
                <StatLabel fontSize="sm" color="gray.500" fontWeight="semibold">Monthly Cost</StatLabel>
                <StatNumber fontSize="2xl" color="#667eea" fontWeight="bold">
                  ${bucketInfo.costThisMonth}
                </StatNumber>
                <StatHelpText fontSize="xs" color="gray.400">This month</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card 
            bg={cardBg} 
            shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
            transition="all 0.3s ease"
          >
            <CardBody py={6}>
              <Stat>
                <StatLabel fontSize="sm" color="gray.500" fontWeight="semibold">Requests</StatLabel>
                <StatNumber fontSize="2xl" color="#667eea" fontWeight="bold">
                  {bucketInfo.requestsThisMonth.toLocaleString()}
                </StatNumber>
                <StatHelpText fontSize="xs" color="gray.400">This month</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Enhanced Security & Configuration */}
        <Card 
          bg={cardBg} 
          shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          mb={10}
        >
          <CardBody py={8}>
            <Heading size="md" mb={8} data-test='bucket_details_security_heading' color="gray.700">
              Security & Configuration
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <VStack align="start" spacing={3}>
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg={bucketInfo.encryption ? "green.100" : "gray.100"}
                    borderRadius="xl"
                  >
                    <LockIcon 
                      color={bucketInfo.encryption ? 'green.500' : 'gray.400'} 
                      boxSize={5} 
                    />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold" color="gray.700">Encryption</Text>
                    <Text fontSize="sm" color="gray.600">
                      {bucketInfo.encryption ? 'AES-256 Server-side encryption' : 'Not encrypted'}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              
              <VStack align="start" spacing={3}>
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg={bucketInfo.versioning ? "blue.100" : "gray.100"}
                    borderRadius="xl"
                  >
                    <RepeatIcon 
                      color={bucketInfo.versioning ? 'blue.500' : 'gray.400'} 
                      boxSize={5} 
                    />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold" color="gray.700">Versioning</Text>
                    <Text fontSize="sm" color="gray.600">
                      {bucketInfo.versioning ? 'Enabled' : 'Disabled'}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              
              <VStack align="start" spacing={3}>
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg={bucketInfo.publicRead ? "orange.100" : "green.100"}
                    borderRadius="xl"
                  >
                    <Icon
                      viewBox="0 0 24 24"
                      color={bucketInfo.publicRead ? 'orange.500' : 'green.500'}
                      boxSize={5}
                    >
                      <path
                        fill="currentColor"
                        d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5C16.4,11 17,11.4 17,12V16C17,16.6 16.6,17 16,17H8C7.4,17 7,16.6 7,16V12C7,11.4 7.4,11 8,11H8.5V10C8.5,8.6 9.9,7 12,7M12,8.2C10.2,8.2 9.2,9.2 9.2,10V11H14.8V10C14.8,9.2 13.8,8.2 12,8.2Z"
                      />
                    </Icon>
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold" color="gray.700">Public Access</Text>
                    <Text fontSize="sm" color="gray.600">
                      {bucketInfo.publicRead ? 'Public read access enabled' : 'Private bucket'}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Enhanced Files and Folders */}
        <Card 
          bg={cardBg} 
          shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
        >
          <CardBody py={8}>
            <Flex 
              justify="space-between" 
              align="center" 
              mb={8} 
              direction={{ base: "column", md: "row" }} 
              gap={6}
            >
              <VStack align={{ base: "center", md: "start" }} spacing={2}>
                <Heading size="md" color="gray.700">Objects</Heading>
                <Text fontSize="sm" color="gray.500">
                  {files.length} files and folders
                </Text>
              </VStack>
              <HStack spacing={3}>
                <Button 
                  leftIcon={<ViewIcon />} 
                  size="md" 
                  variant="outline" 
                  onClick={handleUploadFiles} 
                  data-test='bucket_details_upload_files_btn'
                  borderRadius="xl"
                  borderColor="gray.200"
                  _hover={{
                    bg: 'blue.50',
                    borderColor: 'blue.300',
                    transform: 'translateY(-1px)',
                  }}
                  transition="all 0.2s ease"
                >
                  Upload Files
                </Button>
                <Button 
                                     leftIcon={<ViewIcon />} 
                  size="md" 
                  variant="outline" 
                  onClick={handleCreateFolder} 
                  data-test='bucket_details_create_folder_btn'
                  borderRadius="xl"
                  borderColor="gray.200"
                  _hover={{
                    bg: 'green.50',
                    borderColor: 'green.300',
                    transform: 'translateY(-1px)',
                  }}
                  transition="all 0.2s ease"
                >
                  Create Folder
                </Button>
              </HStack>
            </Flex>
            
            <Box overflowX="auto">
              <Table variant="simple" size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                      Name
                    </Th>
                    <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                      Size
                    </Th>
                    <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                      Storage Class
                    </Th>
                    <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                      Modified
                    </Th>
                    <Th border="none"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {files.map((file, index) => (
                    <Tr
                      key={index}
                      _hover={{ bg: tableRowHoverBg }}
                      cursor="pointer"
                      transition="background-color 0.2s ease"
                    >
                      <Td border="none" py={4}>
                        <HStack spacing={3}>
                          <Box
                            p={1}
                            bg={file.type === 'folder' ? 'blue.100' : 'gray.100'}
                            borderRadius="md"
                          >
                            <FileIcon type={file.type} />
                          </Box>
                          <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }} color="gray.700">
                            {file.name}
                          </Text>
                        </HStack>
                      </Td>
                      <Td border="none" py={4}>
                        <Text fontSize={{ base: "sm", md: "sm" }} color="gray.600">
                          {formatSize(file.size)}
                        </Text>
                      </Td>
                      <Td border="none" py={4}>
                        <Badge 
                          colorScheme={getStorageClassColor(file.storageClass)} 
                          size={{ base: "sm", md: "sm" }}
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {file.storageClass}
                        </Badge>
                      </Td>
                      <Td border="none" py={4}>
                        <Text fontSize={{ base: "sm", md: "sm" }} color="gray.600">
                          {file.modified}
                        </Text>
                      </Td>
                      <Td border="none" py={4}>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<SettingsIcon />}
                            variant="ghost"
                            size={{ base: "sm", md: "sm" }}
                            borderRadius="md"
                            _hover={{ bg: 'gray.100' }}
                          />
                          <MenuList borderRadius="xl" shadow="xl">
                            <MenuItem 
                              icon={<DownloadIcon />} 
                              onClick={() => handleDownloadFile(file)}
                              borderRadius="md"
                              _hover={{ bg: 'blue.50' }}
                            >
                              Download
                            </MenuItem>
                            <MenuItem 
                              icon={<EditIcon />} 
                              onClick={() => handleRenameFile(file)}
                              borderRadius="md"
                              _hover={{ bg: 'green.50' }}
                            >
                              Rename
                            </MenuItem>
                            <MenuItem 
                              icon={<ViewIcon />} 
                              onClick={() => handlePreviewFile(file)}
                              borderRadius="md"
                              _hover={{ bg: 'purple.50' }}
                            >
                              Preview
                            </MenuItem>
                            <Divider />
                            <MenuItem 
                              icon={<DeleteIcon />} 
                              color="red.500" 
                              onClick={() => handleDeleteFile(file)}
                              borderRadius="md"
                              _hover={{ bg: 'red.50' }}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {files.length === 0 && (
              <Box textAlign="center" py={16}>
                <Box
                  p={6}
                  bg="gray.50"
                  _dark={{ bg: 'gray.700' }}
                  borderRadius="2xl"
                  display="inline-block"
                  mb={6}
                >
                  <ViewIcon boxSize={12} color="gray.400" />
                </Box>
                <Heading size="md" color="gray.500" mb={3}>
                  No objects found
                </Heading>
                <Text color="gray.400" mb={8} maxW="400px" mx="auto">
                  This bucket is empty. Upload files or create folders to get started.
                </Text>
                <Button
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  color="white"
                  leftIcon={<ViewIcon />}
                  onClick={handleUploadFiles}
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
                  Upload Files
                </Button>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Professional Modals */}
        <FileUploadModal
          isOpen={isUploadModalOpen}
          onClose={handleCloseUploadModal}
          onUpload={handleUploadFilesSubmit}
          currentPath="/"
        />

        <CreateFolderModal
          isOpen={isCreateFolderModalOpen}
          onClose={handleCloseCreateFolderModal}
          onCreateFolder={handleCreateFolderSubmit}
          currentPath="/"
        />

        <FilePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={handlePreviewClose}
          file={previewFile}
          onDownload={(fileId) => {
            // TODO: Implement download logic
            console.log('Downloading file:', fileId);
          }}
          onOpen={handleOpenFile}
        />

        <Modal isOpen={isEditPropertiesModalOpen} onClose={handleCloseEditPropertiesModal} size={{ base: "full", md: "md" }}>
          <ModalOverlay />
          <ModalContent mx={{ base: 4, md: 0 }}>
            <ModalHeader>Edit Properties</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Bucket Properties are under development.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseEditPropertiesModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isExportDataModalOpen} onClose={handleCloseExportDataModal} size={{ base: "full", md: "md" }}>
          <ModalOverlay />
          <ModalContent mx={{ base: 4, md: 0 }}>
            <ModalHeader>Export Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Export functionality is under development.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseExportDataModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <AlertDialog
          isOpen={isDeleteAlertOpen}
          onClose={() => setIsDeleteAlertOpen(false)}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Bucket
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={() => setIsDeleteAlertOpen(false)}>Cancel</Button>
                <Button colorScheme="red" onClick={onDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <AlertDialog
          isOpen={isDeleteFileAlertOpen}
          onClose={handleCloseDeleteFileAlert}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete File
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to delete "{selectedFileToRename?.name}"? This action cannot be undone.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={handleCloseDeleteFileAlert}>Cancel</Button>
                <Button colorScheme="red" onClick={handleConfirmDeleteFile} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Modal isOpen={isRenameModalOpen} onClose={handleCloseRenameModal} size={{ base: "full", md: "md" }}>
          <ModalOverlay />
          <ModalContent mx={{ base: 4, md: 0 }}>
            <ModalHeader>Rename File</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Enter new file name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseRenameModal}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleConfirmRename}>
                Rename
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isViewPropertiesModalOpen} onClose={handleCloseViewPropertiesModal} size={{ base: "full", md: "md" }}>
          <ModalOverlay />
          <ModalContent mx={{ base: 4, md: 0 }}>
            <ModalHeader>File Properties</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>File Properties are under development.</Text>
              <Text fontWeight="semibold">Name: {selectedFileToRename?.name}</Text>
              <Text fontSize="sm" color="gray.600">Type: {selectedFileToRename?.type}</Text>
              <Text fontSize="sm" color="gray.600">Size: {formatSize(selectedFileToRename?.size || 0)}</Text>
              <Text fontSize="sm" color="gray.600">Storage Class: {selectedFileToRename?.storageClass}</Text>
              <Text fontSize="sm" color="gray.600">Modified: {selectedFileToRename?.modified}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseViewPropertiesModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <AlertDialog
          isOpen={isDownloadModalOpen}
          onClose={handleCloseDownloadModal}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Download File
              </AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to download "{selectedFileToDownload?.name}"?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={handleCloseDownloadModal}>Cancel</Button>
                <Button 
                  colorScheme="blue" 
                  onClick={async () => {
                    if (!selectedFileToDownload || !bucketId) {
                      handleCloseDownloadModal();
                      return;
                    }

                    try {
                      // toast({
                      //   title: `Downloading "${selectedFileToDownload.name}"...`,
                      //   description: "Please wait while we prepare your download.",
                      //   status: "info",
                      //   duration: 3000,
                      //   isClosable: true,
                      // });

                      const blob = await downloadObject(bucketId, selectedFileToDownload.path, selectedFileToDownload.name);
                      downloadFile(blob, selectedFileToDownload.name);

                      toast({
                        title: 'Download Complete',
                        description: `"${selectedFileToDownload.name}" has been downloaded successfully.`,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    } catch (error) {
                      console.error('Download error:', error);
                      toast({
                        title: 'Download Failed',
                        description: 'Failed to download the file. Please try again.',
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                    handleCloseDownloadModal();
                  }} 
                  ml={3}
                >
                  Download
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Container>
  );
};

export default BucketDetail;
