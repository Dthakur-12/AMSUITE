import imei_reducer from "../../../reducers/AccessControl/imei_reducer";
import {REQUEST_GET_IMEI,REQUEST_CREATE_IMEI,REQUEST_EDIT_IMEI,REQUEST_DELETE_IMEI,RECEIVE_GET_IMEI,
    RECEIVE_CREATE_IMEI,RECEIVE_EDIT_IMEI,RECEIVE_DELETE_IMEI,REQUEST_ERROR} from "../../../actions/AccessControl/imei_actions";

describe('imei_reducer', () => {
    it('REQUEST_GET_IMEI', () => {
        const initialState = {}
        const expectedState = {successGetImei: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_IMEI', () => {
        const initialState = {}
        const expectedState = {successCreateImei: false, error: undefined }
        const payload = {}
        const action = {
          type: REQUEST_CREATE_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_EDIT_IMEI', () => {
        const initialState = {}
        const expectedState = { successEditImei: false, error: undefined }
        const payload = {}
        const action = {
          type: REQUEST_EDIT_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_IMEI', () => {
        const initialState = {}
        const expectedState = {successDeleteImei: false, loadingDeleteImei: true}
        const payload = {}
        const action = {
          type: REQUEST_DELETE_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_IMEI', () => {
        const initialState = {}
        const expectedState = {successGetImei: true}
        const payload = {}
        const action = {
          type: RECEIVE_GET_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_IMEI', () => {
        const initialState = {}
        const expectedState = {successCreateImei: true,}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_EDIT_IMEI', () => {
        const initialState = {}
        const expectedState = {successEditImei: true,}
        const payload = {}
        const action = {
          type: RECEIVE_EDIT_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_IMEI', () => {
        const initialState = {}
        const expectedState = {successDeleteImei: true, loadingDeleteImei: false}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_IMEI, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR', () => {
        const initialState = {}
        const expectedState = {  successGetImei: false,
            successCreateImei: false,
            successEditImei: false,
            successDeleteImei: false,
            loadingDeleteImei: false,}
        const payload = {}
        const action = {
          type: REQUEST_ERROR, 
          payload
        }
        expect(imei_reducer(initialState, action)).toEqual(expectedState)
      })
})