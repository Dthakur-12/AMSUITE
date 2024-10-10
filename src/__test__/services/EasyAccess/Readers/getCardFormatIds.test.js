import {getCardFormatIds} from '../../../../services/EasyAccess/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Readers', () => {
      return { getCardFormatIds: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Readers', () => {
        return { getCardFormatIds: jest.fn(() => mockResolvePromise) };
    });
      
    it('getCardFormatIds API 200 response', async () => {
          const response = await getCardFormatIds();
          expect(response.status).toBe(200);
    });

    it('getCardFormatIds API 401 response', async () => {
      try {
        await getCardFormatIds();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

