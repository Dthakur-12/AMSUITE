import {getEvents} from '../../../../services/EasyAccess/Calendar';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
      return { getEvents: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
        return { getEvents: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEvents API 200 response', async () => {
          const response = await getEvents();
          expect(response.status).toBe(200);
    });

    it('getEvents API 401 response', async () => {
      try {
        await getEvents();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

