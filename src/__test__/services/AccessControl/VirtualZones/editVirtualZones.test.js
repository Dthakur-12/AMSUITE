import {editVirtualZone} from '../../../../services/AccessControl/VirtualZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
      return { editVirtualZone: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/VirtualZones', () => {
        return { editVirtualZone: jest.fn(() => mockResolvePromise) };
    });
      
    it('editVirtualZone API 200 response', async () => {
          const response = await editVirtualZone();
          expect(response.status).toBe(200);
    });

    it('editVirtualZone API 401 response', async () => {
      try {
        await editVirtualZone();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

