import {editBadgeStatus} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { editBadgeStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { editBadgeStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('editBadgeStatus API 200 response', async () => {
          const response = await editBadgeStatus();
          expect(response.status).toBe(200);
    });

    it('editBadgeStatus API 401 response', async () => {
      try {
        await editBadgeStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

