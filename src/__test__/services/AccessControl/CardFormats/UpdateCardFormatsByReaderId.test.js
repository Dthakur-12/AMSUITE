import {UpdateCardFormatsByReaderId} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { UpdateCardFormatsByReaderId: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { UpdateCardFormatsByReaderId: jest.fn(() => mockResolvePromise) };
    });
      
    it('UpdateCardFormatsByReaderId API 200 response', async () => {
          const response = await UpdateCardFormatsByReaderId();
          expect(response.status).toBe(200);
    });

    it('UpdateCardFormatsByReaderId API 401 response', async () => {
      try {
        await UpdateCardFormatsByReaderId();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

