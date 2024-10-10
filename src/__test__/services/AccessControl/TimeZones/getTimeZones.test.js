import {getTimeZones} from '../../../../services/AccessControl/TimeZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
      return { getTimeZones: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
        return { getTimeZones: jest.fn(() => mockResolvePromise) };
    });
      
    it('getTimeZones API 200 response', async () => {
          const response = await getTimeZones();
          expect(response.status).toBe(200);
    });

    it('getTimeZones API 401 response', async () => {
      try {
        await getTimeZones();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

