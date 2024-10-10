import {getAgendaEventById} from '../../../../services/EasyAccess/Calendar';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
      return { getAgendaEventById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Calendar', () => {
        return { getAgendaEventById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getAgendaEventById API 200 response', async () => {
          const response = await getAgendaEventById();
          expect(response.status).toBe(200);
    });

    it('getAgendaEventById API 401 response', async () => {
      try {
        await getAgendaEventById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

