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
import { testIds } from '../../shared/dataTestIds';



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
    <Box data-test={'billing_page'}>
      {/* Header */}
      <VStack align="start" spacing={1} mb={8}>
        <Heading size={{ base: "lg", md: "2xl" }} bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text" data-test={'billing_header'}>
          Billing & Payments
        </Heading>
        <Text color="gray.600" fontSize={{ base: "sm", md: "lg" }} data-test={'billing_description'}>
          Manage your billing information, view invoices, and track payments
        </Text>
      </VStack>

      {/* Billing Overview Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8} data-test={'billing_cards'}>
        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="green.500" data-test={'current_month_card'}>
          <CardBody>
            <Stat>
                          <StatLabel fontSize={{ base: "xs", md: "sm" }} color="gray.500" mb={1} data-test={'current_month_label'}>Current Month</StatLabel>
            <StatNumber fontSize={{ base: "xl", md: "2xl" }} color="green.500" mb={2} data-test={'current_month_value'}>
              ${billingData.currentMonth}
            </StatNumber>
            <StatHelpText fontSize={{ base: "2xs", md: "xs" }} data-test={'current_month_trend'}>
              <StatArrow type={billingData.trend > 0 ? 'increase' : 'decrease'} />
              {Math.abs(billingData.trend)}% from last month
            </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="blue.500" data-test={'storage_usage_card'}>
          <CardBody>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500" mb={1} data-test={'storage_usage_label'}>Storage Usage</StatLabel>
              <StatNumber fontSize="2xl" color="blue.500" mb={2} data-test={'storage_usage_value'}>
                {billingData.totalStorage} GB
              </StatNumber>
              <Progress
                value={(billingData.totalStorage / billingData.storageLimit) * 100}
                colorScheme="blue"
                size="sm"
                borderRadius="full"
                mb={2}
                data-test={'storage_usage_progress'}
              />
              <StatHelpText fontSize="xs" data-test={'storage_usage_help_text'}>
                {((billingData.totalStorage / billingData.storageLimit) * 100).toFixed(1)}% of {billingData.storageLimit} GB limit
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="orange.500" data-test={'upcoming_payment_card'}>
          <CardBody>
            <Stat>
                          <StatLabel fontSize={{ base: "xs", md: "sm" }} color="gray.500" mb={1} data-test={'upcoming_payment_label'}>Upcoming Payment</StatLabel>
            <StatNumber fontSize={{ base: "xl", md: "2xl" }} color="orange.500" mb={2} data-test={'upcoming_payment_value'}>
              ${billingData.upcomingPayment}
            </StatNumber>
            <StatHelpText fontSize={{ base: "2xs", md: "xs" }} data-test={'upcoming_payment_due_date'}>
              Due: {new Date(billingData.dueDate).toLocaleDateString()}
            </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={cardBg} shadow="md" borderRadius="xl" borderLeft="4px solid" borderLeftColor="purple.500" data-test={'payment_methods_count_card'}>
          <CardBody>
            <Stat>
                          <StatLabel fontSize={{ base: "xs", md: "sm" }} color="gray.500" mb={1} data-test={'payment_methods_label'}>Payment Methods</StatLabel>
            <StatNumber fontSize={{ base: "xl", md: "2xl" }} color="purple.500" mb={2} data-test={'payment_methods_count'}>
              {paymentMethods.length}
            </StatNumber>
            <StatHelpText fontSize={{ base: "2xs", md: "xs" }} data-test={'payment_methods_default_count'}>
              {paymentMethods.filter(pm => pm.isDefault).length} default
            </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Main Content Tabs */}
      <Tabs variant="enclosed" colorScheme="blue" data-test={'billing_tabs'}>
        <TabList data-test={'billing_tab_list'}>
          <Tab data-test={'invoices_tab'}>Invoices</Tab>
          <Tab data-test={'payment_methods_tab'}>Payment Methods</Tab>
          <Tab data-test={'billing_history_tab'}>Billing History</Tab>
        </TabList>

        <TabPanels>
          {/* Invoices Tab */}
          <TabPanel data-test={'invoices_panel'}>
            <Card bg={cardBg} shadow="md" borderRadius="xl" data-test={'invoices_card'}>
              <CardHeader>
                <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={4}>
                  <Heading size="md" data-test={'invoices_header'}>Invoices</Heading>
                  <HStack spacing={3} flexWrap={{ base: "wrap", md: "nowrap" }}>
                    <Select
                      size="sm"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      width={{ base: "full", md: "150px" }}
                      data-test={'invoice_period_filter'}
                    >
                      <option value="current">Current Month</option>
                      <option value="last3">Last 3 Months</option>
                      <option value="last6">Last 6 Months</option>
                      <option value="all">All Time</option>
                    </Select>
                    <Button leftIcon={<FiDownload />} size="sm" variant="outline" data-test={'export_invoices_btn'}>
                      Export
                    </Button>
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <TableContainer data-test={'invoices_table_container'}>
                  <Table variant="simple" size="md" data-test={'invoices_table'}>
                    <Thead>
                      <Tr>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize={{ base: "2xs", md: "xs" }}>
                          INVOICE
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize={{ base: "2xs", md: "xs" }} display={{ base: "none", md: "table-cell" }}>
                          DATE
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize={{ base: "2xs", md: "xs" }}>
                          AMOUNT
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize={{ base: "2xs", md: "xs" }}>
                          STATUS
                        </Th>
                        <Th border="none" color="gray.500" fontWeight="semibold" fontSize={{ base: "2xs", md: "xs" }}>
                          ACTIONS
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody data-test={'invoices_table_body'}>
                      {invoices.map((invoice) => (
                        <Tr key={invoice.id} _hover={{ bg: hoverBg }} data-test={`invoice_row_${invoice.id}`}>
                          <Td border="none" py={4}>
                            <VStack align="start" spacing={1}>
                              <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }} data-test={`invoice_number_${invoice.id}`}>{invoice.invoiceNumber}</Text>
                              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" data-test={`invoice_description_${invoice.id}`}>{invoice.description}</Text>
                            </VStack>
                          </Td>
                          <Td border="none" py={4} display={{ base: "none", md: "table-cell" }}>
                            <Text fontSize={{ base: "sm", md: "sm" }} data-test={`invoice_date_${invoice.id}`}>{new Date(invoice.date).toLocaleDateString()}</Text>
                          </Td>
                          <Td border="none" py={4}>
                            <Text fontWeight="semibold" fontSize="lg" data-test={`invoice_amount_${invoice.id}`}>${invoice.amount}</Text>
                          </Td>
                          <Td border="none" py={4}>
                            <HStack spacing={1}>
                              {getStatusIcon(invoice.status)}
                              <Badge
                                colorScheme={getStatusColor(invoice.status)}
                                variant="subtle"
                                fontSize={{ base: "xs", md: "sm" }}
                                data-test={`invoice_status_${invoice.id}`}
                              >
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </Badge>
                            </HStack>
                          </Td>
                          <Td border="none" py={4}>
                            <HStack spacing={2}>
                              <Button size="sm" variant="ghost" leftIcon={<FiEye />} data-test={`view_invoice_btn_${invoice.id}`}>
                                View
                              </Button>
                              <Button size="sm" variant="ghost" leftIcon={<FiDownload />} data-test={`download_invoice_btn_${invoice.id}`}>
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
          <TabPanel data-test={'payment_methods_panel'}>
            <Card bg={cardBg} shadow="md" borderRadius="xl" data-test={'payment_methods_card'}>
              <CardHeader>
                <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={4}>
                  <Heading size="md" data-test={'payment_methods_header'}>Payment Methods</Heading>
                  <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onAddPaymentOpen} size={{ base: "sm", md: "md" }} data-test={'add_payment_method_btn'}>
                    Add Payment Method
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} data-test={'payment_methods_grid'}>
                  {paymentMethods.map((method) => (
                    <Card key={method.id} variant="outline" borderColor={borderColor} data-test={`payment_method_card_${method.id}`}>
                      <CardBody>
                        <HStack justify="space-between" align="start">
                          <VStack align="start" spacing={2}>
                            <HStack>
                              <Icon as={FiCreditCard} color="blue.500" />
                              <Text fontWeight="medium" data-test={`payment_method_brand_${method.id}`}>{method.brand}</Text>
                              {method.isDefault && (
                                <Badge colorScheme="green" size="sm" data-test={`payment_method_default_${method.id}`}>Default</Badge>
                              )}
                            </HStack>
                            <Text fontSize="sm" color="gray.600" data-test={`payment_method_last4_${method.id}`}>
                              •••• •••• •••• {method.last4}
                            </Text>
                            <Text fontSize="sm" color="gray.600" data-test={`payment_method_expiry_${method.id}`}>
                              Expires {method.expiryDate}
                            </Text>
                          </VStack>
                          <Button size="sm" variant="ghost" data-test={`edit_payment_method_btn_${method.id}`}>
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
      <Modal isOpen={isAddPaymentOpen} onClose={onAddPaymentClose} size={{ base: "full", md: "lg" }} data-test={'add_payment_modal'}>
        <ModalOverlay />
                  <ModalContent mx={{ base: 4, md: 0 }}>
          <ModalHeader data-test={'add_payment_modal_header'}>Add Payment Method</ModalHeader>
          <ModalCloseButton data-test={'add_payment_modal_close'} />
          <ModalBody data-test={'add_payment_modal_body'}>
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
