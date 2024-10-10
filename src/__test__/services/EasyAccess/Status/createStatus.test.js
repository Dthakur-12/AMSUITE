import {createStatus} from '../../../../services/EasyAccess/Status';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Status', () => {
      return { createStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Status', () => {
        return { createStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('createStatus API 200 response', async () => {
          const response = await createStatus();
          expect(response.status).toBe(200);
    });

    it('createStatus API 401 response', async () => {
      try {
        await createStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

