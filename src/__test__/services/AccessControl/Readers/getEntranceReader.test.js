import {getEntranceReader} from '../../../../services/AccessControl/Readers';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/Readers', () => {
      return { getEntranceReader: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/Readers', () => {
        return { getEntranceReader: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEntranceReader API 200 response', async () => {
          const response = await getEntranceReader();
          expect(response.status).toBe(200);
    });

    it('getEntranceReader API 401 response', async () => {
      try {
        await getEntranceReader();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

