import {createVisitorGroup} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { createVisitorGroup: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { createVisitorGroup: jest.fn(() => mockResolvePromise) };
    });
      
    it('createVisitorGroup API 200 response', async () => {
          const response = await createVisitorGroup();
          expect(response.status).toBe(200);
    });

    it('createVisitorGroup API 401 response', async () => {
      try {
        await createVisitorGroup();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

