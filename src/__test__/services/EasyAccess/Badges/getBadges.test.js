import {getBadges} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { getBadges: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { getBadges: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBadges API 200 response', async () => {
          const response = await getBadges();
          expect(response.status).toBe(200);
    });

    it('getBadges API 401 response', async () => {
      try {
        await getBadges();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

