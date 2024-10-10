import { REQUEST_GET_BUS_REPORT, RECEIVE_GET_BUS_REPORT, BUS_ERROR, CLEAR_BUS_ERROR, CLEAR_BUS_REPORT  } from '../../../actions/Reports/busValidation_actions'
import busValidationReducers from '../../../reducers/Reports/busValidation_reducer'

describe('busValidationReducers', () => {
  it('REQUEST_GET_BUS_REPORT', () => {
    const initialState = {}
    const expectedState = {error: null, loading: true }
    const payload = {}
    const action = {
      type: REQUEST_GET_BUS_REPORT, 
      payload
    }
    expect(busValidationReducers(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_GET_BUS_REPORT', () => {
    const initialState = {}
    const expectedState = {loading: false, report: {} }
    const payload = {}
    const action = {
      type: RECEIVE_GET_BUS_REPORT, 
      payload
    }
    expect(busValidationReducers(initialState, action)).toEqual(expectedState)
  })

  it('BUS_ERROR', () => {
    const initialState = {}
    const expectedState = {loading: false, error: {} }
    const payload = {}
    const action = {
      type: BUS_ERROR, 
      payload
    }
    expect(busValidationReducers(initialState, action)).toEqual(expectedState)
  })

  it('CLEAR_BUS_ERROR', () => {
    const initialState = {}
    const expectedState = {error: null }
    const payload = {}
    const action = {
      type: CLEAR_BUS_ERROR, 
      payload
    }
    expect(busValidationReducers(initialState, action)).toEqual(expectedState)
  })

  it('CLEAR_BUS_REPORT', () => {
    const initialState = {}
    const expectedState = {report: null }
    const payload = {}
    const action = {
      type: CLEAR_BUS_REPORT, 
      payload
    }
    expect(busValidationReducers(initialState, action)).toEqual(expectedState)
  })

})