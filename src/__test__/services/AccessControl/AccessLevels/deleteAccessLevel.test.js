import {deleteAccessLevel} from '../../../../services/AccessControl/AccessLevels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/AccessLevels', () => {
      return { deleteStdeleteAccessLevelatus: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/AccessLevels', () => {
        return { deleteAccessLevel: jest.fn(() => mockResolvePromise) };
    });
      
    it('deleteAccessLevel API 200 response', async () => {
          const response = await deleteAccessLevel();
          expect(response.status).toBe(200);
    });

    it('deleteAccessLevel API 401 response', async () => {
      try {
        await deleteAccessLevel();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

