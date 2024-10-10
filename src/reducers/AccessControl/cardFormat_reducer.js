import {
  REQUEST_GET_CARD_FORMATS,
  REQUEST_DELETE_CARD_FORMATS,
  REQUEST_GET_CARD_FORMAT_READERS,
  REQUEST_ASSIGN_CARD_FORMAT_READERS,
  REQUEST_UPDATE_CARD_FORMAT_BY_READER,
  REQUEST_CARD_FORMAT_BY_ID,
  REQUEST_CREATE_CARD_FORMAT,
  REQUEST_EDIT_CARD_FORMAT,
  RECEIVE_GET_CARD_FORMATS,
  RECEIVE_DELETE_CARD_FORMATS,
  RECEIVE_GET_CARD_FORMAT_READERS,
  RECEIVE_ASSIGN_CARD_FORMAT_READERS,
  RECEIVE_UPDATE_CARD_FORMAT_BY_READER,
  RECEIVE_CARD_FORMAT_BY_ID,
  RECEIVE_CREATE_CARD_FORMAT,
  RECEIVE_EDIT_CARD_FORMAT,
  REQUEST_ERROR,
  CLEAR_DATA_NEW,
} from "../../actions/AccessControl/cardFormat_actions";

const cardFormat_reducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_GET_CARD_FORMATS:
      return { ...state, loading: true, successGetCardFormats: false };
    case REQUEST_DELETE_CARD_FORMATS:
      return { ...state, successDeleteCardFormat: false };
    case REQUEST_GET_CARD_FORMAT_READERS:
      return { ...state, successGetCardFormatReaders: false };
    case REQUEST_ASSIGN_CARD_FORMAT_READERS:
      return { ...state, successAssignCardFormatReaders: false };
    case REQUEST_UPDATE_CARD_FORMAT_BY_READER:
      return { ...state, successUpdateCardFormatByReader: false };
    case REQUEST_CARD_FORMAT_BY_ID:
      return {
        ...state,
        successCardFormatById: false,
        loadingGetCardFormatById: true,
      };
    case REQUEST_CREATE_CARD_FORMAT:
      return { ...state, loading: true, successCreateCardFormat: false };
    case REQUEST_EDIT_CARD_FORMAT:
      return { ...state, successEditCardFormat: false, loading: true };
    case RECEIVE_GET_CARD_FORMATS:
      return {
        ...state,
        loading: false,
        successGetCardFormats: true,
        cardFormats: action.data.data,
        cardCount: action.data.dataCount,
        info: action.data,
      };
    case RECEIVE_DELETE_CARD_FORMATS:
      return { ...state, successDeleteCardFormat: true };
    case RECEIVE_GET_CARD_FORMAT_READERS:
      return {
        ...state,
        successGetCardFormatReaders: true,
        cardFormatReaders: action.data,
      };
    case RECEIVE_ASSIGN_CARD_FORMAT_READERS:
      return { ...state, successAssignCardFormatReaders: true };
    case RECEIVE_UPDATE_CARD_FORMAT_BY_READER:
      return { ...state, successUpdateCardFormatByReader: true };
    case RECEIVE_CREATE_CARD_FORMAT:
      return { ...state, loading: false, successCreateCardFormat: true };
    case RECEIVE_EDIT_CARD_FORMAT:
      return { ...state, loading: false, successEditCardFormat: true };
    case RECEIVE_CARD_FORMAT_BY_ID:
      return {
        ...state,
        loadingGetCardFormatById: false,
        cardFormatById: action.data,
        successCardFormatById: true,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        loadingCreate: false,
        loadingEdit: false,
        loadingGetCardFormatById: false,
        successGetCardFormats: false,
        successDeleteCardFormat: false,
        successGetCardFormatReaders: false,
        successAssignCardFormatReaders: false,
        successUpdateCardFormatByReader: false,
        successCardFormatById: false,
        successCreateCardFormat: false,
        successEditCardFormat: false,
      };
    case CLEAR_DATA_NEW:
      return {
        ...state,
        error:undefined,
        loading: false,
        loadingCreate: false,
        loadingEdit: false,
        loadingGetCardFormatById: false,
        successCardFormatById: false,
        successCreateCardFormat: false,
        successEditCardFormat: false,
      };
    default:
      return state;
  }
};

export default cardFormat_reducer;
