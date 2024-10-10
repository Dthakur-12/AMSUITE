
import {createPerson} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { createPerson: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { createPerson: jest.fn(() => mockResolvePromise) };
    });
      
    it('createPerson API 200 response', async () => {
          const response = await createPerson();
          expect(response.status).toBe(200);
    });

    it('createPerson API 401 response', async () => {
      try {
        await createPerson();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

