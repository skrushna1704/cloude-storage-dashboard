import React, { useState } from 'react';
import { ObjectMetadata } from '../../../types';
import { Breadcrumb } from './Breadcrumb';
import { FileList } from './FileList';
import { FileTree } from './FileTree';
import './FileExplorer.css';

interface FileExplorerProps {
  files: ObjectMetadata[];
  currentPath: string;
  selectedFiles: string[];
  onFileSelect: (file: ObjectMetadata) => void;
  onFileDoubleClick: (file: ObjectMetadata) => void;
  onFileAction: (action: string, file: ObjectMetadata) => void;
  onPathChange: (path: string) => void;
  viewMode?: 'list' | 'tree';
  onViewModeChange?: (mode: 'list' | 'tree') => void;
  className?: string;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  currentPath,
  selectedFiles,
  onFileSelect,
  onFileDoubleClick,
  onFileAction,
  onPathChange,
  viewMode = 'list',
  onViewModeChange,
  className = '',
}) => {
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const getBreadcrumbItems = () => {
    if (!currentPath || currentPath === '/') {
      return [{ name: 'Root', path: '/' }];
    }

    const pathParts = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Root', path: '/' }];

    let currentPathBuilder = '';
    pathParts.forEach((part) => {
      currentPathBuilder += `/${part}`;
      breadcrumbs.push({
        name: part,
        path: currentPathBuilder,
      });
    });

    return breadcrumbs;
  };

  const sortedFiles = [...files].sort((a, b) => {
    let aValue: any = a[sortBy as keyof ObjectMetadata];
    let bValue: any = b[sortBy as keyof ObjectMetadata];

    if (aValue === undefined || bValue === undefined) return 0;
    
    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className={`file-explorer ${className}`}>
      <div className="file-explorer__toolbar">
        <div className="file-explorer__view-controls">
          <button
            className={`file-explorer__view-button ${viewMode === 'list' ? 'file-explorer__view-button--active' : ''}`}
            onClick={() => onViewModeChange?.('list')}
            title="List view"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button
            className={`file-explorer__view-button ${viewMode === 'tree' ? 'file-explorer__view-button--active' : ''}`}
            onClick={() => onViewModeChange?.('tree')}
            title="Tree view"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12h20M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8M2 12l10-9 10 9" />
            </svg>
          </button>
        </div>
        
        <div className="file-explorer__info">
          <span className="file-explorer__file-count">
            {files.length} {files.length === 1 ? 'item' : 'items'}
          </span>
          {selectedFiles.length > 0 && (
            <span className="file-explorer__selected-count">
              {selectedFiles.length} selected
            </span>
          )}
        </div>
      </div>

      <Breadcrumb
        items={getBreadcrumbItems()}
        onNavigate={onPathChange}
        className="file-explorer__breadcrumb"
      />

      <div className="file-explorer__content">
        {viewMode === 'list' ? (
          <FileList
            files={sortedFiles}
            selectedFiles={selectedFiles}
            onFileSelect={onFileSelect}
            onFileDoubleClick={onFileDoubleClick}
            onFileAction={onFileAction}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        ) : (
          <FileTree
            files={sortedFiles}
            selectedFiles={selectedFiles}
            onFileSelect={onFileSelect}
            onFileDoubleClick={onFileDoubleClick}
            onFileAction={onFileAction}
          />
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
