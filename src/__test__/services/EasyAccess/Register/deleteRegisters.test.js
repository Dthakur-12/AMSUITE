import {deleteRegisters} from '../../../../services/EasyAccess/Register';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Register', () => {
      return { deleteRegisters: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Register', () => {
        return { deleteRegisters: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteRegisters API 200 response', async () => {
          const response = await deleteRegisters();
          expect(response.status).toBe(200);
    });

    it('deleteRegisters API 401 response', async () => {
      try {
        await deleteRegisters();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

