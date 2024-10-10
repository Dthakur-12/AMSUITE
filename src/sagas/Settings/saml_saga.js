import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_CREDENTIAL,
  RECEIVE_CREDENTIAL,
  REQUEST_LOGIN_SAML,
  RECEIVE_LOGIN_SAML,
} from "../../actions/Settings/saml_actions";
import { saveCredential, loginSAML } from "../../services/Setting/saml";

function* saveCredentialWatcher() {
  yield takeLatest(REQUEST_CREDENTIAL, saveSamlCredential);
}

function* saveSamlCredential({ file }) {
  try {
    const { data } = yield call(saveCredential, file);
    // yield put(receiveGetLicense(data));
  } catch (error) {
    // yield put({ type: REQUEST_ERROR, error: error });
  }
}

function* loginSAMLWatcher() {
  yield takeLatest(REQUEST_LOGIN_SAML, fetchLoginSAML);
}

function* fetchLoginSAML({ payload }) {
  try {
    const { data } = yield call(loginSAML, payload);
    // yield put({ type: TRY_LOGIN });
  } catch (error) {
    // yield put({ type: REQUEST_ERROR, error: error });
  }
}

export default function* samlSaga() {
  yield all([saveCredentialWatcher(), loginSAMLWatcher()]);
}
