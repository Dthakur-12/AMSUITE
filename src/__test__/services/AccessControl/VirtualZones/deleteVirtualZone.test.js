import {deleteVirtualZone} from '../../../../services/AccessControl/VirtualZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
      return { deleteVirtualZone: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
        return { deleteVirtualZone: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteVirtualZone API 200 response', async () => {
          const response = await deleteVirtualZone();
          expect(response.status).toBe(200);
    });

    it('deleteVirtualZone API 401 response', async () => {
      try {
        await deleteVirtualZone();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

