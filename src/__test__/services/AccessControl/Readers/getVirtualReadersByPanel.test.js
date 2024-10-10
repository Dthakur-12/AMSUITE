import {GetVirtualReadersByPanel} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { GetVirtualReadersByPanel: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { GetVirtualReadersByPanel: jest.fn(() => mockResolvePromise) };
    });
      
    it('GetVirtualReadersByPanel API 200 response', async () => {
          const response = await GetVirtualReadersByPanel();
          expect(response.status).toBe(200);
    });

    it('GetVirtualReadersByPanel API 401 response', async () => {
      try {
        await GetVirtualReadersByPanel();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

