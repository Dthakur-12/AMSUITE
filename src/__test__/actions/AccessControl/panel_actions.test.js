import {requestCreateBusCapacity,requestUpdateBusCapacity,requestDeleteBusCapacity,requestGetReaderModes,requestGetWorkingModes,
    requestGetBusTypesCapacity, requestGetPanels,requestHistoricalTracking,requestDeletePanels,requestLogOffPanel,requestCreatePanel,requestEditPanel,requestGetById} from "../../../actions/AccessControl/panel_actions"
describe('Actions', () => {
    test('requestCreateBusCapacity Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_BUS_CAPACITY",
          info:{},
        };    
        expect(requestCreateBusCapacity(payload)).toEqual(expected);
      });
      test('requestUpdateBusCapacity Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_UPDATE_BUS_CAPACITY",
          info:{},
        };    
        expect(requestUpdateBusCapacity(payload)).toEqual(expected);
      });
      test('requestDeleteBusCapacity Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DELETE_BUS_CAPACITY",
          info:{},
        };    
        expect(requestDeleteBusCapacity(payload)).toEqual(expected);
      });
      test('requestGetBusTypesCapacity Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_BUS_CAPACITIES",
          info:{},
        };    
        expect(requestGetBusTypesCapacity(payload)).toEqual(expected);
      });
      test('requestGetReaderModes Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_READER_MODE",
          info:{},
        };    
        expect(requestGetReaderModes(payload)).toEqual(expected);
      });
      test('requestGetWorkingModes Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_WORKING_MODES",
        };    
        expect(requestGetWorkingModes(payload)).toEqual(expected);
      });
      test('requestGetPanels Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_PANELS",
          info:{},
        };    
        expect(requestGetPanels(payload)).toEqual(expected);
      });
      test('requestHistoricalTracking Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_HISTORICAL_GPS",
          info:{},
        };    
        expect(requestHistoricalTracking(payload)).toEqual(expected);
      });
      test('requestDeletePanels Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DELETE_PANELS",
          info:{},
        };    
        expect(requestDeletePanels(payload)).toEqual(expected);
      });
      test('requestLogOffPanel Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_LOGOFF_PANEL",
          info:{},
        };    
        expect(requestLogOffPanel(payload)).toEqual(expected);
      });
      test('requestCreatePanel Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_PANEL",
          info:{},
        };    
        expect(requestCreatePanel(payload)).toEqual(expected);
      });
      test('requestEditPanel Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_EDIT_PANEL",
          info:{},
        };    
        expect(requestEditPanel(payload)).toEqual(expected);
      });
      test('requestGetById Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_BY_ID",
          info:{},
        };    
        expect(requestGetById(payload)).toEqual(expected);
      });
    })