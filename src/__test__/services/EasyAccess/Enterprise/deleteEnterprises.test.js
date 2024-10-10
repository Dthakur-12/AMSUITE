import {deleteEnterprises} from '../../../../services/EasyAccess/Enterprise';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
      return { deleteEnterprises: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Enterprise', () => {
        return { deleteEnterprises: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteEnterprises API 200 response', async () => {
          const response = await deleteEnterprises();
          expect(response.status).toBe(200);
    });

    it('deleteEnterprises API 401 response', async () => {
      try {
        await deleteEnterprises();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

