import {deleteVehicles} from '../../../../services/EasyAccess/Vehicles';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
      return { deleteVehicles: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
        return { deleteVehicles: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteVehicles API 200 response', async () => {
          const response = await deleteVehicles();
          expect(response.status).toBe(200);
    });

    it('deleteVehicles API 401 response', async () => {
      try {
        await deleteVehicles();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

