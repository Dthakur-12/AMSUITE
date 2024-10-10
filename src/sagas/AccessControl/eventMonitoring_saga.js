import {
  REQUEST_GET_EVENTS,
  REQUEST_GET_EVENT_BY_ID,
  REQUEST_GET_PERSON_IMAGE,
  REQUEST_GET_ACCESS_IMAGE,
  REQUEST_GET_EVENTS_REPORT,
  REQUEST_GET_EVENTS_XLS,
  REQUEST_GET_PERSON_ENTERPRISE_XLS,
  REQUEST_GET_ENTERPRISE_XLS,
  REQUEST_ERROR,
} from "../../actions/AccessControl/eventMonitoring_actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  console.log("func: ", func);
  let action = data[1];
  let params = Object.values(action)[1];
  console.log("params: ", params);
  let type = action.type;
  console.log("type: ", type);
  try {
    const { data } = yield call(
      ApiHandler.AccessControl.EventMonitoring[func],
      params
    );
    if (data && data.errorCode) {
      if (data.errorCode === 401) AmSuiteNavBar.appNavigation.history.push("/");
      yield put({ type: REQUEST_ERROR, error: data.errorData });
    } else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_GET_ACCESS_IMAGE, genericApiCall, "getAccessImage");
  yield takeLatest(REQUEST_GET_PERSON_IMAGE, genericApiCall, "getPersonImage");
  yield takeLatest(REQUEST_GET_EVENT_BY_ID, genericApiCall, "getEventById");
  yield takeLatest(REQUEST_GET_EVENTS, genericApiCall, "getEventMonitoring");
  yield takeLatest(
    REQUEST_GET_EVENTS_REPORT,
    genericApiCall,
    "getEventsReport"
  );
  yield takeLatest(REQUEST_GET_EVENTS_XLS, genericApiCall, "getEventsXLS");
  yield takeLatest(
    REQUEST_GET_PERSON_ENTERPRISE_XLS,
    genericApiCall,
    "getPersonsByEnterprisesXLS"
  );
  yield takeLatest(
    REQUEST_GET_ENTERPRISE_XLS,
    genericApiCall,
    "getEnterprisesXLS"
  );
}
