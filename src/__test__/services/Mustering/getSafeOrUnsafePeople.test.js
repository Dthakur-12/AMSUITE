import {getSafeOrUnsafePeople} from '../../../services/Mustering/Activity';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Activity', () => {
      return { getSafeOrUnsafePeople: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Activity', () => {
        return { getSafeOrUnsafePeople: jest.fn(() => mockResolvePromise) };
    });
      
    it('getSafeOrUnsafePeople API 200 response', async () => {
          const response = await getSafeOrUnsafePeople();
          expect(response.status).toBe(200);
    });

    it('getSafeOrUnsafePeople API 401 response', async () => {
      try {
        await getSafeOrUnsafePeople();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

