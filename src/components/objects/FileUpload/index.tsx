import React, { useState } from 'react';
import { DragDropZone } from './DragDropZone';
import './FileUpload.css';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  multiple = true,
  accept = '*/*',
  maxSize = 100 * 1024 * 1024, // 100MB
  className = '',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        console.warn(`File ${file.name} is too large. Max size: ${maxSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onFileUpload(validFiles);
    }
  };

  return (
    <div className={`file-upload ${className}`}>
      <DragDropZone
        onFiles={handleFiles}
        multiple={multiple}
        accept={accept}
        isDragOver={isDragOver}
        onDragOver={setIsDragOver}
      />
    </div>
  );
};

export default FileUpload;
