import { all, call, put, takeLatest } from "redux-saga/effects";
import ApiHandler from "../../services/ApiHandler";
import {
  REQUEST_GET_CARD_FORMATS,
  REQUEST_DELETE_CARD_FORMATS,
  REQUEST_GET_CARD_FORMAT_READERS,
  REQUEST_ASSIGN_CARD_FORMAT_READERS,
  REQUEST_UPDATE_CARD_FORMAT_BY_READER,
  REQUEST_CREATE_CARD_FORMAT,
  REQUEST_EDIT_CARD_FORMAT,
  REQUEST_CARD_FORMAT_BY_ID,
  REQUEST_ERROR,
} from "../../actions/AccessControl/cardFormat_actions";

function* genericApiCall(...data) {
  let func = data[0];
  let action = data[1];
  let params = Object.values(action)[1];
  let type = action.type;
  try {
    const { data } = yield call(
      ApiHandler.AccessControl.CardFormats[func],
      params
    );

    if (data && data.errorCode)
      yield put({ type: REQUEST_ERROR, error: data.errorData });
    else yield put({ type: type.replace("REQUEST", "RECEIVE"), data });
  } catch (error) {
    console.log(`saga fail in ${func}:`, error);
    yield put({ type: REQUEST_ERROR, error: error.error.errorData });
  }
}

export default function* sagas() {
  yield takeLatest(
    REQUEST_CREATE_CARD_FORMAT,
    genericApiCall,
    "createCardFormat"
  );
  yield takeLatest(REQUEST_EDIT_CARD_FORMAT, genericApiCall, "editCardFormat");
  yield takeLatest(
    REQUEST_CARD_FORMAT_BY_ID,
    genericApiCall,
    "getCardFormatByID"
  );
  yield takeLatest(
    REQUEST_ASSIGN_CARD_FORMAT_READERS,
    genericApiCall,
    "assignReaders"
  );
  yield takeLatest(
    REQUEST_UPDATE_CARD_FORMAT_BY_READER,
    genericApiCall,
    "UpdateCardFormatsByReaderId"
  );
  yield takeLatest(
    REQUEST_GET_CARD_FORMAT_READERS,
    genericApiCall,
    "getCardFormatReaders"
  );
  yield takeLatest(
    REQUEST_DELETE_CARD_FORMATS,
    genericApiCall,
    "deleteCardFormat"
  );
  yield takeLatest(REQUEST_GET_CARD_FORMATS, genericApiCall, "getCardFormats");
}

// function* createCardFormat({ info }) {
//   try {
//     yield call(ApiHandler.AccessControl.CardFormats.createCardFormat, info);
//     yield put(receiveCreateCardFormat());
//   } catch (error) {
//     console.log("error", error);
//     error.response
//       ? yield put({
//           type: REQUEST_ERROR
//         })
//       : error.request
//       ? yield put({ type: REQUEST_ERROR, error: error })
//       : console.log("Error not expected", error.message);
//   }
// }
