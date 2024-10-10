import {assignCardFormatByReader} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { assignCardFormatByReader: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { assignCardFormatByReader: jest.fn(() => mockResolvePromise) };
    });
    
    it('assignCardFormatByReader API 200 response', async () => {
          const response = await assignCardFormatByReader();
          expect(response.status).toBe(200);
    });

    it('assignCardFormatByReader API 401 response', async () => {
      try {
        await assignCardFormatByReader();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

