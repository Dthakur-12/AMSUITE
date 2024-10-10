
import {requestLoginSAML,requestCredential} from "../../../actions/Settings/saml_actions";

describe('Actions', () => {
    test('requestLoginSAML Action', () => {
       const payload = {};
       const expected = {
         type: "REQUEST_LOGIN_SAML",
         payload
       };    
       expect(requestLoginSAML(payload)).toEqual(expected);
     })
     test('requestCredential Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREDENTIAL",
          file:{}
        };    
        expect(requestCredential(payload)).toEqual(expected);
      })
    })