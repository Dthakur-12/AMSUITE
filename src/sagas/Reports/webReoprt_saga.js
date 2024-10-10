import ApiHandler from '../../services/ApiHandler'
import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import {
  REQUEST_GET_WEB_REPORT,
  RECEIVE_GET_WEB_REPORT,
  REQUEST_DOWNLOAD_WEB_REPORT,
  RECEIVE_DOWNLOAD_WEB_REPORT,
  WEB_REPORT_ERROR
} from '../../actions/Reports/webReport_actions'

function* genericApiCall(...data) {
  let controller = data[0]
  let func = data[1]
  let receiveAction = data[2]
  let action = data[3]
  let params = Object.values(action)[1]
  let type = action.type
  console.log(
    '🚀 ~ file: busValidation_saga.js ~ line 12 ~ function*genericApiCall ~ data',
    data
  )
  console.log(
    '🚀 ~ file: busValidation_saga.js ~ line 18 ~ function*genericApiCall ~ params',
    params
  )
  try {
    const data = yield call(ApiHandler.Reports[controller][func], params)
    if (data) {
      if (data.error) yield put({ type: WEB_REPORT_ERROR, payload: data.error })
      else yield put({ type: receiveAction, payload: data.data })
    } else {
      yield put({ type: WEB_REPORT_ERROR, payload: 'Error' })
    }
  } catch (error) {
    console.log(`saga fail in ${func}:`, error)
    if (data[2] === 'RECEIVE_GET_WEB_REPORT' || data[2] === 'RECEIVE_DOWNLOAD_WEB_REPORT')
      yield put({ type: WEB_REPORT_ERROR, payload: error.error })
    else yield put({ type: WEB_REPORT_ERROR, payload: 'Error' })
  }
}


export default function* webReporSaga() {
  yield takeLatest(
    REQUEST_GET_WEB_REPORT, // action inicial, dispara el sagas.
    genericApiCall, // la acción o función que ejecuta el sagas.
    'WebReport', // El controlador del API
    'GetWebReport', // el endpoint del API
    RECEIVE_GET_WEB_REPORT // la action final
  )
  yield takeLatest(
    REQUEST_DOWNLOAD_WEB_REPORT, // action inicial, dispara el sagas.
    genericApiCall, // la acción o función que ejecuta el sagas.
    'WebReport', // El controlador del API
    'DownloadWebReport', // el endpoint del API
    RECEIVE_DOWNLOAD_WEB_REPORT // la action final
  )
}
