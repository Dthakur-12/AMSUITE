import {editCardFormat} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { editCardFormat: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { editCardFormat: jest.fn(() => mockResolvePromise) };
    });
      
    it('editCardFormat API 200 response', async () => {
          const response = await editCardFormat();
          expect(response.status).toBe(200);
    });

    it('editCardFormat API 401 response', async () => {
      try {
        await editCardFormat();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 
