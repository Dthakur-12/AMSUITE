import {getStatusByID} from '../../../../services/EasyAccess/Status';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Status', () => {
      return { getStatusByID: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Status', () => {
        return { getStatusByID: jest.fn(() => mockResolvePromise) };
    });
      
    it('getStatusByID API 200 response', async () => {
          const response = await getStatusByID();
          expect(response.status).toBe(200);
    });

    it('getStatusByID API 401 response', async () => {
      try {
        await getStatusByID();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

