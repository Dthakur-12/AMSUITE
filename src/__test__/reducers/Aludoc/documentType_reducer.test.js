import {
  RECEIVE_CATEGORIES,
  RECEIVE_CREATE_DOCUMENTTYPE,
  RECEIVE_DELETE_DOCTYPES,
  RECEIVE_DOCTYPES_BY_COMPANIES,
  RECEIVE_DOCUMENTTYPE,
  RECEIVE_DOCUMENTTYPE_BY_ID,
  RECEIVE_EDIT_DOCUMENTTYPE,
  REQUEST_CATEGORIES,
  REQUEST_CREATE_DOCUMENTTYPE,
  REQUEST_DELETE_DOCTYPES,
  REQUEST_DOCTYPES_BY_COMPANIES,
  REQUEST_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE_BY_ID,
  REQUEST_DOCUMENTTYPE_ERROR,
  REQUEST_EDIT_DOCUMENTTYPE,
} from '../../../actions/Aludoc/documentType_action'
import documentTypeReducer from '../../../reducers/Aludoc/documentType_reducers'

describe('Aludoc ControlsType Reducer', () => {
  it('REQUEST_DOCUMENTTYPE', () => {
    const payload = {}
    const action = {
      type: REQUEST_DOCUMENTTYPE,
      payload,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      isLoadingNewData: true,
      successDocType: false,
      error: true,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCUMENTTYPE', () => {
    const data = {
      data: 1,
      dataCount: 1,
    }
    const action = {
      type: RECEIVE_DOCUMENTTYPE,
      data,
    }
    const initialState = {}
    const expectedState = {
      documentType: action.data.data,
      documentTypeAllCount: action.data.dataCount,
      info: action.data,
      successDocType: true,
      loading: false,
      isLoadingNewData: false,
      isSearching: false,
      error: false,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_CREATE_DOCUMENTTYPE', () => {
    const data = {}
    const action = {
      type: REQUEST_CREATE_DOCUMENTTYPE,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      create: false,
      success: false,
      error: true,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_CREATE_DOCUMENTTYPE', () => {
    const data = 1
    const action = {
      type: RECEIVE_CREATE_DOCUMENTTYPE,
      data,
    }
    const initialState = {}
    const expectedState = {
      id: action.data,
      success: true,
      loading: false,
      create: true,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCUMENTTYPE_ERROR', () => {
    const error = 1
    const action = {
      type: REQUEST_DOCUMENTTYPE_ERROR,
      error,
    }
    const initialState = {}
    const expectedState = {
      success: false,
      loading: false,
      error: true,
      errorType: action.error,
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCTYPES_BY_COMPANIES', () => {
    const data = {}
    const action = {
      type: REQUEST_DOCTYPES_BY_COMPANIES,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successDTByCompanies: false,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCTYPES_BY_COMPANIES', () => {
    const data = 1
    const action = {
      type: RECEIVE_DOCTYPES_BY_COMPANIES,
      data,
    }
    const initialState = {}
    const expectedState = {
      successDTByCompanies: true,
      loading: false,
      infoDTByCompanies: action.data,
      error: false,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCTYPES_BY_COMPANIES', () => {
    const data = {}
    const action = {
      type: REQUEST_EDIT_DOCUMENTTYPE,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successEditDT: false,
      error: true,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_EDIT_DOCUMENTTYPE', () => {
    const data = {}
    const action = {
      type: RECEIVE_EDIT_DOCUMENTTYPE,
      data,
    }
    const initialState = {}
    const expectedState = {
      successEditDT: true,
      loading: false,
      error: false,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCUMENTTYPE_BY_ID', () => {
    const data = {}
    const action = {
      type: REQUEST_DOCUMENTTYPE_BY_ID,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successRequestDTById: false,
      error: true,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCUMENTTYPE_BY_ID', () => {
    const data = 1
    const action = {
      type: RECEIVE_DOCUMENTTYPE_BY_ID,
      data,
    }
    const initialState = {}
    const expectedState = {
      successRequestDTById: true,
      loading: false,
      error: false,
      errorType: '',
      doc: action.data,
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DELETE_DOCTYPES', () => {
    const data = {}
    const action = {
      type: REQUEST_DELETE_DOCTYPES,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successDeleteDT: false,
      error: true,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DELETE_DOCTYPES', () => {
    const data = {}
    const action = {
      type: RECEIVE_DELETE_DOCTYPES,
      data,
    }
    const initialState = {}
    const expectedState = {
      successDeleteDT: true,
      loading: false,
      error: false,
      errorType: '',
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_CATEGORIES', () => {
    const data = {}
    const action = {
      type: REQUEST_CATEGORIES,
      data,
    }
    const initialState = {}
    const expectedState = {}
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_CATEGORIES', () => {
    const data = 1
    const action = {
      type: RECEIVE_CATEGORIES,
      data,
    }
    const initialState = {}
    const expectedState = {
      categories: action.data,
    }
    expect(documentTypeReducer(initialState, action)).toEqual(expectedState)
  })
})
