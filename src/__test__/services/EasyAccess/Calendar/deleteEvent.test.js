import {deleteEvent} from '../../../../services/EasyAccess/Calendar';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
      return { deleteEvent: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
        return { deleteEvent: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteEvent API 200 response', async () => {
          const response = await deleteEvent();
          expect(response.status).toBe(200);
    });

    it('deleteEvent API 401 response', async () => {
      try {
        await deleteEvent();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

