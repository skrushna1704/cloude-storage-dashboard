import React, { ReactNode, useState } from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { testIds } from '../../../shared/dataTestIds';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <Box minHeight="100vh" bg="transparent">
      <Header 
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
        mobileSidebarOpen={mobileSidebarOpen}
        data-testid={testIds.header}
      />
      <Flex>
        {/* Desktop Sidebar */}
        <Box display={{ base: 'none', md: 'block' }}>
          <Sidebar collapsed={sidebarCollapsed} data-testid={testIds.sidebar} />
        </Box>
        
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.5)"
            zIndex={1000}
            onClick={handleMobileSidebarClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <Box
          position="fixed"
          top={0}
          left={0}
          bottom={0}
          width="280px"
          bg="rgba(255, 255, 255, 0.95)"
          backdropFilter="blur(20px)"
          borderRight="1px solid rgba(255, 255, 255, 0.2)"
          shadow="xl"
          zIndex={1001}
          transform={mobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'}
          transition="transform 0.3s ease"
          display={{ base: 'block', md: 'none' }}
          data-testid={testIds.mobile_sidebar}
        >
          <Sidebar collapsed={false} onClose={handleMobileSidebarClose} />
        </Box>
        <Box
          flex="1"
          p={{ base: 4, md: 6 }}
          ml={0}
          transition="margin-left 0.3s ease"
          minHeight="calc(100vh - 73px)"
          data-testid={testIds.main_content}
        >
          <Box
            bg="rgba(255, 255, 255, 0.95)"
            backdropFilter="blur(20px)"
            borderRadius={{ base: "xl", md: "2xl" }}
            border="1px solid rgba(255, 255, 255, 0.2)"
            shadow="xl"
            minHeight="calc(100vh - 121px)"
            p={{ base: 4, md: 6 }}
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
