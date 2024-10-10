import {getPersonImage} from '../../../../services/AccessControl/EventMonitoring';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
  return { getPersonImage: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
    return { getPersonImage: jest.fn(() => mockResolvePromise) };
});
  
it('getPersonImage API 200 response', async () => {
      const response = await getPersonImage();
      expect(response.status).toBe(200);
});

it('getPersonImage API 401 response', async () => {
  try {
    await getPersonImage();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

