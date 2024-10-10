import {
  REQUEST_GET_WEB_REPORT,
  RECEIVE_GET_WEB_REPORT,
  WEB_REPORT_ERROR,
  CLEAR_WEB_REPORT_ERROR,
  CLEAR_WEB_REPORT_REPORT,
  REQUEST_DOWNLOAD_WEB_REPORT,
  RECEIVE_DOWNLOAD_WEB_REPORT
} from '../../actions/Reports/webReport_actions';

const webReportValidationReducers = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case REQUEST_GET_WEB_REPORT:
      return {
        ...state,
        error: null,
        loading: true
      }
    case RECEIVE_GET_WEB_REPORT:
      return {
        ...state,
        loading: false,
        report: action.payload
      }
      case REQUEST_DOWNLOAD_WEB_REPORT:
        return {
          ...state,
          error: null,
          loading: true
        }
      case RECEIVE_DOWNLOAD_WEB_REPORT:
        return {
          ...state,
          loading: false,
          download: action.payload
        }  
    case WEB_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_WEB_REPORT_ERROR:
      return {
        ...state,
        error: null
      }
    case CLEAR_WEB_REPORT_REPORT:{
      return {
        ...state,
        report: null,
      }
    }
    default:
      return state
  }
}

export default webReportValidationReducers
