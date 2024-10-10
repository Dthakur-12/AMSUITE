import {addAppLogo,getAppLogo,clearAppLogo,sendTestEmail,updateSystemColors,addSettings,getSettings,requestTestConnection,receiveTestConnection,
    requestTestConnectionError,requestVersion,receiveVersion} from "../../../actions/Settings/system_actions";

describe('Actions', () => {
    test('addAppLogo Action', () => {
       const payload = {};
       const expected = {
         type: "REQUEST_SET_APP_LOGO",
         payload:{img:{},id:undefined}
       };    
       expect(addAppLogo(payload)).toEqual(expected);
     })
     test('getAppLogo Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_APP_LOGO",
        };    
        expect(getAppLogo(payload)).toEqual(expected);
      })
      test('clearAppLogo Action', () => {
        const payload = {};
        const expected = {
          type: "CLEAR_APP_LOGO",
        };    
        expect(clearAppLogo(payload)).toEqual(expected);
      })
      test('sendTestEmail Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_SEND_TEST_EMAIL",
          payload
        };    
        expect(sendTestEmail(payload)).toEqual(expected);
      })
        test('updateSystemColors Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_UPDATE_COLORS",
          payload:{name:{},hex:undefined}
        };    
        expect(updateSystemColors(payload)).toEqual(expected);
      })
    test('addSettings Action', () => {
        const payload = {};
        const expected = {
          type: "ADD_SETTINGS",
          payload
        };    
        expect(addSettings(payload)).toEqual(expected);
      })
      test('getSettings Action', () => {
        const payload = {};
        const expected = {
          type: "GET_SETTINGS",
          settings:{}
        };    
        expect(getSettings(payload)).toEqual(expected);
      })
      test('requestTestConnection Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_TEST_CONNECTION",
          domain:{}
        };    
        expect(requestTestConnection(payload)).toEqual(expected);
      })
      test('receiveTestConnection Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_TEST_CONNECTION",
          payload
        };    
        expect(receiveTestConnection(payload)).toEqual(expected);
      })
      test('requestTestConnectionError Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_TEST_CONNECTION_ERROR",
          error:{}
        };    
        expect(requestTestConnectionError(payload)).toEqual(expected);
      })
      test('requestVersion Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_VERSION",
        };    
        expect(requestVersion(payload)).toEqual(expected);
      })
      test('receiveVersion Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_VERSION",
         info:{}
        };    
        expect(receiveVersion(payload)).toEqual(expected);
      })
    })
