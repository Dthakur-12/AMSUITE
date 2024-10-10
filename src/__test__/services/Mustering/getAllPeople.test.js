import {getAllPeople} from '../../../services/Mustering/Activity';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Activity', () => {
      return { getAllPeople: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Activity', () => {
        return { getAllPeople: jest.fn(() => mockResolvePromise) };
    });
      
    it('getAllPeople API 200 response', async () => {
          const response = await getAllPeople();
          expect(response.status).toBe(200);
    });

    it('getAllPeople API 401 response', async () => {
      try {
        await getAllPeople();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

