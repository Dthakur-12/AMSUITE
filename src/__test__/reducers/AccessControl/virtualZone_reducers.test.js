import virtualZoneReducer from "../../../reducers/AccessControl/virtualZone_reducers";;
import {  CREATE_REQUEST_VIRTUAL_ZONE,
    CREATE_RECEIVE_VIRTUAL_ZONE,
    EDIT_REQUEST_VIRTUAL_ZONE,
    EDIT_RECEIVE_VIRTUAL_ZONE,
    REQUEST_VIRTUAL_ZONE,
    RECEIVE_VIRTUAL_ZONE,
    DELETE_REQUEST_VIRTUAL_ZONE,
    DELETE_RECEIVE_VIRTUAL_ZONE,
    REQUEST_VIRTUAL_ZONE_ERROR,} from "../../../actions/AccessControl/virtualZone_actions";

describe('virtualZoneReducer', () => {
    it('REQUEST_VIRTUAL_ZONE', () => {
        const initialState = {}
        const expectedState = { loading: true,
            error: false,
            successVirtualzone: false,}
        const payload = {}
        const action = {
          type: REQUEST_VIRTUAL_ZONE, 
          payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_VIRTUAL_ZONE', () => {
        const initialState = {}
        const expectedState = { loading: false,
            error: false,
            successVirtualzone: true,  virtualZones: undefined,
            virtualZoneCount: 0}
        const payload = {data:undefined,
        dataCount:0}
        const action = {
          type: RECEIVE_VIRTUAL_ZONE, 
          data:payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
      it('CREATE_REQUEST_VIRTUAL_ZONE', () => {
        const initialState = {}
        const expectedState = { createSuccess: false, loading: true, error: false }
        const payload = {}
        const action = {
          type: CREATE_REQUEST_VIRTUAL_ZONE, 
          payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
      it('CREATE_RECEIVE_VIRTUAL_ZONE', () => {
        const initialState = {}
        const expectedState = {createSuccess: true,
            success: true,
            loading: false,
            error: false,}
        const payload = {}
        const action = {
          type: CREATE_RECEIVE_VIRTUAL_ZONE, 
          payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
      it('DELETE_REQUEST_VIRTUAL_ZONE', () => {
        const initialState = {}
        const expectedState = {deleteSuccess: false, error: false }
        const payload = {}
        const action = {
          type: DELETE_REQUEST_VIRTUAL_ZONE, 
          payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
      it('EDIT_REQUEST_VIRTUAL_ZONE', () => {
        const initialState = {}
        const expectedState = {editSuccess: false, loading: true, error: false}
        const payload = {}
        const action = {
          type: EDIT_REQUEST_VIRTUAL_ZONE, 
          payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
      it('EDIT_RECEIVE_VIRTUAL_ZONE', () => {
        const initialState = {}
        const expectedState = { editSuccess: true,
            success: true,
            loading: false,
            error: false,}
        const payload = {}
        const action = {
          type: EDIT_RECEIVE_VIRTUAL_ZONE, 
          payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_VIRTUAL_ZONE_ERROR', () => {
        const initialState = {}
        const expectedState = { error: true,}
        const payload = {}
        const action = {
          type: REQUEST_VIRTUAL_ZONE_ERROR, 
          payload
        }
        expect(virtualZoneReducer(initialState, action)).toEqual(expectedState)
      })
})