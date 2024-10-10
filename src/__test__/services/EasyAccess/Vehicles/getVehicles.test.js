import {getVehicles} from '../../../../services/EasyAccess/Vehicles';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
      return { getVehicles: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
        return { getVehicles: jest.fn(() => mockResolvePromise) };
    });
      
    it('getVehicles API 200 response', async () => {
          const response = await getVehicles();
          expect(response.status).toBe(200);
    });

    it('getVehicles API 401 response', async () => {
      try {
        await getVehicles();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

