import {createImei} from '../../../../services/AccessControl/Imeis';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Imeis', () => {
      return { createImei: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Imeis', () => {
        return { createImei: jest.fn(() => mockResolvePromise) };
    });
      
    it('createImei API 200 response', async () => {
          const response = await createImei();
          expect(response.status).toBe(200);
    });

    it('createImei API 401 response', async () => {
      try {
        await createImei();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

