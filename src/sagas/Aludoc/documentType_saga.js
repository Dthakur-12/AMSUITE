import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  RECEIVE_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE,
  RECEIVE_CREATE_DOCUMENTTYPE,
  REQUEST_CREATE_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE_ERROR,
  REQUEST_DOCTYPES_BY_COMPANIES,
  RECEIVE_DOCTYPES_BY_COMPANIES,
  RECEIVE_DELETE_DOCTYPES,
  REQUEST_DELETE_DOCTYPES,
  REQUEST_EDIT_DOCUMENTTYPE,
  RECEIVE_EDIT_DOCUMENTTYPE,
  REQUEST_DOCUMENTTYPE_BY_ID,
  RECEIVE_DOCUMENTTYPE_BY_ID,
  REQUEST_CATEGORIES
} from "../../actions/Aludoc/documentType_action.js";

import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  console.log('data: ', data);
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(ApiHandler.Aludoc.Documents[func], params);
    if (data && data.errorCode)
      yield put({ type: REQUEST_DOCUMENTTYPE_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_DOCUMENTTYPE_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_DOCUMENTTYPE, genericApiCall, "getDocumentTypes");
  yield takeLatest(
    REQUEST_EDIT_DOCUMENTTYPE,
    genericApiCall,
    "editDocumentType"
  );
  yield takeLatest(
    REQUEST_DOCUMENTTYPE_BY_ID,
    genericApiCall,
    "getDocumentTypeById"
  );
  yield takeLatest(
    REQUEST_CREATE_DOCUMENTTYPE,
    genericApiCall,
    "createDocumentType"
  );
  yield takeLatest(
    REQUEST_DELETE_DOCTYPES,
    genericApiCall,
    "deleteDocumentsType"
  );
  yield takeLatest(
    REQUEST_DOCTYPES_BY_COMPANIES,
    genericApiCall,
    "getDocumentTypesByCompanies"
  );
  yield takeLatest(
    REQUEST_CATEGORIES,
    genericApiCall,
    "genericDataTableApiCall"
  );
}
