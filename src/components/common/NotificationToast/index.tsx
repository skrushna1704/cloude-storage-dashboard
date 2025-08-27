import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectNotifications } from '../../../store/selectors';

export const NotificationToast: React.FC = () => {
  const toast = useToast();
  const notifications = useAppSelector(selectNotifications);

  useEffect(() => {
    // Show the most recent notification
    if (notifications.length > 0) {
      const latestNotification = notifications[0];
      
      toast({
        title: latestNotification.title,
        description: latestNotification.message,
        status: latestNotification.type,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [notifications, toast]);

  return null; // This component doesn't render anything visible
};

export default NotificationToast;
