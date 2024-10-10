import {getMessagesCount} from '../../../../services/AccessControl/Messages';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Messages', () => {
  return { getMessagesCount: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Messages', () => {
    return { getMessagesCount: jest.fn(() => mockResolvePromise) };
});
  
it('getMessagesCount API 200 response', async () => {
      const response = await getMessagesCount();
      expect(response.status).toBe(200);
});

it('getMessagesCount API 401 response', async () => {
  try {
    await getMessagesCount();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

