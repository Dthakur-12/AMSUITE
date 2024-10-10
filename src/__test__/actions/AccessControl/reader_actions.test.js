import {requestGetReaders,requestGetMobileReaders,requestDeleteReaders,requestGetCardFormatIDs,requestCreateReader,receiveGetMobileReaders,receiveDeleteReaders,receiveAssignAL,
    requestAssignAL, requestCheckExistReaderName, receiveGetReaders,requestEditReader,receiveGetCardFormatIDs,receiveCreateReader,receiveEditReader,receiveCheckExistReaderName} from "../../../actions/AccessControl/reader_actions"
describe('Actions', () => {
    test('requestGetReaders Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_READERS",
          info:{},
        };    
        expect(requestGetReaders(payload)).toEqual(expected);
      });
      test('requestGetMobileReaders Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_MOBILE_READERS",
          info:{},
        };    
        expect(requestGetMobileReaders(payload)).toEqual(expected);
      });
      test('requestDeleteReaders Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DELETE_READERS",
          info:{},
        };    
        expect(requestDeleteReaders(payload)).toEqual(expected);
      });
      test('requestAssignAL Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_ASSIGN_AL",
          info:{},
        };    
        expect(requestAssignAL(payload)).toEqual(expected);
      });
      test('requestGetCardFormatIDs Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_CARDFORMAT_IDS",
          info:{},
        };    
        expect(requestGetCardFormatIDs(payload)).toEqual(expected);
      });
      test('requestCreateReader Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_READER",
          info:{},
        };    
        expect(requestCreateReader(payload)).toEqual(expected);
      });
      test('requestEditReader Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_EDIT_READER",
          info:{},
        };    
        expect(requestEditReader(payload)).toEqual(expected);
      });
      test('requestCheckExistReaderName Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_EXIST_READERNAME",
          readerName:{},
        };    
        expect(requestCheckExistReaderName(payload)).toEqual(expected);
      });
      test('receiveGetReaders Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_READERS",
          info:{},
        };    
        expect(receiveGetReaders(payload)).toEqual(expected);
      });
      test('receiveGetMobileReaders Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_MOBILE_READERS",
          info:{},
        };    
        expect(receiveGetMobileReaders(payload)).toEqual(expected);
      });
      test('receiveDeleteReaders Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_DELETE_READERS",
        };    
        expect(receiveDeleteReaders(payload)).toEqual(expected);
      });
      test('receiveAssignAL Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_ASSIGN_AL",
        };    
        expect(receiveAssignAL(payload)).toEqual(expected);
      });
      test('receiveGetCardFormatIDs Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_CARDFORMAT_IDS",
          info:{},
        };    
        expect(receiveGetCardFormatIDs(payload)).toEqual(expected);
      });
      test('receiveCreateReader Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_CREATE_READER",
        };    
        expect(receiveCreateReader(payload)).toEqual(expected);
      });
      test('receiveEditReader Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_EDIT_READER",
        };    
        expect(receiveEditReader(payload)).toEqual(expected);
      });
      test('receiveCheckExistReaderName Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_EXIST_READERNAME",
          existName:undefined
                };    
        expect(receiveCheckExistReaderName(payload)).toEqual(expected);
      });
})