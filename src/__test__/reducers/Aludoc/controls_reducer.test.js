import {
  CREATE_RECEIVE_CONTROL,
  CREATE_REQUEST_CONTROL,
  DELETE_RECEIVE_CONTROL,
  DELETE_REQUEST_CONTROL,
  DETAIL_RECEIVE_CONTROL,
  DETAIL_REQUEST_CONTROL,
  EDIT_RECEIVE_CONTROL,
  EDIT_REQUEST_CONTROL,
  RECEIVE_COMPANIES_BY_CONTROL_ID,
  RECEIVE_CONTROLS,
  RECEIVE_CONTROL_PEOPLE_GRAPH_DATA,
  RECEIVE_HIGHEST_CONTROL_ID,
  RECEIVE_IS_CONTROL_NAME_AVAILABLE,
  RECEIVE_PERSONS_BY_CONTROL,
  RECEIVE_SET_CONTROL_NOTIFICATIONS,
  REQUEST_COMPANIES_BY_CONTROL_ID,
  REQUEST_CONTROLS,
  REQUEST_CONTROLS_ERROR,
  REQUEST_CONTROL_PEOPLE_GRAPH_DATA,
  REQUEST_HIGHEST_CONTROL_ID,
  REQUEST_IS_CONTROL_NAME_AVAILABLE,
  REQUEST_PERSONS_BY_CONTROL,
  REQUEST_SET_CONTROL_NOTIFICATIONS,
} from '../../../actions/Aludoc/controls_actions'
import controlsReducer from '../../../reducers/Aludoc/controls_reducers'

