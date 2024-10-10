import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_ENTERPRISES,
  REQUEST_ENTERPRISES_HOST,
  REQUEST_ENTERPRISE_ERROR,
  REQUEST_CREATE_ENTERPRISES,
  REQUEST_EDIT_ENTERPRISES,
  REQUEST_ENTERPRISES_BY_ID,
  REQUEST_DELETE_ENTERPRISES,
  REQUEST_ENTERPRISES_ANONYMOUSE,
  REQUEST_ENTERPRISESHOST_ANONYMOUSE,
  REQUEST_VISITS_ENTERPRISE,
  REQUEST_VISITS_ENTERPRISE_REPORT,
} from "../../actions/EasyAccess/Enterprise_actions";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.EasyAccess.Enterprise[func], params);
    console.log("data: ", data);
    const dataObject = data && data.data ? data.data : data;
    if (dataObject && dataObject.errorCode)
      yield put({
        type: REQUEST_ENTERPRISE_ERROR,
        error: dataObject.errorData,
      });
    else
      yield put({ type: type.replace("REQUEST", "RECEIVE"), data: dataObject });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({
      type: REQUEST_ENTERPRISE_ERROR,
      error:
        error && error.error && error.error.errorData
          ? error.error.errorData
          : "error",
    });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_ENTERPRISES, genericApiCall, "getEnterprises");
  yield takeLatest(REQUEST_EDIT_ENTERPRISES, genericApiCall, "editEnterprise");
  yield takeLatest(
    REQUEST_CREATE_ENTERPRISES,
    genericApiCall,
    "createEnterprise"
  );
  yield takeLatest(
    REQUEST_DELETE_ENTERPRISES,
    genericApiCall,
    "deleteEnterprises"
  );
  yield takeLatest(
    REQUEST_ENTERPRISES_BY_ID,
    genericApiCall,
    "getEnterpriseById"
  );
  yield takeLatest(REQUEST_ENTERPRISES_HOST, genericApiCall, "getEnterprises");
  yield takeLatest(
    REQUEST_ENTERPRISESHOST_ANONYMOUSE,
    genericApiCall,
    "getEnterprisesAnonymous"
  );
  yield takeLatest(
    REQUEST_ENTERPRISES_ANONYMOUSE,
    genericApiCall,
    "getEnterprisesAnonymous"
  );
  yield takeLatest(
    REQUEST_VISITS_ENTERPRISE,
    genericApiCall,
    "getVisitsEnterprises"
  );
  yield takeLatest(
    REQUEST_VISITS_ENTERPRISE_REPORT,
    genericApiCall,
    "ScheduledVisitsXLS"
  );
}
