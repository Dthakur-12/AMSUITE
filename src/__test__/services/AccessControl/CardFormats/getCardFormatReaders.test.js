import {getCardFormatReaders} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { getCardFormatReaders: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { getCardFormatReaders: jest.fn(() => mockResolvePromise) };
    });
      
    it('getCardFormatReaders API 200 response', async () => {
          const response = await getCardFormatReaders();
          expect(response.status).toBe(200);
    });

    it('getCardFormatReaders API 401 response', async () => {
      try {
        await getCardFormatReaders();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

