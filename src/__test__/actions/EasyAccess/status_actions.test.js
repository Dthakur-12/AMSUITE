import { requestGetStatuses, requestDeleteStatuses, requestGetStatusById, requestEditStatus,
  requestCreateStatus, receiveGetStatuses, receiveDeletetStatuses, receiveGetStatusById, 
  receiveEditStatus, receiveCreateStatus, requestResetData, resetError  } from '../../../actions/EasyAccess/status_actions'

  describe('Actions', () => {
    test('requestGetStatuses Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_STATUSES",
        info:{}
      };    
      expect(requestGetStatuses(payload)).toEqual(expected);
    });

    test('requestDeleteStatuses Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_DELETE_STATUS",
        info:{}
      };    
      expect(requestDeleteStatuses(payload)).toEqual(expected);
    });

    test('requestGetStatusById Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_STATUS_BY_ID",
        info:{}
      };    
      expect(requestGetStatusById(payload)).toEqual(expected);
    });

    test('requestEditStatus Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_EDIT_STATUS",
        info:{}
      };    
      expect(requestEditStatus(payload)).toEqual(expected);
    });

    test('requestCreateStatus Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CREATE_STATUS",
        info:{}
      };    
      expect(requestCreateStatus(payload)).toEqual(expected);
    });

    test('receiveGetStatuses Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_GET_STATUSES",
        info:{}
      };    
      expect(receiveGetStatuses(payload)).toEqual(expected);
    });

    test('receiveDeletetStatuses Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_DELETE_STATUS",
        info:{}
      };    
      expect(receiveDeletetStatuses(payload)).toEqual(expected);
    });
    
    test('receiveGetStatusById Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_GET_STATUS_BY_ID",
        info:{}
      };    
      expect(receiveGetStatusById(payload)).toEqual(expected);
    });
    
    test('receiveEditStatus Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_EDIT_STATUS",
      };    
      expect(receiveEditStatus(payload)).toEqual(expected);
    });

    test('receiveCreateStatus Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_CREATE_STATUS",
      };    
      expect(receiveCreateStatus(payload)).toEqual(expected);
    });
  
    test('requestResetData Action', () => {
      const payload = {};
      const expected = {
        type: "RESET_AFTER_EDIT_CREATE",
      };    
      expect(requestResetData(payload)).toEqual(expected);
    });
  })