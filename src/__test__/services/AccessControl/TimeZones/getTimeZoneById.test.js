import {getTimeZoneById} from '../../../../services/AccessControl/TimeZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
      return { getTimeZoneById: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
        return { getTimeZoneById: jest.fn(() => mockResolvePromise) };
    });
      
    it('getTimeZoneById API 200 response', async () => {
          const response = await getTimeZoneById();
          expect(response.status).toBe(200);
    });

    it('getTimeZoneById API 401 response', async () => {
      try {
        await getTimeZoneById();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

