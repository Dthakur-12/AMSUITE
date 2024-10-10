import {assignAccessLevels} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { assignAccessLevels: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { assignAccessLevels: jest.fn(() => mockResolvePromise) };
    });
      
    it('assignAccessLevels API 200 response', async () => {
          const response = await assignAccessLevels();
          expect(response.status).toBe(200);
    });

    it('assignAccessLevels API 401 response', async () => {
      try {
        await assignAccessLevels();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

