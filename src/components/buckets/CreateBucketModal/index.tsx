import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Switch,
  Textarea,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Divider,
  useToast,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Card,
  CardBody,
  Flex
} from '@chakra-ui/react';
import {
  AddIcon,
  LockIcon,
  RepeatIcon,
  WarningIcon,
  CheckIcon,
} from '@chakra-ui/icons';

interface CreateBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBucket: (bucketData: BucketFormData) => void;
  loading?: boolean;
}

interface BucketFormData {
  name: string;
  region: string;
  storageClass: string;
  versioning: boolean;
  encryption: boolean;
  publicRead: boolean;
  description?: string;
  tags?: { key: string; value: string }[];
}

const REGIONS = [
  { value: 'us-east-1', label: 'US East (N. Virginia)', description: 'Lowest latency for US East Coast' },
  { value: 'us-west-2', label: 'US West (Oregon)', description: 'Lowest latency for US West Coast' },
  { value: 'eu-west-1', label: 'Europe (Ireland)', description: 'Lowest latency for Europe' },
  { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)', description: 'Lowest latency for India' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)', description: 'Lowest latency for Southeast Asia' },
];

const STORAGE_CLASSES = [
  {
    value: 'Standard',
    label: 'Standard',
    description: 'For frequently accessed data',
    cost: '$0.023/GB/month',
    color: 'green',
  },
  {
    value: 'Standard-IA',
    label: 'Standard-IA',
    description: 'For infrequently accessed data',
    cost: '$0.0125/GB/month',
    color: 'orange',
  },
  {
    value: 'Glacier',
    label: 'Glacier',
    description: 'For long-term archival',
    cost: '$0.004/GB/month',
    color: 'blue',
  },
];

