import {getBusTickets} from '../../../../services/AccessControl/Trips';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Trips', () => {
      return { getBusTickets: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Trips', () => {
        return { getBusTickets: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBusTickets API 200 response', async () => {
          const response = await getBusTickets();
          expect(response.status).toBe(200);
    });

    it('getBusTickets API 401 response', async () => {
      try {
        await getBusTickets();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

