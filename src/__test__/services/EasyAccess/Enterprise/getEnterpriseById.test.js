import {getEnterpriseById} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { getEnterpriseById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { getEnterpriseById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEnterpriseById API 200 response', async () => {
          const response = await getEnterpriseById();
          expect(response.status).toBe(200);
    });

    it('getEnterpriseById API 401 response', async () => {
      try {
        await getEnterpriseById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

