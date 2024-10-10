import {getStatus} from '../../../../services/EasyAccess/Status';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Status', () => {
      return { getStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Status', () => {
        return { getStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('getStatus API 200 response', async () => {
          const response = await getStatus();
          expect(response.status).toBe(200);
    });

    it('getStatus API 401 response', async () => {
      try {
        await getStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

