import {createBusCapacity} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { createBusCapacity: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { createBusCapacity: jest.fn(() => mockResolvePromise) };
    });
      
    it('createBusCapacity API 200 response', async () => {
          const response = await createBusCapacity();
          expect(response.status).toBe(200);
    });

    it('createBusCapacity API 401 response', async () => {
      try {
        await createBusCapacity();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

