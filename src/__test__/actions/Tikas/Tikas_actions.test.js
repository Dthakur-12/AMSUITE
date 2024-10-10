import {requestPrinters,requestCreatePrinter,requestDeletePrinter,requestTikasError} from '../../../actions/Tikas/Tikas_actions';

describe('Actions', () => {
    test('requestPrinters Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_PRINTERS",
        };    
        expect(requestPrinters(payload)).toEqual(expected);
      })
      test('requestCreatePrinter Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_PRINTER",
          printerName:{}
        };    
        expect(requestCreatePrinter(payload)).toEqual(expected);
      })
      test('requestDeletePrinter Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DELETE_PRINTERS",
          idPrinter:{}
        };    
        expect(requestDeletePrinter(payload)).toEqual(expected);
      })
      test('requestTikasError Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_TIKAS_ERROR",
          error:{}
        };    
        expect(requestTikasError(payload)).toEqual(expected);
      })
})