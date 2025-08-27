import React from 'react';
import { ObjectMetadata } from '../../../types';
import { ImagePreview } from './ImagePreview';
import { TextPreview } from './TextPreview';
import './FilePreview.css';

interface FilePreviewProps {
  file: ObjectMetadata | null;
  onClose: () => void;
  className?: string;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onClose,
  className = '',
}) => {
  if (!file) {
    return null;
  }

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return 'image';
    }
    
    if (['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts', 'jsx', 'tsx'].includes(extension)) {
      return 'text';
    }
    
    if (['pdf'].includes(extension)) {
      return 'pdf';
    }
    
    return 'unknown';
  };

  const fileType = getFileType(file.name);

  const renderPreview = () => {
    switch (fileType) {
      case 'image':
        return <ImagePreview file={file} />;
      case 'text':
        return <TextPreview file={file} />;
      case 'pdf':
        return (
          <div className="file-preview__pdf">
            <div className="file-preview__pdf-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14,2 14,8 20,8" />
                <path d="M9 13h6M9 17h6M9 9h1" />
              </svg>
            </div>
            <p className="file-preview__pdf-text">
              PDF files cannot be previewed directly. Please download to view.
            </p>
            <button className="file-preview__download-button">
              Download PDF
            </button>
          </div>
        );
      default:
        return (
          <div className="file-preview__unknown">
            <div className="file-preview__unknown-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
            </div>
            <p className="file-preview__unknown-text">
              This file type cannot be previewed.
            </p>
            <button className="file-preview__download-button">
              Download File
            </button>
          </div>
        );
    }
  };

  return (
    <div className={`file-preview ${className}`}>
      <div className="file-preview__header">
        <div className="file-preview__file-info">
          <h3 className="file-preview__file-name" title={file.name}>
            {file.name}
          </h3>
          <span className="file-preview__file-size">
            {file.size > 0 ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '--'}
          </span>
        </div>
        <button
          className="file-preview__close-button"
          onClick={onClose}
          aria-label="Close preview"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="file-preview__content">
        {renderPreview()}
      </div>
    </div>
  );
};

export default FilePreview;
