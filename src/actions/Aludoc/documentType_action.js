export const RECEIVE_DOCUMENTTYPE = "RECEIVE_DOCUMENTTYPE";
export const REQUEST_DOCUMENTTYPE = "REQUEST_DOCUMENTTYPE";
export const RECEIVE_CREATE_DOCUMENTTYPE = "RECEIVE_CREATE_DOCUMENTTYPE";
export const REQUEST_CREATE_DOCUMENTTYPE = "REQUEST_CREATE_DOCUMENTTYPE";
export const REQUEST_DOCUMENTTYPE_ERROR = "REQUEST_DOCUMENTTYPE_ERROR";
export const REQUEST_DOCTYPES_BY_COMPANIES = "REQUEST_DOCTYPES_BY_COMPANIES";
export const RECEIVE_DOCTYPES_BY_COMPANIES = "RECEIVE_DOCTYPES_BY_COMPANIES";
export const RECEIVE_DELETE_DOCTYPES = "RECEIVE_DELETE_DOCTYPES";
export const REQUEST_DELETE_DOCTYPES = "REQUEST_DELETE_DOCTYPES";
export const REQUEST_EDIT_DOCUMENTTYPE = "REQUEST_EDIT_DOCUMENTTYPE";
export const RECEIVE_EDIT_DOCUMENTTYPE = "RECEIVE_EDIT_DOCUMENTTYPE";
export const REQUEST_DOCUMENTTYPE_BY_ID = "REQUEST_DOCUMENTTYPE_BY_ID";
export const RECEIVE_DOCUMENTTYPE_BY_ID = "RECEIVE_DOCUMENTTYPE_BY_ID";
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveDocumentType = documentType => ({
  type: RECEIVE_DOCUMENTTYPE,
  documentType
});

export const requestDocumentType = dataTable => ({
  type: REQUEST_DOCUMENTTYPE,
  dataTable
});

export const requestCreateDocumentType = documentType => ({
  type: REQUEST_CREATE_DOCUMENTTYPE,
  documentType
});

export const receiveCreateDocumentType = id => ({
  type: RECEIVE_CREATE_DOCUMENTTYPE,
  id
});

export const requestEditDocumentType = dto => ({
  type: REQUEST_EDIT_DOCUMENTTYPE,
  dto
});

export const receiveEditDocumentType = id => ({
  type: RECEIVE_EDIT_DOCUMENTTYPE,
  id
});

export const requestDocumentTypeError = error => ({
  type: REQUEST_DOCUMENTTYPE_ERROR,
  error
});

export const getDocumentTypesByCompanies = info => ({
  type: REQUEST_DOCTYPES_BY_COMPANIES,
  info
});
export const receiveDocumentTypesByCompanies = info => ({
  type: RECEIVE_DOCTYPES_BY_COMPANIES,
  info
});

export const requestDocumentTypeById = id => ({
  type: REQUEST_DOCUMENTTYPE_BY_ID,
  id
});
export const receiveDocumentTypeById = info => ({
  type: RECEIVE_DOCUMENTTYPE_BY_ID,
  info
});

export const requestDeleteDocTypes = ids => ({
  type: REQUEST_DELETE_DOCTYPES,
  ids
});
export const receiveDeleteDocTypes = doc => ({
  type: RECEIVE_DELETE_DOCTYPES,
  doc
});
export const requestCategories = dataTable => ({
  type: REQUEST_CATEGORIES,
  dataTable
})

