import { mockObjectsData } from '../fixtures/objects';

export const objectsHandlers = [
  {
    path: '/api/objects',
    method: 'GET',
    response: () => mockObjectsData,
  },
];
