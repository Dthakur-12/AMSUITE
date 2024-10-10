import {insert} from '../../../../services/EasyAccess/TermsAndConditions';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/TermsAndConditions', () => {
      return { insert: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/TermsAndConditions', () => {
        return { insert: jest.fn(() => mockResolvePromise) };
    });
      
    it('insert API 200 response', async () => {
          const response = await insert();
          expect(response.status).toBe(200);
    });

    it('insert API 401 response', async () => {
      try {
        await insert();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

