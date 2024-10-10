import {getMobilePanels} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { getMobilePanels: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { getMobilePanels: jest.fn(() => mockResolvePromise) };
});
  
it('getMobilePanels API 200 response', async () => {
      const response = await getMobilePanels();
      expect(response.status).toBe(200);
});

it('getMobilePanels API 401 response', async () => {
  try {
    await getMobilePanels();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

