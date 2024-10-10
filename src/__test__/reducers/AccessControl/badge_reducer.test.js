import badge_reducer from "../../../reducers/AccessControl/badge_reducer";
import {REQUEST_GET_BADGE_TYPES,RECEIVE_GET_BADGE_TYPES,
    REQUEST_GET_BADGE_BY_ID,REQUEST_GET_BADGE_STATUS,
    RECEIVE_GET_BADGE_STATUS,REQUEST_GET_ALL_BADGE_STATUS,
    RECEIVE_GET_ALL_BADGE_STATUS,REQUEST_CREATE_BADGE,
    RECEIVE_CREATE_BADGE,REQUEST_CREATE_BADGE_TYPE,
    RECEIVE_CREATE_BADGE_TYPE,REQUEST_EDIT_BADGE,
    RECEIVE_EDIT_BADGE,REQUEST_DELETE_BADGES,
    RECEIVE_DELETE_BADGES} from "../../../actions/AccessControl/badge_actions";

describe('badge_reducer', () => {

    it('REQUEST_GET_BADGE_TYPES', () => {
        const initialState = {}
        const expectedState = { loadingBadgeTypes: true }
        const payload = {}
        const action = {
          type: REQUEST_GET_BADGE_TYPES, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_BADGE_TYPES', () => {
        const initialState = {}
        const expectedState = { }
        const payload = {}
        const action = {
          type: RECEIVE_GET_BADGE_TYPES, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_BADGE_BY_ID', () => {
        const initialState = {}
        const expectedState = {loadingBadge: true}
        const payload = {}
        const action = {
          type: REQUEST_GET_BADGE_BY_ID, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_BADGE_STATUS', () => {
        const initialState = {}
        const expectedState = {loadingBadgeStatus: true }
        const payload = {}
        const action = {
          type: REQUEST_GET_BADGE_STATUS, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_BADGE_STATUS', () => {
        const initialState = {}
        const expectedState = { }
        const payload = {}
        const action = {
          type: RECEIVE_GET_BADGE_STATUS, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_ALL_BADGE_STATUS', () => {
        const initialState = {}
        const expectedState = {loadingBadgeStatus: true}
        const payload = {}
        const action = {
          type: REQUEST_GET_ALL_BADGE_STATUS, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_ALL_BADGE_STATUS', () => {
        const initialState = {}
        const expectedState = {}
        const payload = {}
        const action = {
          type: RECEIVE_GET_ALL_BADGE_STATUS, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_BADGE', () => {
        const initialState = {}
        const expectedState = {isCreating: true}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_BADGE, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_BADGE', () => {
        const initialState = {}
        const expectedState = {isCreating: false}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_BADGE, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_BADGE_TYPE', () => {
        const initialState = {}
        const expectedState = {isCreating: true}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_BADGE_TYPE, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_BADGE_TYPE', () => {
        const initialState = {}
        const expectedState = { isCreating: false}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_BADGE_TYPE, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_EDIT_BADGE', () => {
        const initialState = {}
        const expectedState = { isCreating: true }
        const payload = {}
        const action = {
          type: REQUEST_EDIT_BADGE, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_EDIT_BADGE', () => {
        const initialState = {}
        const expectedState = {isCreating: false }
        const payload = {}
        const action = {
          type: RECEIVE_EDIT_BADGE, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_BADGES', () => {
        const initialState = {}
        const expectedState = { loading: true }
        const payload = {}
        const action = {
          type: REQUEST_DELETE_BADGES, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_BADGES', () => {
        const initialState = {}
        const expectedState = {}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_BADGES, 
          payload
        }
        expect(badge_reducer(initialState, action)).toEqual(expectedState)
      })
    })