import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ObjectMetadata } from '../../types/object';

interface ObjectsState {
  objects: ObjectMetadata[];
  selectedObjects: string[];
  currentPath: string;
  currentBucketId: string | null;
  loading: boolean;
  error: string | null;
  uploadProgress: Record<string, number>;
  previewObject: ObjectMetadata | null;
  breadcrumbs: Array<{ name: string; path: string }>;
  sortBy: 'name' | 'size' | 'lastModified' | 'type';
  sortDirection: 'asc' | 'desc';
  viewMode: 'grid' | 'list';
  filterText: string;
}

const initialState: ObjectsState = {
  objects: [],
  selectedObjects: [],
  currentPath: '',
  currentBucketId: null,
  loading: false,
  error: null,
  uploadProgress: {},
  previewObject: null,
  breadcrumbs: [{ name: 'Root', path: '' }],
  sortBy: 'name',
  sortDirection: 'asc',
  viewMode: 'list',
  filterText: '',
};

const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    // Set objects for current path
    setObjects: (state, action: PayloadAction<ObjectMetadata[]>) => {
      state.objects = action.payload;
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

    // Set current path and update breadcrumbs
    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
      state.selectedObjects = [];
      
      // Update breadcrumbs
      if (action.payload === '') {
        state.breadcrumbs = [{ name: 'Root', path: '' }];
      } else {
        const pathParts = action.payload.split('/').filter(Boolean);
        const breadcrumbs = [{ name: 'Root', path: '' }];
        
        let currentPath = '';
        pathParts.forEach((part, index) => {
          currentPath += (currentPath ? '/' : '') + part;
          breadcrumbs.push({
            name: part,
            path: currentPath,
          });
        });
        
        state.breadcrumbs = breadcrumbs;
      }
    },

    // Set current bucket
    setCurrentBucketId: (state, action: PayloadAction<string | null>) => {
      state.currentBucketId = action.payload;
      state.currentPath = '';
      state.objects = [];
      state.selectedObjects = [];
      state.breadcrumbs = [{ name: 'Root', path: '' }];
    },

    // Navigate to folder
    navigateToFolder: (state, action: PayloadAction<string>) => {
      const newPath = state.currentPath ? `${state.currentPath}/${action.payload}` : action.payload;
      state.currentPath = newPath;
      state.selectedObjects = [];
      
      // Update breadcrumbs
      const pathParts = newPath.split('/').filter(Boolean);
      const breadcrumbs = [{ name: 'Root', path: '' }];
      
      let currentPath = '';
      pathParts.forEach((part) => {
        currentPath += (currentPath ? '/' : '') + part;
        breadcrumbs.push({
          name: part,
          path: currentPath,
        });
      });
      
      state.breadcrumbs = breadcrumbs;
    },

    // Navigate to breadcrumb
    navigateToBreadcrumb: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
      state.selectedObjects = [];
      
      // Update breadcrumbs
      if (action.payload === '') {
        state.breadcrumbs = [{ name: 'Root', path: '' }];
      } else {
        const pathParts = action.payload.split('/').filter(Boolean);
        const breadcrumbs = [{ name: 'Root', path: '' }];
        
        let currentPath = '';
        pathParts.forEach((part) => {
          currentPath += (currentPath ? '/' : '') + part;
          breadcrumbs.push({
            name: part,
            path: currentPath,
          });
        });
        
        state.breadcrumbs = breadcrumbs;
      }
    },

    // Create folder
    createFolder: (state, action: PayloadAction<{ name: string; path?: string }>) => {
      const folderPath = action.payload.path || state.currentPath;
      const fullPath = folderPath ? `${folderPath}/${action.payload.name}` : action.payload.name;
      
      const newFolder: ObjectMetadata = {
        id: Date.now().toString(),
        key: fullPath,
        bucketId: state.currentBucketId || '',
        bucketName: '',
        name: action.payload.name,
        size: 0,
        contentType: 'application/x-directory',
        fileType: 'other',
        storageClass: 'STANDARD',
        status: 'active',
        createdAt: new Date(),
        lastModified: new Date(),
        etag: '',
        tags: {},
        metadata: {},
        isFolder: true,
      };
      
      state.objects.push(newFolder);
      state.error = null;
    },

    // Upload file
    uploadFile: (state, action: PayloadAction<ObjectMetadata>) => {
      state.objects.push(action.payload);
      state.error = null;
    },

    // Delete object(s)
    deleteObjects: (state, action: PayloadAction<string[]>) => {
      state.objects = state.objects.filter(obj => !action.payload.includes(obj.key));
      state.selectedObjects = state.selectedObjects.filter(key => !action.payload.includes(key));
      state.error = null;
    },

    // Rename object
    renameObject: (state, action: PayloadAction<{ oldKey: string; newName: string }>) => {
      const object = state.objects.find(obj => obj.key === action.payload.oldKey);
      if (object) {
        const pathParts = object.key.split('/');
        pathParts.pop(); // Remove old name
        const newKey = pathParts.length > 0 ? `${pathParts.join('/')}/${action.payload.newName}` : action.payload.newName;
        
        object.name = action.payload.newName;
        object.key = newKey;
        object.lastModified = new Date();
      }
      state.error = null;
    },

    // Move object(s)
    moveObjects: (state, action: PayloadAction<{ objectKeys: string[]; destinationPath: string }>) => {
      const { objectKeys, destinationPath } = action.payload;
      
      state.objects = state.objects.map(obj => {
        if (objectKeys.includes(obj.key)) {
          const newKey = destinationPath ? `${destinationPath}/${obj.name}` : obj.name;
          return {
            ...obj,
            key: newKey,
            lastModified: new Date(),
          };
        }
        return obj;
      });
      
      state.selectedObjects = state.selectedObjects.filter(key => !objectKeys.includes(key));
      state.error = null;
    },

    // Copy object(s)
    copyObjects: (state, action: PayloadAction<{ objectKeys: string[]; destinationPath: string }>) => {
      const { objectKeys, destinationPath } = action.payload;
      
      const objectsToCopy = state.objects.filter(obj => objectKeys.includes(obj.key));
      const copiedObjects = objectsToCopy.map(obj => ({
        ...obj,
        id: Date.now().toString(),
        key: destinationPath ? `${destinationPath}/${obj.name}` : obj.name,
        lastModified: new Date(),
      }));
      
      state.objects.push(...copiedObjects);
      state.error = null;
    },

    // Select/deselect objects
    selectObject: (state, action: PayloadAction<string>) => {
      if (!state.selectedObjects.includes(action.payload)) {
        state.selectedObjects.push(action.payload);
      }
    },

    deselectObject: (state, action: PayloadAction<string>) => {
      state.selectedObjects = state.selectedObjects.filter(key => key !== action.payload);
    },

    selectMultipleObjects: (state, action: PayloadAction<string[]>) => {
      state.selectedObjects = action.payload;
    },

    clearObjectSelection: (state) => {
      state.selectedObjects = [];
    },

    // Set preview object
    setPreviewObject: (state, action: PayloadAction<ObjectMetadata | null>) => {
      state.previewObject = action.payload;
    },

    // Upload progress
    setUploadProgress: (state, action: PayloadAction<{ fileKey: string; progress: number }>) => {
      state.uploadProgress[action.payload.fileKey] = action.payload.progress;
    },

    clearUploadProgress: (state, action: PayloadAction<string>) => {
      delete state.uploadProgress[action.payload];
    },

    // Sort and filter
    setSortBy: (state, action: PayloadAction<'name' | 'size' | 'lastModified' | 'type'>) => {
      state.sortBy = action.payload;
    },

    setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortDirection = action.payload;
    },

    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },

    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },

    // Clear state
    clearObjectsState: (state) => {
      state.objects = [];
      state.selectedObjects = [];
      state.currentPath = '';
      state.currentBucketId = null;
      state.previewObject = null;
      state.breadcrumbs = [{ name: 'Root', path: '' }];
      state.uploadProgress = {};
      state.error = null;
    },
  },
});

export const {
  setObjects,
  setLoading,
  setError,
  setCurrentPath,
  setCurrentBucketId,
  navigateToFolder,
  navigateToBreadcrumb,
  createFolder,
  uploadFile,
  deleteObjects,
  renameObject,
  moveObjects,
  copyObjects,
  selectObject,
  deselectObject,
  selectMultipleObjects,
  clearObjectSelection,
  setPreviewObject,
  setUploadProgress,
  clearUploadProgress,
  setSortBy,
  setSortDirection,
  setViewMode,
  setFilterText,
  clearObjectsState,
} = objectsSlice.actions;

export default objectsSlice.reducer;
