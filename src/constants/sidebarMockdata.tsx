import { NavItem } from '../types/sidebar';
import { ROUTES } from '../constants/routes';
import { Icon } from '@chakra-ui/react';
import { FiHome, FiDollarSign, FiBarChart, FiClock, FiShare2, FiTrash2 } from 'react-icons/fi';



// Updated navigation items for cloud storage dashboard
export const navItems: NavItem[] = [
    // {
    //   label: 'Dashboard',
    //   path: '/',
    //   icon: <Icon as={FiHome} boxSize={5} />,
    //   section: 'main',
    // },
    {
      label: 'Dashboard',
      path: ROUTES.BUCKETS,
      icon: <Icon as={FiHome} boxSize={5} />,
      badge: '12',
      section: 'main',
    },

    {
      label: 'Analytics',
      path: ROUTES.ANALYTICS,
      icon: <Icon as={FiBarChart} boxSize={5} />,
      section: 'main',
    },
    {
      label: 'Billing',
      path: ROUTES.BILLING,
      icon: <Icon as={FiDollarSign} boxSize={5} />,
      section: 'main',
    },
  ];

  // Quick access items
  export const quickItems: NavItem[] = [
    {
      label: 'Recent Files',
      path: '/recent',
      icon: <Icon as={FiClock} boxSize={4} />,
      section: 'quick',
    },
    {
      label: 'Shared',
      path: '/shared',
      icon: <Icon as={FiShare2} boxSize={4} />,
      section: 'quick',
    },
    {
      label: 'Trash',
      path: '/trash',
      icon: <Icon as={FiTrash2} boxSize={4} />,
      badge: '7',
      section: 'quick',
    },
  ];