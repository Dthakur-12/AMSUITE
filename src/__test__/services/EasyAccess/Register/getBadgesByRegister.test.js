import {getBadgesByRegister} from '../../../../services/EasyAccess/Register';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Register', () => {
      return { getBadgesByRegister: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Register', () => {
        return { getBadgesByRegister: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBadgesByRegister API 200 response', async () => {
          const response = await getBadgesByRegister();
          expect(response.status).toBe(200);
    });

    it('getBadgesByRegister API 401 response', async () => {
      try {
        await getBadgesByRegister();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

