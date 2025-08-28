import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Button,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Flex,
  Icon,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import {
  FiCreditCard,
  FiFileText,
  FiDownload,
  FiEye,
  FiPlus,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi';
import { fetchBillingData } from '../../services/api/billing';
import type { Invoice, PaymentMethod } from '../../services/api/billing';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';



export const Billing: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [billingData, setBillingData] = useState<any>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen: isAddPaymentOpen, onOpen: onAddPaymentOpen, onClose: onAddPaymentClose } = useDisclosure();
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    const loadBillingData = async () => {
      try {
        setLoading(true);
        const data = await fetchBillingData();
        setBillingData(data);
        setInvoices(data.invoices);
        setPaymentMethods(data.paymentMethods);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load billing data');
      } finally {
        setLoading(false);
      }
    };

    loadBillingData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'green';
      case 'pending': return 'orange';
      case 'overdue': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <FiCheckCircle />;
      case 'pending': return <FiClock />;
      case 'overdue': return <FiAlertCircle />;
      default: return <FiClock />;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <LoadingSpinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert status="error" borderRadius="lg" mb={6}>
          <AlertIcon />
          <Box>
            <AlertTitle>Error loading billing data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      </Box>
    );
  }

  if (!billingData) {
    return (
      <Box>
        <Alert status="warning" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>No billing data available</AlertTitle>
          <AlertDescription>Please try refreshing the page.</AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <VStack align="start" spacing={1} mb={8}>
        <Heading size={{ base: "lg", md: "xl" }} bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text">
          Billing & Payments
        </Heading>
        <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
          Manage your billing information, view invoices, and track payments
        </Text>
      </VStack>

      {/* Billing Overview Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={8}>
        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="green.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>Current Month</StatLabel>
              <StatNumber fontSize="2xl" color="green.500" mb={2}>
                ${billingData.currentMonth}
              </StatNumber>
              <StatHelpText fontSize="xs">
                <StatArrow type={billingData.trend > 0 ? 'increase' : 'decrease'} />
                {Math.abs(billingData.trend)}% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="blue.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>Storage Usage</StatLabel>
              <StatNumber fontSize="2xl" color="blue.500" mb={2}>
                {billingData.totalStorage} GB
              </StatNumber>
              <Progress
                value={(billingData.totalStorage / billingData.storageLimit) * 100}
                colorScheme="blue"
                size="sm"
                borderRadius="full"
                mb={2}
              />
              <StatHelpText fontSize="xs">
                {((billingData.totalStorage / billingData.storageLimit) * 100).toFixed(1)}% of {billingData.storageLimit} GB limit
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="orange.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>Upcoming Payment</StatLabel>
              <StatNumber fontSize="2xl" color="orange.500" mb={2}>
                ${billingData.upcomingPayment}
              </StatNumber>
              <StatHelpText fontSize="xs">
                Due: {new Date(billingData.dueDate).toLocaleDateString()}
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="purple.500">
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1}>Payment Methods</StatLabel>
              <StatNumber fontSize="2xl" color="purple.500" mb={2}>
                {paymentMethods.length}
              </StatNumber>
              <StatHelpText fontSize="xs">
                {paymentMethods.filter(pm => pm.isDefault).length} default
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Main Content Tabs */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab>Invoices</Tab>
          <Tab>Payment Methods</Tab>
          <Tab>Billing History</Tab>
        </TabList>

        <TabPanels>
          {/* Invoices Tab */}
          <TabPanel>
            <Card bg={cardBg} shadow="md" borderRadius="xl">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Invoices</Heading>
                  <HStack>
                    <Select
                      size="sm"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      width="150px"
                    >
                      <option value="current">Current Month</option>
                      <option value="last3">Last 3 Months</option>
                      <option value="last6">Last 6 Months</option>
                      <option value="all">All Time</option>
                    </Select>
                    <Button leftIcon={<FiDownload />} size="sm" variant="outline">
                      Export
                    </Button>
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <TableContainer>
                  <Table variant="simple" size="md">
                    <Thead>
                      <Tr>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                          INVOICE
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                          DATE
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                          AMOUNT
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                          STATUS
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize="xs">
                          ACTIONS
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {invoices.map((invoice) => (
                        <Tr key={invoice.id} _hover={{ bg: hoverBg }}>
                          <Td border="none" py={4}>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium">{invoice.invoiceNumber}</Text>
                              <Text fontSize="sm" color="gray.600">{invoice.description}</Text>
                            </VStack>
                          </Td>
                          <Td border="none" py={4}>
                            <Text fontSize="sm">{new Date(invoice.date).toLocaleDateString()}</Text>
                          </Td>
                          <Td border="none" py={4}>
                            <Text fontWeight="semibold" fontSize="lg">${invoice.amount}</Text>
                          </Td>
                          <Td border="none" py={4}>
                            <HStack spacing={1}>
                              {getStatusIcon(invoice.status)}
                              <Badge
                                colorScheme={getStatusColor(invoice.status)}
                                variant="subtle"
                              >
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </Badge>
                            </HStack>
                          </Td>
                          <Td border="none" py={4}>
                            <HStack spacing={2}>
                              <Button size="sm" variant="ghost" leftIcon={<FiEye />}>
                                View
                              </Button>
                              <Button size="sm" variant="ghost" leftIcon={<FiDownload />}>
                                Download
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Payment Methods Tab */}
          <TabPanel>
            <Card bg={cardBg} shadow="md" borderRadius="xl">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Payment Methods</Heading>
                  <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onAddPaymentOpen}>
                    Add Payment Method
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {paymentMethods.map((method) => (
                    <Card key={method.id} variant="outline" borderColor={borderColor}>
                      <CardBody>
                        <HStack justify="space-between" align="start">
                          <VStack align="start" spacing={2}>
                            <HStack>
                              <Icon as={FiCreditCard} color="blue.500" />
                              <Text fontWeight="medium">{method.brand}</Text>
                              {method.isDefault && (
                                <Badge colorScheme="green" size="sm">Default</Badge>
                              )}
                            </HStack>
                            <Text fontSize="sm" color="gray.600">
                              •••• •••• •••• {method.last4}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Expires {method.expiryDate}
                            </Text>
                          </VStack>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Billing History Tab */}
          <TabPanel>
            <Card bg={cardBg} shadow="md" borderRadius="xl">
              <CardHeader>
                <Heading size="md">Billing History</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <VStack spacing={6} align="stretch">
                  <Alert status="info" borderRadius="lg">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Billing History</AlertTitle>
                      <AlertDescription>
                        View your complete billing history and download past invoices.
                      </AlertDescription>
                    </Box>
                  </Alert>
                  
                  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                    <Card variant="outline" borderColor={borderColor}>
                      <CardBody textAlign="center">
                        <Icon as={FiTrendingUp} boxSize={8} color="green.500" mb={2} />
                        <Text fontWeight="semibold">Total Spent</Text>
                        <Text fontSize="2xl" color="green.500">$525.13</Text>
                        <Text fontSize="sm" color="gray.600">Last 12 months</Text>
                      </CardBody>
                    </Card>
                    
                    <Card variant="outline" borderColor={borderColor}>
                      <CardBody textAlign="center">
                        <Icon as={FiFileText} boxSize={8} color="blue.500" mb={2} />
                        <Text fontWeight="semibold">Invoices</Text>
                        <Text fontSize="2xl" color="blue.500">12</Text>
                        <Text fontSize="sm" color="gray.600">This year</Text>
                      </CardBody>
                    </Card>
                    
                    <Card variant="outline" borderColor={borderColor}>
                      <CardBody textAlign="center">
                        <Icon as={FiCheckCircle} boxSize={8} color="green.500" mb={2} />
                        <Text fontWeight="semibold">Paid</Text>
                        <Text fontSize="2xl" color="green.500">11</Text>
                        <Text fontSize="sm" color="gray.600">On time payments</Text>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Add Payment Method Modal */}
      <Modal isOpen={isAddPaymentOpen} onClose={onAddPaymentClose} size={{ base: "full", md: "lg" }}>
        <ModalOverlay />
                  <ModalContent mx={{ base: 4, md: 0 }}>
          <ModalHeader>Add Payment Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Card Number</FormLabel>
                <Input placeholder="1234 5678 9012 3456" />
              </FormControl>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Expiry Date</FormLabel>
                  <Input placeholder="MM/YY" />
                </FormControl>
                <FormControl>
                  <FormLabel>CVV</FormLabel>
                  <Input placeholder="123" />
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Cardholder Name</FormLabel>
                <Input placeholder="John Doe" />
              </FormControl>
              
              <FormControl>
                <FormLabel>Billing Address</FormLabel>
                <Textarea placeholder="Enter billing address" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddPaymentClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onAddPaymentClose}>
              Add Payment Method
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Billing;
