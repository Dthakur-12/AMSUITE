import {deletePersonGroup} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { deletePersonGroup: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { deletePersonGroup: jest.fn(() => mockResolvePromise) };
    });
      
    it('deletePersonGroup API 200 response', async () => {
          const response = await deletePersonGroup();
          expect(response.status).toBe(200);
    });

    it('deletePersonGroup API 401 response', async () => {
      try {
        await deletePersonGroup();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

