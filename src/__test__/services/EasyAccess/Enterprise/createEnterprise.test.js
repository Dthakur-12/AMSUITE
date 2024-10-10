import {createEnterprise} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { createEnterprise: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { createEnterprise: jest.fn(() => mockResolvePromise) };
    });
      
    it('createEnterprise API 200 response', async () => {
          const response = await createEnterprise();
          expect(response.status).toBe(200);
    });

    it('createEnterprise API 401 response', async () => {
      try {
        await createEnterprise();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

