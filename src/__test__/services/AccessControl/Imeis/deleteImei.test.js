import {deleteImei} from '../../../../services/AccessControl/Imeis';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Imeis', () => {
      return { deleteImei: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Imeis', () => {
        return { deleteImei: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteImei API 200 response', async () => {
          const response = await deleteImei();
          expect(response.status).toBe(200);
    });

    it('deleteImei API 401 response', async () => {
      try {
        await deleteImei();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

