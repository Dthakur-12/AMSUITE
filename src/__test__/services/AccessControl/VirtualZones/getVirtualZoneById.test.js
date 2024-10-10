import {getVirtualZoneById} from '../../../../services/AccessControl/VirtualZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
      return { getVirtualZoneById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
        return { getVirtualZoneById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getVirtualZoneById API 200 response', async () => {
          const response = await getVirtualZoneById();
          expect(response.status).toBe(200);
    });

    it('getVirtualZoneById API 401 response', async () => {
      try {
        await getVirtualZoneById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

