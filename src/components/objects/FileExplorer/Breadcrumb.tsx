import React from 'react';
import './Breadcrumb.css';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  className = '',
}) => {
  return (
    <nav className={`breadcrumb ${className}`} aria-label="File path navigation">
      <ol className="breadcrumb__list">
        {items.map((item, index) => (
          <li key={item.path} className="breadcrumb__item">
            {index < items.length - 1 ? (
              <>
                <button
                  className="breadcrumb__link"
                  onClick={() => onNavigate(item.path)}
                  title={`Navigate to ${item.name}`}
                >
                  {item.name}
                </button>
                <span className="breadcrumb__separator" aria-hidden="true">
                  /
                </span>
              </>
            ) : (
              <span className="breadcrumb__current" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
