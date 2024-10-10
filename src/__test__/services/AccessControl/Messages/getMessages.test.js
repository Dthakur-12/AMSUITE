import {getMessages} from '../../../../services/AccessControl/Messages';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Messages', () => {
  return { getMessages: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Messages', () => {
    return { getMessages: jest.fn(() => mockResolvePromise) };
});
  
it('getMessages API 200 response', async () => {
      const response = await getMessages();
      expect(response.status).toBe(200);
});

it('getMessages API 401 response', async () => {
  try {
    await getMessages();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

