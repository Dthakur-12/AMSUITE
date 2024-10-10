import {
  createReceiveDocument,
  createRequestDocument,
  createRequestGetDocumentByPersonId,
  CREATE_RECEIVE_DOCUMENT,
  CREATE_REQUEST_DOCUMENT,
  receiveAllDocumentsByEnterprises,
  receiveDeleteDocuments,
  receiveDocumentById,
  receiveDocumentFiles,
  receiveDocuments,
  receiveDocumentsExpiringBeforeDate,
  receiveDownloadDocFile,
  receiveEditDocument,
  RECEIVE_ALL_DOCS_BY_ENTERPRISES,
  RECEIVE_DELETE_DOCUMENTS,
  RECEIVE_DOCUMENTS,
  RECEIVE_DOCUMENTS_BY_ID,
  RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE,
  RECEIVE_DOCUMENT_FILES,
  RECEIVE_DOWNLOAD_DOCUMENTS_FILE,
  RECEIVE_EDIT_DOCUMENT,
  requestAllDocumentsByEnterprises,
  requestDeleteDocuments,
  requestDocumentById,
  requestDocumentError,
  requestDocumentFiles,
  requestDocuments,
  requestDocumentsExpiringBeforeDate,
  requestDocumentStatusGraphData,
  requestDownloadDocFile,
  requestEditDocument,
  requestGetDocumentFilesError,
  REQUEST_ALL_DOCS_BY_ENTERPRISES,
  REQUEST_DELETE_DOCUMENTS,
  REQUEST_DOCUMENTS,
  REQUEST_DOCUMENTS_BY_ID,
  REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
  REQUEST_DOCUMENT_ERROR,
  REQUEST_DOCUMENT_FILES,
  REQUEST_DOCUMENT_FILES_ERROR,
  REQUEST_DOWNLOAD_DOCUMENTS_FILE,
  REQUEST_EDIT_DOCUMENT,
  REQUEST_GET_DOCUMENT_BY_PERSONID,
  REQUEST_GET_DOCUMENT_STATUS_GRAPH,
} from '../../../actions/Aludoc/documents_action'

describe('Aludoc Document Actions', () => {
  test('createRequestDocument', () => {
    const document = {}
    const fileStream = {}
    const expected = {
      type: CREATE_REQUEST_DOCUMENT,
      data: { document, fileStream },
    }
    expect(createRequestDocument(document, fileStream)).toEqual(expected)
  })
  test('createReceiveDocument', () => {
    const id = 1
    const expected = {
      type: CREATE_RECEIVE_DOCUMENT,
      id,
    }
    expect(createReceiveDocument(id)).toEqual(expected)
  })
  test('requestDownloadDocFile', () => {
    const id = 1
    const expected = {
      type: REQUEST_DOWNLOAD_DOCUMENTS_FILE,
      id,
    }
    expect(requestDownloadDocFile(id)).toEqual(expected)
  })
  test('receiveDownloadDocFile', () => {
    const file = {}
    const expected = {
      type: RECEIVE_DOWNLOAD_DOCUMENTS_FILE,
      file,
    }
    expect(receiveDownloadDocFile(file)).toEqual(expected)
  })
  test('requestEditDocument', () => {
    const document = {}
    const fileStream = {}
    const expected = {
      type: REQUEST_EDIT_DOCUMENT,
      doc: { document, fileStream },
    }
    expect(requestEditDocument(document, fileStream)).toEqual(expected)
  })
  test('receiveEditDocument', () => {
    const id = 1
    const expected = {
      type: RECEIVE_EDIT_DOCUMENT,
      id,
    }
    expect(receiveEditDocument(id)).toEqual(expected)
  })
  test('requestDocumentById', () => {
    const document = {}
    const fileStream = {}
    const expected = {
      type: REQUEST_DOCUMENTS_BY_ID,
      data: { document, fileStream },
    }
    expect(requestDocumentById(document, fileStream)).toEqual(expected)
  })
  test('receiveDocumentById', () => {
    const docId = 1
    const expected = {
      type: RECEIVE_DOCUMENTS_BY_ID,
      docId,
    }
    expect(receiveDocumentById(docId)).toEqual(expected)
  })
  test('requestDocumentError', () => {
    const error = {}
    const expected = {
      type: REQUEST_DOCUMENT_ERROR,
      error,
    }
    expect(requestDocumentError(error)).toEqual(expected)
  })
  test('requestDocumentFiles', () => {
    const idDocument = 1
    const expected = {
      type: REQUEST_DOCUMENT_FILES,
      idDocument,
    }
    expect(requestDocumentFiles(idDocument)).toEqual(expected)
  })
  test('receiveDocumentFiles', () => {
    const files = {}
    const expected = {
      type: RECEIVE_DOCUMENT_FILES,
      files,
    }
    expect(receiveDocumentFiles(files)).toEqual(expected)
  })
  test('requestGetDocumentFilesError', () => {
    const error = {}
    const expected = {
      type: REQUEST_DOCUMENT_FILES_ERROR,
      error,
    }
    expect(requestGetDocumentFilesError(error)).toEqual(expected)
  })
  test('requestDocuments', () => {
    const info = {}
    const expected = {
      type: REQUEST_DOCUMENTS,
      info,
    }
    expect(requestDocuments(info)).toEqual(expected)
  })
  test('receiveDocuments', () => {
    const inf = []
    const expected = {
      type: RECEIVE_DOCUMENTS,
      inf,
    }
    expect(receiveDocuments(inf)).toEqual(expected)
  })
  test('requestDeleteDocuments', () => {
    const ids = []
    const expected = {
      type: REQUEST_DELETE_DOCUMENTS,
      ids,
    }
    expect(requestDeleteDocuments(ids)).toEqual(expected)
  })
  test('receiveDeleteDocuments', () => {
    const msjOk = {}
    const expected = {
      type: RECEIVE_DELETE_DOCUMENTS,
      msjOk,
    }
    expect(receiveDeleteDocuments(msjOk)).toEqual(expected)
  })
  test('requestDocumentsExpiringBeforeDate', () => {
    const info = {}
    const expected = {
      type: REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
      info,
    }
    expect(requestDocumentsExpiringBeforeDate(info)).toEqual(expected)
  })
  test('receiveDocumentsExpiringBeforeDate', () => {
    const docBDate = {}
    const expected = {
      type: RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE,
      docBDate,
    }
    expect(receiveDocumentsExpiringBeforeDate(docBDate)).toEqual(expected)
  })
  test('createRequestGetDocumentByPersonId', () => {
    const dataTable = {}
    const expected = {
      type: REQUEST_GET_DOCUMENT_BY_PERSONID,
      dataTable,
    }
    expect(createRequestGetDocumentByPersonId(dataTable)).toEqual(expected)
  })
  test('requestDocumentStatusGraphData', () => {
    const parameters = {}
    const expected = {
      type: REQUEST_GET_DOCUMENT_STATUS_GRAPH,
      parameters,
    }
    expect(requestDocumentStatusGraphData(parameters)).toEqual(expected)
  })
  test('requestAllDocumentsByEnterprises', () => {
    const info = {}
    const expected = {
      type: REQUEST_ALL_DOCS_BY_ENTERPRISES,
      info,
    }
    expect(requestAllDocumentsByEnterprises(info)).toEqual(expected)
  })
  test('receiveAllDocumentsByEnterprises', () => {
    const docBCompanies = {}
    const expected = {
      type: RECEIVE_ALL_DOCS_BY_ENTERPRISES,
      docBCompanies,
    }
    expect(receiveAllDocumentsByEnterprises(docBCompanies)).toEqual(expected)
  })
})
