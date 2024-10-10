import {getPersonGroups} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getPersonGroups: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getPersonGroups: jest.fn(() => mockResolvePromise) };
    });
      
    it('getPersonGroups API 200 response', async () => {
          const response = await getPersonGroups();
          expect(response.status).toBe(200);
    });

    it('getPersonGroups API 401 response', async () => {
      try {
        await getPersonGroups();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

