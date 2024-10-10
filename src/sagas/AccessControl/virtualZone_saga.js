import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_REQUEST_VIRTUAL_ZONE,
  EDIT_REQUEST_VIRTUAL_ZONE,
  REQUEST_VIRTUAL_ZONE,
  DELETE_REQUEST_VIRTUAL_ZONE,
  REQUEST_VIRTUAL_ZONE_ERROR
} from "../../actions/AccessControl/virtualZone_actions";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.AccessControl.VirtualZones[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_VIRTUAL_ZONE_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_VIRTUAL_ZONE_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_VIRTUAL_ZONE, genericApiCall, "getVirtualZones");
  yield takeLatest(
    EDIT_REQUEST_VIRTUAL_ZONE,
    genericApiCall,
    "editVirtualZone"
  );
  yield takeLatest(
    CREATE_REQUEST_VIRTUAL_ZONE,
    genericApiCall,
    "createVirtualZone"
  );
  yield takeLatest(
    DELETE_REQUEST_VIRTUAL_ZONE,
    genericApiCall,
    "deleteVirtualZone"
  );
}
