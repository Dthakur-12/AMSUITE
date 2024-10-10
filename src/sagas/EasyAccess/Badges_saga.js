import { all, call, put, takeLatest } from "redux-saga/effects";
import ApiHandler from "../../services/ApiHandler";
import {
  REQUEST_BADGES,
  REQUEST_UNASSIGNED_BADGES,
  REQUEST_COUNT_BADGES_FOR_AUTOASSIGN,
  REQUEST_BADGES_STATUSES,
  REQUEST_PRINT_BADGE,
  REQUEST_BADGE_ERROR,
  REQUEST_BADGE_BY_QR
} from "../../actions/EasyAccess/Badges_actions";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.EasyAccess.Badges[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_BADGE_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_BADGE_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_BADGE_BY_QR, genericApiCall, "getBadgeAsQR");
  yield takeLatest(REQUEST_PRINT_BADGE, genericApiCall, "printBadgeData");
  yield takeLatest(REQUEST_BADGES_STATUSES, genericApiCall, "getBadgeStatus");
  yield takeLatest(REQUEST_BADGES, genericApiCall, "getBadges");
  yield takeLatest(
    REQUEST_COUNT_BADGES_FOR_AUTOASSIGN,
    genericApiCall,
    "getCountBadgesForAutoAssign"
  );
  yield takeLatest(
    REQUEST_UNASSIGNED_BADGES,
    genericApiCall,
    "getUnassignedBadges"
  );
}
