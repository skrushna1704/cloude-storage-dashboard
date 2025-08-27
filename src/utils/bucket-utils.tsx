import { Icon } from '@chakra-ui/react';
  export const formatSize = (bytes: number): string => {
    if (bytes === 0) return '-';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  export const formatStorageSize = (sizeInGB: number): string => {
    if (sizeInGB >= 1000) {
      return `${(sizeInGB / 1000).toFixed(1)} TB`;
    }
    return `${sizeInGB.toFixed(1)} GB`;
  };

  export const getStorageClassColor = (storageClass: string) => {
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
  export const FileIcon = ({ type }: { type: 'file' | 'folder' }) => (
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

