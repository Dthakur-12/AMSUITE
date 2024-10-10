import {
  createReceiveControls,
  createRequestControl,
  CREATE_RECEIVE_CONTROL,
  CREATE_REQUEST_CONTROL,
  deleteReceiveControls,
  deleteRequestControl,
  DELETE_RECEIVE_CONTROL,
  DELETE_REQUEST_CONTROL,
  detailReceiveControls,
  detailRequestControl,
  DETAIL_RECEIVE_CONTROL,
  DETAIL_REQUEST_CONTROL,
  editReceiveControls,
  editRequestControl,
  receiveControls,
  receiveHighestControlId,
  requestControlPeopleGraphData,
  requestControls,
  requestControlsError,
  requestEnterprisesByControl,
  requestHighestControlId,
  requestIsControlNameAvailable,
  requestPersonByControl,
  requestSetControlsNotifications,
  EDIT_RECEIVE_CONTROL,
  EDIT_REQUEST_CONTROL,
  RECEIVE_CONTROLS,
  RECEIVE_HIGHEST_CONTROL_ID,
  REQUEST_COMPANIES_BY_CONTROL_ID,
  REQUEST_CONTROLS,
  REQUEST_CONTROLS_ERROR,
  REQUEST_CONTROL_PEOPLE_GRAPH_DATA,
  REQUEST_HIGHEST_CONTROL_ID,
  REQUEST_IS_CONTROL_NAME_AVAILABLE,
  REQUEST_PERSONS_BY_CONTROL,
  REQUEST_SET_CONTROL_NOTIFICATIONS,
} from '../../../actions/Aludoc/controls_actions'

describe('Aludoc Controls Actions', () => {
  it('requestEnterprisesByControl', () => {
    const id = 1
    const expected = {
      type: REQUEST_COMPANIES_BY_CONTROL_ID,
      id: 1,
    }
    expect(requestEnterprisesByControl(id)).toEqual(expected)
  })

  test('requestPersonByControl', () =>{
    const datatable = {}
    const expected = {
      type: REQUEST_PERSONS_BY_CONTROL,
      datatable
    }
    expect(requestPersonByControl(datatable)).toEqual(expected)
  })

  it('requestControls', () => {
    const datatable = {}
    const expected = {
      type: REQUEST_CONTROLS,
      datatable: {},
    }
    expect(requestControls(datatable)).toEqual(expected)
  })

  test('requestSetControlsNotifications', () =>{
    const data = {}
    const expected = {
      type: REQUEST_SET_CONTROL_NOTIFICATIONS,
      data
    }
    expect(requestSetControlsNotifications(data)).toEqual(expected)
  })
  
  test('receiveControls', () =>{
    const controls = []
    const expected = {
      type: RECEIVE_CONTROLS,
      controls
    }
    expect(receiveControls(controls)).toEqual(expected)
  })

  test('requestHighestControlId', () => {
    const expected = {
      type: REQUEST_HIGHEST_CONTROL_ID,
    }
    expect(requestHighestControlId()).toEqual(expected)
  })

  test('receiveHighestControlId', ()=>{
    const highestControlId = 1
    const expected = {
      type: RECEIVE_HIGHEST_CONTROL_ID,
      highestControlId
    }
    expect(receiveHighestControlId(highestControlId)).toEqual(expected)
  })

  test('createReceiveControls', () => {
    const id = {}
    const expected = {
      type: CREATE_RECEIVE_CONTROL,
      id,
    }
    expect(createReceiveControls(id)).toEqual(expected)
  })

  test('createRequestControl', () =>{
    const control = {}
    const expected ={
      type: CREATE_REQUEST_CONTROL,
      control
    }
    expect(createRequestControl(control)).toEqual(expected)
  })
  
  test('editReceiveControl', () => {
    const id = {}
    const expected = {
      type: EDIT_RECEIVE_CONTROL,
      id
    }
    expect(editReceiveControls(id)).toEqual(expected)
  })

  test('editRequestControl', () =>{
    const control = {}
    const expected = {
      type: EDIT_REQUEST_CONTROL,
      control
    }
    expect(editRequestControl(control)).toEqual(expected)
  })

  test('detailReceiveControls', ()=>{
    const control = {}
    const expected = {
      type: DETAIL_RECEIVE_CONTROL, 
      control
    }
    expect(detailReceiveControls(control)).toEqual(expected)
  })

  test('deleteRequestControl', () =>{
    const payload= {}
    const expected = {
      type: DELETE_REQUEST_CONTROL,
      payload
    }
    expect(deleteRequestControl(payload)).toEqual(expected)
  })

      
  test('deleteReceiveControls', () =>{
    const success = true
    const expected = {
      type: DELETE_RECEIVE_CONTROL,
      success
    }
    expect(deleteReceiveControls(success)).toEqual(expected)
  })

  test('detailRequestControl', () =>{
    const payload = {}
    const expected = {
      type: DETAIL_REQUEST_CONTROL,
      payload
    }
    expect(detailRequestControl(payload)).toEqual(expected)
  })

  test('requestControlsError', () =>{
    const error = {}
    const expected = {
      type: REQUEST_CONTROLS_ERROR,
      error
    }
    expect(requestControlsError(error)).toEqual(expected)
  })

  test('requestControlPeopleGraphData', () => {
    const expected = {
      type: REQUEST_CONTROL_PEOPLE_GRAPH_DATA
    }
    expect(requestControlPeopleGraphData()).toEqual(expected)
  })

  test('requestIsControlNameAvailable', () =>{
    const controlName = {}
    const expected ={
      type: REQUEST_IS_CONTROL_NAME_AVAILABLE,
      controlName
    }
    expect(requestIsControlNameAvailable(controlName)).toEqual(expected)
  })
})
