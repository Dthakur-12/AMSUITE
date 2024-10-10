import {getPersonsByGroupReport} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getPersonsByGroupReport: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getPersonsByGroupReport: jest.fn(() => mockResolvePromise) };
    });
      
    it('getPersonsByGroupReport API 200 response', async () => {
          const response = await getPersonsByGroupReport();
          expect(response.status).toBe(200);
    });

    it('getPersonsByGroupReport API 401 response', async () => {
      try {
        await getPersonsByGroupReport();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

