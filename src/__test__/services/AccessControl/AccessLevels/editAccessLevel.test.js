import {editAccessLevel} from '../../../../services/AccessControl/AccessLevels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/AccessLevels', () => {
      return { editAccessLevel: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/AccessLevels', () => {
        return { editAccessLevel: jest.fn(() => mockResolvePromise) };
    });
      
    it('editAccessLevel API 200 response', async () => {
          const response = await editAccessLevel();
          expect(response.status).toBe(200);
    });

    it('editAccessLevel API 401 response', async () => {
      try {
        await editAccessLevel();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

