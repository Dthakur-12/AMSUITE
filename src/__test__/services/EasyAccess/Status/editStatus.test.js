import {editStatus} from '../../../../services/EasyAccess/Status';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Status', () => {
      return { editStatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Status', () => {
        return { editStatus: jest.fn(() => mockResolvePromise) };
    });
      
    it('editStatus API 200 response', async () => {
          const response = await editStatus();
          expect(response.status).toBe(200);
    });

    it('editStatus API 401 response', async () => {
      try {
        await editStatus();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

