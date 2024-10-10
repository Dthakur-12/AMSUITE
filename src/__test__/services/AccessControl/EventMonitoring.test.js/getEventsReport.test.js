import {getEventsReport} from '../../../../services/AccessControl/EventMonitoring';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
      return { getEventsReport: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
        return { getEventsReport: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEventsReport API 200 response', async () => {
          const response = await getEventsReport();
          expect(response.status).toBe(200);
    });

    it('getEventsReport API 401 response', async () => {
      try {
        await getEventsReport();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

