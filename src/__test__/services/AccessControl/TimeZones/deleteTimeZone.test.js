import {deleteTimeZone} from '../../../../services/AccessControl/TimeZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
      return { deleteTimeZone: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
        return { deleteTimeZone: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteTimeZone API 200 response', async () => {
          const response = await deleteTimeZone();
          expect(response.status).toBe(200);
    });

    it('deleteTimeZone API 401 response', async () => {
      try {
        await deleteTimeZone();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

