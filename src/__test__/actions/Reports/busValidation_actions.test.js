import { requestGetBusReport, receiveGetBusReport, busError, clearBusError, clearBusReport } from '../../../actions/Reports/busValidation_actions'

describe('Actions', () => {
    test('requestGetBusReport Action', () => {
       const payload = {};
       const expected = {
         type: "REQUEST_GET_BUS_REPORT",
         payload:{}
       };    
       expect(requestGetBusReport(payload)).toEqual(expected);
     });
   
     test('receiveGetBusReport Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_GET_BUS_REPORT",
        payload:{}
      };    
      expect(receiveGetBusReport(payload)).toEqual(expected);
    });

    test('busError Action', () => {
      const payload = {};
      const expected = {
        type: "BUS_ERROR",
        payload:{}
      };    
      expect(busError(payload)).toEqual(expected);
    });

    test('clearBusError Action', () => {
      const payload = {};
      const expected = {
        type: "CLEAR_BUS_ERROR",
      };    
      expect(clearBusError(payload)).toEqual(expected);
    });
    
    test('clearBusReport Action', () => {
      const payload = {};
      const expected = {
        type: "CLEAR_BUS_REPORT",
      };    
      expect(clearBusReport(payload)).toEqual(expected);
    });
})