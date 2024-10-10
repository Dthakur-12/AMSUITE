import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_CREATE_PERSON,
  REQUEST_GET_PERSON_BY_ID,
  REQUEST_EMPLOYEES,
  REQUEST_PERSONS,
  REQUEST_PERSONS_TYPES,
  REQUEST_SET_IMAGE,
  REQUEST_SET_IMAGE_URL,
  REQUEST_GET_IMAGE,
  REQUEST_DELETE_IMAGE,
  REQUEST_UPDATE_IMAGE,
  REQUEST_PERSON_ERROR,
  RECEIVE_CREATE_PERSON_ANONYMOUSE,
  REQUEST_CREATE_PERSON_ANONYMOUSE,
  REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS,
  REQUEST_CREATE_VISITOR_GROUP,
  REQUEST_CHECK_DOC_NUMBER,
  REQUEST_XLS_WITH_VISITOR_GROUP,
  REQUEST_XLS_TEMPLATE,
  REQUEST_GET_PERSON_GROUPS,
  REQUEST_CREATE_PERSONS_GROUP,
  REQUEST_GET_PERSON_BY_GROUPS,
  REQUEST_GET_PERSON_GROUPS_REPORT_XLS,
} from "../../actions/EasyAccess/Person_actions";
import ApiHandler from "../../services/ApiHandler";
import AmSuiteNavBar from "../../utils/AmSuiteNavBar";

function* createPersonAnonymouse({ person }) {
  const photo = person.photo;
  person.photo = undefined;
  try {
    const { data: personData, status } = yield call(
      ApiHandler.EasyAccess.Persons.createPersonAnonymous,
      person
    );
    if (personData.data > 0) {
      if (photo)
        yield call(ApiHandler.EasyAccess.Persons.setImageAnonymous, {
          id: personData.data,
          file: photo,
        });
      yield put({
        type: RECEIVE_CREATE_PERSON_ANONYMOUSE,
        personsAnonymouse: personData,
      });
    } else {
      yield put({
        type: REQUEST_PERSON_ERROR,
        success: false,
        error: personData,
      });
    }
  } catch ({ error }) {
    yield put({ type: REQUEST_PERSON_ERROR, error: error });
  }
}

function* genericApiCall(...data) {
  let func = data[0];
  console.log("func: ", func);
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.EasyAccess.Persons[func], params);
    if (data) {
      if (data.data && data.data.errorCode)
        yield put({ type: REQUEST_PERSON_ERROR, error: data.data.errorData });
      else
        yield put({
          type: type.replace("REQUEST", "RECEIVE"),
          data: data.data,
        });
    } else yield put({ type: type.replace("REQUEST", "RECEIVE") });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    if(error && error.error)
      yield put({ type: REQUEST_PERSON_ERROR, error: error.error });
  }
}

export default function* sagas() {
  yield takeLatest(REQUEST_CREATE_PERSON_ANONYMOUSE, createPersonAnonymouse); //no cumple patron de genericApi Call
  yield takeLatest(
    REQUEST_GET_PERSON_GROUPS,
    genericApiCall,
    "getPersonGroups"
  );
  yield takeLatest(
    REQUEST_CREATE_PERSONS_GROUP,
    genericApiCall,
    "createPersonsGroup"
  );
  yield takeLatest(
    REQUEST_GET_PERSON_BY_GROUPS,
    genericApiCall,
    "getPersonsByGroupReport"
  );
  yield takeLatest(
    REQUEST_GET_PERSON_GROUPS_REPORT_XLS,
    genericApiCall,
    "getPersonsByGroupReportXLS"
  );
  yield takeLatest(REQUEST_UPDATE_IMAGE, genericApiCall, "updateImage");
  yield takeLatest(REQUEST_DELETE_IMAGE, genericApiCall, "deleteImage");
  yield takeLatest(REQUEST_CREATE_PERSON, genericApiCall, "createPerson");
  yield takeLatest(REQUEST_PERSONS, genericApiCall, "getPersons");
  yield takeLatest(REQUEST_EMPLOYEES, genericApiCall, "getEmployees");
  yield takeLatest(REQUEST_GET_IMAGE, genericApiCall, "getImage");
  yield takeLatest(REQUEST_SET_IMAGE_URL, genericApiCall, "setImageURL");
  yield takeLatest(REQUEST_SET_IMAGE, genericApiCall, "setImage");
  yield takeLatest(REQUEST_PERSONS_TYPES, genericApiCall, "getTypes");
  yield takeLatest(REQUEST_GET_PERSON_BY_ID, genericApiCall, "getEmployeeById");
  yield takeLatest(
    REQUEST_CREATE_VISITOR_GROUP,
    genericApiCall,
    "createVisitorGroup"
  );
  yield takeLatest(
    REQUEST_XLS_WITH_VISITOR_GROUP,
    genericApiCall,
    "getXLSWithVisitorGroup"
  );
  yield takeLatest(
    REQUEST_XLS_TEMPLATE,
    genericApiCall,
    "getXLSWithVisitorGroup"
  );

  yield takeLatest(
    REQUEST_CHECK_DOC_NUMBER,
    genericApiCall,
    "checkDocumentNumbers"
  );
  yield takeLatest(
    REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS,
    genericApiCall,
    "getPersonByDocumentNumberAnonymous"
  );
}
