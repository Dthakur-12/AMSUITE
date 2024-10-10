import {getRegistersAnonymous} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getRegistersAnonymous: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getRegistersAnonymous: jest.fn(() => mockResolvePromise) };
    });
      
    it('getRegistersAnonymous API 200 response', async () => {
          const response = await getRegistersAnonymous();
          expect(response.status).toBe(200);
    });

    it('getRegistersAnonymous API 401 response', async () => {
      try {
        await getRegistersAnonymous();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

