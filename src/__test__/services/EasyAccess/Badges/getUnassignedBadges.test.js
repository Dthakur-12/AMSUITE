import {getUnassignedBadges} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { getUnassignedBadges: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { getUnassignedBadges: jest.fn(() => mockResolvePromise) };
    });
      
    it('getUnassignedBadges API 200 response', async () => {
          const response = await getUnassignedBadges();
          expect(response.status).toBe(200);
    });

    it('getUnassignedBadges API 401 response', async () => {
      try {
        await getUnassignedBadges();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

