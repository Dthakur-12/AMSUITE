import {
  REQUEST_GET_STATUSES,
  REQUEST_DELETE_STATUS,
  REQUEST_GET_STATUS_BY_ID,
  REQUEST_EDIT_STATUS,
  REQUEST_CREATE_STATUS,
  RECEIVE_GET_STATUSES,
  RECEIVE_DELETE_STATUS,
  RECEIVE_GET_STATUS_BY_ID,
  RECEIVE_EDIT_STATUS,
  RECEIVE_CREATE_STATUS,
  REQUEST_ERROR,
  RESET_AFTER_EDIT_CREATE,
  RESET_ERROR
} from '../../../actions/EasyAccess/status_actions'

import statusReducer from '../../../reducers/EasyAccess/status_reducer'

describe('statusReducer', () => {
  it('RESET_ERROR', () => {
    const initialState = {}
    const expectedState = {error: undefined }
    const payload = {}
    const action = {
      type: RESET_ERROR, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_GET_STATUSES', () => {
    const initialState = {}
    const expectedState = {loading: true, successGetStatuses: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_STATUSES, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_DELETE_STATUS', () => {
    const initialState = {}
    const expectedState = {successDeleteStatus: false  }
    const payload = {}
    const action = {
      type: REQUEST_DELETE_STATUS, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_GET_STATUS_BY_ID', () => {
    const initialState = {}
    const expectedState = {successGetStatusById: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_STATUS_BY_ID, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_EDIT_STATUS', () => {
    const initialState = {}
    const expectedState = {successEditStatus: false}
    const payload = {}
    const action = {
      type: REQUEST_EDIT_STATUS, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_CREATE_STATUS', () => {
    const initialState = {}
    const expectedState = {successCreateStatus: false, loadingCreateStatus: true }
    const payload = {}
    const action = {
      type: REQUEST_CREATE_STATUS, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_GET_STATUSES', () => {
    const initialState = {}
    const expectedState = {loading: false, successGetStatuses: true, statuses: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_GET_STATUSES, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_DELETE_STATUS', () => {
    const initialState = {}
    const expectedState = {successDeleteStatus: true, deleteResponse: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_DELETE_STATUS, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_GET_STATUS_BY_ID', () => {
    const initialState = {}
    const expectedState = {successGetStatusById: true, statusById: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_GET_STATUS_BY_ID, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })
   
  it('RECEIVE_EDIT_STATUS', () => {
    const initialState = {}
    const expectedState = {successEditStatus: true }
    const payload = {}
    const action = {
      type: RECEIVE_EDIT_STATUS, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })
   
  it('RECEIVE_CREATE_STATUS', () => {
    const initialState = {}
    const expectedState = {successCreateStatus: true, loadingCreateStatus: false}
    const payload = {}
    const action = {
      type: RECEIVE_CREATE_STATUS, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('RESET_AFTER_EDIT_CREATE', () => {
    const initialState = {}
    const expectedState = {successCreateStatus: false, successEditStatus: false, loadingCreateStatus: false}
    const payload = {}
    const action = {
      type: RESET_AFTER_EDIT_CREATE, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })  

  it('REQUEST_ERROR', () => {
    const initialState = {}
    const expectedState = {error: undefined,loading: false, successGetStatuses: false, successDeleteStatus: false,
      successGetStatusById: false, successEditStatus: false, successCreateStatus: false}
    const payload = {}
    const action = {
      type: REQUEST_ERROR, 
      payload
    }
    expect(statusReducer(initialState, action)).toEqual(expectedState)
  })
  
})
