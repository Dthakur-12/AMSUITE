import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_MOBILE_SETTINGS,
  REQUEST_UPDATE_MOBILE_SETTINGS,
  REQUEST_ERROR_MOBILE_SETTINGS,
} from "../../actions/Settings/accessControl_actions";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.Setting.AccessControl[func], params);
    if (data && data.errorCode) {
      yield put({ type: REQUEST_ERROR_MOBILE_SETTINGS, error: data.errorData });
    } else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR_MOBILE_SETTINGS, error });
  }
}

export default function* accessControl() {
  yield takeLatest(
    REQUEST_MOBILE_SETTINGS,
    genericApiCall,
    "getSettingMobileSAML"
  );
  yield takeLatest(
    REQUEST_UPDATE_MOBILE_SETTINGS,
    genericApiCall,
    "setSettingMobileSAML"
  );
}
