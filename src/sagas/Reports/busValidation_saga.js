import ApiHandler from '../../services/ApiHandler'
import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import {
  REQUEST_GET_BUS_REPORT,
  RECEIVE_GET_BUS_REPORT,
  BUS_ERROR,
  REQUEST_GET_BUS_SCAN_REPORT,
  RECEIVE_GET_BUS_SCAN_REPORT,
} from '../../actions/Reports/busValidation_actions'

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
      if (data.error) yield put({ type: BUS_ERROR, payload: data.error })
      else yield put({ type: receiveAction, payload: data.data })
    } else {
      yield put({ type: BUS_ERROR, payload: 'Error' })
    }
  } catch (error) {
    console.log(`saga fail in ${func}:`, error)
    if (data[2] === 'RECEIVE_GET_BUS_SCAN_REPORT')
      yield put({ type: BUS_ERROR, payload: error.error })
    else yield put({ type: BUS_ERROR, payload: 'Error' })
  }
}

export default function* busValidationSaga() {
  yield takeLatest(
    REQUEST_GET_BUS_REPORT, // action inicial, dispara el sagas.
    genericApiCall, // la acción o función que ejecuta el sagas.
    'Bus', // El controlador del API
    'GetBusValidationReport', // el endpoint del API
    RECEIVE_GET_BUS_REPORT // la action final
  )
  yield takeLatest(
    REQUEST_GET_BUS_SCAN_REPORT, // action inicial, dispara el sagas.
    genericApiCall, // la acción o función que ejecuta el sagas.
    'Bus', // El controlador del API
    'BusScanning', // el endpoint del API
    RECEIVE_GET_BUS_SCAN_REPORT // la action final
  )
}
