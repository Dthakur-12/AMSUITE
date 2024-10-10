import {deleteStatus} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { deleteStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { deleteStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteStatus API 200 response', async () => {
          const response = await deleteStatus();
          expect(response.status).toBe(200);
    });

    it('deleteStatus API 401 response', async () => {
      try {
        await deleteStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

