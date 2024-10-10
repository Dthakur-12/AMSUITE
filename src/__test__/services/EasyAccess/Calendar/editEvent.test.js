import {editEvent} from '../../../../services/EasyAccess/Calendar';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
      return { editEvent: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
        return { editEvent: jest.fn(() => mockResolvePromise) };
    });
      
    it('editEvent API 200 response', async () => {
          const response = await editEvent();
          expect(response.status).toBe(200);
    });

    it('editEvent API 401 response', async () => {
      try {
        await editEvent();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

