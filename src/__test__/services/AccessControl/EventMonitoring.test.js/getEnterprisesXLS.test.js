import {getEnterprisesXLS} from '../../../../services/AccessControl/EventMonitoring';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
  return { getEnterprisesXLS: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
    return { getEnterprisesXLS: jest.fn(() => mockResolvePromise) };
});
  
it('getEnterprisesXLS API 200 response', async () => {
      const response = await getEnterprisesXLS();
      expect(response.status).toBe(200);
});

it('getEnterprisesXLS API 401 response', async () => {
  try {
    await getEnterprisesXLS();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

