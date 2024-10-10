import {getEventMonitoring} from '../../../../services/AccessControl/EventMonitoring';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
      return { getEventMonitoring: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/EventMonitoring', () => {
        return { getEventMonitoring: jest.fn(() => mockResolvePromise) };
    });
      
    it('getEventMonitoring API 200 response', async () => {
          const response = await getEventMonitoring();
          expect(response.status).toBe(200);
    });

    it('getEventMonitoring API 401 response', async () => {
      try {
        await getEventMonitoring();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

