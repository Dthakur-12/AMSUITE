import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_REGISTERS,
  REQUEST_DELETE_REGISTERS,
  REQUEST_BADGES_BY_REGISTER,
  REQUEST_REGISTER_ERROR,
  REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED,
  RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED,
  REQUEST_NUMERICAL_RECORDS_BY_PEOPLE,
  REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES,
  RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE,
  RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES,
  REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS,
  REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS,
  REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS,
  RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS,
  RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS,
  RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS
} from "../../actions/EasyAccess/Register_actions";
import ApiHandler from "../../services/ApiHandler";

function* getPeopleInContactWithInfected({ info }) {
  try {
    const { data } = yield call(
      ApiHandler.Reports.Temperature.peopleInContactWithInfected,
      info
    );
    yield put({ type: RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED, data });
  } catch ({ error }) {
    yield put({ type: REQUEST_REGISTER_ERROR, error: error });
  }
}
function* getNumericalRecordsByPeople({ info }) {
  try {
    const { data } = yield call(
      ApiHandler.Reports.Temperature.numericalRecordsByPeople,
      info
    );
    yield put({ type: RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE, data });
  } catch ({ error }) {
    yield put({ type: REQUEST_REGISTER_ERROR, error: error });
  }
}
function* getNumericalRecordsByEnterprises({ info }) {
  try {
    const { data } = yield call(
      ApiHandler.Reports.Temperature.numericalRecordsByEnterprises,
      info
    );
    yield put({ type: RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES, data });
  } catch ({ error }) {
    yield put({ type: REQUEST_REGISTER_ERROR, error: error });
  }
}

function* getPeopleInContactWithInfectedXLS({ info }) {
  try {
    const { data } = yield call(
      ApiHandler.Reports.Temperature.peopleInContactWithInfectedXLS,
      info
    );
    yield put({ type: RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS, data });
  } catch ({ error }) {
    yield put({ type: REQUEST_REGISTER_ERROR, error: error });
  }
}

function* getNumericalRecordsByPeopleXLS({ info }) {
  try {
    const { data } = yield call(
      ApiHandler.Reports.Temperature.numericalRecordsByPeopleXLS,
      info
    );
    yield put({ type: RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS, data });
  } catch ({ error }) {
    yield put({ type: REQUEST_REGISTER_ERROR, error: error });
  }
}

function* getNumericalRecordsByEnterprisesXLS({ info }) {
  try {
    const { data } = yield call(
      ApiHandler.Reports.Temperature.numericalRecordsByEnterprisesXLS,
      info
    );
    yield put({ type: RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS, data });
  } catch ({ error }) {
    yield put({ type: REQUEST_REGISTER_ERROR, error: error });
  }
}

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const data = yield call(ApiHandler.EasyAccess.Register[func], params);
    if (data) {
      if (data.data && data.data.errorCode)
        yield put({ type: REQUEST_REGISTER_ERROR, error: data.data.errorData });
      else
        yield put({
          type: type.replace("REQUEST", "RECEIVE"),
          data: data.data
        });
    } else yield put({ type: type.replace("REQUEST", "RECEIVE") });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_REGISTER_ERROR, error });
  }
}

export default function* sagas() {
  yield takeLatest(
    REQUEST_BADGES_BY_REGISTER,
    genericApiCall,
    "getBadgesByRegister"
  );
  yield takeLatest(REQUEST_DELETE_REGISTERS, genericApiCall, "deleteRegisters");
  yield takeLatest(REQUEST_REGISTERS, genericApiCall, "getRegister");
  yield takeLatest(
    REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED,
    getPeopleInContactWithInfected
  );
  yield takeLatest(
    REQUEST_NUMERICAL_RECORDS_BY_PEOPLE,
    getNumericalRecordsByPeople
  );
  yield takeLatest(
    REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES,
    getNumericalRecordsByEnterprises
  );
  yield takeLatest(
    REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS,
    getPeopleInContactWithInfectedXLS
  );

  yield takeLatest(
    REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS,
    getNumericalRecordsByPeopleXLS
  );
  yield takeLatest(
    REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS,
    getNumericalRecordsByEnterprisesXLS
  );
}
