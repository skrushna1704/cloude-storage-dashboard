import React, { useState } from 'react';
import { ObjectMetadata } from '../../../types';
import { BulkActions } from './BulkActions';
import { ContextMenu } from './ContextMenu';
import './FileOperations.css';

interface FileOperationsProps {
  selectedFiles: ObjectMetadata[];
  onBulkAction: (action: string, files: ObjectMetadata[]) => void;
  onFileAction: (action: string, file: ObjectMetadata) => void;
  onClearSelection: () => void;
  className?: string;
}

export const FileOperations: React.FC<FileOperationsProps> = ({
  selectedFiles,
  onBulkAction,
  onFileAction,
  onClearSelection,
  className = '',
}) => {
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
    file: ObjectMetadata | null;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
    file: null,
  });

  const handleContextMenu = (event: React.MouseEvent, file: ObjectMetadata) => {
    event.preventDefault();
    setContextMenu({
      isOpen: true,
      x: event.clientX,
      y: event.clientY,
      file,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      isOpen: false,
      x: 0,
      y: 0,
      file: null,
    });
  };

  const handleContextMenuAction = (action: string, file: ObjectMetadata) => {
    onFileAction(action, file);
  };

  return (
    <div className={`file-operations ${className}`}>
      <BulkActions
        selectedFiles={selectedFiles}
        onBulkAction={onBulkAction}
        onClearSelection={onClearSelection}
      />
      
      <ContextMenu
        isOpen={contextMenu.isOpen}
        x={contextMenu.x}
        y={contextMenu.y}
        file={contextMenu.file}
        onAction={handleContextMenuAction}
        onClose={closeContextMenu}
      />
    </div>
  );
};

export default FileOperations;
