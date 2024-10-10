import {createVirtualZone} from '../../../../services/AccessControl/VirtualZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
      return { createVirtualZone: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
        return { createVirtualZone: jest.fn(() => mockResolvePromise) };
    });
      
    it('createVirtualZone API 200 response', async () => {
          const response = await createVirtualZone();
          expect(response.status).toBe(200);
    });

    it('createVirtualZone API 401 response', async () => {
      try {
        await createVirtualZone();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

