import {createReader} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { createReader: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { createReader: jest.fn(() => mockResolvePromise) };
    });
      
    it('createReader API 200 response', async () => {
          const response = await createReader();
          expect(response.status).toBe(200);
    });

    it('createReader API 401 response', async () => {
      try {
        await createReader();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

