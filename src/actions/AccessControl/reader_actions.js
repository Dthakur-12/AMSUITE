export const REQUEST_GET_READERS = "REQUEST_GET_READERS";
export const REQUEST_DELETE_READERS = "REQUEST_DELETE_READERS";
export const REQUEST_ASSIGN_AL = "REQUEST_ASSIGN_AL";
export const REQUEST_GET_CARDFORMAT_IDS = "REQUEST_GET_CARDFORMAT_IDS";
export const REQUEST_CREATE_READER = "REQUEST_CREATE_READER";
export const REQUEST_EDIT_READER = "REQUEST_EDIT_READER";
export const REQUEST_EXIST_READERNAME = "REQUEST_EXIST_READERNAME";

export const RECEIVE_GET_READERS = "RECEIVE_GET_READERS";
export const RECEIVE_DELETE_READERS = "RECEIVE_DELETE_READERS";
export const RECEIVE_ASSIGN_AL = "RECEIVE_ASSIGN_AL";
export const RECEIVE_GET_CARDFORMAT_IDS = "RECEIVE_GET_CARDFORMAT_IDS";
export const RECEIVE_CREATE_READER = "RECEIVE_CREATE_READER";
export const RECEIVE_EDIT_READER = "RECEIVE_EDIT_READER";
export const REQUEST_GET_MOBILE_READERS = "REQUEST_GET_MOBILE_READERS";
export const RECEIVE_GET_MOBILE_READERS = "RECEIVE_GET_MOBILE_READERS";
export const RECEIVE_EXIST_READERNAME = "RECEIVE_EXIST_READERNAME";

export const REQUEST_ERROR = "REQUEST_ERROR";

export const requestGetReaders = datatble => {
  return { type: REQUEST_GET_READERS, info: datatble };
};

export const requestGetMobileReaders = datatble => {
  return { type: REQUEST_GET_MOBILE_READERS, info: datatble };
};

export const requestDeleteReaders = readers => {
  return { type: REQUEST_DELETE_READERS, info: readers };
};

export const requestAssignAL = reader => {
  return { type: REQUEST_ASSIGN_AL, info: reader };
};

export const requestGetCardFormatIDs = id => {
  return { type: REQUEST_GET_CARDFORMAT_IDS, info: id };
};

export const requestCreateReader = data => {
  return { type: REQUEST_CREATE_READER, info: data };
};

export const requestEditReader = data => {
  return { type: REQUEST_EDIT_READER, info: data };
};

export const requestCheckExistReaderName = readerName => {
  return { type: REQUEST_EXIST_READERNAME, readerName: readerName };
};

export const receiveGetReaders = readers => {
  return { type: RECEIVE_GET_READERS, info: readers };
};

export const receiveGetMobileReaders = readers => {
  return { type: RECEIVE_GET_MOBILE_READERS, info: readers };
};

export const receiveDeleteReaders = () => {
  return { type: RECEIVE_DELETE_READERS };
};

export const receiveAssignAL = () => {
  return { type: RECEIVE_ASSIGN_AL };
};

export const receiveGetCardFormatIDs = data => {
  return { type: RECEIVE_GET_CARDFORMAT_IDS, info: data };
};

export const receiveCreateReader = () => {
  return { type: RECEIVE_CREATE_READER };
};

export const receiveEditReader = () => {
  return { type: RECEIVE_EDIT_READER };
};

export const receiveCheckExistReaderName = data => {
  return { type: RECEIVE_EXIST_READERNAME, existName: data.data };
};
