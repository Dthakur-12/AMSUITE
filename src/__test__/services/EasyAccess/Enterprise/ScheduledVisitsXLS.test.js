import {ScheduledVisitsXLS} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { ScheduledVisitsXLS: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { ScheduledVisitsXLS: jest.fn(() => mockResolvePromise) };
    });
      
    it('ScheduledVisitsXLS API 200 response', async () => {
          const response = await ScheduledVisitsXLS();
          expect(response.status).toBe(200);
    });

    it('ScheduledVisitsXLS API 401 response', async () => {
      try {
        await ScheduledVisitsXLS();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

