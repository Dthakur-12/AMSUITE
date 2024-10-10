import {createPanel} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { createPanel: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { createPanel: jest.fn(() => mockResolvePromise) };
    });
      
    it('createPanel API 200 response', async () => {
          const response = await createPanel();
          expect(response.status).toBe(200);
    });

    it('createPanel API 401 response', async () => {
      try {
        await createPanel();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

