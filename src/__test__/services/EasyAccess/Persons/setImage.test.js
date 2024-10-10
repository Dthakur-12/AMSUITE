
import {setImage} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { setImage: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { setImage: jest.fn(() => mockResolvePromise) };
    });
      
    it('setImage API 200 response', async () => {
          const response = await setImage();
          expect(response.status).toBe(200);
    });

    it('setImage API 401 response', async () => {
      try {
        await setImage();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

