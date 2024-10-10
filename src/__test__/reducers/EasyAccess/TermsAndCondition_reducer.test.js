import {
  REQUEST_TERMS_AND_CONDITION,
  RECEIVE_TERMS_AND_CONDITION,
  REQUEST_INSERT_TERMS_AND_CONDITION,
  RECEIVE_INSERT_TERMS_AND_CONDITION,
  ERROR_TERMS_AND_CONDITION
} from '../../../actions/EasyAccess/TermsAndCondition_actions'

import termsAndConditionsReducer from '../../../reducers/EasyAccess/TermsAndCondition_reducer'

describe('termsAndConditionsReducer', () => {
  it('REQUEST_TERMS_AND_CONDITION', () => {
    const initialState = {}
    const expectedState = {loading: true }
    const payload = {}
    const action = {
      type: REQUEST_TERMS_AND_CONDITION, 
      payload
    }
    expect(termsAndConditionsReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_TERMS_AND_CONDITION', () => {
    const initialState = {}
    const expectedState = {loading: false, termsAndConditions: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_TERMS_AND_CONDITION, 
      payload
    }
    expect(termsAndConditionsReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_INSERT_TERMS_AND_CONDITION', () => {
    const initialState = {}
    const expectedState = {loading: true }
    const payload = {}
    const action = {
      type: REQUEST_INSERT_TERMS_AND_CONDITION, 
      payload
    }
    expect(termsAndConditionsReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_INSERT_TERMS_AND_CONDITION', () => {
    const initialState = {}
    const expectedState = {loading: false }
    const payload = {}
    const action = {
      type: RECEIVE_INSERT_TERMS_AND_CONDITION, 
      payload
    }
    expect(termsAndConditionsReducer(initialState, action)).toEqual(expectedState)
  })

  it('ERROR_TERMS_AND_CONDITION', () => {
    const initialState = {}
    const expectedState = {loading: false, error: undefined }
    const payload = {}
    const action = {
      type: ERROR_TERMS_AND_CONDITION, 
      payload
    }
    expect(termsAndConditionsReducer(initialState, action)).toEqual(expectedState)
  })

})
