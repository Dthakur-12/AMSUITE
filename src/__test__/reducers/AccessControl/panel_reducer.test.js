import panel_reducer from "../../../reducers/AccessControl/panel_reducer";
import { REQUEST_GET_PANELS,
    REQUEST_DELETE_PANELS,
    REQUEST_LOGOFF_PANEL,
    REQUEST_CREATE_PANEL,
    REQUEST_EDIT_PANEL,
    REQUEST_GET_BY_ID,
    REQUEST_GET_MOBILE_PANELS,
    REQUEST_HISTORICAL_GPS,
    RECEIVE_HISTORICAL_GPS,
    RECEIVE_GET_PANELS,
    RECEIVE_DELETE_PANELS,
    RECEIVE_LOGOFF_PANEL,
    RECEIVE_CREATE_PANEL,
    RECEIVE_EDIT_PANEL,
    RECEIVE_GET_BY_ID,
    RECEIVE_GET_MOBILE_PANELS,
    REQUEST_ERROR,
    REQUEST_GET_READER_MODE,
    RECEIVE_GET_READER_MODE,
    REQUEST_GET_WORKING_MODES,
    RECEIVE_GET_WORKING_MODES,
    REQUEST_GET_ROUTES,
    RECEIVE_GET_ROUTES,
    REQUEST_CREATE_BUS_CAPACITY,
    RECEIVE_CREATE_BUS_CAPACITY,
    REQUEST_GET_BUS_CAPACITIES,
    RECEIVE_GET_BUS_CAPACITIES,
    REQUEST_DELETE_BUS_CAPACITY,
    REQUEST_UPDATE_BUS_CAPACITY,
    RECEIVE_DELETE_BUS_CAPACITY,
    RECEIVE_UPDATE_BUS_CAPACITY,
    REQUEST_DELETE_ROUTE,
    RECEIVE_DELETE_ROUTE,
    REQUEST_CREATE_OR_EDIT_ROUTE,
    RECEIVE_CREATE_OR_EDIT_ROUTE} from "../../../actions/AccessControl/panel_actions";


