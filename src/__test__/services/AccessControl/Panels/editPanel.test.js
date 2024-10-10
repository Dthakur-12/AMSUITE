import {editPanel} from '../../../../services/AccessControl/Panels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Panels', () => {
      return { editPanel: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Panels', () => {
        return { editPanel: jest.fn(() => mockResolvePromise) };
    });
      
    it('editPanel API 200 response', async () => {
          const response = await editPanel();
          expect(response.status).toBe(200);
    });

    it('editPanel API 401 response', async () => {
      try {
        await editPanel();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 
