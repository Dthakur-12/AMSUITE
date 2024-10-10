import {getAllBadgeStatus} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { getAllBadgeStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { getAllBadgeStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('getAllBadgeStatus API 200 response', async () => {
          const response = await getAllBadgeStatus();
          expect(response.status).toBe(200);
    });

    it('getAllBadgeStatus API 401 response', async () => {
      try {
        await getAllBadgeStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

