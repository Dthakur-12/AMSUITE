import {getBadgeAsQR} from '../../../../services/EasyAccess/Badges';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Badges', () => {
      return { getBadgeAsQR: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Badges', () => {
        return { getBadgeAsQR: jest.fn(() => mockResolvePromise) };
    });
      
    it('getBadgeAsQR API 200 response', async () => {
          const response = await getBadgeAsQR();
          expect(response.status).toBe(200);
    });

    it('getBadgeAsQR API 401 response', async () => {
      try {
        await getBadgeAsQR();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

