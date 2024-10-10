import { createSamlPermits, requestUsers, checkCredentials, currentUser, login, loginActiveDirectory,
  tryLogin, clearLoginStore, requestAllUserActivities  } from '../../../actions/Users/user_actions'


  describe('Actions', () => {
    test('createSamlPermits Action', () => {
       const payload = {};
       const expected = {
         type: "REQUEST_CREATE_USER_SAML_PERMITS",
         payload:{}
       };    
       expect(createSamlPermits(payload)).toEqual(expected);
     });

     test('requestUsers Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_USERS",
        dataTable:{}
      };    
      expect(requestUsers(payload)).toEqual(expected);
    });

    test('checkCredentials Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CHECK_CREDENTIALS",
        credentials:{}
      };    
      expect(checkCredentials(payload)).toEqual(expected);
    });

    test('currentUser Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_CURRENT_USER",
        payload:{}
      };    
      expect(currentUser(payload)).toEqual(expected);
    });

    test('login Action', () => {
      const payload = {};
      const expected = {
        type: "LOGIN",
        payload:{}
      };    
      expect(login(payload)).toEqual(expected);
    });

    test('loginActiveDirectory Action', () => {
      const payload = {};
      const expected = {
        type: "LOGIN_ACTIVE_DIRECTORY",
        payload:{}
      };    
      expect(loginActiveDirectory(payload)).toEqual(expected);
    });

    test('tryLogin Action', () => {
      const payload = {};
      const expected = {
        type: "TRY_LOGIN",
        payload:{}
      };    
      expect(tryLogin(payload)).toEqual(expected);
    });

    test('clearLoginStore Action', () => {
      const payload = {};
      const expected = {
        type: "LOGIN_CLEAR_STORE",
      };    
      expect(clearLoginStore(payload)).toEqual(expected);
    });

    test('requestAllUserActivities Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_USER_ACTIVITIES",
        dataTable:{}
      };    
      expect(requestAllUserActivities(payload)).toEqual(expected);
    });
  })