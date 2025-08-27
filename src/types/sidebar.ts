export interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    badge?: string;
    section?: 'main' | 'quick';
  }

export interface SidebarProps {
    collapsed?: boolean;
  }

  export interface Bucket {
    id: string;
    name: string;
    region: string;
    size: number;
  }