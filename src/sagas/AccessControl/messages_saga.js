import {
  REQUEST_GET_MESSAGES_COUNT,
  REQUEST_GET_MESSAGES,
  REQUEST_SEND_MESSAGE,
  REQUEST_ERROR
} from "../../actions/AccessControl/messages_actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import ApiHandler from "../../services/ApiHandler";
import actions from "redux-form/lib/actions";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.AccessControl.Messages[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(
    REQUEST_GET_MESSAGES_COUNT,
    genericApiCall,
    "getMessagesCount"
  );
  yield takeLatest(REQUEST_GET_MESSAGES, genericApiCall, "getMessages");
  yield takeLatest(REQUEST_SEND_MESSAGE, genericApiCall, "sendMessage");
}
