import {createGroup} from '../../../../services/EasyAccess/Register';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Register', () => {
      return { createGroup: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Register', () => {
        return { createGroup: jest.fn(() => mockResolvePromise) };
    });
      
    it('createGroup API 200 response', async () => {
          const response = await createGroup();
          expect(response.status).toBe(200);
    });

    it('createGroup API 401 response', async () => {
      try {
        await createGroup();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

