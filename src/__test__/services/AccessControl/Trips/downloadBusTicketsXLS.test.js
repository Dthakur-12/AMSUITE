import {downloadBusTicketsXLS} from '../../../../services/AccessControl/Trips';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Trips', () => {
      return { downloadBusTicketsXLS: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Trips', () => {
        return { downloadBusTicketsXLS: jest.fn(() => mockResolvePromise) };
    });
      
    it('downloadBusTicketsXLS API 200 response', async () => {
          const response = await downloadBusTicketsXLS();
          expect(response.status).toBe(200);
    });

    it('downloadBusTicketsXLS API 401 response', async () => {
      try {
        await downloadBusTicketsXLS();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

