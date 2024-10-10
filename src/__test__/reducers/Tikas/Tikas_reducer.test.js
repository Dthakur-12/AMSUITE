import {REQUEST_GET_PRINTERS,RECEIVE_GET_PRINTERS,REQUEST_CREATE_PRINTER,RECEIVE_CREATE_PRINTER,REQUEST_DELETE_PRINTER,RECEIVE_DELETE_PRINTER,REQUEST_TIKAS_ERROR} from '../../../actions/Tikas/Tikas_actions';
import tikasReducer from '../../../reducers/Tikas/Tikas_reducer';
describe('tikasReducer', () => {
    it('REQUEST_GET_PRINTERS', () => {
        const initialState = {}
        const expectedState = { successPrinters: false, loading: true }
        const payload = {}
        const action = {
          type: REQUEST_GET_PRINTERS, 
          payload
        }
        expect(tikasReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_PRINTERS', () => {
        const initialState = {}
        const expectedState = { printers: undefined,
            loading: false,
            storeUpdated: true}
        const payload = {}
        const action = {
          type: RECEIVE_GET_PRINTERS, 
          payload
        }
        expect(tikasReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_PRINTER', () => {
        const initialState = {}
        const expectedState = { loading: true , successCreatedOrDeleted:false}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_PRINTER, 
          payload
        }
        expect(tikasReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_PRINTER', () => {
        const initialState = {}
        const expectedState = {loading: false, successCreatedOrDeleted:true}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_PRINTER, 
          payload
        }
        expect(tikasReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_PRINTER', () => {
        const initialState = {}
        const expectedState = {loading: true, successCreatedOrDeleted:false}
        const payload = {}
        const action = {
          type: REQUEST_DELETE_PRINTER, 
          payload
        }
        expect(tikasReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_PRINTER', () => {
        const initialState = {}
        const expectedState = { loading: false, successCreatedOrDeleted:true}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_PRINTER, 
          payload
        }
        expect(tikasReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_TIKAS_ERROR', () => {
        const initialState = {}
        const expectedState = {loading: false, msgError: undefined, error: true }
        const payload = {}
        const action = {
          type: REQUEST_TIKAS_ERROR, 
          payload
        }
        expect(tikasReducer(initialState, action)).toEqual(expectedState)
      })
    })