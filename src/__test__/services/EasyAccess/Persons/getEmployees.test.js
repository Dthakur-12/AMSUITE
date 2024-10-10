import {getEmployees} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getEmployees: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getEmployees: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEmployees API 200 response', async () => {
          const response = await getEmployees();
          expect(response.status).toBe(200);
    });

    it('getEmployees API 401 response', async () => {
      try {
        await getEmployees();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

