import {getAll} from '../../../../services/EasyAccess/TermsAndConditions';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/TermsAndConditions', () => {
      return { getAll: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/TermsAndConditions', () => {
        return { getAll: jest.fn(() => mockResolvePromise) };
    });
      
    it('getAll API 200 response', async () => {
          const response = await getAll();
          expect(response.status).toBe(200);
    });

    it('getAll API 401 response', async () => {
      try {
        await getAll();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

