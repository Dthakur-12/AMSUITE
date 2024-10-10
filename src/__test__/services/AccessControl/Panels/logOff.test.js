import {logOff} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { logOff: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { logOff: jest.fn(() => mockResolvePromise) };
    });
      
    it('logOff API 200 response', async () => {
          const response = await logOff();
          expect(response.status).toBe(200);
    });

    it('logOff API 401 response', async () => {
      try {
        await logOff();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 