describe('Aludoc Controls Reducer', () => {
  it('REQUEST_CONTROLS', () => {
    const initialState = {}
    const expectedState = { loading: true, isLoadingNewData: true }
    const payload = {}
    const action = {
      type: REQUEST_CONTROLS,
      payload,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('CREATE_REQUEST_CONTROL', () => {
    const initialState = {}
    const expectedState = { loading: true, error: false, successCr: false }
    const payload = {}
    const action = {
      type: CREATE_REQUEST_CONTROL,
      payload,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_SET_CONTROL_NOTIFICATIONS', () => {
    const initialState = {}
    const expectedState = { loadingNotification: true, successNotif: false }
    const payload = {}
    const action = {
      type: REQUEST_SET_CONTROL_NOTIFICATIONS,
      payload,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_SET_CONTROL_NOTIFICATIONS', () => {
    const initialState = {}
    const expectedState = { loadingNotification: false, successNotif: true }
    const payload = {}
    const action = {
      type: RECEIVE_SET_CONTROL_NOTIFICATIONS,
      payload,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_CONTROLS', () => {
    const initialState = {}
    const data = {
      data: [1],
      dataCount: 1,
    }
    const action = {
      type: RECEIVE_CONTROLS,
      data,
    }
    const expectedState = {
      controls: action.data.data,
      dataCount: action.data.dataCount,
      loading: false,
      error: false,
      isLoadingNewData: false,
      isSearching: false,
    }

    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_COMPANIES_BY_CONTROL_ID', () => {
    const initialState = {}
    const expectedState = {
      successEnterprise: false,
      loadingEnterprise: true,
    }
    const data = {}
    const action = {
      type: REQUEST_COMPANIES_BY_CONTROL_ID,
      data,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_COMPANIES_BY_CONTROL_ID', () => {
    const initialState = {}
    const data = [1]
    const action = {
      type: RECEIVE_COMPANIES_BY_CONTROL_ID,
      data,
    }
    const expectedState = {
      successEnterprise: true,
      loadingEnterprise: false,
      enterprises: action.data,
    }

    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_HIGHEST_CONTROL_ID', () => {
    const initialState = {}
    const expectedState = {
      loadingHighestId: true,
      loading: true,
      error: true,
    }
    const data = {}
    const action = {
      type: REQUEST_HIGHEST_CONTROL_ID,
      data,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_HIGHEST_CONTROL_ID', () => {
    const initialState = {}
    const data = {
      highestControlId: 2,
    }
    const action = {
      type: RECEIVE_HIGHEST_CONTROL_ID,
      data,
    }
    const expectedState = {
      loading: false,
      loadingHighestId: false,
      error: false,
      highestControlId: action.data.highestControlId,
      isLoadingNewData: false,
      isSearching: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('CREATE_RECEIVE_CONTROL', () => {
    const initialState = {}
    const data = 1
    const action = {
      type: CREATE_RECEIVE_CONTROL,
      data,
    }
    const expectedState = {
      loading: false,
      successCr: action.data !== -1,
      error: action.data === -1,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('EDIT_REQUEST_CONTROL', () => {
    const initialState = {}
    const data = {}
    const action = {
      type: EDIT_REQUEST_CONTROL,
      data,
    }
    const expectedState = {
      loading: true,
      isEditSuccess: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('EDIT_RECEIVE_CONTROL', () => {
    const initialState = {}
    const data = 1
    const action = {
      type: EDIT_RECEIVE_CONTROL,
      data,
    }
    const expectedState = {
      id: -1,
      isEditSuccess: action.data,
      loading: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('DELETE_REQUEST_CONTROL', () => {
    const initialState = {}
    const data = {}
    const action = {
      type: DELETE_REQUEST_CONTROL,
      data,
    }
    const expectedState = {
      isDeleted: false,
      loading: true,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('DELETE_RECEIVE_CONTROL', () => {
    const initialState = {}
    const data = 1
    const action = {
      type: DELETE_RECEIVE_CONTROL,
      data,
    }
    const expectedState = {
      error: false,
      isDeleted: action.data,
      loading: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('DETAIL_REQUEST_CONTROL', () => {
    const initialState = {}
    const data = {}
    const action = {
      type: DETAIL_REQUEST_CONTROL,
      data,
    }
    const expectedState = {
      error: false,
      loading: true,
      successDetails: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('DETAIL_RECEIVE_CONTROL', () => {
    const initialState = {}
    const data = 1
    const action = {
      type: DETAIL_RECEIVE_CONTROL,
      control: data,
    }
    const expectedState = {
      control: action.control,
      error: false,
      successDetails: true,
      loading: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_PERSONS_BY_CONTROL', () => {
    const initialState = {}
    const data = {}
    const action = {
      type: REQUEST_PERSONS_BY_CONTROL,
      control: data,
    }
    const expectedState = {
      successGetPerson: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_PERSONS_BY_CONTROL', () => {
    const initialState = {}
    const data = {
      data: 1,
      dataCount: 1,
    }
    const action = {
      type: RECEIVE_PERSONS_BY_CONTROL,
      data,
    }
    const expectedState = {
      control: {
        people: action.data.data,
        peopleCount: action.data.dataCount,
      },
      successGetPerson: true,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_CONTROLS_ERROR', () => {
    const initialState = {}
    const data = {}
    const action = {
      type: REQUEST_CONTROLS_ERROR,
      data,
    }
    const expectedState = {
      error: true,
      errorText: '',
      loading: false,
      success: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_CONTROL_PEOPLE_GRAPH_DATA', () => {
    const initialState = {}
    const data = {}
    const action = {
      type: REQUEST_CONTROL_PEOPLE_GRAPH_DATA,
      data,
    }
    const expectedState = {
      loadingControlPeopleGraphData: true,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_CONTROL_PEOPLE_GRAPH_DATA', () => {
    const initialState = {}
    const data = 1
    const action = {
      type: RECEIVE_CONTROL_PEOPLE_GRAPH_DATA,
      data,
    }
    const expectedState = {
      loadingControlPeopleGraphData: false,
      controlPeopleGraphData: action.data,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_IS_CONTROL_NAME_AVAILABLE', () => {
    const initialState = {}
    const data = {}
    const action = {
      type: REQUEST_IS_CONTROL_NAME_AVAILABLE,
      data,
    }
    const expectedState = {
      loadingNameAvailable: true,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_IS_CONTROL_NAME_AVAILABLE', () => {
    const initialState = {}
    const data = 1
    const action = {
      type: RECEIVE_IS_CONTROL_NAME_AVAILABLE,
      data,
    }
    const expectedState = {
      isNameAvailable: action.data,
      loadingNameAvailable: false,
    }
    expect(controlsReducer(initialState, action)).toEqual(expectedState)
  })
})
