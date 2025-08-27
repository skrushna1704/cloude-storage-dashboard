import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { BucketList } from '../../components/buckets/BucketList';
import { BucketOperations } from '../../components/buckets/BucketOperations';
import { CreateBucketModal } from '../../components/buckets/CreateBucketModal';
import { RenameBucketModal } from '../../components/buckets/RenameBucketModal';
import { BUCKETS } from '../../constants/mockdata';
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
  createBucket,
  deleteBuckets,
  selectMultipleBuckets,
  toggleVersioningForBuckets,
  toggleEncryptionForBuckets,
  makeBucketsPublic,
  makeBucketsPrivate,
} from '../../store/slices/bucketsSlice';
import useLocalStorage from '../../hooks/useLocalStorage';
import { showSuccessNotification, showErrorNotification, showInfoNotification } from '../../store/slices/uiSlice';


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
  
  // Local storage for persistence
  const [storedBuckets, setStoredBuckets] = useLocalStorage<Bucket[]>('cloud-storage-buckets', BUCKETS);

  // Initialize buckets from localStorage on component mount
  useEffect(() => {
    if (buckets.length === 0 && storedBuckets.length > 0) {
      dispatch(setBuckets(storedBuckets));
    }
  }, [dispatch, buckets.length, storedBuckets]);

  // Sync buckets to localStorage whenever buckets change
  useEffect(() => {
    if (buckets.length > 0) {
      setStoredBuckets(buckets);
    }
  }, [buckets, setStoredBuckets]);

  const handleCreateBucket = (bucketData: any) => {
    try {
      dispatch(createBucket({
        name: bucketData.name,
        region: bucketData.region,
        size: 0,
        sizeLimit: 100,
        objects: 0,
        storageClass: bucketData.storageClass || 'Standard',
        versioning: bucketData.versioning || false,
        encryption: bucketData.encryption !== false,
        publicRead: bucketData.publicRead || false,
        cost: 0,
      }));
      
      dispatch(showSuccessNotification({
        title: 'Bucket Created',
        message: `Bucket "${bucketData.name}" created successfully`
      }));
      
      onCreateClose();
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to create bucket'
      }));
    }
  };

  const handleDeleteBucket = (bucketId: string, bucketName: string) => {
    try {
      dispatch(deleteBuckets([bucketId]));
      dispatch(showSuccessNotification({
        title: 'Bucket Deleted',
        message: `Bucket "${bucketName}" deleted successfully`
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to delete bucket'
      }));
    }
  };

  const handleDeleteBuckets = (bucketIds: string[]) => {
    try {
      dispatch(deleteBuckets(bucketIds));
      dispatch(showSuccessNotification({
        title: 'Buckets Deleted',
        message: `${bucketIds.length} bucket(s) deleted successfully`
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Error',
        message: 'Failed to delete buckets'
      }));
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
    <Box>
      {/* Header Section */}
      <VStack align="start" spacing={1} mb={8}>
        <Heading size="xl" bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text">
          Storage Buckets
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Manage your cloud storage buckets and data
        </Text>
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
          // For bulk rename, we'll rename the first selected bucket
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
  );
};

export default Buckets;
