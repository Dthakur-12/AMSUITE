import {getWorkingModes} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { getWorkingModes: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { getWorkingModes: jest.fn(() => mockResolvePromise) };
});
  
it('getWorkingModes API 200 response', async () => {
      const response = await getWorkingModes();
      expect(response.status).toBe(200);
});

it('getWorkingModes API 401 response', async () => {
  try {
    await getWorkingModes();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

