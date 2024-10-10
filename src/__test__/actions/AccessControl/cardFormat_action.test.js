import {requestGetCardFormats,requestDeleteCardFormat,requestGetCardFormatReaders,requestAssignCardFormatReaders,requestUpdateCardFormatByReader,clearDataNew,receiveGetCardFormats,receiveDeleteCardFormat,
    receiveGetCardFormatReaders,receiveAssignCardFormatReaders,receiveUpdateCardFormatByReader,receiveCreateCardFormat,receiveEditCardFormat,receiveGetCardFormatByID} from "../../../actions/AccessControl/cardFormat_actions"
describe('Actions', () => {
    test('requestGetCardFormats Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_CARD_FORMATS",
          info:{},
        };    
        expect(requestGetCardFormats(payload)).toEqual(expected);
      });
      test('requestDeleteCardFormat Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DELETE_CARD_FORMATS",
          info:{},
        };    
        expect(requestDeleteCardFormat(payload)).toEqual(expected);
      });
      test('requestGetCardFormatReaders Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_CARD_FORMAT_READERS",
          info:{},
        };    
        expect(requestGetCardFormatReaders(payload)).toEqual(expected);
      });
      test('requestAssignCardFormatReaders Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_ASSIGN_CARD_FORMAT_READERS",
          info:{},
        };    
        expect(requestAssignCardFormatReaders(payload)).toEqual(expected);
      });
      test('requestUpdateCardFormatByReader Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_UPDATE_CARD_FORMAT_BY_READER",
          info:{},
        };    
        expect(requestUpdateCardFormatByReader(payload)).toEqual(expected);
      });
      test('clearDataNew Action', () => {
        const payload = {};
        const expected = {
          type: "CLEAR_DATA_NEW",
        };    
        expect(clearDataNew(payload)).toEqual(expected);
      });
      test('receiveGetCardFormats Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_CARD_FORMATS",
          info:{}
        };    
        expect(receiveGetCardFormats(payload)).toEqual(expected);
      });
      test('receiveDeleteCardFormat Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_DELETE_CARD_FORMATS",
        };    
        expect(receiveDeleteCardFormat(payload)).toEqual(expected);
      });
      test('receiveGetCardFormatReaders Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_GET_CARD_FORMAT_READERS",
          info:{}
        };    
        expect(receiveGetCardFormatReaders(payload)).toEqual(expected);
      });
      test('receiveAssignCardFormatReaders Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_ASSIGN_CARD_FORMAT_READERS",
        };    
        expect(receiveAssignCardFormatReaders(payload)).toEqual(expected);
      });
      test('receiveUpdateCardFormatByReader Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_UPDATE_CARD_FORMAT_BY_READER"
        };    
        expect(receiveUpdateCardFormatByReader(payload)).toEqual(expected);
      });
      test('receiveCreateCardFormat Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_CREATE_CARD_FORMAT",
        };    
        expect(receiveCreateCardFormat(payload)).toEqual(expected);
      });
      test('receiveEditCardFormat Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_EDIT_CARD_FORMAT",
        };    
        expect(receiveEditCardFormat(payload)).toEqual(expected);
      });
      test('receiveGetCardFormatByID Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_CARD_FORMAT_BY_ID",
          info:{}
        };    
        expect(receiveGetCardFormatByID(payload)).toEqual(expected);
      });
})