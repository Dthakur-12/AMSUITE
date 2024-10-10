import {createCardFormat} from '../../../../services/AccessControl/CardFormats';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
      return { createCardFormat: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/CardFormats', () => {
        return { createCardFormat: jest.fn(() => mockResolvePromise) };
    });
      
    it('createCardFormat API 200 response', async () => {
          const response = await createCardFormat();
          expect(response.status).toBe(200);
    });

    it('createCardFormat API 401 response', async () => {
      try {
        await createCardFormat();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

