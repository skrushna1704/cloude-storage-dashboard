import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Container,
  Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon, ViewIcon } from '@chakra-ui/icons';

export const NotFound: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <Container maxW={{ base: "full", md: "md" }} centerContent px={{ base: 4, md: 0 }}>
      <Box
        textAlign="center"
        py={{ base: 16, md: 20 }}
        px={{ base: 6, md: 8 }}
        bg={bgColor}
        borderRadius={{ base: "xl", md: "2xl" }}
        shadow="xl"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <VStack spacing={6}>
          {/* 404 Icon */}
          <Box
            p={6}
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            borderRadius="full"
            shadow="lg"
          >
            <Icon
              viewBox="0 0 24 24"
              boxSize={16}
              color="white"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </Icon>
          </Box>
          
          {/* 404 Text */}
          <VStack spacing={3}>
            <Heading
              size={{ base: "2xl", md: "3xl" }}
              bgGradient="linear(to-r, #667eea, #764ba2)"
              bgClip="text"
              fontWeight="bold"
            >
              404
            </Heading>
            <Heading size={{ base: "md", md: "lg" }} color="gray.700">
              Page Not Found
            </Heading>
            <Text color="gray.500" fontSize={{ base: "md", md: "lg" }} maxW="sm" lineHeight="1.6">
              Oops! The page you're looking for seems to have wandered off into the cloud. 
              Let's get you back on track.
            </Text>
          </VStack>

          {/* Action Buttons */}
          <VStack spacing={3} pt={4}>
            <Button
              as={Link}
              to="/"
              size={{ base: "md", md: "lg" }}
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              color="white"
              leftIcon={<ArrowBackIcon />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
              transition="all 0.2s"
            >
              Go Back Home
            </Button>
            
            <Button
              as={Link}
              to="/buckets"
              variant="outline"
              size={{ base: "md", md: "lg" }}
              leftIcon={<ViewIcon />}
              _hover={{
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s"
            >
              View Buckets
            </Button>
          </VStack>

          {/* Help Text */}
          <Box pt={8} borderTop="1px solid" borderColor="gray.200" mt={8}>
            <Text fontSize="sm" color="gray.500">
              Need help? Contact our{' '}
              <Text as="span" color="#667eea" fontWeight="medium">
                support team
              </Text>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default NotFound;
