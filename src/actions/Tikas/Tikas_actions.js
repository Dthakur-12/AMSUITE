export const REQUEST_GET_PRINTERS = "REQUEST_GET_PRINTERS";
export const RECEIVE_GET_PRINTERS = "RECEIVE_GET_PRINTERS";
export const REQUEST_DELETE_PRINTER = "REQUEST_DELETE_PRINTERS";
export const RECEIVE_DELETE_PRINTER = "RECEIVE_DELETE_PRINTERS";
export const REQUEST_CREATE_PRINTER = "REQUEST_CREATE_PRINTER";
export const RECEIVE_CREATE_PRINTER = "RECEIVE_CREATE_PRINTER";
export const REQUEST_TIKAS_ERROR = "REQUEST_TIKAS_ERROR";

export const requestPrinters = () => ({
  type: REQUEST_GET_PRINTERS
});

export const requestCreatePrinter = printerName => ({
  type: REQUEST_CREATE_PRINTER,
  printerName
});

export const requestDeletePrinter = idPrinter => ({
  type: REQUEST_DELETE_PRINTER,
  idPrinter
});

export const requestTikasError = error => ({
  type: REQUEST_TIKAS_ERROR,
  error
});
