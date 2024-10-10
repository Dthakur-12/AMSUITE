import {historicalTracking} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { historicalTracking: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { historicalTracking: jest.fn(() => mockResolvePromise) };
});
  
it('historicalTracking API 200 response', async () => {
      const response = await historicalTracking();
      expect(response.status).toBe(200);
});

it('historicalTracking API 401 response', async () => {
  try {
    await historicalTracking();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

