import {getCardFormatIds} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { getCardFormatIds: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
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

