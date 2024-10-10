import {checkDocumentNumbers} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { checkDocumentNumbers: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { checkDocumentNumbers: jest.fn(() => mockResolvePromise) };
    });
      
    it('checkDocumentNumbers API 200 response', async () => {
          const response = await checkDocumentNumbers();
          expect(response.status).toBe(200);
    });

    it('checkDocumentNumbers API 401 response', async () => {
      try {
        await checkDocumentNumbers();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

