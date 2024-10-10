import {createBadge} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { createBadge: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { createBadge: jest.fn(() => mockResolvePromise) };
    });
      
    it('createBadge API 200 response', async () => {
          const response = await createBadge();
          expect(response.status).toBe(200);
    });

    it('createBadge API 401 response', async () => {
      try {
        await createBadge();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

