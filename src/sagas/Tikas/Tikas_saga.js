import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_GET_PRINTERS,
  RECEIVE_GET_PRINTERS,
  REQUEST_DELETE_PRINTER,
  RECEIVE_DELETE_PRINTER,
  REQUEST_CREATE_PRINTER,
  RECEIVE_CREATE_PRINTER,
  REQUEST_TIKAS_ERROR
} from "../../actions/Tikas/Tikas_actions";

import ApiHandler from "../../services/ApiHandler";

function* getPrintersWatcher() {
  yield takeLatest(REQUEST_GET_PRINTERS, getPrinters);
}

function* getPrinters() {
  try {
    const { data } = yield call(ApiHandler.Tikas.Printers.getPrinters);
    yield put({ type: RECEIVE_GET_PRINTERS, printers: data });
  } catch (error) {
    yield put({ type: REQUEST_TIKAS_ERROR, error: error });
  }
}

function* createPrinterWatcher() {
  yield takeLatest(REQUEST_CREATE_PRINTER, createPrinter);
}

function* createPrinter({ printerName }) {
  try {
    const data = yield call(
      ApiHandler.Tikas.Printers.createPrinter,
      printerName
    );
    yield put({ type: RECEIVE_CREATE_PRINTER, ok: data });
  } catch (error) {
    yield put({ type: REQUEST_TIKAS_ERROR, error: error });
  }
}

function* deletePrintersWatcher() {
  yield takeLatest(REQUEST_DELETE_PRINTER, deletePrinters);
}

function* deletePrinters({ idPrinter }) {
  try {
    const data  = yield call(
      ApiHandler.Tikas.Printers.deletePrinter,
      idPrinter
    );
    yield put({ type: RECEIVE_DELETE_PRINTER, ok: data });
  } catch (error) {
    yield put({ type: REQUEST_TIKAS_ERROR, error: error });
  }
}

export default function* tikasSaga() {
  yield all([
    getPrintersWatcher(),
    createPrinterWatcher(),
    deletePrintersWatcher()
  ]);
}
