import React, { useState, useEffect } from 'react';
import { ObjectMetadata } from '../../../types';
import './TextPreview.css';

interface TextPreviewProps {
  file: ObjectMetadata;
  className?: string;
}

export const TextPreview: React.FC<TextPreviewProps> = ({
  file,
  className = '',
}) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lineNumbers, setLineNumbers] = useState<boolean>(true);

  useEffect(() => {
    // Mock text content - in real app, this would come from your storage service
    const mockContent = `// Example ${file.name}
// This is a sample text file for preview purposes

function exampleFunction() {
  const message = "Hello, World!";
  console.log(message);
  
  // Some sample code
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(n => n * 2);
  
  return doubled;
}

// Configuration object
const config = {
  name: "Sample Config",
  version: "1.0.0",
  features: [
    "feature1",
    "feature2",
    "feature3"
  ]
};

export default exampleFunction;`;

    // Simulate loading delay
    const timer = setTimeout(() => {
      setContent(mockContent);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [file.name]);

  const toggleLineNumbers = () => {
    setLineNumbers(!lineNumbers);
  };

  const getFileExtension = (): string => {
    return file.name.split('.').pop()?.toLowerCase() || '';
  };

  const getLanguageClass = (): string => {
    const ext = getFileExtension();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'jsx': 'jsx',
      'tsx': 'tsx',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'xml': 'xml',
      'md': 'markdown',
      'txt': 'text'
    };
    return languageMap[ext] || 'text';
  };

  const formatContent = (text: string): string[] => {
    return text.split('\n');
  };

  const lines = formatContent(content);

  return (
    <div className={`text-preview ${className}`}>
      <div className="text-preview__toolbar">
        <div className="text-preview__file-info">
          <span className="text-preview__language">
            {getLanguageClass().toUpperCase()}
          </span>
          <span className="text-preview__line-count">
            {lines.length} lines
          </span>
        </div>
        
        <div className="text-preview__controls">
          <button
            className={`text-preview__control-button ${lineNumbers ? 'text-preview__control-button--active' : ''}`}
            onClick={toggleLineNumbers}
            title="Toggle line numbers"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            Lines
          </button>
          
          <button
            className="text-preview__control-button"
            onClick={() => navigator.clipboard.writeText(content)}
            title="Copy to clipboard"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </button>
        </div>
      </div>

      <div className="text-preview__content">
        {isLoading && (
          <div className="text-preview__loading">
            <div className="text-preview__spinner"></div>
            <p>Loading file content...</p>
          </div>
        )}
        
        {error && (
          <div className="text-preview__error">
            <p>{error}</p>
            <button 
              className="text-preview__retry-button"
              onClick={() => {
                setIsLoading(true);
                setError(null);
              }}
            >
              Retry
            </button>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className={`text-preview__code text-preview__code--${getLanguageClass()}`}>
            {lineNumbers && (
              <div className="text-preview__line-numbers">
                {lines.map((_, index) => (
                  <span key={index} className="text-preview__line-number">
                    {index + 1}
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-preview__code-content">
              {lines.map((line, index) => (
                <div key={index} className="text-preview__line">
                  <span className="text-preview__line-text">{line || ' '}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextPreview;
