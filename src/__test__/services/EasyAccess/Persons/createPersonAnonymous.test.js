
import {createPersonAnonymous} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { createPersonAnonymous: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { createPersonAnonymous: jest.fn(() => mockResolvePromise) };
    });
      
    it('createPersonAnonymous API 200 response', async () => {
          const response = await createPersonAnonymous();
          expect(response.status).toBe(200);
    });

    it('createPersonAnonymous API 401 response', async () => {
      try {
        await createPersonAnonymous();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

