import accessControl from "../../../reducers/Settings/AccessControl";
import {REQUEST_MOBILE_SETTINGS,RECEIVE_MOBILE_SETTINGS,REQUEST_UPDATE_MOBILE_SETTINGS,REQUEST_ERROR_MOBILE_SETTINGS} from "../../../actions/Settings/accessControl_actions";
describe('accessControl', () => {
    it('REQUEST_MOBILE_SETTINGS', () => {
        const initialState = {}
        const expectedState = {configSAML: undefined,
          isLoading: true,}
        const payload = {}
        const action = {
          type: REQUEST_MOBILE_SETTINGS, 
          payload
        }
        expect(accessControl(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_MOBILE_SETTINGS', () => {
        var loginProtocol;
        const initialState = {}
        const expectedState = {isLoading: false,
          error: false, 
          configSAML: {
            loginProtocol: "1",
            loginSAML:true
          }}
        const payload = {
          loginProtocol:"1"
        }
        const action = {
          type: RECEIVE_MOBILE_SETTINGS, 
          data:payload,
        }
        expect(accessControl(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_UPDATE_MOBILE_SETTINGS', () => {
        const initialState = {}
        const expectedState = {isCreating: false, }
        const payload = {}
        const action = {
          type: REQUEST_UPDATE_MOBILE_SETTINGS, 
          payload
        }
        expect(accessControl(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR_MOBILE_SETTINGS', () => {
        const initialState = {}
        const expectedState = {error: true }
        const payload = {}
        const action = {
          type: REQUEST_ERROR_MOBILE_SETTINGS, 
          payload
        }
        expect(accessControl(initialState, action)).toEqual(expectedState)
      })
})