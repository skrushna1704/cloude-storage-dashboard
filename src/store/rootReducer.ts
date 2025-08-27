import { combineReducers } from '@reduxjs/toolkit';
import bucketsReducer from './slices/bucketsSlice';
import objectsReducer from './slices/objectsSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  buckets: bucketsReducer,
  objects: objectsReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
