import {getRoutes} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { getRoutes: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { getRoutes: jest.fn(() => mockResolvePromise) };
});
  
it('getRoutes API 200 response', async () => {
      const response = await getRoutes();
      expect(response.status).toBe(200);
});

it('getRoutes API 401 response', async () => {
  try {
    await getRoutes();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

