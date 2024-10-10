import {getBadgeTypes} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { getBadgeTypes: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { getBadgeTypes: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBadgeTypes API 200 response', async () => {
          const response = await getBadgeTypes();
          expect(response.status).toBe(200);
    });

    it('getBadgeTypes API 401 response', async () => {
      try {
        await getBadgeTypes();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

