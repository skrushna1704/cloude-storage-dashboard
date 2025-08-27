import React from 'react';
import { ObjectMetadata } from '../../../types';
import './FileTree.css';

interface FileTreeProps {
  files: ObjectMetadata[];
  selectedFiles: string[];
  onFileSelect: (file: ObjectMetadata) => void;
  onFileDoubleClick: (file: ObjectMetadata) => void;
  onFileAction: (action: string, file: ObjectMetadata) => void;
  className?: string;
}

export const FileTree: React.FC<FileTreeProps> = ({
  files,
  selectedFiles,
  onFileSelect,
  onFileDoubleClick,
  onFileAction,
  className = '',
}) => {
  const handleFileClick = (file: ObjectMetadata) => {
    onFileSelect(file);
  };

  const handleFileDoubleClick = (file: ObjectMetadata) => {
    onFileDoubleClick(file);
  };

  const handleContextMenu = (e: React.MouseEvent, file: ObjectMetadata) => {
    e.preventDefault();
    onFileAction('context-menu', file);
  };

  const renderTreeItem = (file: ObjectMetadata, level: number = 0) => {
    const isSelected = selectedFiles.includes(file.key);
    const isFolder = file.isFolder;

    return (
      <div
        key={file.key}
        className={`file-tree__item ${isSelected ? 'file-tree__item--selected' : ''}`}
        style={{ paddingLeft: `${level * 20}px` }}
        onClick={() => handleFileClick(file)}
        onDoubleClick={() => handleFileDoubleClick(file)}
        onContextMenu={(e) => handleContextMenu(e, file)}
      >
        <div className="file-tree__item-content">
          <span className="file-tree__icon">
            {isFolder ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5l-2-2H5a2 2 0 0 0-2 2z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
            )}
          </span>
          <span className="file-tree__name">{file.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`file-tree ${className}`}>
      {files.map((file) => renderTreeItem(file))}
    </div>
  );
};

export default FileTree;
