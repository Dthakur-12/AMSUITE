import {
  REQUEST_GET_STATUSES,
  REQUEST_DELETE_STATUS,
  REQUEST_GET_STATUS_BY_ID,
  REQUEST_EDIT_STATUS,
  REQUEST_CREATE_STATUS,
  REQUEST_ERROR
} from "../../actions/EasyAccess/status_actions";
import ApiHandler from "../../services/ApiHandler";
import { all, call, put, takeLatest } from "redux-saga/effects";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.EasyAccess.Status[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_EDIT_STATUS, genericApiCall, "editStatus");
  yield takeLatest(REQUEST_CREATE_STATUS, genericApiCall, "createStatus");
  yield takeLatest(REQUEST_DELETE_STATUS, genericApiCall, "deleteStatus");
  yield takeLatest(REQUEST_GET_STATUS_BY_ID, genericApiCall, "getStatusByID");
  yield takeLatest(REQUEST_GET_STATUSES, genericApiCall, "getStatus");
}
