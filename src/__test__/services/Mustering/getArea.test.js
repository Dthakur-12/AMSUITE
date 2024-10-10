import {getArea} from '../../../services/Mustering/Area';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Area', () => {
      return { getArea: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Area', () => {
        return { getArea: jest.fn(() => mockResolvePromise) };
    });
      
    it('getArea API 200 response', async () => {
          const response = await getArea();
          expect(response.status).toBe(200);
    });

    it('getArea API 401 response', async () => {
      try {
        await getArea();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

