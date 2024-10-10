import {getExitReader} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { getExitReader: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { getExitReader: jest.fn(() => mockResolvePromise) };
    });
      
    it('getExitReader API 200 response', async () => {
          const response = await getExitReader();
          expect(response.status).toBe(200);
    });

    it('getExitReader API 401 response', async () => {
      try {
        await getExitReader();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

