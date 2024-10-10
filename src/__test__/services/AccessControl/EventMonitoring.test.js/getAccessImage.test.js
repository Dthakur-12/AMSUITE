import {getAccessImage} from '../../../../services/AccessControl/EventMonitoring';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
  return { getAccessImage: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
    return { getAccessImage: jest.fn(() => mockResolvePromise) };
});
  
it('getAccessImage API 200 response', async () => {
      const response = await getAccessImage();
      expect(response.status).toBe(200);
});

it('getAccessImage API 401 response', async () => {
  try {
    await getAccessImage();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

