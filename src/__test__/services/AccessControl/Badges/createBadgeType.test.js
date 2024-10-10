import {createBadgeType} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { createBadgeType: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { createBadgeType: jest.fn(() => mockResolvePromise) };
    });
      
    it('createBadgeType API 200 response', async () => {
          const response = await createBadgeType();
          expect(response.status).toBe(200);
    });

    it('createBadgeType API 401 response', async () => {
      try {
        await createBadgeType();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

