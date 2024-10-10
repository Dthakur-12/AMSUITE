import {createTimeZone} from '../../../../services/AccessControl/TimeZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
      return { createTimeZone: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
        return { createTimeZone: jest.fn(() => mockResolvePromise) };
    });
      
    it('createTimeZone API 200 response', async () => {
          const response = await createTimeZone();
          expect(response.status).toBe(200);
    });

    it('createTimeZone API 401 response', async () => {
      try {
        await createTimeZone();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

