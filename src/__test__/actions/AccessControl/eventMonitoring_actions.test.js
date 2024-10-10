import {requestGetEvents,requestGetEventsReport,requestGetEventsXLS,requestGetPersonEnterpriseXLS,requestGetEnterpriseXLS,
    requestGetEventById,requestGetPersonImage,requestGetAccessImage,receiveGetEvents,receiveGetEventById,receiveGetPersonImage,receiveGetAccessImage} from "../../../actions/AccessControl/eventMonitoring_actions"
describe('Actions', () => {
    test('requestGetEvents Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_EVENTS",
          info:{},
        };    
        expect(requestGetEvents(payload)).toEqual(expected);
      });
      test('requestGetEventsReport Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_EVENTS_REPORT",
          info:{},
        };    
        expect(requestGetEventsReport(payload)).toEqual(expected);
      });
      test('requestGetEventsXLS Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_EVENTS_XLS",
          info:{},
        };    
        expect(requestGetEventsXLS(payload)).toEqual(expected);
      });
      test('requestGetPersonEnterpriseXLS Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_PERSON_ENTERPRISE_XLS",
          info:{},
        };    
        expect(requestGetPersonEnterpriseXLS(payload)).toEqual(expected);
      });
      test('requestGetEnterpriseXLS Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_ENTERPRISE_XLS",
          info:{},
        };    
        expect(requestGetEnterpriseXLS(payload)).toEqual(expected);
      });
      test('requestGetEventById Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_EVENT_BY_ID",
          info:{},
        };    
        expect(requestGetEventById(payload)).toEqual(expected);
      });
      test('requestGetPersonImage Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_PERSON_IMAGE",
          info:{},
        };    
        expect(requestGetPersonImage(payload)).toEqual(expected);
      });
      test('requestGetAccessImage Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_ACCESS_IMAGE",
          info:{},
        };    
        expect(requestGetAccessImage(payload)).toEqual(expected);
      });
      test('receiveGetEvents Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_EVENTS",
          info:{},
        };    
        expect(receiveGetEvents(payload)).toEqual(expected);
      });
      test('receiveGetEventById Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_EVENT_BY_ID",
          info:{},
        };    
        expect(receiveGetEventById(payload)).toEqual(expected);
      });
      test('receiveGetPersonImage Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_PERSON_IMAGE",
          info:{},
        };    
        expect(receiveGetPersonImage(payload)).toEqual(expected);
      });
      test('receiveGetAccessImage Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_ACCESS_IMAGE",
          info:{},
        };    
        expect(receiveGetAccessImage(payload)).toEqual(expected);
      });
})