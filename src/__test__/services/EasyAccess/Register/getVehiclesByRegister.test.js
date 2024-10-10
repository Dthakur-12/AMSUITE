import {getVehiclesByRegister} from '../../../../services/EasyAccess/Register';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Register', () => {
      return { getVehiclesByRegister: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Register', () => {
        return { getVehiclesByRegister: jest.fn(() => mockResolvePromise) };
    });
      
    it('getVehiclesByRegister API 200 response', async () => {
          const response = await getVehiclesByRegister();
          expect(response.status).toBe(200);
    });

    it('getVehiclesByRegister API 401 response', async () => {
      try {
        await getVehiclesByRegister();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

