import {getImage} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getImage: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getImage: jest.fn(() => mockResolvePromise) };
    });
      
    it('getImage API 200 response', async () => {
          const response = await getImage();
          expect(response.status).toBe(200);
    });

    it('getImage API 401 response', async () => {
      try {
        await getImage();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

