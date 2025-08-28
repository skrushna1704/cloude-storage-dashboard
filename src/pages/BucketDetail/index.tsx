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


export const BucketDetail: React.FC = () => {
  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [files, setFiles] = useState<FileObject[]>(filesMockdata);
  const { bucketId } = useParams<{ bucketId: string }>();
  const navigate = useNavigate();
  
  const cardBg = useColorModeValue('white', 'gray.700');
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

  const handleEditProperties = () => {
    setIsEditPropertiesModalOpen(true);
  };

  const handleExportData = () => {
    setIsExportDataModalOpen(true);
  };

  const handleCloseEditPropertiesModal = () => {
    setIsEditPropertiesModalOpen(false);
  };

  const handleCloseExportDataModal = () => {
    setIsExportDataModalOpen(false);
  };

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedFileToDownload, setSelectedFileToDownload] = useState<FileObject | null>(null);

  const handleDownloadFile = (file: FileObject) => {
    setSelectedFileToDownload(file);
    setIsDownloadModalOpen(true);
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
    <Box>
      {/* Breadcrumb Navigation */}
      <Breadcrumb spacing={2} separator={<ChevronRightIcon color="gray.500" />} mb={6}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={ROUTES.BUCKETS} color="gray.500" fontSize="sm" data-test='bucket_breadcrumb'>
            Buckets
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700">
            {bucketInfo.name}
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Header */}
      <Flex justify="space-between" align="start" mb={8} direction={{ base: "column", md: "row" }} gap={4}>
        <VStack align="start" spacing={2}>
          <Heading size={{ base: "lg", md: "xl" }} bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text">
            {bucketInfo.name}
          </Heading>
          <HStack spacing={3} flexWrap="wrap">
            <Badge colorScheme={getStorageClassColor(bucketInfo.storageClass)}>
              {bucketInfo.storageClass}
            </Badge>
            <Badge variant="outline">{bucketInfo.region}</Badge>
            {bucketInfo.encryption && <Badge colorScheme="green">Encrypted</Badge>}
            {bucketInfo.versioning && <Badge colorScheme="blue">Versioning</Badge>}
            {bucketInfo.publicRead && <Badge colorScheme="orange">Public</Badge>}
          </HStack>
        </VStack>
        
        <HStack spacing={3}>
          <Button leftIcon={<ViewIcon />} variant="outline" size={{ base: "sm", md: "md" }} onClick={() => navigate(`/analytics/bucket/${bucketId}`)} data-test='bucket_details_monitor_btn'>
            Monitor
          </Button>
          <Button leftIcon={<SettingsIcon />} variant="outline" size={{ base: "sm", md: "md" }} onClick={handleEditProperties} data-test='bucket_details_configure_btn'>
            Configure
          </Button>
          <Menu>
            <MenuButton as={IconButton} icon={<SettingsIcon />} variant="outline" size={{ base: "sm", md: "md" }} />
            <MenuList>
              <MenuItem icon={<EditIcon />} onClick={handleEditProperties}>Edit Properties</MenuItem>
              <MenuItem icon={<DownloadIcon />} onClick={handleExportData}>Export Data</MenuItem>
              <Divider />
              <MenuItem icon={<DeleteIcon />} color="red.500" onClick={() => setIsDeleteAlertOpen(true)}>Delete Bucket</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Total Size</StatLabel>
              <StatNumber fontSize="2xl" color="#667eea">
                {formatStorageSize(bucketInfo.size)}
              </StatNumber>
              <StatHelpText fontSize="xs">Storage used</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Objects</StatLabel>
              <StatNumber fontSize="2xl" color="#667eea">
                {bucketInfo.objects.toLocaleString()}
              </StatNumber>
              <StatHelpText fontSize="xs">Files & folders</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Monthly Cost</StatLabel>
              <StatNumber fontSize="2xl" color="#667eea">
                ${bucketInfo.costThisMonth}
              </StatNumber>
              <StatHelpText fontSize="xs">This month</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg={cardBg} shadow="md" borderRadius="xl">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Requests</StatLabel>
              <StatNumber fontSize="2xl" color="#667eea">
                {bucketInfo.requestsThisMonth.toLocaleString()}
              </StatNumber>
              <StatHelpText fontSize="xs">This month</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Security & Configuration */}
      <Card bg={cardBg} shadow="md" borderRadius="xl" mb={8}>
        <CardBody>
          <Heading size="md" mb={6} data-test='bucket_details_security_heading'>Security & Configuration</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <VStack align="start" spacing={2}>
              <HStack>
                <LockIcon color={bucketInfo.encryption ? 'green.500' : 'gray.400'} />
                <Text fontWeight="semibold">Encryption</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                {bucketInfo.encryption ? 'AES-256 Server-side encryption' : 'Not encrypted'}
              </Text>
            </VStack>
            
            <VStack align="start" spacing={2}>
              <HStack>
                <RepeatIcon color={bucketInfo.versioning ? 'blue.500' : 'gray.400'} />
                <Text fontWeight="semibold">Versioning</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                {bucketInfo.versioning ? 'Enabled' : 'Disabled'}
              </Text>
            </VStack>
            
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon
                  viewBox="0 0 24 24"
                  color={bucketInfo.publicRead ? 'orange.500' : 'green.500'}
                  boxSize={4}
                >
                  <path
                    fill="currentColor"
                    d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5C16.4,11 17,11.4 17,12V16C17,16.6 16.6,17 16,17H8C7.4,17 7,16.6 7,16V12C7,11.4 7.4,11 8,11H8.5V10C8.5,8.6 9.9,7 12,7M12,8.2C10.2,8.2 9.2,9.2 9.2,10V11H14.8V10C14.8,9.2 13.8,8.2 12,8.2Z"
                  />
                </Icon>
                <Text fontWeight="semibold">Public Access</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                {bucketInfo.publicRead ? 'Public read access enabled' : 'Private bucket'}
              </Text>
            </VStack>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Files and Folders */}
      <Card bg={cardBg} shadow="md" borderRadius="xl">
        <CardBody>
          <Flex justify="space-between" align="center" mb={6} direction={{ base: "column", md: "row" }} gap={4}>
            <Heading size="md">Objects</Heading>
            <HStack spacing={3}>
              <Button leftIcon={<ViewIcon />} size={{ base: "sm", md: "sm" }} variant="outline" onClick={handleUploadFiles} data-test='bucket_details_upload_files_btn'>
                Upload Files
              </Button>
              <Button leftIcon={<ViewIcon />} size={{ base: "sm", md: "sm" }} variant="outline" onClick={handleCreateFolder} data-test='bucket_details_create_folder_btn'>
                Create Folder
              </Button>
            </HStack>
          </Flex>
          
          <Box overflowX="auto">
            <Table variant="simple" size={{ base: "sm", md: "md" }}>
              <Thead>
                <Tr>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                    NAME
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                    SIZE
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                    STORAGE CLASS
                  </Th>
                  <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                    MODIFIED
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
                  >
                                         <Td border="none" py={4}>
                       <HStack spacing={3}>
                         <FileIcon type={file.type} />
                         <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>{file.name}</Text>
                       </HStack>
                     </Td>
                                         <Td border="none" py={4}>
                       <Text fontSize={{ base: "sm", md: "sm" }} color="gray.600">
                         {formatSize(file.size)}
                       </Text>
                     </Td>
                                         <Td border="none" py={4}>
                       <Badge colorScheme={getStorageClassColor(file.storageClass)} size={{ base: "sm", md: "sm" }}>
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
                         />
                        <MenuList>
                          <MenuItem icon={<DownloadIcon />} onClick={() => handleDownloadFile(file)}>Download</MenuItem>
                          <MenuItem icon={<EditIcon />} onClick={() => handleRenameFile(file)}>Rename</MenuItem>
                          <MenuItem icon={<ViewIcon />} onClick={() => handlePreviewFile(file)}>Preview</MenuItem>
                          <Divider />
                          <MenuItem icon={<DeleteIcon />} color="red.500" onClick={() => handleDeleteFile(file)}>
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
              <ViewIcon boxSize={12} color="gray.400" mb={4} />
              <Heading size="md" color="gray.500" mb={2}>
                No objects found
              </Heading>
              <Text color="gray.400" mb={6}>
                This bucket is empty. Upload files or create folders to get started.
              </Text>
              <Button
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                leftIcon={<ViewIcon />}
                onClick={handleUploadFiles}
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
              <Button colorScheme="blue" onClick={() => {
                // TODO: Implement actual download logic
                toast({
                  title: `Downloading "${selectedFileToDownload?.name}"...`,
                  description: "This feature is under development.",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                });
                handleCloseDownloadModal();
              }} ml={3}>
                Download
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default BucketDetail;
