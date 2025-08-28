import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Badge,
  Divider,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Card,
  CardBody,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  ViewIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import {plans} from '../../../constants/mockdata';
import {UpgradeModalProps} from '../../../types/sidebar';


export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.300" />
      <ModalContent
        bg={bgColor}
        borderRadius="2xl"
        shadow="2xl"
        border="1px solid"
        borderColor={borderColor}
        maxW="900px"
      >
        <ModalHeader textAlign="center" pb={2}>
          <VStack spacing={3}>
            <Box
              w={16}
              h={16}
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              shadow="lg"
            >
              <ViewIcon color="white" boxSize={8} />
            </Box>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                Upgrade to CloudSync Pro
              </Text>
              <Text fontSize="md" color={subtitleColor} textAlign="center">
                Unlock unlimited storage and powerful features for your growing needs
              </Text>
            </VStack>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody px={8} pb={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {plans.map((plan) => (
              <Card
                key={plan.id}
                border="2px solid"
                borderColor={plan.popular ? `${plan.color}.500` : borderColor}
                borderRadius="xl"
                shadow={plan.popular ? 'xl' : 'md'}
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: '2xl',
                }}
                transition="all 0.3s ease"
              >
                {plan.popular && (
                  <Badge
                    position="absolute"
                    top={4}
                    right={4}
                    colorScheme={plan.color}
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    Most Popular
                  </Badge>
                )}
                
                <CardBody p={6}>
                  <VStack spacing={4} align="stretch">
                    {/* Plan Header */}
                    <VStack spacing={2}>
                      <Icon
                        as={plan.icon}
                        boxSize={8}
                        color={`${plan.color}.500`}
                      />
                      <Text fontSize="xl" fontWeight="bold" color={textColor}>
                        {plan.name}
                      </Text>
                      <Text fontSize="sm" color={subtitleColor} textAlign="center">
                        {plan.description}
                      </Text>
                    </VStack>

                    {/* Price */}
                    <VStack spacing={1}>
                      <HStack spacing={1} align="baseline">
                        <Text fontSize="3xl" fontWeight="bold" color={`${plan.color}.500`}>
                          {plan.price}
                        </Text>
                        <Text fontSize="md" color={subtitleColor}>
                          {plan.period}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" color={subtitleColor}>
                        Billed monthly • Cancel anytime
                      </Text>
                    </VStack>

                    <Divider />

                    {/* Features */}
                    <VStack spacing={3} align="stretch">
                      <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                        What's included:
                      </Text>
                      {plan.features.map((feature, index) => (
                        <HStack key={index} spacing={3}>
                          <CheckCircleIcon
                            color={`${plan.color}.500`}
                            boxSize={4}
                            flexShrink={0}
                          />
                          <Text fontSize="sm" color={subtitleColor}>
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    {/* CTA Button */}
                    <Button
                      bg={`${plan.color}.500`}
                      color="white"
                      size="lg"
                      borderRadius="lg"
                      _hover={{
                        bg: `${plan.color}.600`,
                        transform: 'translateY(-2px)',
                        shadow: 'lg',
                      }}
                      _active={{
                        bg: `${plan.color}.700`,
                      }}
                      onClick={() => onUpgrade(plan.id)}
                      rightIcon={<ArrowForwardIcon />}
                    >
                      Upgrade to {plan.name}
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Additional Info */}
          <Box mt={8} p={4} bg="gray.50" borderRadius="lg" textAlign="center">
            <Text fontSize="sm" color={subtitleColor}>
              💳 Secure payment processing • 🔒 30-day money-back guarantee • 
              📞 24/7 customer support
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent="center" pt={0}>
          <Button variant="ghost" onClick={onClose} color={subtitleColor}>
            Maybe later
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
