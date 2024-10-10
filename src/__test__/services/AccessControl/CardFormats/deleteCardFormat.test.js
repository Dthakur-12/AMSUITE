import {deleteCardFormat} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { deleteCardFormat: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { deleteCardFormat: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteAccessLevel API 200 response', async () => {
          const response = await deleteCardFormat();
          expect(response.status).toBe(200);
    });

    it('deleteAccessLevel API 401 response', async () => {
      try {
        await deleteCardFormat();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

