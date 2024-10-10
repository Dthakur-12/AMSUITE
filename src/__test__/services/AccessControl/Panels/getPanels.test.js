import {getPanels} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { getPanels: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { getPanels: jest.fn(() => mockResolvePromise) };
});
  
it('getPanels API 200 response', async () => {
      const response = await getPanels();
      expect(response.status).toBe(200);
});

it('getPanels API 401 response', async () => {
  try {
    await getPanels();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

