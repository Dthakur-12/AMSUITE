import {getZones} from '../../../services/Mustering/Activity';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../services/Mustering/Activity', () => {
      return { getZones: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../services/Mustering/Activity', () => {
        return { getZones: jest.fn(() => mockResolvePromise) };
    });
      
    it('getZones API 200 response', async () => {
          const response = await getZones();
          expect(response.status).toBe(200);
    });

    it('getZones API 401 response', async () => {
      try {
        await getZones();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

