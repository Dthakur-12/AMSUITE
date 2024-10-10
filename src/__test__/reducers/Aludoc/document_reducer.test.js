import {
  CREATE_RECEIVE_DOCUMENT,
  CREATE_REQUEST_DOCUMENT,
  RECEIVE_ALL_DOCS_BY_ENTERPRISES,
  RECEIVE_DELETE_DOCUMENTS,
  RECEIVE_DOCUMENTS,
  RECEIVE_DOCUMENTS_BY_ID,
  RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE,
  RECEIVE_DOCUMENT_FILES,
  RECEIVE_DOWNLOAD_DOCUMENTS_FILE,
  RECEIVE_EDIT_DOCUMENT,
  RECEIVE_GET_DOCUMENT_BY_PERSONID,
  RECEIVE_GET_DOCUMENT_STATUS_GRAPH,
  REQUEST_ALL_DOCS_BY_ENTERPRISES,
  REQUEST_DELETE_DOCUMENTS,
  REQUEST_DOCUMENTS,
  REQUEST_DOCUMENTS_BY_ID,
  REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
  REQUEST_DOCUMENT_ERROR,
  REQUEST_DOCUMENT_FILES,
  REQUEST_DOWNLOAD_DOCUMENTS_FILE,
  REQUEST_EDIT_DOCUMENT,
  REQUEST_GET_DOCUMENT_BY_PERSONID,
  REQUEST_GET_DOCUMENT_BY_PERSONID_ERROR,
  REQUEST_GET_DOCUMENT_STATUS_GRAPH,
} from '../../../actions/Aludoc/documents_action'
import documentReducer from '../../../reducers/Aludoc/document_reducers'

