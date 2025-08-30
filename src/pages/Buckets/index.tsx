import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  useDisclosure,
  Container,
  Flex,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { BucketList } from '../../components/buckets/BucketList';
import { BucketOperations } from '../../components/buckets/BucketOperations';
import { CreateBucketModal } from '../../components/buckets/CreateBucketModal';
import { testIds } from '../../shared/dataTestIds';
import { RenameBucketModal } from '../../components/buckets/RenameBucketModal';
import { Bucket } from '../../types/bucket';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectAllBuckets,
  selectSelectedBuckets,
  selectBucketsLoading,
} from '../../store/selectors';
import {
  setBuckets,
  createBucket as createBucketAction,
  deleteBuckets,
  selectMultipleBuckets,
  toggleVersioningForBuckets,
  toggleEncryptionForBuckets,
  makeBucketsPublic,
  makeBucketsPrivate,
} from '../../store/slices/bucketsSlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import { showSuccessNotification, showErrorNotification, showInfoNotification } from '../../store/slices/uiSlice';
import { fetchBuckets, createBucket as createBucketAPI, deleteBucket as deleteBucketAPI, Bucket as APIBucket } from '../../services/api/buckets';

export const Buckets: React.FC = () => {
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isRenameOpen, onOpen: onRenameOpen, onClose: onRenameClose } = useDisclosure();
  const dispatch = useAppDispatch();
  
  // State for rename modal
  const [renameBucketData, setRenameBucketData] = useState<{ id: string; name: string } | null>(null);
  
  // Redux state
  const buckets = useAppSelector(selectAllBuckets);
  const selectedBuckets = useAppSelector(selectSelectedBuckets);
  const loading = useAppSelector(selectBucketsLoading);

  console.log("buckets", buckets);
  console.log("bucket IDs in Redux:", buckets.map(b => b.id));
  
  // Local storage for persistence
  const [storedBuckets, setStoredBuckets] = useLocalStorage<Bucket[]>('cloud-storage-buckets', []);

  // Helper function to convert API bucket to Redux bucket
  const convertAPIBucketToReduxBucket = (apiBucket: APIBucket): Bucket => ({
    id: apiBucket.id,
    name: apiBucket.name,
    region: apiBucket.region,
    size: apiBucket.size,
    objects: apiBucket.objectCount,
    lastModified: apiBucket.createdAt,
    storageClass: 'STANDARD',
    versioning: false,
    encryption: true,
    publicRead: false,
    created: apiBucket.createdAt,
    cost: 0,
  });

  // Load buckets from API on component mount
  useEffect(() => {
    const loadBuckets = async () => {
      try {
        const apiBuckets = await fetchBuckets();
        const reduxBuckets = apiBuckets.map(convertAPIBucketToReduxBucket);
        dispatch(setBuckets(reduxBuckets));
      } catch (error) {
        console.error('Failed to load buckets from API:', error);
        // Fallback to localStorage if API fails
        if (storedBuckets.length > 0) {
          dispatch(setBuckets(storedBuckets));
        }
      }
    };

    if (buckets.length === 0) {
      loadBuckets();
    }
  }, [dispatch, buckets.length, storedBuckets]);

  // Sync buckets to localStorage whenever buckets change
  useEffect(() => {
    if (buckets.length > 0) {
      setStoredBuckets(buckets);
    }
  }, [buckets, setStoredBuckets]);

  const handleCreateBucket = async (bucketData: any) => {
    try {
      console.log('Creating bucket with data:', bucketData);
      
      // Create bucket via API
      const newAPIBucket = await createBucketAPI({
        name: bucketData.name,
        region: bucketData.region,
      });
      
      console.log('API returned bucket:', newAPIBucket);
      
      // Convert to Redux format and add to store
      const newReduxBucket = convertAPIBucketToReduxBucket(newAPIBucket);
      console.log('Converted to Redux format:', newReduxBucket);
      
      // Use the API response directly instead of creating a new bucket
      dispatch(setBuckets([...buckets, newReduxBucket]));
      
      onCreateClose();
    } catch (error) {
      console.error('Create bucket error:', error);
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to create bucket'
      }));
    }
  };

  const handleDeleteBucket = async (bucketId: string, bucketName: string) => {
    try {
      
      // Delete bucket via API
      await deleteBucketAPI(bucketId);
      
      // Remove from Redux store
      dispatch(deleteBuckets([bucketId]));
      
      console.log('Bucket deleted successfully from Redux');
      
    } catch (error) {
      console.error('Delete bucket error:', error);
      console.error('Error details:', error);
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to delete bucket'
      }));
    }
  };

  const handleDeleteBuckets = async (bucketIds: string[]) => {
    try {
      // Delete buckets via API
      await Promise.all(bucketIds.map(id => deleteBucketAPI(id)));
      
      // Remove from Redux store
      dispatch(deleteBuckets(bucketIds));
    } catch (error) {
      // dispatch(showErrorNotification({
      //   title: 'Error',
      //   message: 'Failed to delete buckets'
      // }));
    }
  };

  const handleEditBucket = (bucketId: string) => {
    // TODO: Implement bucket editing modal
    console.log('Edit bucket:', bucketId);
  };

  const handleRenameBucket = (bucketId: string, currentName: string) => {
    setRenameBucketData({ id: bucketId, name: currentName });
    onRenameOpen();
  };

  const handleBucketClick = (bucketId: string) => {
    // Navigate to bucket detail or toggle selection
    console.log('Bucket clicked:', bucketId);
  };

  const handleBucketSelect = (bucketIds: string[]) => {
    dispatch(selectMultipleBuckets(bucketIds));
  };

  const handleExportBuckets = (bucketIds: string[]) => {
    // TODO: Implement bucket export
    console.log('Export buckets:', bucketIds);
    dispatch(showInfoNotification({
      title: 'Export',
      message: `Exporting ${bucketIds.length} bucket(s)`
    }));
  };

  const handleSyncBuckets = (bucketIds: string[]) => {
    // TODO: Implement bucket sync
    console.log('Sync buckets:', bucketIds);
    dispatch(showInfoNotification({
      title: 'Sync',
      message: `Syncing ${bucketIds.length} bucket(s)`
    }));
  };

  const handleToggleEncryption = (bucketIds: string[]) => {
    try {
      dispatch(toggleEncryptionForBuckets(bucketIds));
      dispatch(showSuccessNotification({
        title: 'Encryption Updated',
        message: `Encryption toggled for ${bucketIds.length} bucket(s)`
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to update encryption'
      }));
    }
  };

  const handleToggleVersioning = (bucketIds: string[]) => {
    try {
      dispatch(toggleVersioningForBuckets(bucketIds));
      dispatch(showSuccessNotification({
        title: 'Versioning Updated',
        message: `Versioning toggled for ${bucketIds.length} bucket(s)`
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to update versioning'
      }));
    }
  };

  const handleMakePublic = (bucketIds: string[]) => {
    try {
      dispatch(makeBucketsPublic(bucketIds));
      dispatch(showSuccessNotification({
        title: 'Access Updated',
        message: `${bucketIds.length} bucket(s) made public`
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to update bucket access'
      }));
    }
  };

  const handleMakePrivate = (bucketIds: string[]) => {
    try {
      dispatch(makeBucketsPrivate(bucketIds));
      dispatch(showSuccessNotification({
        title: 'Access Updated',
        message: `${bucketIds.length} bucket(s) made private`
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to update bucket access'
      }));
    }
  };

  return (
    <Container maxW="full" px={{ base: 4, md: 8 }} py={8}>
      <Box data-testid={testIds.buckets_page}>
        {/* Enhanced Header Section */}
        <VStack align="start" spacing={4} mb={10}>
          <Flex 
            direction={{ base: "column", md: "row" }} 
            justify="space-between" 
            align={{ base: "start", md: "center" }}
            w="full"
            gap={4}
          >
            <VStack align="start" spacing={2}>
              <Heading 
                size={{ base: "xl", md: "2xl" }} 
                bgGradient="linear(to-r, #667eea, #764ba2)" 
                bgClip="text"
                fontWeight="bold"
                data-testid={testIds.buckets_page_titles}
              >
                Storage Buckets
              </Heading>
              <Text 
                color="gray.600" 
                fontSize={{ base: "md", md: "lg" }} 
                fontWeight="medium"
                data-testid={testIds.buckets_page_desccription}
              >
                Manage your cloud storage buckets and data
              </Text>
            </VStack>
            
            {/* Status Badge */}
            <HStack spacing={3}>
              <Badge 
                colorScheme="green" 
                variant="subtle" 
                borderRadius="full" 
                px={4} 
                py={2}
                fontSize="sm"
                fontWeight="semibold"
              >
                {buckets.length} Buckets
              </Badge>
              {selectedBuckets.length > 0 && (
                <Badge 
                  colorScheme="blue" 
                  variant="solid" 
                  borderRadius="full" 
                  px={4} 
                  py={2}
                  fontSize="sm"
                  fontWeight="semibold"
                  boxShadow="0 2px 4px rgba(59, 130, 246, 0.3)"
                >
                  {selectedBuckets.length} Selected
                </Badge>
              )}
            </HStack>
          </Flex>
        </VStack>

        {/* Bucket Operations Toolbar */}
        <BucketOperations
          selectedBuckets={selectedBuckets}
          onCreateBucket={onCreateOpen}
          onDeleteBuckets={handleDeleteBuckets}
          onExportBuckets={handleExportBuckets}
          onConfigureBucket={handleEditBucket}
          onSyncBuckets={handleSyncBuckets}
          onToggleEncryption={handleToggleEncryption}
          onToggleVersioning={handleToggleVersioning}
          onMakePublic={handleMakePublic}
          onMakePrivate={handleMakePrivate}
          onRenameBuckets={(bucketIds) => {
            // For bulk rename, i'll rename the first selected bucket
            if (bucketIds.length > 0) {
              const bucket = buckets.find(b => b.id === bucketIds[0]);
              if (bucket) {
                handleRenameBucket(bucket.id, bucket.name);
              }
            }
          }}
          totalBuckets={buckets.length}
        />

        {/* Bucket List */}
        <BucketList
          buckets={buckets}
          onCreateBucket={onCreateOpen}
          onDeleteBucket={handleDeleteBucket}
          onEditBucket={handleEditBucket}
          onRenameBucket={handleRenameBucket}
          onBucketClick={handleBucketClick}
          onBucketSelect={handleBucketSelect}
          selectedBuckets={selectedBuckets}
          loading={loading}
        />

        {/* Create Bucket Modal */}
        <CreateBucketModal
          isOpen={isCreateOpen}
          onClose={onCreateClose}
          onCreateBucket={handleCreateBucket}
          loading={loading}
        />

        {/* Rename Bucket Modal */}
        {renameBucketData && (
          <RenameBucketModal
            isOpen={isRenameOpen}
            onClose={onRenameClose}
            bucketId={renameBucketData.id}
            currentName={renameBucketData.name}
          />
        )}
      </Box>
    </Container>
  );
};

export default Buckets;
