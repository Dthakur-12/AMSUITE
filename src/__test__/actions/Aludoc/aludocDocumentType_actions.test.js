
import {
  getDocumentTypesByCompanies,
  receiveCreateDocumentType,
  receiveDeleteDocTypes,
  receiveDocumentType,
  receiveDocumentTypeById,
  receiveDocumentTypesByCompanies,
  receiveEditDocumentType,
  RECEIVE_CREATE_DOCUMENTTYPE,
  RECEIVE_DELETE_DOCTYPES,
  RECEIVE_DOCTYPES_BY_COMPANIES,
  RECEIVE_DOCUMENTTYPE,
  RECEIVE_DOCUMENTTYPE_BY_ID,
  RECEIVE_EDIT_DOCUMENTTYPE,
  requestCategories,
  requestCreateDocumentType,
  requestDeleteDocTypes,
  requestDocumentType,
  requestDocumentTypeById,
  requestDocumentTypeError,
  requestEditDocumentType,
  REQUEST_CATEGORIES,
  REQUEST_CREATE_DOCUMENTTYPE,
  REQUEST_DELETE_DOCTYPES,
  REQUEST_DOCTYPES_BY_COMPANIES,
  REQUEST_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE_BY_ID,
  REQUEST_DOCUMENTTYPE_ERROR,
  REQUEST_EDIT_DOCUMENTTYPE,
} from '../../../actions/Aludoc/documentType_action'

describe('Aludoc DocumentType Actions', () => {
  test('receiveDocumentType', () => {
    const documentType = {}
    const expected = {
      type: RECEIVE_DOCUMENTTYPE,
      documentType,
    }
    expect(receiveDocumentType(documentType)).toEqual(expected)
  })
  test('requestDocumentType', () => {
    const dataTable = {}
    const expected = {
      type: REQUEST_DOCUMENTTYPE,
      dataTable,
    }
    expect(requestDocumentType(dataTable)).toEqual(expected)
  })
  test('requestCreateDocumentType', () => {
    const documentType = {}
    const expected = {
      type: REQUEST_CREATE_DOCUMENTTYPE,
      documentType,
    }
    expect(requestCreateDocumentType(documentType)).toEqual(expected)
  })
  test('receiveCreateDocumentType', () => {
    const id = 1
    const expected = {
      type: RECEIVE_CREATE_DOCUMENTTYPE,
      id,
    }
    expect(receiveCreateDocumentType(id)).toEqual(expected)
  })
  test('requestEditDocumentType', () => {
    const dto = {}
    const expected = {
      type: REQUEST_EDIT_DOCUMENTTYPE,
      dto,
    }
    expect(requestEditDocumentType(dto)).toEqual(expected)
  })
  test('receiveEditDocumentType', () => {
    const id = 1
    const expected = {
      type: RECEIVE_EDIT_DOCUMENTTYPE,
      id,
    }
    expect(receiveEditDocumentType(id)).toEqual(expected)
  })
  test('requestDocumentTypeError', () => {
    const error = {}
    const expected = {
      type: REQUEST_DOCUMENTTYPE_ERROR,
      error,
    }
    expect(requestDocumentTypeError(error)).toEqual(expected)
  })
  test('getDocumentTypesByCompanies', () => {
    const info = {}
    const expected = {
      type: REQUEST_DOCTYPES_BY_COMPANIES,
      info,
    }
    expect(getDocumentTypesByCompanies(info)).toEqual(expected)
  })
  test('receiveDocumentTypesByCompanies', () => {
    const info = {}
    const expected = {
      type: RECEIVE_DOCTYPES_BY_COMPANIES,
      info,
    }
    expect(receiveDocumentTypesByCompanies(info)).toEqual(expected)
  })
  test('requestDocumentTypeById', () => {
    const id = {}
    const expected = {
      type: REQUEST_DOCUMENTTYPE_BY_ID,
      id,
    }
    expect(requestDocumentTypeById(id)).toEqual(expected)
  })
  test('receiveDocumentTypeById', () => {
    const info = {}
    const expected = {
      type: RECEIVE_DOCUMENTTYPE_BY_ID,
      info,
    }
    expect(receiveDocumentTypeById(info)).toEqual(expected)
  })
  test('requestDeleteDocTypes', () => {
    const ids = []
    const expected = {
      type: REQUEST_DELETE_DOCTYPES,
      ids,
    }
    expect(requestDeleteDocTypes(ids)).toEqual(expected)
  })
  test('receiveDeleteDocTypes', () => {
    const doc = {}
    const expected = {
      type: RECEIVE_DELETE_DOCTYPES,
      doc,
    }
    expect(receiveDeleteDocTypes(doc)).toEqual(expected)
  })
  test('requestCategories', () => {
    const dataTable = {}
    const expected = {
      type: REQUEST_CATEGORIES,
      dataTable,
    }
    expect(requestCategories(dataTable)).toEqual(expected)
  })
})
