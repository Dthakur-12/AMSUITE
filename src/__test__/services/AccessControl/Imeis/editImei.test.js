import {editImei} from '../../../../services/AccessControl/Imeis';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Imeis', () => {
      return { editImei: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Imeis', () => {
        return { editImei: jest.fn(() => mockResolvePromise) };
    });
      
    it('editImei API 200 response', async () => {
          const response = await editImei();
          expect(response.status).toBe(200);
    });

    it('editImei API 401 response', async () => {
      try {
        await editImei();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 
