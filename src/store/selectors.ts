import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

// Bucket selectors
export const selectAllBuckets = (state: RootState) => state.root.buckets.buckets;
export const selectSelectedBuckets = (state: RootState) => state.root.buckets.selectedBuckets;
export const selectCurrentBucket = (state: RootState) => state.root.buckets.currentBucket;
export const selectBucketsLoading = (state: RootState) => state.root.buckets.loading;
export const selectBucketsError = (state: RootState) => state.root.buckets.error;

// Object selectors
export const selectAllObjects = (state: RootState) => state.root.objects.objects;
export const selectSelectedObjects = (state: RootState) => state.root.objects.selectedObjects;
export const selectCurrentPath = (state: RootState) => state.root.objects.currentPath;
export const selectCurrentBucketId = (state: RootState) => state.root.objects.currentBucketId;
export const selectObjectsLoading = (state: RootState) => state.root.objects.loading;
export const selectObjectsError = (state: RootState) => state.root.objects.error;
export const selectBreadcrumbs = (state: RootState) => state.root.objects.breadcrumbs;
export const selectPreviewObject = (state: RootState) => state.root.objects.previewObject;
export const selectUploadProgress = (state: RootState) => state.root.objects.uploadProgress;
export const selectViewMode = (state: RootState) => state.root.objects.viewMode;
export const selectSortBy = (state: RootState) => state.root.objects.sortBy;
export const selectSortDirection = (state: RootState) => state.root.objects.sortDirection;
export const selectFilterText = (state: RootState) => state.root.objects.filterText;

// UI selectors
export const selectSidebarCollapsed = (state: RootState) => state.root.ui.sidebarCollapsed;
export const selectTheme = (state: RootState) => state.root.ui.theme;
export const selectNotifications = (state: RootState) => state.root.ui.notifications;
export const selectModals = (state: RootState) => state.root.ui.modals;
export const selectLoadingStates = (state: RootState) => state.root.ui.loadingStates;
export const selectErrorStates = (state: RootState) => state.root.ui.errorStates;
export const selectSelectedTab = (state: RootState) => state.root.ui.selectedTab;
export const selectSearchQuery = (state: RootState) => state.root.ui.searchQuery;
export const selectFilters = (state: RootState) => state.root.ui.filters;
export const selectSortOptions = (state: RootState) => state.root.ui.sortOptions;

// Computed selectors
export const selectBucketsCount = createSelector(
  [selectAllBuckets],
  (buckets) => buckets.length
);

export const selectSelectedBucketsCount = createSelector(
  [selectSelectedBuckets],
  (selectedBuckets) => selectedBuckets.length
);

export const selectObjectsCount = createSelector(
  [selectAllObjects],
  (objects) => objects.length
);

export const selectSelectedObjectsCount = createSelector(
  [selectSelectedObjects],
  (selectedObjects) => selectedObjects.length
);

export const selectUnreadNotificationsCount = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(n => !n.read).length
);

export const selectFoldersInCurrentPath = createSelector(
  [selectAllObjects],
  (objects) => objects.filter(obj => obj.isFolder)
);

export const selectFilesInCurrentPath = createSelector(
  [selectAllObjects],
  (objects) => objects.filter(obj => !obj.isFolder)
);

export const selectSortedObjects = createSelector(
  [selectAllObjects, selectSortBy, selectSortDirection],
  (objects, sortBy, sortDirection) => {
    const sorted = [...objects].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'lastModified':
          aValue = new Date(a.lastModified).getTime();
          bValue = new Date(b.lastModified).getTime();
          break;
        case 'type':
          aValue = a.fileType;
          bValue = b.fileType;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }
);

export const selectFilteredObjects = createSelector(
  [selectSortedObjects, selectFilterText],
  (objects, filterText) => {
    if (!filterText) return objects;
    
    const lowerFilterText = filterText.toLowerCase();
    return objects.filter(obj => 
      obj.name.toLowerCase().includes(lowerFilterText) ||
      obj.fileType.toLowerCase().includes(lowerFilterText)
    );
  }
);

export const selectBucketById = createSelector(
  [selectAllBuckets, (_state: RootState, bucketId: string) => bucketId],
  (buckets, bucketId) => buckets.find(bucket => bucket.id === bucketId)
);

export const selectObjectByKey = createSelector(
  [selectAllObjects, (_state: RootState, objectKey: string) => objectKey],
  (objects, objectKey) => objects.find(obj => obj.key === objectKey)
);

export const selectModalById = createSelector(
  [selectModals, (_state: RootState, modalId: string) => modalId],
  (modals, modalId) => modals[modalId]
);

export const selectLoadingStateByKey = createSelector(
  [selectLoadingStates, (_state: RootState, key: string) => key],
  (loadingStates, key) => loadingStates[key] || false
);

export const selectErrorStateByKey = createSelector(
  [selectErrorStates, (_state: RootState, key: string) => key],
  (errorStates, key) => errorStates[key] || null
);

// Bucket statistics selectors
export const selectTotalStorageUsed = createSelector(
  [selectAllBuckets],
  (buckets) => buckets.reduce((total, bucket) => total + bucket.size, 0)
);

export const selectTotalCost = createSelector(
  [selectAllBuckets],
  (buckets) => buckets.reduce((total, bucket) => total + (bucket.cost || 0), 0)
);

export const selectTotalObjects = createSelector(
  [selectAllBuckets],
  (buckets) => buckets.reduce((total, bucket) => total + bucket.objects, 0)
);

// Object statistics selectors
export const selectTotalFileSize = createSelector(
  [selectFilesInCurrentPath],
  (files) => files.reduce((total, file) => total + file.size, 0)
);

export const selectFileTypes = createSelector(
  [selectFilesInCurrentPath],
  (files) => {
    const typeCount: Record<string, number> = {};
    files.forEach(file => {
      const type = file.fileType || 'unknown';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    return typeCount;
  }
);
