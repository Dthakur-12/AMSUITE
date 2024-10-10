import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_TEST_CONNECTION,
  REQUEST_TEST_CONNECTION_ERROR,
  REQUEST_SET_APP_LOGO,
  REQUEST_GET_APP_LOGO,
  REQUEST_SEND_TEST_EMAIL,
  REQUEST_VERSION
} from "../../actions/Settings/system_actions";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.Setting.Setting[func], params);
    if (data.data && data.data.errorCode)
      yield put({
        type: REQUEST_TEST_CONNECTION_ERROR,
        error: data.data.errorData
      });
    else
      yield put({ type: type.replace("REQUEST", "RECEIVE"), data: data.data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_TEST_CONNECTION_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_VERSION, genericApiCall, "getVersion");
  yield takeLatest(REQUEST_GET_APP_LOGO, genericApiCall, "getAppLogo");
  yield takeLatest(REQUEST_SET_APP_LOGO, genericApiCall, "SaveAppLogo");
  yield takeLatest(REQUEST_SEND_TEST_EMAIL, genericApiCall, "sendTestEmail")
  yield takeLatest(
    REQUEST_TEST_CONNECTION,
    genericApiCall,
    "testActiveDirectoryDomain"
  );
}
