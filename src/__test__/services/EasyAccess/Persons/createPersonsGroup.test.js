import {createPersonsGroup} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { createPersonsGroup: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { createPersonsGroup: jest.fn(() => mockResolvePromise) };
    });
      
    it('createPersonsGroup API 200 response', async () => {
          const response = await createPersonsGroup();
          expect(response.status).toBe(200);
    });

    it('createPersonsGroup API 401 response', async () => {
      try {
        await createPersonsGroup();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

