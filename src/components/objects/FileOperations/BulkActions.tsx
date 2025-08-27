import React from 'react';
import { ObjectMetadata } from '../../../types';
import './BulkActions.css';

interface BulkActionsProps {
  selectedFiles: ObjectMetadata[];
  onBulkAction: (action: string, files: ObjectMetadata[]) => void;
  onClearSelection: () => void;
  className?: string;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedFiles,
  onBulkAction,
  onClearSelection,
  className = '',
}) => {
  if (selectedFiles.length === 0) {
    return null;
  }

  const getSelectedStats = () => {
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    const fileCount = selectedFiles.filter(file => !file.isFolder).length;
    const folderCount = selectedFiles.filter(file => file.isFolder).length;

    return { totalSize, fileCount, folderCount };
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const stats = getSelectedStats();

  return (
    <div className={`bulk-actions ${className}`}>
      <div className="bulk-actions__info">
        <div className="bulk-actions__selection">
          <span className="bulk-actions__count">
            {selectedFiles.length} {selectedFiles.length === 1 ? 'item' : 'items'} selected
          </span>
          <button
            className="bulk-actions__clear-button"
            onClick={onClearSelection}
            aria-label="Clear selection"
          >
            ×
          </button>
        </div>
        
        <div className="bulk-actions__stats">
          {stats.fileCount > 0 && (
            <span className="bulk-actions__stat">
              {stats.fileCount} {stats.fileCount === 1 ? 'file' : 'files'}
            </span>
          )}
          {stats.folderCount > 0 && (
            <span className="bulk-actions__stat">
              {stats.folderCount} {stats.folderCount === 1 ? 'folder' : 'folders'}
            </span>
          )}
          {stats.totalSize > 0 && (
            <span className="bulk-actions__stat">
              {formatFileSize(stats.totalSize)}
            </span>
          )}
        </div>
      </div>

      <div className="bulk-actions__buttons">
        <button
          className="bulk-actions__button bulk-actions__button--download"
          onClick={() => onBulkAction('download', selectedFiles)}
          disabled={stats.fileCount === 0}
          title="Download selected files"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </button>

        <button
          className="bulk-actions__button bulk-actions__button--copy"
          onClick={() => onBulkAction('copy', selectedFiles)}
          title="Copy selected items"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </button>

        <button
          className="bulk-actions__button bulk-actions__button--move"
          onClick={() => onBulkAction('move', selectedFiles)}
          title="Move selected items"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17,11 21,7 17,3" />
            <path d="M3 7h18v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7z" />
          </svg>
          Move
        </button>

        <button
          className="bulk-actions__button bulk-actions__button--delete"
          onClick={() => onBulkAction('delete', selectedFiles)}
          title="Delete selected items"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3,6 5,6 21,6" />
            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BulkActions;
