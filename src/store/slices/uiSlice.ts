import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

interface ModalState {
  isOpen: boolean;
  type: string;
  data?: any;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  modals: Record<string, ModalState>;
  loadingStates: Record<string, boolean>;
  errorStates: Record<string, string | null>;
  selectedTab: string;
  searchQuery: string;
  filters: Record<string, any>;
  sortOptions: Record<string, { field: string; direction: 'asc' | 'desc' }>;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  theme: 'light',
  notifications: [],
  modals: {},
  loadingStates: {},
  errorStates: {},
  selectedTab: 'buckets',
  searchQuery: '',
  filters: {},
  sortOptions: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar state
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },

    // Theme
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Notifications
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      };
      state.notifications.unshift(notification);
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },

    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },

    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Modals
    openModal: (state, action: PayloadAction<{ id: string; type: string; data?: any; onConfirm?: () => void; onCancel?: () => void }>) => {
      const { id, type, data, onConfirm, onCancel } = action.payload;
      state.modals[id] = {
        isOpen: true,
        type,
        data,
        onConfirm,
        onCancel,
      };
    },

    closeModal: (state, action: PayloadAction<string>) => {
      const modalId = action.payload;
      if (state.modals[modalId]) {
        state.modals[modalId].isOpen = false;
      }
    },

    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(id => {
        state.modals[id].isOpen = false;
      });
    },

    // Loading states
    setLoadingState: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      const { key, loading } = action.payload;
      state.loadingStates[key] = loading;
    },

    clearLoadingState: (state, action: PayloadAction<string>) => {
      delete state.loadingStates[action.payload];
    },

    // Error states
    setErrorState: (state, action: PayloadAction<{ key: string; error: string | null }>) => {
      const { key, error } = action.payload;
      state.errorStates[key] = error;
    },

    clearErrorState: (state, action: PayloadAction<string>) => {
      delete state.errorStates[action.payload];
    },

    // Tab selection
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },

    // Search
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },

    // Filters
    setFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },

    clearFilter: (state, action: PayloadAction<string>) => {
      delete state.filters[action.payload];
    },

    clearAllFilters: (state) => {
      state.filters = {};
    },

    // Sort options
    setSortOption: (state, action: PayloadAction<{ key: string; field: string; direction: 'asc' | 'desc' }>) => {
      const { key, field, direction } = action.payload;
      state.sortOptions[key] = { field, direction };
    },

    clearSortOption: (state, action: PayloadAction<string>) => {
      delete state.sortOptions[action.payload];
    },

    // Utility actions
    resetUIState: (state) => {
      state.notifications = [];
      state.modals = {};
      state.loadingStates = {};
      state.errorStates = {};
      state.searchQuery = '';
      state.filters = {};
      state.sortOptions = {};
    },

    // Success notification helper
    showSuccessNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'success',
        title: action.payload.title,
        message: action.payload.message,
        timestamp: new Date(),
        read: false,
      };
      state.notifications.unshift(notification);
    },

    // Error notification helper
    showErrorNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'error',
        title: action.payload.title,
        message: action.payload.message,
        timestamp: new Date(),
        read: false,
      };
      state.notifications.unshift(notification);
    },

    // Warning notification helper
    showWarningNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'warning',
        title: action.payload.title,
        message: action.payload.message,
        timestamp: new Date(),
        read: false,
      };
      state.notifications.unshift(notification);
    },

    // Info notification helper
    showInfoNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString(),
        type: 'info',
        title: action.payload.title,
        message: action.payload.message,
        timestamp: new Date(),
        read: false,
      };
      state.notifications.unshift(notification);
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  toggleTheme,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  openModal,
  closeModal,
  closeAllModals,
  setLoadingState,
  clearLoadingState,
  setErrorState,
  clearErrorState,
  setSelectedTab,
  setSearchQuery,
  clearSearchQuery,
  setFilter,
  clearFilter,
  clearAllFilters,
  setSortOption,
  clearSortOption,
  resetUIState,
  showSuccessNotification,
  showErrorNotification,
  showWarningNotification,
  showInfoNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
