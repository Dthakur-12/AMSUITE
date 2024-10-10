import {getReaderModes} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { getReaderModes: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { getReaderModes: jest.fn(() => mockResolvePromise) };
});
  
it('getReaderModes API 200 response', async () => {
      const response = await getReaderModes();
      expect(response.status).toBe(200);
});

it('getReaderModes API 401 response', async () => {
  try {
    await getReaderModes();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

