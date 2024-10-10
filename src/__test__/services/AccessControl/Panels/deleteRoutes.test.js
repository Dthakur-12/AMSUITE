import {deleteRoutes} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { deleteRoutes: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { deleteRoutes: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteRoutes API 200 response', async () => {
          const response = await deleteRoutes();
          expect(response.status).toBe(200);
    });

    it('deleteRoutes API 401 response', async () => {
      try {
        await deleteRoutes();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

