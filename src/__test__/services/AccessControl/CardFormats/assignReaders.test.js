import {assignReaders} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { assignReaders: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { assignReaders: jest.fn(() => mockResolvePromise) };
    });
    
    it('assignReaders API 200 response', async () => {
          const response = await assignReaders();
          expect(response.status).toBe(200);
    });

    it('assignReaders API 401 response', async () => {
      try {
        await assignReaders();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

