import {createVehicle} from '../../../../services/EasyAccess/Vehicles';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
      return { createVehicle: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Vehicles', () => {
        return { createVehicle: jest.fn(() => mockResolvePromise) };
    });
      
    it('createVehicle API 200 response', async () => {
          const response = await createVehicle();
          expect(response.status).toBe(200);
    });

    it('createVehicle API 401 response', async () => {
      try {
        await createVehicle();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

