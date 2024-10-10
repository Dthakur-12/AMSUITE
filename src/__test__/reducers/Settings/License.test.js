import license from "../../../reducers/Settings/License";
import {REQUEST_GET_LICENSED_IMEI_LIST,RECEIVE_GET_LICENSED_IMEI_LIST,REQUEST_GET_LICENSE,RECEIVE_GET_LICENSE,SAVE_LICENSE} from "../../../actions/Settings/license_actions";

describe('license', () => {
    it('REQUEST_GET_LICENSED_IMEI_LIST', () => {
        const initialState = {}
        const expectedState = {successGetUnlicensedIMEIs: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_LICENSED_IMEI_LIST, 
          payload
        }
        expect(license(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_LICENSED_IMEI_LIST', () => {
        const initialState = {}
        const expectedState = {successGetUnlicensedIMEIs: true,
            unlicensedIMEIs: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_GET_LICENSED_IMEI_LIST, 
          payload
        }
        expect(license(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_LICENSE', () => {
        const initialState = {}
        const expectedState = {successGetLicense: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_LICENSE, 
          payload
        }
        expect(license(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_LICENSE', () => {
        const initialState = {}
        const expectedState = {successGetLicense: true, license: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_GET_LICENSE, 
          payload
        }
        expect(license(initialState, action)).toEqual(expectedState)
      })
      it('SAVE_LICENSE', () => {
        const initialState = {}
        const expectedState = {license: undefined}
        const payload = {}
        const action = {
          type: SAVE_LICENSE, 
          payload
        }
        expect(license(initialState, action)).toEqual(expectedState)
      })
    })