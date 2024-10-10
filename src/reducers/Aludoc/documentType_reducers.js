import {
  RECEIVE_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE,
  RECEIVE_CREATE_DOCUMENTTYPE,
  REQUEST_CREATE_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE_ERROR,
  REQUEST_DOCTYPES_BY_COMPANIES,
  RECEIVE_DOCTYPES_BY_COMPANIES,
  RECEIVE_DELETE_DOCTYPES,
  REQUEST_DELETE_DOCTYPES,
  REQUEST_EDIT_DOCUMENTTYPE,
  RECEIVE_EDIT_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE_BY_ID,
  RECEIVE_DOCUMENTTYPE_BY_ID,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from "../../actions/Aludoc/documentType_action.js";

const documentTypeReducer = (state = { documentType: [] }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_DOCUMENTTYPE:
      return {
        ...state,
        loading: true,
        isLoadingNewData: true,
        successDocType: false,
        error: true,
        errorType: "",
      };
    case RECEIVE_DOCUMENTTYPE:
      return {
        ...state,
        documentType: action.data.data,
        documentTypeAllCount: action.data.dataCount,
        info: action.data,
        successDocType: true,
        loading: false,
        isLoadingNewData: false,
        isSearching: false,
        error: false,
        errorType: "",
      };
    case REQUEST_CREATE_DOCUMENTTYPE:
      return {
        ...state,
        loading: true,
        create: false,
        success: false,
        error: true,
        errorType: "",
      };
    case RECEIVE_CREATE_DOCUMENTTYPE:
      return {
        ...state,
        id: action.data,
        success: true,
        loading: false,
        create: true,
        errorType: "",
      };
    case REQUEST_DOCUMENTTYPE_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        error: true,
        errorType: action.error,
      };
    case REQUEST_DOCTYPES_BY_COMPANIES:
      return {
        ...state,
        loading: true,
        successDTByCompanies: false,
        errorType: "",
      };
    case RECEIVE_DOCTYPES_BY_COMPANIES:
      return {
        ...state,
        successDTByCompanies: true,
        loading: false,
        infoDTByCompanies: action.data,
        error: false,
        errorType: "",
      };
    case REQUEST_EDIT_DOCUMENTTYPE:
      return {
        ...state,
        loading: true,
        successEditDT: false,
        error: true,
        errorType: "",
      };
    case RECEIVE_EDIT_DOCUMENTTYPE:
      return {
        ...state,
        successEditDT: true,
        loading: false,
        error: false,
        errorType: "",
      };
    //
    case REQUEST_DOCUMENTTYPE_BY_ID:
      return {
        ...state,
        loading: true,
        successRequestDTById: false,
        error: true,
        errorType: "",
      };
    case RECEIVE_DOCUMENTTYPE_BY_ID:
      return {
        ...state,
        successRequestDTById: true,
        loading: false,
        error: false,
        errorType: "",
        doc: action.data,
      };
    case REQUEST_DELETE_DOCTYPES:
      return {
        ...state,
        loading: true,
        successDeleteDT: false,
        error: true,
        errorType: "",
      };
    case RECEIVE_DELETE_DOCTYPES:
      return {
        ...state,
        successDeleteDT: true,
        loading: false,
        error: false,
        errorType: "",
      };
    case REQUEST_CATEGORIES:
      return {
        ...state,
      };
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      };
    default:
      return state;
  }
};

export default documentTypeReducer;
