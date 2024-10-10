import {createAccessLevel} from '../../../../services/AccessControl/AccessLevels';

  
    const mockUnauthorizedPromise = Promise.reject({ status: 401 });
    const mockResolvePromise = Promise.resolve({ status: 200});

    jest.mock('../../../../services/AccessControl/AccessLevels', () => {
      return { createAccessLevel: jest.fn(() => mockUnauthorizedPromise) };
    });

    jest.mock('../../../../services/AccessControl/AccessLevels', () => {
        return { createAccessLevel: jest.fn(() => mockResolvePromise) };
    });
      
    it('createAccessLevel API 200 response', async () => {
          const response = await createAccessLevel();
          expect(response.status).toBe(200);
    });

    it('createAccessLevel API 401 response', async () => {
      try {
        await createAccessLevel();
      } catch (error) {
        expect(error.status).toBe(401);
      }
    }) 

