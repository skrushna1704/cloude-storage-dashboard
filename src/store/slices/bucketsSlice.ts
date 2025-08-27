import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bucket } from '../../types/bucket';

interface BucketsState {
  buckets: Bucket[];
  selectedBuckets: string[];
  loading: boolean;
  error: string | null;
  currentBucket: Bucket | null;
}

const initialState: BucketsState = {
  buckets: [],
  selectedBuckets: [],
  loading: false,
  error: null,
  currentBucket: null,
};

const bucketsSlice = createSlice({
  name: 'buckets',
  initialState,
  reducers: {
    // Set buckets (for initial load)
    setBuckets: (state, action: PayloadAction<Bucket[]>) => {
      state.buckets = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Create new bucket
    createBucket: (state, action: PayloadAction<Omit<Bucket, 'id' | 'created' | 'lastModified'>>) => {
      const newBucket: Bucket = {
        ...action.payload,
        id: Date.now().toString(),
        created: new Date().toISOString().split('T')[0],
        lastModified: 'Just now',
        size: action.payload.size || 0,
        objects: action.payload.objects || 0,
        cost: action.payload.cost || 0,
      };
      state.buckets.push(newBucket);
      state.error = null;
    },

    // Delete bucket(s)
    deleteBuckets: (state, action: PayloadAction<string[]>) => {
      state.buckets = state.buckets.filter(bucket => !action.payload.includes(bucket.id));
      state.selectedBuckets = state.selectedBuckets.filter(id => !action.payload.includes(id));
      state.error = null;
    },

    // Rename bucket
    renameBucket: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const bucket = state.buckets.find(b => b.id === action.payload.id);
      if (bucket) {
        bucket.name = action.payload.newName;
        bucket.lastModified = 'Just now';
      }
      state.error = null;
    },

    // Update bucket properties
    updateBucket: (state, action: PayloadAction<{ id: string; updates: Partial<Bucket> }>) => {
      const bucket = state.buckets.find(b => b.id === action.payload.id);
      if (bucket) {
        Object.assign(bucket, action.payload.updates);
        bucket.lastModified = 'Just now';
      }
      state.error = null;
    },

    // Select/deselect buckets
    selectBucket: (state, action: PayloadAction<string>) => {
      if (!state.selectedBuckets.includes(action.payload)) {
        state.selectedBuckets.push(action.payload);
      }
    },

    deselectBucket: (state, action: PayloadAction<string>) => {
      state.selectedBuckets = state.selectedBuckets.filter(id => id !== action.payload);
    },

    selectMultipleBuckets: (state, action: PayloadAction<string[]>) => {
      state.selectedBuckets = action.payload;
    },

    clearBucketSelection: (state) => {
      state.selectedBuckets = [];
    },

    // Set current bucket (for detail view)
    setCurrentBucket: (state, action: PayloadAction<Bucket | null>) => {
      state.currentBucket = action.payload;
    },

    // Toggle bucket properties
    toggleBucketVersioning: (state, action: PayloadAction<string>) => {
      const bucket = state.buckets.find(b => b.id === action.payload);
      if (bucket) {
        bucket.versioning = !bucket.versioning;
        bucket.lastModified = 'Just now';
      }
    },

    toggleBucketEncryption: (state, action: PayloadAction<string>) => {
      const bucket = state.buckets.find(b => b.id === action.payload);
      if (bucket) {
        bucket.encryption = !bucket.encryption;
        bucket.lastModified = 'Just now';
      }
    },

    toggleBucketPublicRead: (state, action: PayloadAction<string>) => {
      const bucket = state.buckets.find(b => b.id === action.payload);
      if (bucket) {
        bucket.publicRead = !bucket.publicRead;
        bucket.lastModified = 'Just now';
      }
    },

    // Bulk operations
    toggleVersioningForBuckets: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(id => {
        const bucket = state.buckets.find(b => b.id === id);
        if (bucket) {
          bucket.versioning = !bucket.versioning;
          bucket.lastModified = 'Just now';
        }
      });
    },

    toggleEncryptionForBuckets: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(id => {
        const bucket = state.buckets.find(b => b.id === id);
        if (bucket) {
          bucket.encryption = !bucket.encryption;
          bucket.lastModified = 'Just now';
        }
      });
    },

    makeBucketsPublic: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(id => {
        const bucket = state.buckets.find(b => b.id === id);
        if (bucket) {
          bucket.publicRead = true;
          bucket.lastModified = 'Just now';
        }
      });
    },

    makeBucketsPrivate: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(id => {
        const bucket = state.buckets.find(b => b.id === id);
        if (bucket) {
          bucket.publicRead = false;
          bucket.lastModified = 'Just now';
        }
      });
    },

    // Clear state
    clearBucketsState: (state) => {
      state.buckets = [];
      state.selectedBuckets = [];
      state.currentBucket = null;
      state.error = null;
    },
  },
});

export const {
  setBuckets,
  setLoading,
  setError,
  createBucket,
  deleteBuckets,
  renameBucket,
  updateBucket,
  selectBucket,
  deselectBucket,
  selectMultipleBuckets,
  clearBucketSelection,
  setCurrentBucket,
  toggleBucketVersioning,
  toggleBucketEncryption,
  toggleBucketPublicRead,
  toggleVersioningForBuckets,
  toggleEncryptionForBuckets,
  makeBucketsPublic,
  makeBucketsPrivate,
  clearBucketsState,
} = bucketsSlice.actions;

export default bucketsSlice.reducer;
