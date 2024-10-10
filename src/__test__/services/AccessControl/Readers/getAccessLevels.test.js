import {getAccessLevels} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { getAccessLevels: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { getAccessLevels: jest.fn(() => mockResolvePromise) };
    });
      
    it('getAccessLevels API 200 response', async () => {
          const response = await getAccessLevels();
          expect(response.status).toBe(200);
    });

    it('getAccessLevels API 401 response', async () => {
      try {
        await getAccessLevels();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

