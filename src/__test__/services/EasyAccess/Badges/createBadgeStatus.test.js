import {createBadgeStatus} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { createBadgeStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { createBadgeStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('createBadgeStatus API 200 response', async () => {
          const response = await createBadgeStatus();
          expect(response.status).toBe(200);
    });

    it('createBadgeStatus API 401 response', async () => {
      try {
        await createBadgeStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

