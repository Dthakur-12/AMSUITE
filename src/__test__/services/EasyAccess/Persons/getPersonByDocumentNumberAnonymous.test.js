import {getPersonByDocumentNumberAnonymous} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getPersonByDocumentNumberAnonymous: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getPersonByDocumentNumberAnonymous: jest.fn(() => mockResolvePromise) };
    });
      
    it('getPersonByDocumentNumberAnonymous API 200 response', async () => {
          const response = await getPersonByDocumentNumberAnonymous();
          expect(response.status).toBe(200);
    });

    it('getPersonByDocumentNumberAnonymous API 401 response', async () => {
      try {
        await getPersonByDocumentNumberAnonymous();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

