import {deleteBusCapacity} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { deleteBusCapacity: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { deleteBusCapacity: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteBusCapacity API 200 response', async () => {
          const response = await deleteBusCapacity();
          expect(response.status).toBe(200);
    });

    it('deleteBusCapacity API 401 response', async () => {
      try {
        await deleteBusCapacity();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

