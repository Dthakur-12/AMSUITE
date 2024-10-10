import {REQUEST_PANELS_POSITIONS,RECEIVE_PANELS_POSITIONS,REQUEST_ERROR} from '../../../actions/DeviceMap/deviceMap_actions';
import deviceMapReducer from '../../../reducers/DeviceMap/deviceMap_reducer';

describe('deviceMapReducer', () => {
    it('REQUEST_PANELS_POSITIONS', () => {
        const initialState = {}
        const expectedState = { successGetZones: false, }
        const payload = {}
        const action = {
          type: REQUEST_PANELS_POSITIONS, 
          payload
        }
        expect(deviceMapReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_PANELS_POSITIONS', () => {
        const initialState = {}
        const expectedState = {  mapData: undefined,
            successGetZones: true,}
        const payload = {}
        const action = {
          type: RECEIVE_PANELS_POSITIONS, 
          payload
        }
        expect(deviceMapReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR', () => {
        const initialState = {}
        const expectedState = { error: true, loading: false, success: false}
        const payload = {}
        const action = {
          type: REQUEST_ERROR, 
          payload
        }
        expect(deviceMapReducer(initialState, action)).toEqual(expectedState)
      })
    })