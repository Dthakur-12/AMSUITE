import {downloadTripsXLS} from '../../../../services/AccessControl/Trips';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Trips', () => {
      return { downloadTripsXLS: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Trips', () => {
        return { downloadTripsXLS: jest.fn(() => mockResolvePromise) };
    });
      
    it('downloadTripsXLS API 200 response', async () => {
          const response = await downloadTripsXLS();
          expect(response.status).toBe(200);
    });

    it('downloadTripsXLS API 401 response', async () => {
      try {
        await downloadTripsXLS();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

