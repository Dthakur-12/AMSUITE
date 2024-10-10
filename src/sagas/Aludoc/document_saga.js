import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_REQUEST_DOCUMENT,
  REQUEST_DOCUMENT_ERROR,
  REQUEST_DOCUMENT_FILES,
  REQUEST_DOCUMENTS,
  REQUEST_DOCUMENTS_BY_ID,
  REQUEST_EDIT_DOCUMENT,
  REQUEST_DELETE_DOCUMENTS,
  REQUEST_DOWNLOAD_DOCUMENTS_FILE,
  REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
  REQUEST_ALL_DOCS_BY_ENTERPRISES,
  REQUEST_GET_DOCUMENT_BY_PERSONID,
  REQUEST_GET_DOCUMENT_STATUS_GRAPH
} from "../../actions/Aludoc/documents_action";
import ApiHandler from "../../services/ApiHandler";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.Aludoc.Documents[func], params);
    const dataObject = data && data.data ? data.data : data;
    if (dataObject && dataObject.errorCode)
      yield put({ type: REQUEST_DOCUMENT_ERROR, error: dataObject.errorData });
    else
      yield put({ type: type.replace("REQUEST", "RECEIVE"), data: dataObject });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_DOCUMENT_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_DELETE_DOCUMENTS, genericApiCall, "deleteDocuments");
  yield takeLatest(REQUEST_DOCUMENTS, genericApiCall, "getDocuments");
  yield takeLatest(REQUEST_DOCUMENTS_BY_ID, genericApiCall, "getDocumentById");
  yield takeLatest(REQUEST_DOCUMENT_FILES, genericApiCall, "getDocumentFiles");
  yield takeLatest(REQUEST_EDIT_DOCUMENT, genericApiCall, "editDocument");
  yield takeLatest(CREATE_REQUEST_DOCUMENT, genericApiCall, "createDocument");
  yield takeLatest(
    REQUEST_GET_DOCUMENT_STATUS_GRAPH,
    genericApiCall,
    "getDocumentStatusGraphData"
  );
  yield takeLatest(
    REQUEST_GET_DOCUMENT_BY_PERSONID,
    genericApiCall,
    "getDocuments"
  );
  yield takeLatest(
    REQUEST_DOWNLOAD_DOCUMENTS_FILE,
    genericApiCall,
    "downloadDocumentFile"
  );
  yield takeLatest(
    REQUEST_ALL_DOCS_BY_ENTERPRISES,
    genericApiCall,
    "getAllDocumentsByEnterprises"
  );
  yield takeLatest(
    REQUEST_DOCUMENTS_EXPIRING_BEFORE_DATE,
    genericApiCall,
    "getDocumentsExpiringBeforeDate"
  );
}
