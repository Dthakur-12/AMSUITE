import eventMonitoring_reducer from '../../../reducers/AccessControl/eventMonitoring_reducer'
import {
  REQUEST_GET_EVENTS,
  REQUEST_GET_EVENTS_REPORT,
  REQUEST_GET_EVENTS_XLS,
  REQUEST_GET_PERSON_ENTERPRISE_XLS,
  REQUEST_GET_ENTERPRISE_XLS,
  REQUEST_GET_EVENT_BY_ID,
  REQUEST_GET_PERSON_IMAGE,
  REQUEST_GET_ACCESS_IMAGE,
  RECEIVE_GET_EVENTS,
  RECEIVE_GET_EVENTS_REPORT,
  RECEIVE_GET_EVENTS_XLS,
  RECEIVE_GET_PERSON_ENTERPRISE_XLS,
  RECEIVE_GET_ENTERPRISE_XLS,
  RECEIVE_GET_EVENT_BY_ID,
  RECEIVE_GET_PERSON_IMAGE,
  RECEIVE_GET_ACCESS_IMAGE,
  REQUEST_ERROR,
} from '../../../actions/AccessControl/eventMonitoring_actions'

describe('eventMonitoring_reducer', () => {
  it('REQUEST_GET_EVENTS', () => {
    const initialState = {}
    const expectedState = { successGetEvents: false, loading: true }
    const payload = {}
    const action = {
      type: REQUEST_GET_EVENTS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_EVENTS_REPORT', () => {
    const initialState = {}
    const expectedState = { successGetEvents: false, loading: true }
    const payload = {}
    const action = {
      type: REQUEST_GET_EVENTS_REPORT,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_EVENTS_XLS', () => {
    const initialState = {}
    const expectedState = {
      successGetEvents: false,
      loading: true,
      error: undefined,
    }
    const payload = {}
    const action = {
      type: REQUEST_GET_EVENTS_XLS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_PERSON_ENTERPRISE_XLS', () => {
    const initialState = {}
    const expectedState = {
      successGetEvents: false,
      successDownloadPersonEnterpriseXLS: false,
      loading: true,
      error: undefined,
    }
    const payload = {}
    const action = {
      type: REQUEST_GET_PERSON_ENTERPRISE_XLS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_ENTERPRISE_XLS', () => {
    const initialState = {}
    const expectedState = {
      successGetEvents: false,
      successDownloadXLS: false,
      loading: true,
      error: undefined,
    }
    const payload = {}
    const action = {
      type: REQUEST_GET_ENTERPRISE_XLS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_EVENT_BY_ID', () => {
    const initialState = {}
    const expectedState = { successGetEventById: false, loadingGetById: true }
    const payload = {}
    const action = {
      type: REQUEST_GET_EVENT_BY_ID,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_PERSON_IMAGE', () => {
    const initialState = {}
    const expectedState = { successPersonImage: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_PERSON_IMAGE,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_GET_ACCESS_IMAGE', () => {
    const initialState = {}
    const expectedState = { successAccessImage: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_ACCESS_IMAGE,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_GET_EVENTS', () => {
    const initialState = {}
    const expectedState = { loading: false, successGetEvents: true }
    const payload = {}
    const action = {
      type: RECEIVE_GET_EVENTS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_EVENTS_REPORT', () => {
    const initialState = {}
    const expectedState = { loading: false, successGetEvents: true }
    const payload = {}
    const action = {
      type: RECEIVE_GET_EVENTS_REPORT,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_EVENTS_XLS', () => {
    const initialState = {}
    const expectedState = {
      eventReport: undefined,
      loading: false,
      successDownloadXLS: true,
    }
    const payload = {}
    const action = {
      type: RECEIVE_GET_EVENTS_XLS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_PERSON_ENTERPRISE_XLS', () => {
    const initialState = {}
    const expectedState = {
      loading: false,
      successDownloadPersonEnterpriseXLS: true,
    }
    const payload = {}
    const action = {
      type: RECEIVE_GET_PERSON_ENTERPRISE_XLS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_ENTERPRISE_XLS', () => {
    const initialState = {}
    const expectedState = { loading: false, successDownloadXLS: true }
    const payload = {}
    const action = {
      type: RECEIVE_GET_ENTERPRISE_XLS,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_EVENT_BY_ID', () => {
    const initialState = {}
    const expectedState = { successGetEventById: true, loadingGetById: false }
    const payload = {}
    const action = {
      type: RECEIVE_GET_EVENT_BY_ID,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_PERSON_IMAGE', () => {
    const initialState = {}
    const expectedState = { successPersonImage: true }
    const payload = {}
    const action = {
      type: RECEIVE_GET_PERSON_IMAGE,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_ACCESS_IMAGE', () => {
    const initialState = {}
    const expectedState = { successAccessImage: true }
    const payload = {}
    const action = {
      type: RECEIVE_GET_ACCESS_IMAGE,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_ERROR', () => {
    const initialState = {}
    const expectedState = {
      loading: false,
      loadingGetById: false,
      successAccessImage: false,
      successPersonImage: false,
      successGetEventById: false,
      successGetEvents: false,
      successDownloadXLS: false,
      successDownloadPersonEnterpriseXLS: false,
    }
    const payload = {}
    const action = {
      type: REQUEST_ERROR,
      payload,
    }
    expect(eventMonitoring_reducer(initialState, action)).toEqual(expectedState)
  })
})
