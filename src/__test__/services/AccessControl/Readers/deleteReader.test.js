import {deleteReader} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { deleteReader: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { deleteReader: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteReader API 200 response', async () => {
          const response = await deleteReader();
          expect(response.status).toBe(200);
    });

    it('deleteReader API 401 response', async () => {
      try {
        await deleteReader();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

