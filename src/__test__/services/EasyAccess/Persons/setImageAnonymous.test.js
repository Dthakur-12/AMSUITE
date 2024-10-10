import {setImageAnonymous} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { setImageAnonymous: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { setImageAnonymous: jest.fn(() => mockResolvePromise) };
    });
      
    it('setImageAnonymous API 200 response', async () => {
          const response = await setImageAnonymous();
          expect(response.status).toBe(200);
    });

    it('setImageAnonymous API 401 response', async () => {
      try {
        await setImageAnonymous();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

