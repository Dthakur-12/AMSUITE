import {getCardFormatByID} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { getCardFormatByID: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { getCardFormatByID: jest.fn(() => mockResolvePromise) };
    });
      
    it('getCardFormatByID API 200 response', async () => {
          const response = await getCardFormatByID();
          expect(response.status).toBe(200);
    });

    it('getCardFormatByID API 401 response', async () => {
      try {
        await getCardFormatByID();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

