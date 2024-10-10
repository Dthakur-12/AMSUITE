import {getVisitsEnterprises} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { getVisitsEnterprises: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { getVisitsEnterprises: jest.fn(() => mockResolvePromise) };
    });
      
    it('getVisitsEnterprises API 200 response', async () => {
          const response = await getVisitsEnterprises();
          expect(response.status).toBe(200);
    });

    it('getVisitsEnterprises API 401 response', async () => {
      try {
        await getVisitsEnterprises();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

