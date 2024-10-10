import {getPanelById} from '../../../../services/AccessControl/Panels';

  
const mockUnauthorizedPromise = Promise.reject({ status: 401 });
const mockResolvePromise = Promise.resolve({ status: 200});

jest.mock('../../../../services/AccessControl/Panels', () => {
  return { getPanelById: jest.fn(() => mockUnauthorizedPromise) };
});

jest.mock('../../../../services/AccessControl/Panels', () => {
    return { getPanelById: jest.fn(() => mockResolvePromise) };
});
  
it('getPanelById API 200 response', async () => {
      const response = await getPanelById();
      expect(response.status).toBe(200);
});

it('getPanelById API 401 response', async () => {
  try {
    await getPanelById();
  } catch (error) {
    expect(error.status).toBe(401);
  }
}) 

