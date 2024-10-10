import {getEventsXLS} from '../../../../services/AccessControl/EventMonitoring';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
  return { getEventsXLS: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
    return { getEventsXLS: jest.fn(() => mockResolvePromise) };
});
  
it('getEventsXLS API 200 response', async () => {
      const response = await getEventsXLS();
      expect(response.status).toBe(200);
});

it('getEventsXLS API 401 response', async () => {
  try {
    await getEventsXLS();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

