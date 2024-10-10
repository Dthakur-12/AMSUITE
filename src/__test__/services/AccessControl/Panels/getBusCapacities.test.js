import {getBusCapacities} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { getBusCapacities: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { getBusCapacities: jest.fn(() => mockResolvePromise) };
});
  
it('getBusCapacities API 200 response', async () => {
      const response = await getBusCapacities();
      expect(response.status).toBe(200);
});

it('getBusCapacities API 401 response', async () => {
  try {
    await getBusCapacities();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

