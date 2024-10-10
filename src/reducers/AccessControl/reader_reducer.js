import {
  REQUEST_GET_READERS,
  REQUEST_DELETE_READERS,
  REQUEST_ASSIGN_AL,
  REQUEST_GET_CARDFORMAT_IDS,
  REQUEST_CREATE_READER,
  REQUEST_EDIT_READER,
  RECEIVE_GET_READERS,
  RECEIVE_DELETE_READERS,
  RECEIVE_ASSIGN_AL,
  RECEIVE_GET_CARDFORMAT_IDS,
  REQUEST_EXIST_READERNAME,
  RECEIVE_EXIST_READERNAME,
  RECEIVE_CREATE_READER,
  RECEIVE_EDIT_READER,
  REQUEST_ERROR,
  REQUEST_GET_MOBILE_READERS,
  RECEIVE_GET_MOBILE_READERS
} from "../../actions/AccessControl/reader_actions";

const reader_reducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_READERS:
      return { ...state, loading: true, successGetReaders: false };
    case REQUEST_GET_MOBILE_READERS:
      return { ...state, loading: true, successGetMobileReaders: false };
    case REQUEST_DELETE_READERS:
      return { ...state, loading: true, successDelete: false };
    case REQUEST_ASSIGN_AL:
      return { ...state, successAssignAL: false };
    case REQUEST_GET_CARDFORMAT_IDS:
      return { ...state, successGetCardFormat: false };
    case REQUEST_CREATE_READER:
      return { ...state, loadingCreate: true, successCreate: false };
    case REQUEST_EDIT_READER:
      return { ...state, loadingCreate: true, successEdit: false };
    case REQUEST_EXIST_READERNAME:
      return {
        ...state,
        loadingExistReaderName: true,
        successExistReaderName: false
      };

    case RECEIVE_EXIST_READERNAME:
      return {
        ...state,
        existName: action.data,
        loadingExistReaderName: false,
        successExistReaderName: true
      };
    case RECEIVE_GET_READERS:
      return {
        ...state,
        loading: false,
        successGetReaders: true,
        readers: action.data.data,
        readersCount: action.data.dataCount
      };
    case RECEIVE_GET_MOBILE_READERS:
      return {
        ...state,
        loading: false,
        successGetMobileReaders: true,
        infoReaders: action.data
      };
    case RECEIVE_DELETE_READERS:
      return { ...state, loading: false, successDelete: true };
    case RECEIVE_ASSIGN_AL:
      return { ...state, successAssignAL: true };
    case RECEIVE_GET_CARDFORMAT_IDS:
      return { ...state, successGetCardFormat: true, cardFormats: action.data };
    case RECEIVE_CREATE_READER:
      return { ...state, loadingCreate: false, successCreate: true };
    case RECEIVE_EDIT_READER:
      return { ...state, loadingCreate: false, successEdit: true };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        successAssignAL: false,
        successDelete: false,
        successGetReaders: false,
        successGetCardFormat: false,
        successCreate: false,
        loading: false,
        loadingCreate: false,
        successEdit: false
      };
    default:
      return state;
  }
};

export default reader_reducer;
