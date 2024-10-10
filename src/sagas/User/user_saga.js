import ApiHandler from "../../services/ApiHandler";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  REQUEST_CHECK_CREDENTIALS,
  RECEIVE_CHECK_CREDENTIALS,
  LOGIN,
  LOGIN_ACTIVE_DIRECTORY,
  TRY_LOGIN,
  RECEIVE_CURRENT_USER,
  REQUEST_CHECK_CREDENTIALS_ERROR,
  USER_ERROR,
  RECEIVE_USER_ACTIVITIES,
  REQUEST_USER_ACTIVITIES,
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_CREATE_USER_SAML_PERMITS,
  RECEIVE_CREATE_USER_SAML_PERMITS,
} from "../../actions/Users/user_actions";

function* genericApiCall(...data) {
  let controller = data[0];
  let func = data[1];
  let receiveAction = data[2];
  let action = data[3];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.AMSuite[controller][func], params);
    if (data)
      if (data.data && data.data.errorCode)
        yield put({ type: USER_ERROR, error: data.data.errorData });
      else yield put({ type: receiveAction, data: data.data });
    else {
      yield put({ type: USER_ERROR, error: "Error" });
    }
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: USER_ERROR, error: error.error.errorData });
  }
}

export default function* userSaga() {
  yield takeLatest(
    REQUEST_USER_ACTIVITIES,
    genericApiCall,
    "User",
    "GetAllUserActivities",
    RECEIVE_USER_ACTIVITIES
  );
  yield takeLatest(
    TRY_LOGIN,
    genericApiCall,
    "Session",
    "getCurrentUser",
    RECEIVE_CURRENT_USER
  );
  yield takeLatest(
    LOGIN_ACTIVE_DIRECTORY,
    genericApiCall,
    "Session",
    "loginActiveDirectory",
    RECEIVE_CURRENT_USER
  );
  yield takeLatest(
    LOGIN,
    genericApiCall,
    "Session",
    "login",
    RECEIVE_CURRENT_USER
  );
  yield takeLatest(
    REQUEST_CHECK_CREDENTIALS,
    genericApiCall,
    "User",
    "CheckCredentials",
    RECEIVE_CHECK_CREDENTIALS
  );
  yield takeLatest(
    REQUEST_USERS,
    genericApiCall,
    "User",
    "GetUsers",
    RECEIVE_USERS
  );
  yield takeLatest(
    REQUEST_CREATE_USER_SAML_PERMITS,
    genericApiCall,
    "User",
    "CreateSAMLGroups",
    RECEIVE_CREATE_USER_SAML_PERMITS
  );
}
