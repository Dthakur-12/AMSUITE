import {
  REQUEST_GET_PRINTERS,
  RECEIVE_GET_PRINTERS,
  REQUEST_DELETE_PRINTER,
  RECEIVE_DELETE_PRINTER,
  REQUEST_CREATE_PRINTER,
  RECEIVE_CREATE_PRINTER,
  REQUEST_TIKAS_ERROR
} from "../../actions/Tikas/Tikas_actions";

const tikasReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_PRINTERS:
      return { ...state, successPrinters: false, loading: true };
    case RECEIVE_GET_PRINTERS:
      return {
        ...state,
        printers: action.printers,
        loading: false,
        storeUpdated: true
      };
    case REQUEST_CREATE_PRINTER:
      return { ...state, loading: true , successCreatedOrDeleted:false};
    case RECEIVE_CREATE_PRINTER:
      return { ...state, loading: false, successCreatedOrDeleted:true };
    case REQUEST_DELETE_PRINTER:
      return { ...state, loading: true, successCreatedOrDeleted:false };
    case RECEIVE_DELETE_PRINTER:
      return { ...state, loading: false, successCreatedOrDeleted:true };
      
    case REQUEST_TIKAS_ERROR:
      return { loading: false, msgError: action.error, error: true };
    default:
      return state;
  }
};
export default tikasReducer;
