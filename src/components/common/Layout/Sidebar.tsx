import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Text,
  Progress,
  Tooltip,
  useColorModeValue,
  Flex,
  Badge,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ViewIcon,
  SettingsIcon,
  QuestionOutlineIcon,
} from '@chakra-ui/icons';
import { NavItem } from '../../../types/sidebar';
import { navItems, quickItems } from '../../../constants/sidebarMockdata';
import { SidebarProps } from '../../../types/sidebar';
import { testIds } from '../../../shared/dataTestIds';
import { UpgradeModal } from '../UpgradeModal';

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onClose }) => {
  const location = useLocation();
  const { isOpen: isUpgradeOpen, onOpen: onUpgradeOpen, onClose: onUpgradeClose } = useDisclosure();
  
  // Extract ALL useColorModeValue calls to the top level (before any conditional logic)
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const activeColor = useColorModeValue('#667eea', '#667eea');
  const activeBg = useColorModeValue('rgba(102, 126, 234, 0.1)', 'rgba(102, 126, 234, 0.2)');
  const sectionHeaderColor = useColorModeValue('gray.500', 'gray.400');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const storageBgColor = useColorModeValue('gray.50', 'gray.700');
  const progressBgColor = useColorModeValue('gray.200', 'gray.600');
  const upgradePromptBg = useColorModeValue('blue.50', 'blue.900');
  const upgradePromptBorder = useColorModeValue('blue.200', 'blue.700');
  const upgradePromptTextPrimary = useColorModeValue('blue.700', 'blue.200');
  const upgradePromptTextSecondary = useColorModeValue('blue.600', 'blue.300');
  const upgradePromptHoverBg = useColorModeValue('blue.100', 'blue.800');


  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.path);
    
    return (
      <Tooltip 
        label={collapsed ? item.label : ''} 
        placement="right" 
        isDisabled={!collapsed}
      >
        <Box
          as={Link}
          to={item.path}
          display="flex"
          alignItems="center"
          gap={3}
          px={4}
          py={item.section === 'quick' ? 2.5 : 3}
          borderRadius="lg"
          color={active ? activeColor : textColor}
          bg={active ? activeBg : 'transparent'}
          fontWeight={active ? '600' : '500'}
          fontSize={item.section === 'quick' ? 'xs' : 'sm'}
          textDecoration="none"
          transition="all 0.2s ease"
          position="relative"
          overflow="hidden"
          _hover={{
            bg: active ? activeBg : hoverBgColor,
            transform: 'translateX(4px)',
          }}
          onClick={onClose}
          _before={{
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: active ? '3px' : '0',
            bg: activeColor,
            borderRadius: '0 2px 2px 0',
            transition: 'width 0.2s ease',
          }}
        >
          <Box color="inherit" flexShrink={0}>
            {item.icon}
          </Box>
          {!collapsed && (
            <>
              <Text flex="1" color="inherit">
                {item.label}
              </Text>
              {item.badge && (
                <Badge
                  size="sm"
                  colorScheme={active ? 'purple' : 'gray'}
                  variant={active ? 'solid' : 'subtle'}
                  borderRadius="full"
                  px={2}
                  fontSize="2xs"
                >
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box
      as="aside"
      position="sticky"
      top="73px"
      height="auto"
      width={collapsed ? '70px' : '280px'}
      bg={bgColor}
      backdropFilter="blur(20px)"
      borderRight="1px solid"
      borderColor={borderColor}
      transition="width 0.3s ease"
      display="flex"
      flexDirection="column"
      shadow="sm"
      data-testid={testIds.sidebar}
    >
      {/* Main Navigation */}
      <Box flex="1" p={4} overflowY="auto">
        {/* Primary Navigation */}
        <VStack spacing={2} align="stretch">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </VStack>

        {!collapsed && (
          <>
            <Divider my={6} borderColor={borderColor} />
            
            {/* Quick Access Section */}
            <VStack spacing={2} align="stretch">
              <Text 
                fontSize="xs" 
                fontWeight="semibold" 
                color={sectionHeaderColor} 
                px={2} 
                mb={2}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Quick Access
              </Text>
              {quickItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </VStack>

            <Divider my={6} borderColor={borderColor} />
            
            {/* Settings & Help */}
            <VStack spacing={2} align="stretch">
              <Text 
                fontSize="xs" 
                fontWeight="semibold" 
                color={sectionHeaderColor} 
                px={2} 
                mb={2}
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Support
              </Text>
              <HStack
                px={3}
                py={2}
                borderRadius="md"
                cursor="pointer"
                fontSize="xs"
                _hover={{ bg: hoverBgColor }}
              >
                <SettingsIcon boxSize={4} />
                <Text>Settings</Text>
              </HStack>
              <HStack
                px={3}
                py={2}
                borderRadius="md"
                cursor="pointer"
                fontSize="xs"
                _hover={{ bg: hoverBgColor }}
              >
                <QuestionOutlineIcon boxSize={4} />
                <Text>Help Center</Text>
              </HStack>
            </VStack>
          </>
        )}
      </Box>

      {/* Storage Usage Widget */}
      {!collapsed && (
        <Box p={4} borderTop="1px solid" borderColor={borderColor}>
          <Box
            p={4}
            bg={storageBgColor}
            borderRadius="xl"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
            />
            <Box position="relative" zIndex="1">
              <Flex justify="space-between" align="center" mb={3}>
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  Storage Usage
                </Text>
                <ViewIcon boxSize={4} color="gray.500" />
              </Flex>
              
              <Progress
                value={65}
                size="sm"
                borderRadius="full"
                bg={progressBgColor}
                mb={2}
                sx={{
                  '& > div': {
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  },
                }}
              />
              
              <Flex justify="space-between" fontSize="xs" color="gray.500">
                <Text>650 GB used</Text>
                <Text>1 TB total</Text>
              </Flex>
              
              <Text fontSize="xs" color="gray.500" mt={1}>
                65% of storage used
              </Text>

              {/* Upgrade prompt */}
              <Box
                mt={3}
                p={2}
                bg={upgradePromptBg}
                borderRadius="md"
                border="1px solid"
                borderColor={upgradePromptBorder}
                cursor="pointer"
                _hover={{
                  bg: upgradePromptHoverBg,
                  transform: 'translateY(-1px)',
                  shadow: 'sm',
                }}
                transition="all 0.2s ease"
                onClick={onUpgradeOpen}
                data-testid={testIds.upgrade_prompt}
              >
                <Text fontSize="xs" color={upgradePromptTextPrimary} fontWeight="medium">
                  Need more space?
                </Text>
                <Text fontSize="xs" color={upgradePromptTextSecondary} mt={1}>
                  Upgrade to Pro for unlimited storage
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={onUpgradeClose}
        onUpgrade={(plan) => {
          console.log(`Upgrading to ${plan} plan`);
          // Here you would typically integrate with your payment processor
          // For now, we'll just show a success message
          onUpgradeClose();
          // You could dispatch a Redux action or show a toast notification here
        }}
      />
    </Box>
  );
};
