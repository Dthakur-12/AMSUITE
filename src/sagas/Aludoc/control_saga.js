import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_CONTROLS,
  CREATE_REQUEST_CONTROL,
  EDIT_REQUEST_CONTROL,
  DETAIL_RECEIVE_CONTROL,
  DETAIL_REQUEST_CONTROL,
  DELETE_REQUEST_CONTROL,
  REQUEST_CONTROLS_ERROR,
  REQUEST_COMPANIES_BY_CONTROL_ID,
  REQUEST_HIGHEST_CONTROL_ID,
  REQUEST_PERSONS_BY_CONTROL,
  REQUEST_CONTROL_PEOPLE_GRAPH_DATA,
  REQUEST_SET_CONTROL_NOTIFICATIONS,
  REQUEST_IS_CONTROL_NAME_AVAILABLE,
} from "../../actions/Aludoc/controls_actions.js";
import ApiHandler from "../../services/ApiHandler";

function* fetchDetailControl({ payload }) {
  try {
    const { data: control } = yield call(
      ApiHandler.Aludoc.Controls.getDetailsControl,
      payload
    );
    yield put({ type: DETAIL_RECEIVE_CONTROL, control });
    if (control) {
      const datatable = {
        start: 0,
        length: 10,
        order: "",
        search: "",
        ControlId: control.id,
      };
      yield put({ type: REQUEST_PERSONS_BY_CONTROL, datatable: datatable });
    }
  } catch ({ error }) {
    yield put({ type: REQUEST_CONTROLS_ERROR, success: false });
  }
}

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.Aludoc.Controls[func], params);

    if (data.data || data.data == false) {
      if (data && data.data.errorCode)
        yield put({ type: REQUEST_CONTROLS_ERROR, error: data.data.errorData });
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
    yield put({ type: REQUEST_CONTROLS_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(DETAIL_REQUEST_CONTROL, fetchDetailControl); //no cumple el patron de generic api call
  yield takeLatest(REQUEST_CONTROLS, genericApiCall, "getMyControls");
  yield takeLatest(CREATE_REQUEST_CONTROL, genericApiCall, "createControl");
  yield takeLatest(DELETE_REQUEST_CONTROL, genericApiCall, "deleteControls");
  yield takeLatest(EDIT_REQUEST_CONTROL, genericApiCall, "editControl");
  yield takeLatest(
    REQUEST_CONTROL_PEOPLE_GRAPH_DATA,
    genericApiCall,
    "getControlPeopleGraphData"
  );
  yield takeLatest(
    REQUEST_PERSONS_BY_CONTROL,
    genericApiCall,
    "getPersonsByControl"
  );
  yield takeLatest(
    REQUEST_SET_CONTROL_NOTIFICATIONS,
    genericApiCall,
    "setControlNotifications"
  );
  yield takeLatest(
    REQUEST_HIGHEST_CONTROL_ID,
    genericApiCall,
    "getHighestControlId"
  );
  yield takeLatest(
    REQUEST_COMPANIES_BY_CONTROL_ID,
    genericApiCall,
    "getCompaniesByControlId"
  );
  yield takeLatest(
    REQUEST_IS_CONTROL_NAME_AVAILABLE,
    genericApiCall,
    "isControlNameAvailable"
  );
}
