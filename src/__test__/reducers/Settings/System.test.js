import documentReducer from "../../../reducers/Settings/System";
import {  REQUEST_TEST_CONNECTION,
    RECEIVE_TEST_CONNECTION,
    REQUEST_TEST_CONNECTION_ERROR,
    REQUEST_GET_APP_LOGO,
    REQUEST_SET_APP_LOGO,
    RECEIVE_SET_APP_LOGO,
    RECEIVE_GET_APP_LOGO,
    REQUEST_UPDATE_SYSTEM_COLORS,
    CLEAR_APP_LOGO,
    REQUEST_VERSION,
    RECEIVE_VERSION,
    REQUEST_SEND_TEST_EMAIL,
    RECEIVE_SEND_TEST_EMAIL,
} from "../../../actions/Settings/system_actions";

describe('documentReducer', () => {
    it('REQUEST_TEST_CONNECTION', () => {
        const initialState = {}
        const expectedState = {success: false, loading: true}
        const payload = {}
        const action = {
          type: REQUEST_TEST_CONNECTION, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_TEST_CONNECTION', () => {
        const initialState = {}
        const expectedState = {loading: false, success: true }
        const payload = {}
        const action = {
          type: RECEIVE_TEST_CONNECTION, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_TEST_CONNECTION_ERROR', () => {
        const initialState = {}
        const expectedState = {  loading: false,
            success: false,
            error: undefined}
        const payload = {}
        const action = {
          type: REQUEST_TEST_CONNECTION_ERROR, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_APP_LOGO', () => {
        const initialState = {}
        const expectedState = { successLogoUpdated: false,}
        const payload = {}
        const action = {
          type: REQUEST_GET_APP_LOGO, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_SET_APP_LOGO', () => {
        const initialState = {}
        const expectedState = {successLogoUpdated: false,}
        const payload = {}
        const action = {
          type: REQUEST_SET_APP_LOGO, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_SEND_TEST_EMAIL', () => {
        const initialState = {}
        const expectedState = {successfullySended: false,}
        const payload = {}
        const action = {
          type: REQUEST_SEND_TEST_EMAIL, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_SEND_TEST_EMAIL', () => {
        const initialState = {}
        const expectedState = { successfullySended: true,}
        const payload = {}
        const action = {
          type: RECEIVE_SEND_TEST_EMAIL, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_VERSION', () => {
        const initialState = {}
        const expectedState = { successGetVersion: false,}
        const payload = {}
        const action = {
          type: REQUEST_VERSION, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_SET_APP_LOGO', () => {
        const initialState = {}
        const expectedState = {successLogoUpdated: true,}
        const payload = {}
        const action = {
          type: RECEIVE_SET_APP_LOGO, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_APP_LOGO', () => {
        const initialState = {}
        const expectedState = {appLogo: undefined,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_APP_LOGO, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('CLEAR_APP_LOGO', () => {
        const initialState = {}
        const expectedState = { appLogo: undefined,}
        const payload = {}
        const action = {
          type: CLEAR_APP_LOGO, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_UPDATE_SYSTEM_COLORS', () => {
        const initialState = {}
        const expectedState = {systemColors: {
          undefined: undefined,
        },}
        const payload = {
          name:undefined,
          hex:undefined
        }
        const action = {
          type: REQUEST_UPDATE_SYSTEM_COLORS, 
          data:payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
    it('RECEIVE_VERSION', () => {
        const initialState = {}
        const expectedState = { successGetVersion: true,
            version: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_VERSION, 
          payload
        }
        expect(documentReducer(initialState, action)).toEqual(expectedState)
      })
    }
)