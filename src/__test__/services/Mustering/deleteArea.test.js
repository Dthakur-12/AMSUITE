import {deleteArea} from '../../../services/Mustering/Area';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Area', () => {
      return { deleteArea: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Area', () => {
        return { deleteArea: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteArea API 200 response', async () => {
          const response = await deleteArea();
          expect(response.status).toBe(200);
    });

    it('deleteArea API 401 response', async () => {
      try {
        await deleteArea();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

