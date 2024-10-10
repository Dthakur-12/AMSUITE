import { all, call, put, takeLatest } from "redux-saga/effects";
import { REQUEST_PANELS_POSITIONS, REQUEST_ERROR } from "../../actions/DeviceMap/deviceMap_actions.js";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.DeviceMap.DeviceMap[func], params);
    if (data.data) {
      if (data && data.data.errorCode)
        yield put({ type: REQUEST_ERROR, error: data.data.errorData });
      else
        yield put({
          type: type.replace("REQUEST", "RECEIVE"),
          data: data.data,
        });
    } else
      yield put({
        type: type.replace("REQUEST", "RECEIVE"),
        data,
      });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_PANELS_POSITIONS, genericApiCall, "getPanelsPosition");
}
