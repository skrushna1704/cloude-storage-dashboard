import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  useColorModeValue,
  Button,
  Text,
  HStack,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  VStack,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
  SettingsIcon,
  ChevronRightIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { HeaderProps } from '../../../types/header';
import { notifications, mockBuckets } from '../../../constants/mockdata';

export const Header: React.FC<HeaderProps> = ({
  sidebarCollapsed = false,
  onSidebarToggle,
  currentPage = 'dashboard',
  currentBucket = null,
  onBucketChange,
  breadcrumbs = [],
  availableBuckets = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();
  
  // Color mode values
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)');
  const textColor = useColorModeValue('gray.800', 'white');
  const searchBg = useColorModeValue('white', 'gray.700');
  const searchBorderColor = useColorModeValue('gray.200', 'gray.600');
  const searchFocusBorderColor = '#667eea';
  const searchHoverBorderColor = useColorModeValue('gray.300', 'gray.500');
  const searchButtonHoverBg = useColorModeValue('gray.100', 'gray.600');
  const notificationButtonHoverBg = useColorModeValue('gray.100', 'gray.700');
  const userButtonHoverBg = useColorModeValue('gray.100', 'gray.700');
  const userButtonActiveBg = useColorModeValue('gray.200', 'gray.600');
  const menuListBg = useColorModeValue('white', 'gray.800');
  const menuListBorderColor = useColorModeValue('gray.200', 'gray.600');
  const notificationUnreadBg = useColorModeValue('blue.50', 'blue.900');
  const notificationBorderColor = useColorModeValue('gray.200', 'gray.600');
  const notificationHoverBg = useColorModeValue('gray.50', 'gray.700');
  const breadcrumbBg = useColorModeValue('gray.50', 'gray.700');

  const unreadCount = notifications.filter(n => n.unread).length;

  // Show bucket selector and breadcrumbs only on files page
  const showBucketContext = currentPage === 'files';
  
  return (
    <>
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex="sticky"
        bg={bgColor}
        backdropFilter="blur(20px)"
        borderBottom="1px solid"
        borderColor={borderColor}
        shadow="sm"
      >
        {/* Main Header Row */}
        <Box px={6} py={4}>
          <Flex align="center" justify="space-between">
            {/* Left Section */}
            <Flex align="center" gap={4}>
              {onSidebarToggle && (
                <Tooltip label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                  <IconButton
                    icon={<HamburgerIcon />}
                    onClick={onSidebarToggle}
                    variant="ghost"
                    size="md"
                    aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    _hover={{
                      bg: notificationButtonHoverBg,
                      transform: 'scale(1.05)',
                    }}
                    transition="all 0.2s"
                  />
                </Tooltip>
              )}
              
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  shadow="md"
                >
                  <ViewIcon color="white" boxSize={5} />
                </Box>
                <Heading 
                  size="lg" 
                  color={textColor}
                  fontWeight="700"
                  bgGradient="linear(to-r, #667eea, #764ba2)"
                  bgClip="text"
                >
                  CloudSync Pro
                </Heading>
              </HStack>
            </Flex>

            {/* Center Section - Search */}
            <Box flex="1" maxW="500px" mx={8}>
              <InputGroup>
                <Input
                  placeholder={'Search files, buckets, folders...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg={searchBg}
                  border="1px solid"
                  borderColor={searchBorderColor}
                  borderRadius="full"
                  _focus={{
                    borderColor: searchFocusBorderColor,
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                  }}
                  _hover={{
                    borderColor: searchHoverBorderColor,
                  }}
                  transition="all 0.2s"
                />
                <InputRightElement>
                  <IconButton
                    icon={<SearchIcon />}
                    variant="ghost"
                    size="sm"
                    borderRadius="full"
                    aria-label="Search"
                    _hover={{
                      bg: searchButtonHoverBg,
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>

            {/* Right Section */}
            <Flex align="center" gap={3}>
              {/* Bucket Selector - Show only on files page */}
              {showBucketContext && (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="outline"
                    leftIcon={<ViewIcon />}
                    rightIcon={<ChevronDownIcon />}
                    size="sm"
                    _hover={{
                      bg: userButtonHoverBg,
                    }}
                  >
                    <Text fontSize="sm">
                      {currentBucket ? currentBucket.name : 'Select Bucket'}
                    </Text>
                  </MenuButton>
                  <MenuList
                    bg={menuListBg}
                    borderColor={menuListBorderColor}
                    shadow="xl"
                    minW="250px"
                  >
                    {mockBuckets.map((bucket) => (
                      <MenuItem
                        key={bucket.id}
                        onClick={() => onBucketChange?.(bucket)}
                        _hover={{ bg: notificationHoverBg }}
                      >
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{bucket.name}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {bucket.region} • {bucket.size}
                          </Text>
                        </VStack>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}

              {/* Notifications */}
              <Box position="relative">
                <Tooltip label="Notifications">
                  <IconButton
                    icon={<BellIcon />}
                    onClick={onNotificationOpen}
                    variant="ghost"
                    size="md"
                    aria-label="Notifications"
                    _hover={{
                      bg: notificationButtonHoverBg,
                      transform: 'scale(1.05)',
                    }}
                    transition="all 0.2s"
                  />
                </Tooltip>
                {unreadCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="red.500"
                    color="white"
                    borderRadius="full"
                    minW="20px"
                    h="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Box>

              {/* User Menu */}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  leftIcon={<Avatar size="sm" name="User" bg="#667eea" />}
                  rightIcon={<ChevronDownIcon />}
                  _hover={{
                    bg: userButtonHoverBg,
                  }}
                  _active={{
                    bg: userButtonActiveBg,
                  }}
                  transition="all 0.2s"
                >
                  <Text fontSize="sm" fontWeight="medium">
                    John Doe
                  </Text>
                </MenuButton>
                <MenuList
                  bg={menuListBg}
                  borderColor={menuListBorderColor}
                  shadow="xl"
                >
                  <MenuItem icon={<ViewIcon />}>Profile</MenuItem>
                  <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>

        {/* Breadcrumb Row - Show only when in file explorer with breadcrumbs */}
        {showBucketContext && breadcrumbs.length > 0 && (
          <Box
            px={6}
            py={2}
            bg={breadcrumbBg}
            borderTop="1px solid"
            borderColor={borderColor}
          >
            <Breadcrumb
              spacing={2}
              separator={<ChevronRightIcon color="gray.500" boxSize={3} />}
              fontSize="sm"
            >
              <BreadcrumbItem>
                <BreadcrumbLink color="blue.500" fontWeight="medium">
                  {currentBucket?.name || 'Bucket'}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.path} isCurrentPage={index === breadcrumbs.length - 1}>
                  <BreadcrumbLink
                    color={index === breadcrumbs.length - 1 ? "gray.600" : "blue.500"}
                    fontWeight={index === breadcrumbs.length - 1 ? "normal" : "medium"}
                  >
                    {crumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </Box>
        )}
      </Box>

      {/* Enhanced Notifications Modal */}
      <Modal isOpen={isNotificationOpen} onClose={onNotificationClose} size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader>
            <Flex justify="space-between" align="center">
              <Text>Notifications</Text>
              {unreadCount > 0 && (
                <Badge colorScheme="blue" borderRadius="full">
                  {unreadCount} new
                </Badge>
              )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {notifications.length === 0 ? (
              <Box textAlign="center" py={8}>
                <BellIcon boxSize={8} color="gray.400" mb={3} />
                <Text color="gray.500">No notifications</Text>
              </Box>
            ) : (
              notifications.map((notification) => (
                <Box
                  key={notification.id}
                  p={4}
                  borderRadius="lg"
                  bg={notification.unread ? notificationUnreadBg : 'transparent'}
                  mb={3}
                  border="1px solid"
                  borderColor={notificationBorderColor}
                  _hover={{
                    bg: notificationHoverBg,
                  }}
                  cursor="pointer"
                  transition="all 0.2s"
                  position="relative"
                >
                  {notification.unread && (
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      w={2}
                      h={2}
                      bg="blue.500"
                      borderRadius="full"
                    />
                  )}
                  <Flex justify="space-between" align="start" mb={1}>
                    <Text fontWeight="semibold" fontSize="sm">
                      {notification.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {notification.time}
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.600">
                    {notification.message}
                  </Text>
                </Box>
              ))
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
