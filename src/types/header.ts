export interface Bucket {
    id: string;
    name: string;
    region: string;
    size: string;
  }
  
  export interface BreadcrumbItem {
    name: string;
    path: string;
  }
  
  export interface HeaderProps {
    sidebarCollapsed?: boolean;
    onSidebarToggle?: () => void;
    // New props for navigation context
    currentPage?: 'dashboard' | 'buckets' | 'files' | 'uploads' | 'billing' | 'analytics';
    currentBucket?: Bucket | null;
    onBucketChange?: (bucket: Bucket) => void;
    breadcrumbs?: BreadcrumbItem[];
    availableBuckets?: Bucket[];
  }