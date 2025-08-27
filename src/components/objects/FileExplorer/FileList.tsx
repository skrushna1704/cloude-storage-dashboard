import React from 'react';
import { ObjectMetadata } from '../../../types';
import './FileList.css';

interface FileListProps {
  files: ObjectMetadata[];
  selectedFiles: string[];
  onFileSelect: (file: ObjectMetadata) => void;
  onFileDoubleClick: (file: ObjectMetadata) => void;
  onFileAction: (action: string, file: ObjectMetadata) => void;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string) => void;
  className?: string;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  selectedFiles,
  onFileSelect,
  onFileDoubleClick,
  onFileAction,
  sortBy = 'name',
  sortDirection = 'asc',
  onSort,
  className = '',
}) => {
  const handleSort = (field: string) => {
    if (onSort) {
      onSort(field);
    }
  };

  const getFileIcon = (file: ObjectMetadata) => {
    if (file.isFolder) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12h20M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8M2 12l10-9 10 9" />
        </svg>
      );
    }

    // File type icons based on extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14,2 14,8 20,8" />
            <path d="M9 13h6M9 17h6M9 9h1" />
          </svg>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14,2 14,8 20,8" />
            <circle cx="10" cy="13" r="2" />
            <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14,2 14,8 20,8" />
          </svg>
        );
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`file-list ${className}`}>
      <div className="file-list__header">
        <div className="file-list__header-cell file-list__header-cell--select">
          <input
            type="checkbox"
            checked={selectedFiles.length === files.length && files.length > 0}
            onChange={() => {
              if (selectedFiles.length === files.length) {
                onFileAction('deselectAll', {} as ObjectMetadata);
              } else {
                onFileAction('selectAll', {} as ObjectMetadata);
              }
            }}
            aria-label="Select all files"
          />
        </div>
        <div 
          className={`file-list__header-cell file-list__header-cell--name ${onSort ? 'file-list__header-cell--sortable' : ''}`}
          onClick={() => onSort && handleSort('name')}
        >
          Name
          {onSort && (
            <span className="file-list__sort-indicator">
              {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </span>
          )}
        </div>
        <div 
          className={`file-list__header-cell file-list__header-cell--size ${onSort ? 'file-list__header-cell--sortable' : ''}`}
          onClick={() => onSort && handleSort('size')}
        >
          Size
          {onSort && (
            <span className="file-list__sort-indicator">
              {sortBy === 'size' && (sortDirection === 'asc' ? '↑' : '↓')}
            </span>
          )}
        </div>
        <div 
          className={`file-list__header-cell file-list__header-cell--modified ${onSort ? 'file-list__header-cell--sortable' : ''}`}
          onClick={() => onSort && handleSort('lastModified')}
        >
          Modified
          {onSort && (
            <span className="file-list__sort-indicator">
              {sortBy === 'lastModified' && (sortDirection === 'asc' ? '↑' : '↓')}
            </span>
          )}
        </div>
        <div className="file-list__header-cell file-list__header-cell--actions">
          Actions
        </div>
      </div>

      <div className="file-list__body">
        {files.length === 0 ? (
          <div className="file-list__empty">
            <p>No files found in this location</p>
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.key}
              className={`file-list__row ${selectedFiles.includes(file.key) ? 'file-list__row--selected' : ''}`}
              onClick={() => onFileSelect(file)}
              onDoubleClick={() => onFileDoubleClick(file)}
            >
              <div className="file-list__cell file-list__cell--select">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.key)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onFileSelect(file);
                  }}
                  aria-label={`Select ${file.name}`}
                />
              </div>
              <div className="file-list__cell file-list__cell--name">
                <div className="file-list__file-info">
                  <span className="file-list__file-icon">{getFileIcon(file)}</span>
                  <span className="file-list__file-name" title={file.name}>
                    {file.name}
                  </span>
                </div>
              </div>
              <div className="file-list__cell file-list__cell--size">
                {file.isFolder ? '--' : formatFileSize(file.size)}
              </div>
              <div className="file-list__cell file-list__cell--modified">
                {formatDate(file.lastModified)}
              </div>
              <div className="file-list__cell file-list__cell--actions">
                <button
                  className="file-list__action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileAction('more', file);
                  }}
                  aria-label={`More actions for ${file.name}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileList;
