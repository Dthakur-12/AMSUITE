export const REQUEST_GET_CARD_FORMATS = "REQUEST_GET_CARD_FORMATS";
export const REQUEST_DELETE_CARD_FORMATS = "REQUEST_DELETE_CARD_FORMATS";
export const REQUEST_GET_CARD_FORMAT_READERS =
  "REQUEST_GET_CARD_FORMAT_READERS";
export const REQUEST_ASSIGN_CARD_FORMAT_READERS =
  "REQUEST_ASSIGN_CARD_FORMAT_READERS";
export const REQUEST_UPDATE_CARD_FORMAT_BY_READER =
  "REQUEST_UPDATE_CARD_FORMAT_BY_READER";
export const REQUEST_CREATE_CARD_FORMAT = "REQUEST_CREATE_CARD_FORMAT";
export const REQUEST_EDIT_CARD_FORMAT = "REQUEST_EDIT_CARD_FORMAT";
export const REQUEST_CARD_FORMAT_BY_ID = "REQUEST_CARD_FORMAT_BY_ID";

export const RECEIVE_GET_CARD_FORMATS = "RECEIVE_GET_CARD_FORMATS";
export const RECEIVE_DELETE_CARD_FORMATS = "RECEIVE_DELETE_CARD_FORMATS";
export const RECEIVE_GET_CARD_FORMAT_READERS =
  "RECEIVE_GET_CARD_FORMAT_READERS";
export const RECEIVE_ASSIGN_CARD_FORMAT_READERS =
  "RECEIVE_ASSIGN_CARD_FORMAT_READERS";
export const RECEIVE_UPDATE_CARD_FORMAT_BY_READER =
  "RECEIVE_UPDATE_CARD_FORMAT_BY_READER";
export const RECEIVE_CREATE_CARD_FORMAT = "RECEIVE_CREATE_CARD_FORMAT";
export const RECEIVE_EDIT_CARD_FORMAT = "RECEIVE_EDIT_CARD_FORMAT";
export const RECEIVE_CARD_FORMAT_BY_ID = "RECEIVE_CARD_FORMAT_BY_ID";

export const REQUEST_ERROR = "REQUEST_ERROR";
export const CLEAR_DATA_NEW = "CLEAR_DATA_NEW";

//REQUEST
export const requestGetCardFormats = datatable => {
  return { type: REQUEST_GET_CARD_FORMATS, info: datatable };
};

export const requestDeleteCardFormat = ids => {
  return { type: REQUEST_DELETE_CARD_FORMATS, info: ids };
};

export const requestGetCardFormatReaders = id => {
  return { type: REQUEST_GET_CARD_FORMAT_READERS, info: id };
};

export const requestAssignCardFormatReaders = data => {
  return { type: REQUEST_ASSIGN_CARD_FORMAT_READERS, info: data };
};

export const requestUpdateCardFormatByReader = data => {
  return { type: REQUEST_UPDATE_CARD_FORMAT_BY_READER, info: data };
};

export const requestCreateCardFormat = data => {
  return { type: REQUEST_CREATE_CARD_FORMAT, info: data };
};

export const requestEditCardFormat = data => {
  return { type: REQUEST_EDIT_CARD_FORMAT, info: data };
};

export const requestGetCardFormatByID = id => {
  return { type: REQUEST_CARD_FORMAT_BY_ID, info: id };
};

export const clearDataNew = () => {
  return { type: CLEAR_DATA_NEW };
};

//RECEIVE
export const receiveGetCardFormats = cardFormats => {
  return { type: RECEIVE_GET_CARD_FORMATS, info: cardFormats };
};

export const receiveDeleteCardFormat = () => {
  return { type: RECEIVE_DELETE_CARD_FORMATS };
};

export const receiveGetCardFormatReaders = readers => {
  return { type: RECEIVE_GET_CARD_FORMAT_READERS, info: readers };
};

export const receiveAssignCardFormatReaders = () => {
  return { type: RECEIVE_ASSIGN_CARD_FORMAT_READERS };
};

export const receiveUpdateCardFormatByReader = () => {
  return { type: RECEIVE_UPDATE_CARD_FORMAT_BY_READER };
};

export const receiveCreateCardFormat = () => {
  return { type: RECEIVE_CREATE_CARD_FORMAT };
};

export const receiveEditCardFormat = () => {
  return { type: RECEIVE_EDIT_CARD_FORMAT };
};

export const receiveGetCardFormatByID = data => {
  return { type: RECEIVE_CARD_FORMAT_BY_ID, info: data };
};
