import {editBadge} from '../../../../services/AccessControl/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Badges', () => {
      return { editBadge: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Badges', () => {
        return { editBadge: jest.fn(() => mockResolvePromise) };
    });
      
    it('editBadge API 200 response', async () => {
          const response = await editBadge();
          expect(response.status).toBe(200);
    });

    it('editBadge API 401 response', async () => {
      try {
        await editBadge();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

