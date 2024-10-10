import {createArea} from '../../../services/Mustering/Area';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Area', () => {
      return { createArea: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Area', () => {
        return { createArea: jest.fn(() => mockResolvePromise) };
    });
      
    it('createArea API 200 response', async () => {
          const response = await createArea();
          expect(response.status).toBe(200);
    });

    it('createArea API 401 response', async () => {
      try {
        await createArea();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

