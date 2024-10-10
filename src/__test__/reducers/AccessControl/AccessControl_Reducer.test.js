import { REQUEST_CREATE_ACCESSLEVEL,RECEIVE_CREATE_ACCESSLEVEL,REQUEST_GET_ACCESSLEVELS,RECEIVE_GET_ACCESSLEVELS } from '../../../actions/AccessControl/accessLevel_actions'
import AccessControlReducer from '../../../reducers/AccessControl/AccessControl_Reducer'

describe('AccessControlReducer', () => {
  it('REQUEST_CREATE_ACCESSLEVEL', () => {
    const initialState = {}
    const expectedState = { loading: true, successCreateAccessLevel: false }
    const payload = {}
    const action = {
      type: REQUEST_CREATE_ACCESSLEVEL, 
      payload
    }
    expect(AccessControlReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_CREATE_ACCESSLEVEL', () => {
    const initialState = {}
    const expectedState = { loading: false, successCreateAccessLevel: true }
    const payload = {}
    const action = {
      type: RECEIVE_CREATE_ACCESSLEVEL, 
      payload
    }
    expect(AccessControlReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_ACCESSLEVELS', () => {
    const initialState = {}
    const expectedState = { loading: true, successGetAccessLevels: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_ACCESSLEVELS, 
      payload
    }
    expect(AccessControlReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_ACCESSLEVELS', () => {
    const initialState = {}
    const expectedState = {loading: false,  successGetAccessLevels: true}
    const payload = {}
    const action = {
      type: RECEIVE_GET_ACCESSLEVELS, 
      payload
    }
    expect(AccessControlReducer(initialState, action)).toEqual(expectedState)
  })
})
