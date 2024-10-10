import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  REQUEST_GET_ALUDOC_SETTINGS,
  REQUEST_ALUDOC_SETTINGS_ERROR,
  REQUEST_SET_ALUDOC_SETTINGS,
  REQUEST_NUMERICAL_RECORDS_SETTINGS,
  REQUEST_SET_NUMERICAL_RECORDS_SETTINGS,
  REQUEST_GET_DAYS_UNTIL_EXPIRED,
  RECEIVE_GET_DAYS_UNTIL_EXPIRED,
  REQUEST_CUSTOM_FIELDS,
  REQUEST_CREATE_CUSTOM_FIELDS,
  REQUEST_CUSTOM_FIELD_TYPE_LIST_VALUES,
  REQUEST_CREATE_CUSTOM_FIELD_TYPE_LIST,
  REQUEST_DELETE_CUSTOM_FIELD,
  REQUEST_SETTINGS_ERROR,
  REQUEST_CUSTOM_FIELDS_INTEGRATOR,
  REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY,
  REQUEST_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES,
  REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES,
  REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES,
  REQUEST_GROUP_PERSON_SETTINGS,
  REQUEST_SET_PERSON_GROUP_SETTINGS,
} from "../../actions/Settings/settings_actions";
import ApiHandler from "../../services/ApiHandler";

function* fetchGetDaysUntilExpired() {
  try {
    const { data: data } = yield call(
      ApiHandler.Setting.NotificationSettings.getDaysUntilExpired,
      {}
    );
    yield put({
      type: RECEIVE_GET_DAYS_UNTIL_EXPIRED,
      data,
    });
  } catch ({ error }) {
    yield put({ type: REQUEST_SETTINGS_ERROR, success: false });
  }
}

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  console.log("action: ", action);
  try {
    const data = yield call(ApiHandler.Setting.Setting[func], params);
    console.log("data: ", data);
    if (data && data.data && data.data.errorCode)
      yield put({
        type: REQUEST_ALUDOC_SETTINGS_ERROR,
        error: data.data.errorData,
      });
    else
      yield put({
        type: type.replace("REQUEST", "RECEIVE"),
        data: data && data.data ? data.data.data : "",
      });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ALUDOC_SETTINGS_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(
    REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES,
    genericApiCall,
    "getCustomFieldsMobileVisibilities"
  );
  yield takeLatest(
    REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES,
    genericApiCall,
    "updateCustomFieldsMobileVisibilities"
  );
  yield takeLatest(
    REQUEST_GROUP_PERSON_SETTINGS,
    genericApiCall,
    "getPersonGroupSettings"
  );
  yield takeLatest(
    REQUEST_SET_PERSON_GROUP_SETTINGS,
    genericApiCall,
    "setPersonGroupSettings"
  );
  yield takeLatest(
    REQUEST_SET_ALUDOC_SETTINGS,
    genericApiCall,
    "editAludocSettings"
  );
  yield takeLatest(
    REQUEST_GET_ALUDOC_SETTINGS,
    genericApiCall,
    "getAludocSettings"
  );
  yield takeLatest(
    REQUEST_NUMERICAL_RECORDS_SETTINGS,
    genericApiCall,
    "getNumericalRecordsSettings"
  );
  yield takeLatest(
    REQUEST_SET_NUMERICAL_RECORDS_SETTINGS,
    genericApiCall,
    "setNumericalRecordsSettings"
  );
  yield takeLatest(REQUEST_CUSTOM_FIELDS, genericApiCall, "getCustomFields");
  yield takeLatest(
    REQUEST_CREATE_CUSTOM_FIELDS,
    genericApiCall,
    "createCustomField"
  );
  yield takeLatest(
    REQUEST_CUSTOM_FIELDS_INTEGRATOR,
    genericApiCall,
    "getCustomsFieldsInIntegrator"
  );
  yield takeLatest(
    REQUEST_DELETE_CUSTOM_FIELD,
    genericApiCall,
    "deleteCustomsFields"
  );
  yield takeEvery(
    REQUEST_CUSTOM_FIELD_TYPE_LIST_VALUES,
    genericApiCall,
    "getCustomFieldTypeListValues"
  );
  yield takeLatest(
    REQUEST_CREATE_CUSTOM_FIELD_TYPE_LIST,
    genericApiCall,
    "createCustomFieldTypeList"
  );
  yield takeLatest(
    REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY,
    genericApiCall,
    "editCustomFieldVisibility"
  );
  yield takeLatest(
    REQUEST_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES,
    genericApiCall,
    "deleteCustomsFieldsTypeListValues"
  );

  yield takeLatest(REQUEST_GET_DAYS_UNTIL_EXPIRED, fetchGetDaysUntilExpired);
}
