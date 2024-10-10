import {editReader} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { editReader: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { editReader: jest.fn(() => mockResolvePromise) };
    });
      
    it('editReader API 200 response', async () => {
          const response = await editReader();
          expect(response.status).toBe(200);
    });

    it('editReader API 401 response', async () => {
      try {
        await editReader();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

