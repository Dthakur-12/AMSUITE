import {downloadTripsWithSeatsXLS} from '../../../../services/AccessControl/Trips';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Trips', () => {
      return { downloadTripsWithSeatsXLS: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Trips', () => {
        return { downloadTripsWithSeatsXLS: jest.fn(() => mockResolvePromise) };
    });
      
    it('downloadTripsWithSeatsXLS API 200 response', async () => {
          const response = await downloadTripsWithSeatsXLS();
          expect(response.status).toBe(200);
    });

    it('downloadTripsWithSeatsXLS API 401 response', async () => {
      try {
        await downloadTripsWithSeatsXLS();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

