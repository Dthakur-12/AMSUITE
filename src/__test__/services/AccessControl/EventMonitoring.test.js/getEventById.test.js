import {getEventById} from '../../../../services/AccessControl/EventMonitoring';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
  return { getEventById: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
    return { getEventById: jest.fn(() => mockResolvePromise) };
});
  
it('getEventById API 200 response', async () => {
      const response = await getEventById();
      expect(response.status).toBe(200);
});

it('getEventById API 401 response', async () => {
  try {
    await getEventById();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

