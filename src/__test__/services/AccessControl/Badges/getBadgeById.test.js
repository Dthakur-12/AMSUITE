import {getBadgeById} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { getBadgeById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { getBadgeById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBadgeById API 200 response', async () => {
          const response = await getBadgeById();
          expect(response.status).toBe(200);
    });

    it('getBadgeById API 401 response', async () => {
      try {
        await getBadgeById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

