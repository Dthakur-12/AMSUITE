import {getCountBadgesForAutoAssign} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { getCountBadgesForAutoAssign: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { getCountBadgesForAutoAssign: jest.fn(() => mockResolvePromise) };
    });
      
    it('getCountBadgesForAutoAssign API 200 response', async () => {
          const response = await getCountBadgesForAutoAssign();
          expect(response.status).toBe(200);
    });

    it('getCountBadgesForAutoAssign API 401 response', async () => {
      try {
        await getCountBadgesForAutoAssign();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

