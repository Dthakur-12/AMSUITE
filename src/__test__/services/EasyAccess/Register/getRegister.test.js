import {getRegister} from '../../../../services/EasyAccess/Register';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Register', () => {
      return { getRegister: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Register', () => {
        return { getRegister: jest.fn(() => mockResolvePromise) };
    });
      
    it('getRegister API 200 response', async () => {
          const response = await getRegister();
          expect(response.status).toBe(200);
    });

    it('getRegister API 401 response', async () => {
      try {
        await getRegister();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

