import {getEnterprises} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { getEnterprises: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { getEnterprises: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEnterprises API 200 response', async () => {
          const response = await getEnterprises();
          expect(response.status).toBe(200);
    });

    it('getEnterprises API 401 response', async () => {
      try {
        await getEnterprises();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

