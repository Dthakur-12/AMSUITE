import {getXLSWithVisitorGroup} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getXLSWithVisitorGroup: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getXLSWithVisitorGroup: jest.fn(() => mockResolvePromise) };
    });
      
    it('getXLSWithVisitorGroup API 200 response', async () => {
          const response = await getXLSWithVisitorGroup();
          expect(response.status).toBe(200);
    });

    it('getXLSWithVisitorGroup API 401 response', async () => {
      try {
        await getXLSWithVisitorGroup();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

