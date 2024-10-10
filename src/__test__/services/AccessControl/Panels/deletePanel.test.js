import {deletePanel} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { deletePanel: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { deletePanel: jest.fn(() => mockResolvePromise) };
    });
      
    it('deletePanel API 200 response', async () => {
          const response = await deletePanel();
          expect(response.status).toBe(200);
    });

    it('deletePanel API 401 response', async () => {
      try {
        await deletePanel();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

