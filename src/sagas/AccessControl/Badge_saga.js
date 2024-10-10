import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_GET_BADGE_TYPES,
  REQUEST_GET_BADGE_BY_ID,
  REQUEST_GET_BADGE_STATUS,
  REQUEST_GET_ALL_BADGE_STATUS,
  REQUEST_CREATE_BADGE,
  REQUEST_CREATE_BADGE_TYPE,
  REQUEST_EDIT_BADGE,
  REQUEST_DELETE_BADGES,
  REQUEST_BADGE_ERROR,
} from "../../actions/AccessControl/badge_actions";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.AccessControl.Badges[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_BADGE_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    yield put({ type: REQUEST_BADGE_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_CREATE_BADGE, genericApiCall, "createBadge");
  yield takeLatest(REQUEST_DELETE_BADGES, genericApiCall, "deleteBadges");
  yield takeLatest(REQUEST_EDIT_BADGE, genericApiCall, "editBadge");
  yield takeLatest(REQUEST_GET_BADGE_STATUS, genericApiCall, "getBadgeStatus");
  yield takeLatest(REQUEST_GET_BADGE_BY_ID, genericApiCall, "getBadgeById");
  yield takeLatest(REQUEST_GET_BADGE_TYPES, genericApiCall, "getBadgeTypes");
  yield takeLatest(
    REQUEST_CREATE_BADGE_TYPE,
    genericApiCall,
    "createBadgeType"
  );
  yield takeLatest(
    REQUEST_GET_ALL_BADGE_STATUS,
    genericApiCall,
    "getAllBadgeStatus"
  );
}
