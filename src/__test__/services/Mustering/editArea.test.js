import {editArea} from '../../../services/Mustering/Area';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Area', () => {
      return { editArea: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Area', () => {
        return { editArea: jest.fn(() => mockResolvePromise) };
    });
      
    it('editArea API 200 response', async () => {
          const response = await editArea();
          expect(response.status).toBe(200);
    });

    it('editArea API 401 response', async () => {
      try {
        await editArea();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

