import {
  CREATE_REQUEST_DOCUMENT,
  CREATE_RECEIVE_DOCUMENT,
  REQUEST_DOCUMENT_ERROR,
  REQUEST_DOCUMENT_FILES,
  RECEIVE_DOCUMENT_FILES,
  REQUEST_DOCUMENTS,
  RECEIVE_DOCUMENTS,
  REQUEST_DOCUMENTS_BY_ID,
  RECEIVE_DOCUMENTS_BY_ID,
  REQUEST_EDIT_DOCUMENT,
  RECEIVE_EDIT_DOCUMENT,
  REQUEST_DELETE_DOCUMENTS,
  RECEIVE_DELETE_DOCUMENTS,
  REQUEST_DOWNLOAD_DOCUMENTS_FILE,
  RECEIVE_DOWNLOAD_DOCUMENTS_FILE,
  RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE,
  REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
  REQUEST_ALL_DOCS_BY_ENTERPRISES,
  RECEIVE_ALL_DOCS_BY_ENTERPRISES,
  REQUEST_GET_DOCUMENT_BY_PERSONID,
  RECEIVE_GET_DOCUMENT_BY_PERSONID,
  REQUEST_GET_DOCUMENT_BY_PERSONID_ERROR,
  REQUEST_GET_DOCUMENT_STATUS_GRAPH,
  RECEIVE_GET_DOCUMENT_STATUS_GRAPH
} from "../../actions/Aludoc/documents_action.js";

const documentReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case CREATE_REQUEST_DOCUMENT:
      return { ...state, createSuccess: false, loadingCreate: true };
    case CREATE_RECEIVE_DOCUMENT:
      return {
        ...state,
        createSuccess: true,
        success: true,
        loadingCreate: false
      };
    case REQUEST_EDIT_DOCUMENT:
      return { ...state, editSuccess: false, loadingCreate: true };
    case RECEIVE_EDIT_DOCUMENT:
      return {
        ...state,
        editSuccess: true,
        success: true,
        loadingCreate: false,
        isOk: action.data
      };
    case REQUEST_DOCUMENTS_BY_ID:
      return { ...state, successDocByID: false, loading: true };
    case RECEIVE_DOCUMENTS_BY_ID:
      return {
        ...state,
        successDocByID: true,
        success: true,
        loading: false,
        docById: action.data
      };

    case REQUEST_DOCUMENTS:
      return { ...state, successDocs: false, loadingDoc: true, loading: true };
    case RECEIVE_DOCUMENTS:
      return {
        ...state,
        successDocs: true,
        loadingDoc: false,
        info: action.data,
        loading: false
      };
    case REQUEST_DOCUMENT_ERROR:
      return { ...state, success: false, loading: false, error: action.error, loadingDocuments: false };
    //   Obtener los archivos de un documento
    case REQUEST_DOCUMENT_FILES:
      return { ...state, loading: true, successFiles: false };
    case RECEIVE_DOCUMENT_FILES:
      return {
        ...state,
        documentFiles: action.data,
        successFiles: true,
        loading: false
      };
    ////////////
    case REQUEST_DOWNLOAD_DOCUMENTS_FILE:
      return { ...state, loading: true, successDownloadFile: false };
    case RECEIVE_DOWNLOAD_DOCUMENTS_FILE:
      return {
        ...state,
        downloadFile: action.data,
        successDownloadFile: true,
        loading: false
      };
    ////////////////
    case REQUEST_DELETE_DOCUMENTS:
      return { ...state, loading: true, successDelete: false };
    case RECEIVE_DELETE_DOCUMENTS:
      return {
        ...state,
        msjOk: action.data,
        successDelete: true,
        loading: false
      };

    //   Fin
    case REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE:
      return { ...state, loading: true, successDocsExpiringBfDate: false };
    case RECEIVE_DOCUMENTS_EXPIRING_BEFORE_DATE:
      return {
        ...state,
        docBDate: action.data,
        successDocsExpiringBfDate: true,
        loading: false
      };
    case REQUEST_ALL_DOCS_BY_ENTERPRISES:
      return {
        ...state,
        loading: true,
        successAllDocumentsByEnterprises: false
      };
    case RECEIVE_ALL_DOCS_BY_ENTERPRISES:
      return {
        ...state,
        docBCompanies: action.data,
        successAllDocumentsByEnterprises: true,
        loading: false
      };

    // Documentos de una persona
    case REQUEST_GET_DOCUMENT_BY_PERSONID:
      return { ...state, loadingDocuments: true };
    case RECEIVE_GET_DOCUMENT_BY_PERSONID:
      return {
        ...state,
        personDocuments: action.data,
        loadingDocuments: false
      };
    case REQUEST_GET_DOCUMENT_BY_PERSONID_ERROR:
      return { ...state, loadingDocuments: false };
    //Fin

    //Graficas de reportes Aludoc
    case REQUEST_GET_DOCUMENT_STATUS_GRAPH:
      return { ...state, loadingDocumentStatusGraphData: true };
    case RECEIVE_GET_DOCUMENT_STATUS_GRAPH:
      return {
        ...state,
        loadingDocumentStatusGraphData: false,
        documentStatusData: action.data
      };
    //Fin

    default:
      return state;
  }
};

export default documentReducer;
