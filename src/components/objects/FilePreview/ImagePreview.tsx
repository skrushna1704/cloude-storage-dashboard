import React, { useState } from 'react';
import { ObjectMetadata } from '../../../types';
import './ImagePreview.css';

interface ImagePreviewProps {
  file: ObjectMetadata;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  className = '',
}) => {
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError('Failed to load image');
  };

  // Mock image URL - in real app, this would come from your storage service
  const imageUrl = `https://via.placeholder.com/800x600/4a90e2/ffffff?text=${encodeURIComponent(file.name)}`;

  return (
    <div className={`image-preview ${className}`}>
      <div className="image-preview__toolbar">
        <div className="image-preview__zoom-controls">
          <button
            className="image-preview__zoom-button"
            onClick={handleZoomOut}
            disabled={zoom <= 0.1}
            title="Zoom out"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          
          <span className="image-preview__zoom-level">
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            className="image-preview__zoom-button"
            onClick={handleZoomIn}
            disabled={zoom >= 5}
            title="Zoom in"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          
          <button
            className="image-preview__reset-button"
            onClick={handleResetZoom}
            title="Reset zoom"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="image-preview__container">
        {isLoading && (
          <div className="image-preview__loading">
            <div className="image-preview__spinner"></div>
            <p>Loading image...</p>
          </div>
        )}
        
        {error && (
          <div className="image-preview__error">
            <p>{error}</p>
            <button 
              className="image-preview__retry-button"
              onClick={() => {
                setIsLoading(true);
                setError(null);
              }}
            >
              Retry
            </button>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={file.name}
          className="image-preview__image"
          style={{ transform: `scale(${zoom})` }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
