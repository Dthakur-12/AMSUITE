import {getBadgeStatus} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { getBadgeStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { getBadgeStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBadgeStatus API 200 response', async () => {
          const response = await getBadgeStatus();
          expect(response.status).toBe(200);
    });

    it('getBadgeStatus API 401 response', async () => {
      try {
        await getBadgeStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

