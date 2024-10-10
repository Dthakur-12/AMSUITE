import {getTrips} from '../../../../services/AccessControl/Trips';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Trips', () => {
      return { getTrips: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Trips', () => {
        return { getTrips: jest.fn(() => mockResolvePromise) };
    });
      
    it('getTrips API 200 response', async () => {
          const response = await getTrips();
          expect(response.status).toBe(200);
    });

    it('getTrips API 401 response', async () => {
      try {
        await getTrips();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

