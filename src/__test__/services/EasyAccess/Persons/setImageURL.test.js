import {setImageURL} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { setImageURL: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { setImageURL: jest.fn(() => mockResolvePromise) };
    });
      
    it('setImageURL API 200 response', async () => {
          const response = await setImageURL();
          expect(response.status).toBe(200);
    });

    it('setImageURL API 401 response', async () => {
      try {
        await setImageURL();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

