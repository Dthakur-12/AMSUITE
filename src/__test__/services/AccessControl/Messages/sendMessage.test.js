import {sendMessage} from '../../../../services/AccessControl/Messages';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Messages', () => {
  return { sendMessage: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Messages', () => {
    return { sendMessage: jest.fn(() => mockResolvePromise) };
});
  
it('sendMessage API 200 response', async () => {
      const response = await sendMessage();
      expect(response.status).toBe(200);
});

it('sendMessage API 401 response', async () => {
  try {
    await sendMessage();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

