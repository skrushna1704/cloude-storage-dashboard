import { analyticsHandlers } from './handlers/analyticsHandlers';
import { bucketsHandlers } from './handlers/bucketsHandlers';
import { objectsHandlers } from './handlers/objectsHandlers';

export const mockApi = {
  analytics: analyticsHandlers,
  buckets: bucketsHandlers,
  objects: objectsHandlers,
};
