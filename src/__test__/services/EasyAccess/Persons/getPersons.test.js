import {getPersons} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getPersons: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getPersons: jest.fn(() => mockResolvePromise) };
    });
      
    it('getPersons API 200 response', async () => {
          const response = await getPersons();
          expect(response.status).toBe(200);
    });

    it('getPersons API 401 response', async () => {
      try {
        await getPersons();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

