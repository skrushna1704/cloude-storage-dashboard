import { configureStore } from '@reduxjs/toolkit';
import bucketsReducer from './slices/bucketsSlice';
import objectsReducer from './slices/objectsSlice';
import uiReducer from './slices/uiSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    root: combineReducers({
      buckets: bucketsReducer,
      objects: objectsReducer,
      ui: uiReducer,
    }),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['buckets/setBuckets', 'objects/setObjects', 'objects/setCurrentPath'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.created', 'payload.lastModified'],
        // Ignore these paths in the state
        ignoredPaths: ['buckets.buckets', 'objects.objects', 'objects.currentPath'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