export const CreateBucketModal: React.FC<CreateBucketModalProps> = ({
  isOpen,
  onClose,
  onCreateBucket,
  loading = false,
}) => {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  
  const [formData, setFormData] = useState<BucketFormData>({
    name: '',
    region: 'us-east-1',
    storageClass: 'Standard',
    versioning: false,
    encryption: true,
    publicRead: false,
    description: '',
    tags: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateBucketName = (name: string): string | null => {
    if (!name) return 'Bucket name is required';
    if (name.length < 3 || name.length > 63) return 'Bucket name must be between 3 and 63 characters';
    if (!/^[a-z0-9.-]+$/.test(name)) return 'Bucket name can only contain lowercase letters, numbers, dots, and hyphens';
    if (name.startsWith('.') || name.endsWith('.')) return 'Bucket name cannot start or end with a dot';
    if (name.includes('..')) return 'Bucket name cannot contain consecutive dots';
    return null;
  };

  const handleInputChange = (field: keyof BucketFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const nameError = validateBucketName(formData.name);
    if (nameError) newErrors.name = nameError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm()) return;

    onCreateBucket(formData);
    handleClose();
    
    toast({
      title: 'Bucket created successfully',
      description: `Bucket "${formData.name}" has been created in ${formData.region}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleClose = () => {
    setFormData({
      name: '',
      region: 'us-east-1',
      storageClass: 'Standard',
      versioning: false,
      encryption: true,
      publicRead: false,
      description: '',
      tags: [],
    });
    setErrors({});
    setCurrentStep(0);
    onClose();
  };

  const getEstimatedCost = () => {
    const storageClass = STORAGE_CLASSES.find(sc => sc.value === formData.storageClass);
    const baseCost = parseFloat(storageClass?.cost.replace('$', '').replace('/GB/month', '') || '0.023');
    
    // Estimate additional costs
    const encryptionCost = formData.encryption ? 0.001 : 0;
    const versioningCost = formData.versioning ? baseCost * 0.1 : 0;
    
    return (baseCost + encryptionCost + versioningCost).toFixed(4);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl" closeOnOverlayClick={false}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>
          <HStack spacing={3}>
            <Box
              p={2}
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              borderRadius="lg"
            >
              <AddIcon color="white" boxSize={4} />
            </Box>
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold">Create New Bucket</Text>
              <Text fontSize="sm" color="gray.500">Set up your cloud storage bucket</Text>
            </VStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Tabs index={currentStep} onChange={setCurrentStep} colorScheme="purple">
            <TabList>
              <Tab fontSize="sm">Basic Settings</Tab>
              <Tab fontSize="sm">Configuration</Tab>
              <Tab fontSize="sm">Review</Tab>
            </TabList>

            <TabPanels>
              {/* Basic Settings */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <FormControl isRequired isInvalid={!!errors.name}>
                    <FormLabel>Bucket Name</FormLabel>
                    <Input
                      placeholder="my-awesome-bucket"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value.toLowerCase())}
                      _focus={{
                        borderColor: '#667eea',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                      }}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                    <FormHelperText>
                      Bucket names must be globally unique and contain only lowercase letters, numbers, dots, and hyphens
                    </FormHelperText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Region</FormLabel>
                    <Select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      _focus={{
                        borderColor: '#667eea',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                      }}
                    >
                      {REGIONS.map((region) => (
                        <option key={region.value} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </Select>
                    <FormHelperText>
                      {REGIONS.find(r => r.value === formData.region)?.description}
                    </FormHelperText>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Storage Class</FormLabel>
                    <SimpleGrid columns={1} spacing={3}>
                      {STORAGE_CLASSES.map((storageClass) => (
                        <Card
                          key={storageClass.value}
                          variant={formData.storageClass === storageClass.value ? 'filled' : 'outline'}
                          cursor="pointer"
                          onClick={() => handleInputChange('storageClass', storageClass.value)}
                          bg={formData.storageClass === storageClass.value ? `${storageClass.color}.50` : 'white'}
                          borderColor={formData.storageClass === storageClass.value ? `${storageClass.color}.200` : 'gray.200'}
                          _hover={{
                            borderColor: `${storageClass.color}.300`,
                            transform: 'translateY(-1px)',
                          }}
                          transition="all 0.2s"
                        >
                          <CardBody py={3}>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={1}>
                                <HStack>
                                  <Text fontWeight="semibold">{storageClass.label}</Text>
                                  {formData.storageClass === storageClass.value && (
                                    <CheckIcon color={`${storageClass.color}.500`} boxSize={3} />
                                  )}
                                </HStack>
                                <Text fontSize="sm" color="gray.600">
                                  {storageClass.description}
                                </Text>
                              </VStack>
                              <Badge colorScheme={storageClass.color}>
                                {storageClass.cost}
                              </Badge>
                            </HStack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Description (Optional)</FormLabel>
                    <Textarea
                      placeholder="Brief description of this bucket's purpose..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      _focus={{
                        borderColor: '#667eea',
                        boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                      }}
                    />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Configuration */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Alert status="info" borderRadius="lg">
                    <AlertIcon />
                    <Box>
                      <AlertTitle fontSize="sm">Security & Management Features</AlertTitle>
                      <AlertDescription fontSize="sm">
                        Configure security and management settings for your bucket. These can be changed later.
                      </AlertDescription>
                    </Box>
                  </Alert>

                  <VStack spacing={5} align="stretch">
                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <FormControl display="flex" alignItems="center" justifyContent="space-between">
                        <Box flex="1">
                          <HStack mb={1}>
                            <LockIcon color="green.500" boxSize={4} />
                            <FormLabel mb={0} fontWeight="semibold">
                              Server-side Encryption
                            </FormLabel>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            Encrypt objects stored in this bucket using AES-256
                          </Text>
                        </Box>
                        <Switch
                          isChecked={formData.encryption}
                          onChange={(e) => handleInputChange('encryption', e.target.checked)}
                          colorScheme="green"
                          size="lg"
                        />
                      </FormControl>
                    </Box>

                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <FormControl display="flex" alignItems="center" justifyContent="space-between">
                        <Box flex="1">
                          <HStack mb={1}>
                            <RepeatIcon color="blue.500" boxSize={4} />
                            <FormLabel mb={0} fontWeight="semibold">
                              Versioning
                            </FormLabel>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            Keep multiple versions of objects in the same bucket
                          </Text>
                        </Box>
                        <Switch
                          isChecked={formData.versioning}
                          onChange={(e) => handleInputChange('versioning', e.target.checked)}
                          colorScheme="blue"
                          size="lg"
                        />
                      </FormControl>
                    </Box>

                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <FormControl display="flex" alignItems="center" justifyContent="space-between">
                        <Box flex="1">
                          <HStack mb={1}>
                            <WarningIcon color="orange.500" boxSize={4} />
                            <FormLabel mb={0} fontWeight="semibold">
                              Public Read Access
                            </FormLabel>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            Allow public read access to objects in this bucket
                          </Text>
                        </Box>
                        <Switch
                          isChecked={formData.publicRead}
                          onChange={(e) => handleInputChange('publicRead', e.target.checked)}
                          colorScheme="orange"
                          size="lg"
                        />
                      </FormControl>
                    </Box>
                  </VStack>

                  {formData.publicRead && (
                    <Alert status="warning" borderRadius="lg">
                      <AlertIcon />
                      <Box>
                        <AlertTitle fontSize="sm">Public Access Warning</AlertTitle>
                        <AlertDescription fontSize="sm">
                          Objects in this bucket will be accessible to anyone on the internet. 
                          Make sure this is intentional and consider the security implications.
                        </AlertDescription>
                      </Box>
                    </Alert>
                  )}
                </VStack>
              </TabPanel>

              {/* Review */}
              <TabPanel px={0}>
                <VStack spacing={6} align="stretch">
                  <Alert status="success" borderRadius="lg">
                    <AlertIcon />
                    <Box>
                      <AlertTitle fontSize="sm">Ready to Create</AlertTitle>
                      <AlertDescription fontSize="sm">
                        Review your bucket configuration before creating.
                      </AlertDescription>
                    </Box>
                  </Alert>

                  <Card>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Flex justify="space-between">
                          <Text fontWeight="semibold" color="gray.600">Bucket Name:</Text>
                          <Text fontWeight="bold">{formData.name || 'Not specified'}</Text>
                        </Flex>
                        
                        <Flex justify="space-between">
                          <Text fontWeight="semibold" color="gray.600">Region:</Text>
                          <Badge colorScheme="purple">
                            {REGIONS.find(r => r.value === formData.region)?.label}
                          </Badge>
                        </Flex>
                        
                        <Flex justify="space-between">
                          <Text fontWeight="semibold" color="gray.600">Storage Class:</Text>
                          <Badge colorScheme={STORAGE_CLASSES.find(sc => sc.value === formData.storageClass)?.color}>
                            {formData.storageClass}
                          </Badge>
                        </Flex>

                        <Divider />

                        <Text fontWeight="semibold" color="gray.600">Security Features:</Text>
                        <SimpleGrid columns={2} spacing={3}>
                          <HStack>
                            <Icon
                              as={formData.encryption ? CheckIcon : WarningIcon}
                              color={formData.encryption ? 'green.500' : 'gray.400'}
                              boxSize={4}
                            />
                            <Text fontSize="sm">Encryption</Text>
                          </HStack>
                          <HStack>
                            <Icon
                              as={formData.versioning ? CheckIcon : WarningIcon}
                              color={formData.versioning ? 'green.500' : 'gray.400'}
                              boxSize={4}
                            />
                            <Text fontSize="sm">Versioning</Text>
                          </HStack>
                        </SimpleGrid>

                        <Divider />

                        <Box>
                          <Text fontWeight="semibold" color="gray.600" mb={2}>
                            Estimated Monthly Cost (per GB):
                          </Text>
                          <HStack>
                            <Text fontSize="lg" fontWeight="bold" color="green.600">
                              ${getEstimatedCost()}
                            </Text>
                            <Text fontSize="sm" color="gray.500">per GB/month</Text>
                          </HStack>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            *Actual costs may vary based on usage patterns
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="ghost" onClick={handleClose} isDisabled={loading}>
              Cancel
            </Button>
            
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                isDisabled={loading}
              >
                Previous
              </Button>
            )}
            
            {currentStep < 2 ? (
              <Button
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                onClick={() => setCurrentStep(currentStep + 1)}
                isDisabled={currentStep === 0 && (!formData.name || !!validateBucketName(formData.name))}
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                onClick={handleCreate}
                isLoading={loading}
                loadingText="Creating..."
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
              >
                Create Bucket
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
