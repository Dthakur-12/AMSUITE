import {
  REQUEST_GET_IMEI,
  REQUEST_CREATE_IMEI,
  REQUEST_EDIT_IMEI,
  REQUEST_DELETE_IMEI,
  REQUEST_ERROR,
} from "../../actions/AccessControl/imei_actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.AccessControl.Imeis[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_DELETE_IMEI, genericApiCall, "deleteImei");
  yield takeLatest(REQUEST_EDIT_IMEI, genericApiCall, "editImei");
  yield takeLatest(REQUEST_CREATE_IMEI, genericApiCall, "createImei");
  yield takeLatest(REQUEST_GET_IMEI, genericApiCall, "getImeis");
}
