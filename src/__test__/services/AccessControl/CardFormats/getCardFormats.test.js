import {getCardFormats} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { getCardFormats: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { getCardFormats: jest.fn(() => mockResolvePromise) };
    });
      
    it('getCardFormats API 200 response', async () => {
          const response = await getCardFormats();
          expect(response.status).toBe(200);
    });

    it('getCardFormats API 401 response', async () => {
      try {
        await getCardFormats();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

