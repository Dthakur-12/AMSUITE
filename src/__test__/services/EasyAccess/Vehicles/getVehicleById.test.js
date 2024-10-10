import {getVehicleById} from '../../../../services/EasyAccess/Vehicles';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
      return { getVehicleById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
        return { getVehicleById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getVehicleById API 200 response', async () => {
          const response = await getVehicleById();
          expect(response.status).toBe(200);
    });

    it('getVehicleById API 401 response', async () => {
      try {
        await getVehicleById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

