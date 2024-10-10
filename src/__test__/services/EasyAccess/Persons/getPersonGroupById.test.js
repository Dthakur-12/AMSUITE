import {getPersonGroupById} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getPersonGroupById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getPersonGroupById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getPersonGroupById API 200 response', async () => {
          const response = await getPersonGroupById();
          expect(response.status).toBe(200);
    });

    it('getPersonGroupById API 401 response', async () => {
      try {
        await getPersonGroupById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

