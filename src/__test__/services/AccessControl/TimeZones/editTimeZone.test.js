import {editTimeZone} from '../../../../services/AccessControl/TimeZones';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
      return { editTimeZone: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/TimeZones', () => {
        return { editTimeZone: jest.fn(() => mockResolvePromise) };
    });
      
    it('editTimeZone API 200 response', async () => {
          const response = await editTimeZone();
          expect(response.status).toBe(200);
    });

    it('editTimeZone API 401 response', async () => {
      try {
        await editTimeZone();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