describe('panel_reducer', () => {
    it('REQUEST_GET_PANELS', () => {
        const initialState = {}
        const expectedState = {loading: true, successGetPanels: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_PANELS, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_PANELS', () => {
        const initialState = {}
        const expectedState = {loading: true, successDeletePanel: false }
        const payload = {}
        const action = {
          type: REQUEST_DELETE_PANELS, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_LOGOFF_PANEL', () => {
        const initialState = {}
        const expectedState = {successLogOffPanel: false, loadingLogOffPanel: true }
        const payload = {}
        const action = {
          type: REQUEST_LOGOFF_PANEL, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_PANEL', () => {
        const initialState = {}
        const expectedState = { loading: true,
            successCreatePanel: false,
            loadingCreateorEdit: true}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_PANEL, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_ROUTES', () => {
        const initialState = {}
        const expectedState = {loading: true, successGetRoutes: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_ROUTES, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_EDIT_PANEL', () => {
        const initialState = {}
        const expectedState = {successEditPanel: false, loadingCreateorEdit: true}
        const payload = {}
        const action = {
          type: REQUEST_EDIT_PANEL, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_BY_ID', () => {
        const initialState = {}
        const expectedState = {successGetById: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_BY_ID, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_MOBILE_PANELS', () => {
        const initialState = {}
        const expectedState = {  loadingMobilePanels: true,successGetMobilePanels: false,}
        const payload = {}
        const action = {
          type: REQUEST_GET_MOBILE_PANELS, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_HISTORICAL_GPS', () => {
        const initialState = {}
        const expectedState = {  loadingHistoricalTracking: true,
            successHistoricalTracking: false,}
        const payload = {}
        const action = {
          type: REQUEST_HISTORICAL_GPS, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_WORKING_MODES', () => {
        const initialState = {}
        const expectedState = {loadingWorkingModes: true,
            successWorkingModes: false,}
        const payload = {}
        const action = {
          type: REQUEST_GET_WORKING_MODES, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_BUS_CAPACITY', () => {
        const initialState = {}
        const expectedState = {  loadingCreateCapacity: true,
            successCreateCapacity: false,}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_BUS_CAPACITY, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_ROUTE', () => {
        const initialState = {}
        const expectedState = { successDeleteRoute: false,
            loadingDeleteRoute: true,}
        const payload = {}
        const action = {
          type: REQUEST_DELETE_ROUTE, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_OR_EDIT_ROUTE', () => {
        const initialState = {}
        const expectedState = {successCreateOrEditRoute: false,
            loadingDeleteRoute: true,}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_OR_EDIT_ROUTE, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_OR_EDIT_ROUTE', () => {
        const initialState = {}
        const expectedState = { successCreateOrEditRoute: true,}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_OR_EDIT_ROUTE, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_ROUTE', () => {
        const initialState = {}
        const expectedState = {successDeleteRoute: true,}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_ROUTE, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_BUS_CAPACITIES', () => {
        const initialState = {}
        const expectedState = { loadingGetCapacities: false,
            successGetCapacities: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_BUS_CAPACITIES, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_BUS_CAPACITY', () => {
        const initialState = {}
        const expectedState = {loadingCreateCapacity: false,
            successCreateCapacity: true}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_BUS_CAPACITY, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_BUS_CAPACITY', () => {
        const initialState = {}
        const expectedState = { successDeleteBusCapacity: false,
            loadingDeleteCapacity: true,}
        const payload = {}
        const action = {
          type: REQUEST_DELETE_BUS_CAPACITY, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_UPDATE_BUS_CAPACITY', () => {
        const initialState = {}
        const expectedState = { loadingUpdateCapacity: true,
            successUpdateBusCapacity: false,}
        const payload = {}
        const action = {
          type: REQUEST_UPDATE_BUS_CAPACITY, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_BUS_CAPACITY', () => {
        const initialState = {}
        const expectedState = { successDeleteBusCapacity: true,
            loadingDeleteCapacity: false,}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_BUS_CAPACITY, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_UPDATE_BUS_CAPACITY', () => {
        const initialState = {}
        const expectedState = { loadingUpdateCapacity: false,
            successUpdateBusCapacity: true,}
        const payload = {}
        const action = {
          type: RECEIVE_UPDATE_BUS_CAPACITY, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_WORKING_MODES', () => {
        const initialState = {}
        const expectedState = {  loadingWorkingModes: false,
            successWorkingModes: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_WORKING_MODES, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_HISTORICAL_GPS', () => {
        const initialState = {}
        const expectedState = { loadingHistoricalTracking: false,
            successHistoricalTracking: true,   pointsGPS: undefined,
            possiblyMoreItems: undefined,
            maxDateReached: undefined}
        const payload = {gpsPoints:undefined,
          possiblyMoreItems:undefined,
          maxDateReached:undefined
        }
        const action = {
          type: RECEIVE_HISTORICAL_GPS, 
          data:payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_PANELS', () => {
        const initialState = {}
        const expectedState = { loading: false,
            successGetPanels: true,panels: undefined,
            panelsCount: 0,
            info: {
              data:undefined,
              dataCount:0}
            }
        const payload = {
          data:undefined,
        dataCount:0}
        const action = {
          type: RECEIVE_GET_PANELS, 
          data:payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
    })
    it('RECEIVE_GET_ROUTES', () => {
        const initialState = {}
        const expectedState = { loading: false,
            successGetPanels: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_ROUTES, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_PANELS', () => {
        const initialState = {}
        const expectedState = {loading: false, successDeletePanel: true}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_PANELS, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_LOGOFF_PANEL', () => {
        const initialState = {}
        const expectedState = { successLogOffPanel: true, loadingLogOffPanel: false}
        const payload = {}
        const action = {
          type: RECEIVE_LOGOFF_PANEL, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_PANEL', () => {
        const initialState = {}
        const expectedState = { loading: false,
            successCreatePanel: true,
            loadingCreateorEdit: false,}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_PANEL, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
    })
    it('RECEIVE_EDIT_PANEL', () => {
        const initialState = {}
        const expectedState = { successEditPanel: true, loadingCreateorEdit: false}
        const payload = {}
        const action = {
          type: RECEIVE_EDIT_PANEL, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_BY_ID', () => {
        const initialState = {}
        const expectedState = { successGetById: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_BY_ID, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_MOBILE_PANELS', () => {
        const initialState = {}
        const expectedState = {    loadingMobilePanels: false,
            successGetMobilePanels: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_MOBILE_PANELS, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_READER_MODE', () => {
        const initialState = {}
        const expectedState = { loadingReaderModes: true,}
        const payload = {}
        const action = {
          type: REQUEST_GET_READER_MODE, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_READER_MODE', () => {
        const initialState = {}
        const expectedState = { loadingReaderModes: false,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_READER_MODE, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR', () => {
        const initialState = {}
        const expectedState = {
            loadingLogOffPanel: false,
            loading: false,
            loadingMobilePanels: false,
            //error: action.error,
           // errorData: action.error,
            successGetPanels: false,
            successDeletePanel: false,
            successLogOffPanel: false,
            successCreatePanel: false,
            successEditPanel: false,
            successGetMobilePanels: false,
            loadingCreateCapacity: false,
            loadingUpdateCapacity: false,
            loadingCreateorEdit: false,}
        const payload = {}
        const action = {
          type: REQUEST_ERROR, 
          payload
        }
        expect(panel_reducer(initialState, action)).toEqual(expectedState)
      })
})

