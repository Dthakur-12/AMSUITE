import {getBadgeFormats} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { getBadgeFormats: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { getBadgeFormats: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBadgeFormats API 200 response', async () => {
          const response = await getBadgeFormats();
          expect(response.status).toBe(200);
    });

    it('getBadgeFormats API 401 response', async () => {
      try {
        await getBadgeFormats();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

