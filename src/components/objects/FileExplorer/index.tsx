import React, { useState, useCallback } from 'react';
import { FileUploadModal } from '../FileUpload/FileUploadModal';
import { FilePreviewModal } from '../FilePreview/FilePreviewModal';
import { CreateFolderModal } from '../FileOperations/CreateFolderModal';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
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
  TableContainer,
  Icon,
  Checkbox,
  useColorModeValue,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  Progress,
  Badge,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import {
  SettingsIcon,
  DownloadIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
  AddIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';

interface FileObject {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modified: string;
  storageClass: string;
  path: string;
  isSelected?: boolean;
}

interface FileExplorerProps {
  bucketId: string;
  bucketName: string;
  files: FileObject[];
  currentPath: string;
  breadcrumbs: Array<{ name: string; path: string }>;
  onNavigate: (path: string) => void;
  onUpload: (files: File[], path: string) => void;
  onDownload: (fileId: string) => void;
  onRename: (fileId: string, newName: string) => void;
  onDelete: (fileIds: string[]) => void;
  onCreateFolder: (name: string, path: string) => void;
  onSelectFiles: (fileIds: string[]) => void;
  selectedFiles: string[];
  loading?: boolean;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  bucketId,
  bucketName,
  files,
  currentPath,
  breadcrumbs,
  onNavigate,
  onUpload,
  onDownload,
  onRename,
  onDelete,
  onCreateFolder,
  onSelectFiles,
  selectedFiles,
  loading = false,
}) => {
  const [fileToRename, setFileToRename] = useState<FileObject | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileObject | null>(null);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isRenameOpen, onOpen: onRenameOpen, onClose: onRenameClose } = useDisclosure();
  
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const tableRowHoverBg = useColorModeValue('gray.50', 'gray.700');

  // Upload modal handlers
  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadClose = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadFiles = (files: File[]) => {
    onUpload(files, currentPath);
  };

  // Preview modal handlers
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
      onDownload(file.id);
    }
  };

  // Create folder modal handlers
  const handleCreateFolderClick = () => {
    setIsCreateFolderModalOpen(true);
  };

  const handleCreateFolderClose = () => {
    setIsCreateFolderModalOpen(false);
  };

  const handleCreateFolder = async (name: string) => {
    onCreateFolder(name, currentPath);
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '-';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStorageClassColor = (storageClass: string) => {
    switch (storageClass) {
      case 'Standard':
        return 'green';
      case 'Standard-IA':
        return 'orange';
      case 'Glacier':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const FileIcon = ({ type }: { type: 'file' | 'folder' }) => (
    <Icon viewBox="0 0 24 24" boxSize={5} color={type === 'folder' ? '#667eea' : 'gray.500'}>
      {type === 'folder' ? (
        <path
          fill="currentColor"
          d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M14.5 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V7.5L14.5 2zM14 8V3.5L18.5 8H14z"
        />
      )}
    </Icon>
  );

  const handleFileClick = (file: FileObject) => {
    if (file.type === 'folder') {
      onNavigate(file.path);
    } else {
      // Handle file preview or download
      onDownload(file.id);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectFiles(files.map(f => f.id));
    } else {
      onSelectFiles([]);
    }
  };

  const handleSelectFile = (fileId: string, checked: boolean) => {
    if (checked) {
      onSelectFiles([...selectedFiles, fileId]);
    } else {
      onSelectFiles(selectedFiles.filter(id => id !== fileId));
    }
  };

  const handleRename = () => {
    if (fileToRename && newFileName.trim()) {
      onRename(fileToRename.id, newFileName.trim());
      onRenameClose();
      setFileToRename(null);
      setNewFileName('');
    }
  };



  const handleDelete = () => {
    onDelete(selectedFiles);
    onDeleteClose();
  };

  const handleMenuAction = (action: string, file: FileObject) => {
    switch (action) {
      case 'download':
        onDownload(file.id);
        break;
      case 'rename':
        setFileToRename(file);
        setNewFileName(file.name);
        onRenameOpen();
        break;
      case 'delete':
        onDelete([file.id]);
        break;
      case 'preview':
        // Handle file preview
        break;
    }
  };

  const allSelected = files.length > 0 && files.every(f => selectedFiles.includes(f.id));
  const someSelected = selectedFiles.length > 0 && !allSelected;

  return (
    <Box>
      {/* Breadcrumb Navigation */}
      <Box mb={4}>
        <HStack spacing={2} flexWrap="wrap">
          {breadcrumbs.map((crumb, index) => (
            <HStack key={crumb.path} spacing={1}>
              {index > 0 && <ChevronRightIcon color="gray.400" boxSize={4} />}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(crumb.path)}
                color={index === breadcrumbs.length - 1 ? 'gray.700' : 'blue.500'}
                fontWeight={index === breadcrumbs.length - 1 ? 'semibold' : 'normal'}
              >
                {crumb.name}
              </Button>
            </HStack>
          ))}
        </HStack>
      </Box>

      {/* Action Bar */}
      <Box mb={4}>
        <HStack justify="space-between" align="center">
          <HStack spacing={2}>
            <Button
              leftIcon={<AddIcon />}
              size="sm"
              onClick={handleCreateFolderClick}
              colorScheme="blue"
            >
              Create Folder
            </Button>
            <Button
              leftIcon={<FileIcon type="file" />}
              size="sm"
              variant="outline"
              onClick={handleUploadClick}
            >
              Upload Files
            </Button>
            {selectedFiles.length > 0 && (
              <>
                <Button
                  leftIcon={<DownloadIcon />}
                  size="sm"
                  variant="outline"
                  onClick={() => selectedFiles.forEach(id => onDownload(id))}
                >
                  Download ({selectedFiles.length})
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={onDeleteOpen}
                >
                  Delete ({selectedFiles.length})
                </Button>
              </>
            )}
          </HStack>
          
          <Text fontSize="sm" color="gray.500">
            {files.length} items
          </Text>
        </HStack>
      </Box>



      {/* File Table */}
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs" width="50px">
                <Checkbox
                  isChecked={allSelected}
                  isIndeterminate={someSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </Th>
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
              <Th border="none" width="50px"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file) => (
              <Tr
                key={file.id}
                _hover={{ bg: tableRowHoverBg }}
                cursor="pointer"
                onClick={() => handleFileClick(file)}
              >
                <Td border="none" py={4}>
                  <Checkbox
                    isChecked={selectedFiles.includes(file.id)}
                    onChange={(e) => handleSelectFile(file.id, e.target.checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Td>
                <Td border="none" py={4}>
                  <HStack>
                    <FileIcon type={file.type} />
                    <Text fontWeight="medium">{file.name}</Text>
                  </HStack>
                </Td>
                <Td border="none" py={4}>
                  <Text fontSize="sm" color="gray.600">
                    {formatSize(file.size)}
                  </Text>
                </Td>
                <Td border="none" py={4}>
                  <Badge colorScheme={getStorageClassColor(file.storageClass)} size="sm">
                    {file.storageClass}
                  </Badge>
                </Td>
                <Td border="none" py={4}>
                  <Text fontSize="sm" color="gray.600">
                    {file.modified}
                  </Text>
                </Td>
                <Td border="none" py={4}>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<SettingsIcon />}
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <MenuList>
                      <MenuItem
                        icon={<DownloadIcon />}
                        onClick={() => handleMenuAction('download', file)}
                      >
                        Download
                      </MenuItem>
                      <MenuItem
                        icon={<EditIcon />}
                        onClick={() => handleMenuAction('rename', file)}
                      >
                        Rename
                      </MenuItem>
                      <MenuItem
                        icon={<ViewIcon />}
                        onClick={() => handlePreviewFile(file)}
                      >
                        Preview
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        icon={<DeleteIcon />}
                        color="red.500"
                        onClick={() => handleMenuAction('delete', file)}
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
      </TableContainer>

      {/* Empty State */}
      {files.length === 0 && !loading && (
        <Box textAlign="center" py={16}>
          <FileIcon type="file"/>
          <Text fontSize="lg" fontWeight="semibold" color="gray.500" mb={2}>
            No files found
          </Text>
          <Text color="gray.400" mb={6}>
            This folder is empty. Upload files or create folders to get started.
          </Text>
          <HStack justify="center" spacing={4}>
            <Button
              leftIcon={<AddIcon />}
              onClick={handleCreateFolderClick}
              colorScheme="blue"
            >
              Create Folder
            </Button>
            <Button
              leftIcon={<FileIcon type="file" />}
              variant="outline"
              onClick={handleUploadClick}
            >
              Upload Files
            </Button>
          </HStack>
        </Box>
      )}

      {/* Professional Modals */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleUploadClose}
        onUpload={handleUploadFiles}
        currentPath={currentPath}
      />

      <FilePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handlePreviewClose}
        file={previewFile}
        onDownload={onDownload}
        onOpen={handleOpenFile}
      />

      <CreateFolderModal
        isOpen={isCreateFolderModalOpen}
        onClose={handleCreateFolderClose}
        onCreateFolder={handleCreateFolder}
        currentPath={currentPath}
      />

      {/* Rename File Modal */}
      <AlertDialog
        isOpen={isRenameOpen}
        leastDestructiveRef={cancelRef}
        onClose={onRenameClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Rename File
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text mb={4}>Enter new name:</Text>
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="File name"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
                autoFocus
              />
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onRenameClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleRename} ml={3}>
                Rename
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Files
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>
                Are you sure you want to delete {selectedFiles.length} selected file(s)? This action cannot be undone.
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default FileExplorer;
