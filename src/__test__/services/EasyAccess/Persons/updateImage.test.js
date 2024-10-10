import {updateImage} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { updateImage: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { updateImage: jest.fn(() => mockResolvePromise) };
    });
      
    it('updateImage API 200 response', async () => {
          const response = await updateImage();
          expect(response.status).toBe(200);
    });

    it('updateImage API 401 response', async () => {
      try {
        await updateImage();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

