import {
  REQUEST_CREATE_PERSON,
  RECEIVE_CREATE_PERSON,
  REQUEST_EDIT_PERSON,
  RECEIVE_EDIT_PERSON,
  REQUEST_GET_PERSON_BY_ID,
  RECEIVE_GET_PERSON_BY_ID,
  REQUEST_EMPLOYEES,
  RECEIVE_EMPLOYEES,
  REQUEST_PERSONS,
  RECEIVE_PERSONS,
  REQUEST_PERSONS_TYPES,
  RECEIVE_PERSONS_TYPES,
  REQUEST_SET_IMAGE,
  RECEIVE_SET_IMAGE,
  REQUEST_SET_IMAGE_URL,
  RECEIVE_SET_IMAGE_URL,
  REQUEST_GET_IMAGE,
  RECEIVE_GET_IMAGE,
  REQUEST_DELETE_IMAGE,
  RECEIVE_DELETE_IMAGE,
  REQUEST_UPDATE_IMAGE,
  RECEIVE_UPDATE_IMAGE,
  REQUEST_PERSON_ERROR,
  REQUEST_CLEAR_STORE_PERSON_IMAGE,
  RECEIVE_CREATE_PERSON_ANONYMOUSE,
  REQUEST_CREATE_PERSON_ANONYMOUSE,
  REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS,
  RECEIVE_GET_PERSON_BY_DOCUMENT_ANONYMOUS,
  REQUEST_CREATE_VISITOR_GROUP,
  RECEIVE_CREATE_VISITOR_GROUP,
  REQUEST_CHECK_DOC_NUMBER,
  RECEIVE_CHECK_DOC_NUMBER,
  REQUEST_XLS_WITH_VISITOR_GROUP,
  RECEIVE_XLS_WITH_VISITOR_GROUP,
  REQUEST_XLS_TEMPLATE,
  RECEIVE_XLS_TEMPLATE,
  CLEAR_SUCCESS_CREATE_EVENT,
  REQUEST_GET_PERSON_GROUPS,
  RECEIVE_GET_PERSON_GROUPS,
  REQUEST_CREATE_PERSONS_GROUP,
  RECEIVE_CREATE_PERSONS_GROUP,
  REQUEST_GET_PERSON_BY_GROUPS,
  RECEIVE_GET_PERSON_BY_GROUPS,
  REQUEST_GET_PERSON_GROUPS_REPORT_XLS,
  RECEIVE_GET_PERSON_GROUPS_REPORT_XLS,
} from "../../actions/EasyAccess/Person_actions";

const personReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case CLEAR_SUCCESS_CREATE_EVENT: {
      return {
        ...state,
        successCreateEvent: false,
      };
    }
    case REQUEST_GET_PERSON_GROUPS_REPORT_XLS: {
      return {
        ...state,
        successXlsPersonByGroups: false,
      };
    }
    case RECEIVE_GET_PERSON_GROUPS_REPORT_XLS: {
      return {
        ...state,
        successXlsPersonByGroups: true,
        GroupReport: action.data,
      };
    }
    case REQUEST_GET_PERSON_BY_GROUPS: {
      console.log('REQUEST_GET_PERSON_BY_GROUPS: ', action);
      return {
        ...state,
        isLoading: true,
      };
    }
    case RECEIVE_GET_PERSON_BY_GROUPS: {
      console.log('RECEIVE_GET_PERSON_BY_GROUPS: ', action.data);
      return {
        ...state,
        isLoading: false,
        personByGroup: action.data,
      };
    }
    case REQUEST_GET_PERSON_GROUPS: {
      return {
        ...state,
        isLoading: true,
        successPersonGroupData: false,
      };
    }

    case RECEIVE_GET_PERSON_GROUPS: {
      return {
        ...state,
        isLoading: false,
        personGroups: action.data,
        successPersonGroupData: true,
      };
    }

    case REQUEST_CREATE_PERSONS_GROUP: {
      return {
        ...state,
        successCreateGroup: false,
        loadingCreateGroup: true,
      };
    }
    case RECEIVE_CREATE_PERSONS_GROUP: {
      return {
        ...state,
        successCreateGroup: true,
        loadingCreateGroup: false,
      };
    }

    case RECEIVE_CREATE_PERSON_ANONYMOUSE: {
      return {
        ...state,
        persons: action.data,
        successCreate: true,
        msjError: undefined,
      };
    }
    case REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS: {
      return {
        ...state,
        succesGetPrsByDocAnonymous: false,
        error: false,
      };
    }
    case RECEIVE_GET_PERSON_BY_DOCUMENT_ANONYMOUS: {
      return {
        ...state,
        succesGetPrsByDocAnonymous: true,
        personAnonymous: action.data,
      };
    }
    case REQUEST_CREATE_PERSON_ANONYMOUSE: {
      return { ...state, successCreate: false, error: false };
    }
    case REQUEST_GET_PERSON_BY_ID:
      return { ...state, loading: true, successPerson: false };

    case REQUEST_CREATE_VISITOR_GROUP: {
      return {
        ...state,
        successCreateEvent: false,
        success: false,
        isCreating: true,
        error: false,
      };
    }

    case RECEIVE_CREATE_VISITOR_GROUP: {
      return {
        ...state,
        successCreateEvent: true,
        eventData: action.data,
        success: true,
        isCreating: false,
        error: false,
        msjError: undefined,
      };
    }

    case REQUEST_CHECK_DOC_NUMBER: {
      return {
        ...state,
        successCheckDoc: false,
        loadingCheck: true,
        checkDocNumber: action.data,
        error: false,
      };
    }

    case RECEIVE_CHECK_DOC_NUMBER: {
      return {
        ...state,
        successCheckDoc: true,
        loadingCheck: false,
        error: false,
      };
    }

    case REQUEST_XLS_WITH_VISITOR_GROUP: {
      return {
        ...state,
        successXls: false,
        loadingXls: true,
        error: false,
      };
    }
    case RECEIVE_XLS_WITH_VISITOR_GROUP: {
      return {
        ...state,
        successXls: true,
        loadingXls: false,
        dataXls: action.data,
        error: false,
      };
    }
    case REQUEST_XLS_TEMPLATE: {
      return {
        ...state,
        successXlsTemplate: false,
        loadingXlsTemplate: true,
        error: false,
      };
    }

    case RECEIVE_XLS_TEMPLATE: {
      return {
        ...state,
        successXlsTemplate: true,
        loadingXlsTemplate: false,
        dataXls: action.data,
        error: false,
      };
    }

    case RECEIVE_GET_PERSON_BY_ID:
      return {
        ...state,
        person: action.data,
        successPerson: true,
        loading: false,
        msjError: undefined,
      };
    case REQUEST_EMPLOYEES:
      return {
        ...state,
        loading: true,
        successEmployees: false,
        loadingEmp: true,
      };
    case RECEIVE_EMPLOYEES:
      return {
        ...state,
        loading: false,
        successEmployees: true,
        employees: action.data,
        loadingEmp: false,
        msjError: undefined,
      };

    case REQUEST_PERSONS:
      return { ...state, loading: true, successPrs: false };
    case RECEIVE_PERSONS:
      return {
        ...state,
        loading: false,
        successPrs: true,
        persons: action.data,
        msjError: undefined,
      };

    case REQUEST_CREATE_PERSON:
      return {
        ...state,
        loading: true,
        successCreatePrs: false,
        error: false,
        success: false,
        isCreating: true,
      };
    case RECEIVE_CREATE_PERSON:
      return {
        ...state,
        loading: false,
        successCreatePrs: true,
        personData: action.data,
        success: true,
        isCreating: false,
        msjError: undefined,
      };

    case REQUEST_EDIT_PERSON:
      return {
        ...state,
        loading: true,
        successEditPrs: false,
        error: false,
        success: false,
        isCreating: true,
      };
    case RECEIVE_EDIT_PERSON:
      return {
        ...state,
        loading: false,
        successEditPrs: true,
        personData: action.data,
        success: true,
        isCreating: false,
        msjError: undefined,
      };
    case REQUEST_PERSON_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        error: true,
        msjError: action.error.errorData,
        isCreating: false,
        successCreatePrs: false,
      };

    case REQUEST_PERSONS_TYPES:
      return { ...state, loading: true, successPrsTypes: false };
    case RECEIVE_PERSONS_TYPES:
      return {
        ...state,
        loading: false,
        successPrsTypes: true,
        personDataTypes: action.data,
        msjError: undefined,
      };

    case REQUEST_SET_IMAGE:
      return { ...state, loading: true, successSetImage: false };
    case REQUEST_SET_IMAGE_URL:
      return { ...state, loading: true, successSetImage: false };
    case RECEIVE_SET_IMAGE:
      return {
        ...state,
        loading: false,
        successSetImage: true,
        msjError: undefined,
      };
    case RECEIVE_SET_IMAGE_URL:
      return {
        ...state,
        loading: false,
        successSetImage: true,
        msjError: undefined,
      };
    case REQUEST_GET_IMAGE:
      return { ...state, loading: true, successGetImage: false };
    case RECEIVE_GET_IMAGE:
      return {
        ...state,
        loading: false,
        successGetImage: true,
        img: action.data,
        msjError: undefined,
      };

    case REQUEST_DELETE_IMAGE:
      return { ...state, loading: true, successDeleteImage: false };
    case RECEIVE_DELETE_IMAGE:
      return {
        ...state,
        loading: false,
        successDeleteImage: true,
        msjError: undefined,
      };
    //
    case REQUEST_UPDATE_IMAGE:
      return { ...state, loading: true, successUpdateImage: false };
    case RECEIVE_UPDATE_IMAGE:
      return {
        ...state,
        loading: false,
        successUpdateImage: true,
        msjError: undefined,
      };
    case REQUEST_CLEAR_STORE_PERSON_IMAGE:
      return { ...state, img: "" };
    default:
      return state;
  }
};

export default personReducer;
