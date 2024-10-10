import {getPersonsByGroupReportXLS} from '../../../../services/EasyAccess/Persons';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/EasyAccess/Persons', () => {
      return { getPersonsByGroupReportXLS: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/EasyAccess/Persons', () => {
        return { getPersonsByGroupReportXLS: jest.fn(() => mockResolvePromise) };
    });
      
    it('getPersonsByGroupReportXLS API 200 response', async () => {
          const response = await getPersonsByGroupReportXLS();
          expect(response.status).toBe(200);
    });

    it('getPersonsByGroupReportXLS API 401 response', async () => {
      try {
        await getPersonsByGroupReportXLS();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

