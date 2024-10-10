import {requestGetImei,requestCreateImei,requestEditImei,requestDeleteImei,receiveGetImei,receiveCreateImei,receiveEditImei,receiveDeleteImei} from "../../../actions/AccessControl/imei_actions"
describe('Actions', () => {
    test('requestGetImei Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_IMEI",
          info:{},
        };    
        expect(requestGetImei(payload)).toEqual(expected);
      });
      test('requestCreateImei Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_IMEI",
          info:{},
        };    
        expect(requestCreateImei(payload)).toEqual(expected);
      });
      test('requestEditImei Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_EDIT_IMEI",
          info:{},
        };    
        expect(requestEditImei(payload)).toEqual(expected);
      });
      test('requestDeleteImei Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DELETE_IMEI",
          info:{},
        };    
        expect(requestDeleteImei(payload)).toEqual(expected);
      });
      test('receiveGetImei Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_IMEI",
          info:{},
        };    
        expect(receiveGetImei(payload)).toEqual(expected);
      });
      test('receiveCreateImei Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_CREATE_IMEI",
          info:{},
        };    
        expect(receiveCreateImei(payload)).toEqual(expected);
      });
      test('receiveEditImei Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_EDIT_IMEI",
          info:{},
        };    
        expect(receiveEditImei(payload)).toEqual(expected);
      });
      test('receiveDeleteImei Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_DELETE_IMEI",
        };    
        expect(receiveDeleteImei(payload)).toEqual(expected);
      });
})