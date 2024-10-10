import {getEmployeeById} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getEmployeeById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getEmployeeById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEmployeeById API 200 response', async () => {
          const response = await getEmployeeById();
          expect(response.status).toBe(200);
    });

    it('getEmployeeById API 401 response', async () => {
      try {
        await getEmployeeById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

