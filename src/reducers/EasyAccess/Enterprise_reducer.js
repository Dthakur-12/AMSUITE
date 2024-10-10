// import { firstCharLowerCase } from "xml2js/lib/processors";
import {
  REQUEST_ENTERPRISES,
  RECEIVE_ENTERPRISES,
  REQUEST_ENTERPRISES_HOST,
  RECEIVE_ENTERPRISES_HOST,
  REQUEST_ENTERPRISE_ERROR,
  REQUEST_CREATE_ENTERPRISES,
  RECEIVE_CREATE_ENTERPRISES,
  REQUEST_EDIT_ENTERPRISES,
  RECEIVE_EDIT_ENTERPRISES,
  REQUEST_ENTERPRISES_BY_ID,
  RECEIVE_ENTERPRISES_BY_ID,
  REQUEST_DELETE_ENTERPRISES,
  RECEIVE_DELETE_ENTERPRISES,
  RECEIVE_ENTERPRISES_ANONYMOUSE,
  RECEIVE_ENTERPRISESHOST_ANONYMOUSE,
  REQUEST_VISITS_ENTERPRISE,
  RECEIVE_VISITS_ENTERPRISE,
  REQUEST_VISITS_ENTERPRISE_REPORT,
  RECEIVE_VISITS_ENTERPRISE_REPORT,
} from "../../actions/EasyAccess/Enterprise_actions";

const enterpriseReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ENTERPRISES_ANONYMOUSE:
      return {
        ...state,
        enterpriseAnonymouse: action.data,
      };
    case REQUEST_VISITS_ENTERPRISE:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_VISITS_ENTERPRISE:
      console.log("action: ", action);
      return {
        ...state,
        loading: false,
        visitsEnterprise: action.data.data,
        visitsEnterpriseCount: action.data.totalCount,
      };
    case REQUEST_VISITS_ENTERPRISE_REPORT:
      return {
        ...state,
        successGetVisitReport: true,
        successDownloadXLS: false,
        loading: true,
        error: undefined,
        visitReport: undefined,
      };
    case RECEIVE_VISITS_ENTERPRISE_REPORT:
      return {
        ...state,
        loading: false,
        successDownloadXLS: true,
        visitReport: action.data,
      };
    case REQUEST_CREATE_ENTERPRISES:
      return {
        ...state,
        successCreateEnterprise: false,
        loading: true,
        newData: false,
      };
    case RECEIVE_CREATE_ENTERPRISES:
      return {
        ...state,
        successCreateEnterprise: true,
        loading: false,
        newData: true,
      };
    case REQUEST_EDIT_ENTERPRISES:
      return {
        ...state,
        successEditEnterprise: false,
        loading: true,
        newData: false,
      };
    case RECEIVE_EDIT_ENTERPRISES:
      return {
        ...state,
        successEditEnterprise: true,
        loading: false,
        newData: true,
      };
    case REQUEST_ENTERPRISES:
      return { ...state, successEnterprise: false, loading: true };
    case RECEIVE_ENTERPRISES:
      return {
        ...state,
        successEnterprise: true,
        loading: false,
        enterprises: action.data,
      };
    case REQUEST_ENTERPRISES_HOST:
      return { ...state, successEnterpriseHost: false, loading: true };
    case RECEIVE_ENTERPRISESHOST_ANONYMOUSE:
      return {
        ...state,
        successEnterpriseHost: false,
        loading: true,
        enterprisesHostAnonymouse: action.data,
      };
    case RECEIVE_ENTERPRISES_HOST:
      return {
        ...state,
        successEnterpriseHost: true,
        loading: false,
        enterprisesHost: action.data,
      };
    case REQUEST_ENTERPRISE_ERROR:
      return { loading: false, error: action.error, successDownloadXLS: false };
    case REQUEST_ENTERPRISES_BY_ID:
      return { ...state, successEnterpriseByID: false, loading: true };
    case RECEIVE_ENTERPRISES_BY_ID:
      return {
        ...state,
        successEnterpriseByID: true,
        loading: false,
        enterpriseById: action.data,
      };
    case REQUEST_DELETE_ENTERPRISES:
      return {
        ...state,
        successDeleteEnterprise: false,
        loading: true,
        newData: false,
      };
    case RECEIVE_DELETE_ENTERPRISES:
      return {
        ...state,
        successDeleteEnterprise: true,
        loading: false,
        newData: true,
      };
    default:
      return state;
  }
};
export default enterpriseReducer;
