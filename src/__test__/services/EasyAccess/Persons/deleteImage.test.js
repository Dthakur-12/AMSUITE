import {deleteImage} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { deleteImage: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { deleteImage: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteImage API 200 response', async () => {
          const response = await deleteImage();
          expect(response.status).toBe(200);
    });

    it('deleteImage API 401 response', async () => {
      try {
        await deleteImage();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

