import {getEnterprisesAnonymous} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { getEnterprisesAnonymous: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { getEnterprisesAnonymous: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEnterprisesAnonymous API 200 response', async () => {
          const response = await getEnterprisesAnonymous();
          expect(response.status).toBe(200);
    });

    it('getEnterprisesAnonymous API 401 response', async () => {
      try {
        await getEnterprisesAnonymous();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

