import {printBadgeData} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { printBadgeData: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { printBadgeData: jest.fn(() => mockResolvePromise) };
    });
      
    it('printBadgeData API 200 response', async () => {
          const response = await printBadgeData();
          expect(response.status).toBe(200);
    });

    it('printBadgeData API 401 response', async () => {
      try {
        await printBadgeData();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

