import {suncorTripsXLSX} from '../../../../services/AccessControl/Trips';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Trips', () => {
      return { suncorTripsXLSX: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Trips', () => {
        return { suncorTripsXLSX: jest.fn(() => mockResolvePromise) };
    });
      
    it('suncorTripsXLSX API 200 response', async () => {
          const response = await suncorTripsXLSX();
          expect(response.status).toBe(200);
    });

    it('suncorTripsXLSX API 401 response', async () => {
      try {
        await suncorTripsXLSX();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

