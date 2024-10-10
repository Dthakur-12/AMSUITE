import {getTypes} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { getTypes: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { getTypes: jest.fn(() => mockResolvePromise) };
    });
      
    it('getTypes API 200 response', async () => {
          const response = await getTypes();
          expect(response.status).toBe(200);
    });

    it('getTypes API 401 response', async () => {
      try {
        await getTypes();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

