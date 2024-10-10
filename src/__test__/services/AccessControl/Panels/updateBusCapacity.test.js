import {updateBusCapacity} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { updateBusCapacity: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { updateBusCapacity: jest.fn(() => mockResolvePromise) };
    });
      
    it('updateBusCapacity API 200 response', async () => {
          const response = await updateBusCapacity();
          expect(response.status).toBe(200);
    });

    it('updateBusCapacity API 401 response', async () => {
      try {
        await updateBusCapacity();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 
