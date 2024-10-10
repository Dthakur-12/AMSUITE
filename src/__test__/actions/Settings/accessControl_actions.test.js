import {requestUpdateMobileSettings,requestMobileSettings} from "../../../actions/Settings/accessControl_actions";
describe('Actions', () => {
    test('requestUpdateMobileSettings Action', () => {
       const payload = {};
       const expected = {
         type: "REQUEST_UPDATE_MOBILE_SETTINGS",
         payload
       };    
       expect(requestUpdateMobileSettings(payload)).toEqual(expected);
     })
     test('requestMobileSettings Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_MOBILE_SETTINGS",
        };    
        expect(requestMobileSettings(payload)).toEqual(expected);
      })
    })