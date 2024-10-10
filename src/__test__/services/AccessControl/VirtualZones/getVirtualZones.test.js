import {getVirtualZones} from '../../../../services/AccessControl/VirtualZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
      return { getVirtualZones: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
        return { getVirtualZones: jest.fn(() => mockResolvePromise) };
    });
      
    it('getVirtualZones API 200 response', async () => {
          const response = await getVirtualZones();
          expect(response.status).toBe(200);
    });

    it('getVirtualZones API 401 response', async () => {
      try {
        await getVirtualZones();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

