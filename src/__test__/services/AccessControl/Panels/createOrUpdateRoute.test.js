import {createOrUpdateRoute} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { createOrUpdateRoute: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { createOrUpdateRoute: jest.fn(() => mockResolvePromise) };
    });
      
    it('createOrUpdateRoute API 200 response', async () => {
          const response = await createOrUpdateRoute();
          expect(response.status).toBe(200);
    });

    it('createOrUpdateRoute API 401 response', async () => {
      try {
        await createOrUpdateRoute();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

