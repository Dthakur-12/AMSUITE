import {getUserVisits} from '../../../../services/EasyAccess/Register';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Register', () => {
      return { getUserVisits: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Register', () => {
        return { getUserVisits: jest.fn(() => mockResolvePromise) };
    });
      
    it('getUserVisits API 200 response', async () => {
          const response = await getUserVisits();
          expect(response.status).toBe(200);
    });

    it('getUserVisits API 401 response', async () => {
      try {
        await getUserVisits();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

