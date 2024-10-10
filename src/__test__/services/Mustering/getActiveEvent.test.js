import {getActiveEvent} from '../../../services/Mustering/Activity';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Activity', () => {
      return { getActiveEvent: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Activity', () => {
        return { getActiveEvent: jest.fn(() => mockResolvePromise) };
    });
      
    it('getActiveEvent API 200 response', async () => {
          const response = await getActiveEvent();
          expect(response.status).toBe(200);
    });

    it('getActiveEvent API 401 response', async () => {
      try {
        await getActiveEvent();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

