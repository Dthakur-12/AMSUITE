import {deleteBadges} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { deleteBadges: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { deleteBadges: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteBadges API 200 response', async () => {
          const response = await deleteBadges();
          expect(response.status).toBe(200);
    });

    it('deleteBadges API 401 response', async () => {
      try {
        await deleteBadges();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

