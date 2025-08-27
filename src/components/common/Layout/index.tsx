import React, { ReactNode, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Box minHeight="100vh" bg="transparent">
      <Header 
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
      />
      <Flex>
        <Sidebar collapsed={sidebarCollapsed} />
        <Box
          flex="1"
          p={6}
          ml={0}
          transition="margin-left 0.3s ease"
          minHeight="calc(100vh - 73px)"
        >
          <Box
            bg="rgba(255, 255, 255, 0.95)"
            backdropFilter="blur(20px)"
            borderRadius="2xl"
            border="1px solid rgba(255, 255, 255, 0.2)"
            shadow="xl"
            minHeight="calc(100vh - 121px)"
            p={6}
            className="fade-in-up"
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
