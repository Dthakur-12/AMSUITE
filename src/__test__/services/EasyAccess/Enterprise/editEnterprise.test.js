import {editEnterprise} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { editEnterprise: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { editEnterprise: jest.fn(() => mockResolvePromise) };
    });
      
    it('editEnterprise API 200 response', async () => {
          const response = await editEnterprise();
          expect(response.status).toBe(200);
    });

    it('editEnterprise API 401 response', async () => {
      try {
        await editEnterprise();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

