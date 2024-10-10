import {
  REQUEST_GET_READERS,
  REQUEST_DELETE_READERS,
  REQUEST_ASSIGN_AL,
  REQUEST_GET_CARDFORMAT_IDS,
  REQUEST_CREATE_READER,
  REQUEST_EXIST_READERNAME,
  REQUEST_EDIT_READER,
  REQUEST_ERROR,
  REQUEST_GET_MOBILE_READERS
} from "../../actions/AccessControl/reader_actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.AccessControl.Readers[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_EXIST_READERNAME, genericApiCall, "checkReaderName");
  yield takeLatest(REQUEST_EDIT_READER, genericApiCall, "editReader");
  yield takeLatest(REQUEST_CREATE_READER, genericApiCall, "createReader");
  yield takeLatest(REQUEST_ASSIGN_AL, genericApiCall, "assignAccessLevels");
  yield takeLatest(REQUEST_DELETE_READERS, genericApiCall, "deleteReader");
  yield takeLatest(REQUEST_GET_READERS, genericApiCall, "getVirtualReaders");
  yield takeLatest(
    REQUEST_GET_CARDFORMAT_IDS,
    genericApiCall,
    "getCardFormatIds"
  );
  yield takeLatest(
    REQUEST_GET_MOBILE_READERS,
    genericApiCall,
    "getDeviceReader"
  );
}
