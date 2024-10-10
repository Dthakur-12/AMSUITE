export const CREATE_RECEIVE_DOCUMENT = "CREATE_RECEIVE_DOCUMENT";
export const REQUEST_DOCUMENT_ERROR = "REQUEST_DOCUMENT_ERROR";
export const CREATE_REQUEST_DOCUMENT = "CREATE_REQUEST_DOCUMENT";
export const REQUEST_DOCUMENT_FILES = "REQUEST_DOCUMENT_FILES";
export const RECEIVE_DOCUMENT_FILES = "RECEIVE_DOCUMENT_FILES";
export const REQUEST_DOCUMENT_FILES_ERROR = "REQUEST_DOCUMENT_FILES_ERROR";
export const REQUEST_DOCUMENTS = "REQUEST_DOCUMENTS";
export const RECEIVE_DOCUMENTS = "RECEIVE_DOCUMENTS";
export const REQUEST_DOCUMENTS_BY_ID = "REQUEST_DOCUMENTS_BY_ID";
export const RECEIVE_DOCUMENTS_BY_ID = "RECEIVE_DOCUMENTS_BY_ID";
export const REQUEST_EDIT_DOCUMENT = "REQUEST_EDIT_DOCUMENT";
export const RECEIVE_EDIT_DOCUMENT = "RECEIVE_EDIT_DOCUMENT";
export const REQUEST_DELETE_DOCUMENTS = "REQUEST_DELETE_DOCUMENTS";
export const RECEIVE_DELETE_DOCUMENTS = "RECEIVE_DELETE_DOCUMENTS";
export const REQUEST_DOWNLOAD_DOCUMENTS_FILE =
  "REQUEST_DOWNLOAD_DOCUMENTS_FILE";
export const RECEIVE_DOWNLOAD_DOCUMENTS_FILE =
  "RECEIVE_DOWNLOAD_DOCUMENTS_FILE";
export const REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE =
  "REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE";
export const RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE =
  "RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE";
export const REQUEST_ALL_DOCS_BY_ENTERPRISES =
  "REQUEST_ALL_DOCS_BY_ENTERPRISES";
export const RECEIVE_ALL_DOCS_BY_ENTERPRISES =
  "RECEIVE_ALL_DOCS_BY_ENTERPRISES";

export const RECEIVE_GET_DOCUMENT_BY_PERSONID =
  "RECEIVE_GET_DOCUMENT_BY_PERSONID";
export const REQUEST_GET_DOCUMENT_BY_PERSONID =
  "REQUEST_GET_DOCUMENT_BY_PERSONID";
export const REQUEST_GET_DOCUMENT_BY_PERSONID_ERROR =
  "REQUEST_GET_DOCUMENT_BY_PERSONID_ERROR";

export const REQUEST_GET_DOCUMENT_STATUS_GRAPH =
  "REQUEST_GET_DOCUMENT_STATUS_GRAPH";
export const RECEIVE_GET_DOCUMENT_STATUS_GRAPH =
  "RECEIVE_GET_DOCUMENT_STATUS_GRAPH";

export const createRequestDocument = (document, fileStream) => ({
  type: CREATE_REQUEST_DOCUMENT,
  data: { document, fileStream }
});

export const createReceiveDocument = id => ({
  type: CREATE_RECEIVE_DOCUMENT,
  id
});

export const requestDownloadDocFile = id => ({
  type: REQUEST_DOWNLOAD_DOCUMENTS_FILE,
  id
});

export const receiveDownloadDocFile = file => ({
  type: RECEIVE_DOWNLOAD_DOCUMENTS_FILE,
  file
});

export const requestEditDocument = (document, fileStream) => ({
  type: REQUEST_EDIT_DOCUMENT,
  doc: { document, fileStream }
});

export const receiveEditDocument = id => ({
  type: RECEIVE_EDIT_DOCUMENT,
  id
});

export const requestDocumentById = (document, fileStream) => ({
  type: REQUEST_DOCUMENTS_BY_ID,
  data: { document, fileStream }
});

export const receiveDocumentById = docId => ({
  type: RECEIVE_DOCUMENTS_BY_ID,
  docId
});

export const requestDocumentError = error => ({
  type: REQUEST_DOCUMENT_ERROR,
  error
});

//   Obtener los archivos de un documento

export const requestDocumentFiles = idDocument => ({
  type: REQUEST_DOCUMENT_FILES,
  idDocument
});

export const receiveDocumentFiles = files => ({
  type: RECEIVE_DOCUMENT_FILES,
  files
});

export const requestGetDocumentFilesError = error => ({
  type: REQUEST_DOCUMENT_FILES_ERROR,
  error
});
export const requestDocuments = info => ({
  type: REQUEST_DOCUMENTS,
  info
});

export const receiveDocuments = inf => ({
  type: RECEIVE_DOCUMENTS,
  inf
});

export const requestDeleteDocuments = ids => ({
  type: REQUEST_DELETE_DOCUMENTS,
  ids
});

export const receiveDeleteDocuments = msjOk => ({
  type: RECEIVE_DELETE_DOCUMENTS,
  msjOk
});

export const requestDocumentsExpiringBeforeDate = info => ({
  type: REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
  info
});

export const receiveDocumentsExpiringBeforeDate = docBDate => ({
  type: RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE,
  docBDate
});
export const createRequestGetDocumentByPersonId = dataTable => ({
  type: REQUEST_GET_DOCUMENT_BY_PERSONID,
  dataTable
});

export const requestDocumentStatusGraphData = parameters => ({
  type: REQUEST_GET_DOCUMENT_STATUS_GRAPH,
  parameters
});

export const requestAllDocumentsByEnterprises = info => ({
  type: REQUEST_ALL_DOCS_BY_ENTERPRISES,
  info
});

export const receiveAllDocumentsByEnterprises = docBCompanies => ({
  type: RECEIVE_ALL_DOCS_BY_ENTERPRISES,
  docBCompanies
});
