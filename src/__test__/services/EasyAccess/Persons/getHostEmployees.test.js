import {getHostEmployees} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getHostEmployees: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getHostEmployees: jest.fn(() => mockResolvePromise) };
    });
      
    it('getHostEmployees API 200 response', async () => {
          const response = await getHostEmployees();
          expect(response.status).toBe(200);
    });

    it('getHostEmployees API 401 response', async () => {
      try {
        await getHostEmployees();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

