import {getVirtualReaders} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { getVirtualReaders: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { getVirtualReaders: jest.fn(() => mockResolvePromise) };
    });
      
    it('getVirtualReaders API 200 response', async () => {
          const response = await getVirtualReaders();
          expect(response.status).toBe(200);
    });

    it('getVirtualReaders API 401 response', async () => {
      try {
        await getVirtualReaders();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