describe('Aludoc Controls Reducer', () => {
  it('CREATE_REQUEST_DOCUMENT', () => {
    const payload = {}
    const action = {
      type: CREATE_REQUEST_DOCUMENT,
      payload,
    }
    const initialState = {}
    const expectedState = { createSuccess: false, loadingCreate: true }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('CREATE_RECEIVE_DOCUMENT', () => {
    const payload = {}
    const action = {
      type: CREATE_RECEIVE_DOCUMENT,
      payload,
    }
    const initialState = {}
    const expectedState = {
      createSuccess: true,
      success: true,
      loadingCreate: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_EDIT_DOCUMENT', () => {
    const payload = {}
    const action = {
      type: REQUEST_EDIT_DOCUMENT,
      payload,
    }
    const initialState = {}
    const expectedState = {
      editSuccess: false,
      loadingCreate: true,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_EDIT_DOCUMENT', () => {
    const data = 1
    const action = {
      type: RECEIVE_EDIT_DOCUMENT,
      data,
    }
    const initialState = {}
    const expectedState = {
      editSuccess: true,
      success: true,
      loadingCreate: false,
      isOk: action.data,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCUMENTS_BY_ID', () => {
    const data = {}
    const action = {
      type: REQUEST_DOCUMENTS_BY_ID,
      data,
    }
    const initialState = {}
    const expectedState = {
      successDocByID: false,
      loading: true,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCUMENTS_BY_ID', () => {
    const data = 1
    const action = {
      type: RECEIVE_DOCUMENTS_BY_ID,
      data,
    }
    const initialState = {}
    const expectedState = {
      successDocByID: true,
      success: true,
      loading: false,
      docById: action.data,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCUMENTS', () => {
    const data = {}
    const action = {
      type: REQUEST_DOCUMENTS,
      data,
    }
    const initialState = {}
    const expectedState = {
      successDocs: false,
      loadingDoc: true,
      loading: true,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCUMENTS', () => {
    const data = 1
    const action = {
      type: RECEIVE_DOCUMENTS,
      data,
    }
    const initialState = {}
    const expectedState = {
      successDocs: true,
      loadingDoc: false,
      info: action.data,
      loading: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCUMENT_ERROR', () => {
    const error = true
    const action = {
      type: REQUEST_DOCUMENT_ERROR,
      error,
    }
    const initialState = {}
    const expectedState = {
      success: false,
      loading: false,
      error: action.error,
      loadingDocuments: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCUMENT_FILES', () => {
    const data = {}
    const action = {
      type: REQUEST_DOCUMENT_FILES,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successFiles: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCUMENT_FILES', () => {
    const data = 1
    const action = {
      type: RECEIVE_DOCUMENT_FILES,
      data,
    }
    const initialState = {}
    const expectedState = {
      documentFiles: action.data,
      successFiles: true,
      loading: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOWNLOAD_DOCUMENTS_FILE', () => {
    const data = {}
    const action = {
      type: REQUEST_DOWNLOAD_DOCUMENTS_FILE,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successDownloadFile: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOWNLOAD_DOCUMENTS_FILE', () => {
    const data = 1
    const action = {
      type: RECEIVE_DOWNLOAD_DOCUMENTS_FILE,
      data,
    }
    const initialState = {}
    const expectedState = {
      downloadFile: action.data,
      successDownloadFile: true,
      loading: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DELETE_DOCUMENTS', () => {
    const data = {}
    const action = {
      type: REQUEST_DELETE_DOCUMENTS,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successDelete: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DELETE_DOCUMENTS', () => {
    const data = 1
    const action = {
      type: RECEIVE_DELETE_DOCUMENTS,
      data,
    }
    const initialState = {}
    const expectedState = {
      msjOk: action.data,
      successDelete: true,
      loading: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE', () => {
    const data = {}
    const action = {
      type: REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successDocsExpiringBfDate: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE', () => {
    const data = 1
    const action = {
      type: RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE,
      data,
    }
    const initialState = {}
    const expectedState = {
      docBDate: action.data,
      successDocsExpiringBfDate: true,
      loading: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_ALL_DOCS_BY_ENTERPRISES', () => {
    const data = {}
    const action = {
      type: REQUEST_ALL_DOCS_BY_ENTERPRISES,
      data,
    }
    const initialState = {}
    const expectedState = {
      loading: true,
      successAllDocumentsByEnterprises: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_ALL_DOCS_BY_ENTERPRISES', () => {
    const data = 1
    const action = {
      type: RECEIVE_ALL_DOCS_BY_ENTERPRISES,
      data,
    }
    const initialState = {}
    const expectedState = {
      docBCompanies: action.data,
      successAllDocumentsByEnterprises: true,
      loading: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_DOCUMENT_BY_PERSONID', () => {
    const data = {}
    const action = {
      type: REQUEST_GET_DOCUMENT_BY_PERSONID,
      data,
    }
    const initialState = {}
    const expectedState = {
      loadingDocuments: true,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_DOCUMENT_BY_PERSONID', () => {
    const data = 1
    const action = {
      type: RECEIVE_GET_DOCUMENT_BY_PERSONID,
      data,
    }
    const initialState = {}
    const expectedState = {
      personDocuments: action.data,
      loadingDocuments: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_DOCUMENT_BY_PERSONID_ERROR', () => {
    const data = {}
    const action = {
      type: REQUEST_GET_DOCUMENT_BY_PERSONID_ERROR,
      data,
    }
    const initialState = {}
    const expectedState = {
      loadingDocuments: false,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('REQUEST_GET_DOCUMENT_STATUS_GRAPH', () => {
    const data = {}
    const action = {
      type: REQUEST_GET_DOCUMENT_STATUS_GRAPH,
      data,
    }
    const initialState = {}
    const expectedState = {
      loadingDocumentStatusGraphData: true,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_GET_DOCUMENT_STATUS_GRAPH', () => {
    const data = 1
    const action = {
      type: RECEIVE_GET_DOCUMENT_STATUS_GRAPH,
      data,
    }
    const initialState = {}
    const expectedState = {
      loadingDocumentStatusGraphData: false,
      documentStatusData: action.data,
    }
    expect(documentReducer(initialState, action)).toEqual(expectedState)
  })
})
