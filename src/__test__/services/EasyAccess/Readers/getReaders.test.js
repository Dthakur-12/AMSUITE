import {getReaders} from '../../../../services/EasyAccess/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Readers', () => {
      return { getReaders: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Readers', () => {
        return { getReaders: jest.fn(() => mockResolvePromise) };
    });
      
    it('getReaders API 200 response', async () => {
          const response = await getReaders();
          expect(response.status).toBe(200);
    });

    it('getReaders API 401 response', async () => {
      try {
        await getReaders();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

