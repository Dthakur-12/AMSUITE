import { all, call, put, takeLatest } from "redux-saga/effects";
import ApiHandler from "../../services/ApiHandler";
import {
  REQUEST_TERMS_AND_CONDITION,
  RECEIVE_TERMS_AND_CONDITION,
  REQUEST_INSERT_TERMS_AND_CONDITION,
  RECEIVE_INSERT_TERMS_AND_CONDITION,
  ERROR_TERMS_AND_CONDITION
} from "../../actions/EasyAccess/TermsAndCondition_actions";

function* insertWatcher() {
  yield takeLatest(REQUEST_INSERT_TERMS_AND_CONDITION, fetchInsert);
}

function* fetchInsert({ value }) {
  try {
    const { status, data: response } = yield call(    
      ApiHandler.EasyAccess.TermsAndConditions.insert,
      value
    );
    if (status === 200) {
      yield put({
        type: RECEIVE_INSERT_TERMS_AND_CONDITION,
        response
      });
    } else {
      yield put({ type: ERROR_TERMS_AND_CONDITION, error: response });
    }
  } catch ({ error }) {
    yield put({ type: ERROR_TERMS_AND_CONDITION, error: error });
  }
}

function* getWatcher() {
  yield takeLatest(REQUEST_TERMS_AND_CONDITION, fetchGet);
}

function* fetchGet({ value }) {
  try {
    const { status, data: response } = yield call(
      ApiHandler.EasyAccess.TermsAndConditions.getAll
    );
    if (status === 200) {
      yield put({
        type: RECEIVE_TERMS_AND_CONDITION,
        response
      });
    } else {
      yield put({ type: ERROR_TERMS_AND_CONDITION, error: response });
    }
  } catch ({ error }) {
    yield put({ type: ERROR_TERMS_AND_CONDITION, error: error });
  }
}

export default function* termsAndConditionsSaga() {
  yield all([insertWatcher(), getWatcher()]);
}
