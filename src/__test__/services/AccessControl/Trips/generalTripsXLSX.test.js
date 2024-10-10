import {generalTripsXLSX} from '../../../../services/AccessControl/Trips';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Trips', () => {
      return { generalTripsXLSX: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Trips', () => {
        return { generalTripsXLSX: jest.fn(() => mockResolvePromise) };
    });
      
    it('generalTripsXLSX API 200 response', async () => {
          const response = await generalTripsXLSX();
          expect(response.status).toBe(200);
    });

    it('generalTripsXLSX API 401 response', async () => {
      try {
        await generalTripsXLSX();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

