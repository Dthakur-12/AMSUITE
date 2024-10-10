import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_GET_PANELS,
  REQUEST_DELETE_PANELS,
  REQUEST_LOGOFF_PANEL,
  REQUEST_CREATE_PANEL,
  REQUEST_EDIT_PANEL,
  REQUEST_GET_BY_ID,
  REQUEST_GET_MOBILE_PANELS,
  REQUEST_ERROR,
  REQUEST_HISTORICAL_GPS,
  REQUEST_GET_READER_MODE,
  REQUEST_GET_ROUTES,
  REQUEST_GET_WORKING_MODES,
  REQUEST_CREATE_BUS_CAPACITY,
  REQUEST_GET_BUS_CAPACITIES,
  REQUEST_DELETE_BUS_CAPACITY,
  REQUEST_UPDATE_BUS_CAPACITY,
  REQUEST_DELETE_ROUTE,
  REQUEST_CREATE_OR_EDIT_ROUTE,
} from "../../actions/AccessControl/panel_actions";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.AccessControl.Panels[func], params);
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
    REQUEST_GET_MOBILE_PANELS,
    genericApiCall,
    "getMobilePanels"
  );
  yield takeLatest(REQUEST_GET_BY_ID, genericApiCall, "getPanelById");
  yield takeLatest(REQUEST_EDIT_PANEL, genericApiCall, "editPanel");
  yield takeLatest(REQUEST_CREATE_PANEL, genericApiCall, "createPanel");
  yield takeLatest(REQUEST_LOGOFF_PANEL, genericApiCall, "logOff");
  yield takeLatest(REQUEST_GET_PANELS, genericApiCall, "getPanels");
  yield takeLatest(REQUEST_GET_ROUTES, genericApiCall, "getRoutes");
  yield takeLatest(REQUEST_DELETE_ROUTE, genericApiCall, "deleteRoutes");
  yield takeLatest(
    REQUEST_CREATE_OR_EDIT_ROUTE,
    genericApiCall,
    "createOrUpdateRoute"
  );
  yield takeLatest(
    REQUEST_HISTORICAL_GPS,
    genericApiCall,
    "historicalTracking"
  );
  yield takeLatest(REQUEST_GET_READER_MODE, genericApiCall, "getReaderModes");
  yield takeLatest(REQUEST_DELETE_PANELS, genericApiCall, "deletePanel");
  yield takeLatest(
    REQUEST_CREATE_BUS_CAPACITY,
    genericApiCall,
    "createBusCapacity"
  );
  yield takeLatest(
    REQUEST_DELETE_BUS_CAPACITY,
    genericApiCall,
    "deleteBusCapacity"
  );
  yield takeLatest(
    REQUEST_UPDATE_BUS_CAPACITY,
    genericApiCall,
    "updateBusCapacity"
  );
  yield takeLatest(
    REQUEST_GET_BUS_CAPACITIES,
    genericApiCall,
    "getBusCapacities"
  );
  yield takeLatest(
    REQUEST_GET_WORKING_MODES,
    genericApiCall,
    "getWorkingModes"
  );
}
