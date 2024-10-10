import {createEvent} from '../../../../services/EasyAccess/Calendar';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
      return { createEvent: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
        return { createEvent: jest.fn(() => mockResolvePromise) };
    });
      
    it('createEvent API 200 response', async () => {
          const response = await createEvent();
          expect(response.status).toBe(200);
    });

    it('createEvent API 401 response', async () => {
      try {
        await createEvent();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

