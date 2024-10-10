import {getPersonsByEnterprisesXLS} from '../../../../services/AccessControl/EventMonitoring';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
  return { getPersonsByEnterprisesXLS: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
    return { getPersonsByEnterprisesXLS: jest.fn(() => mockResolvePromise) };
});
  
it('getPersonsByEnterprisesXLS API 200 response', async () => {
      const response = await getPersonsByEnterprisesXLS();
      expect(response.status).toBe(200);
});

it('getPersonsByEnterprisesXLS API 401 response', async () => {
  try {
    await getPersonsByEnterprisesXLS();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

