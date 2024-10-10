import {getImeis} from '../../../../services/AccessControl/Imeis';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Imeis', () => {
  return { getImeis: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Imeis', () => {
    return { getImeis: jest.fn(() => mockResolvePromise) };
});
  
it('getImeis API 200 response', async () => {
      const response = await getImeis();
      expect(response.status).toBe(200);
});

it('getImeis API 401 response', async () => {
  try {
    await getImeis();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

