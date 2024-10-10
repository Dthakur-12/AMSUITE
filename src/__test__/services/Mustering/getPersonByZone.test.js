import {getPersonByZone} from '../../../services/Mustering/Activity';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Activity', () => {
      return { getPersonByZone: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Activity', () => {
        return { getPersonByZone: jest.fn(() => mockResolvePromise) };
    });
      
    it('getPersonByZone API 200 response', async () => {
          const response = await getPersonByZone();
          expect(response.status).toBe(200);
    });

    it('getPersonByZone API 401 response', async () => {
      try {
        await getPersonByZone();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

