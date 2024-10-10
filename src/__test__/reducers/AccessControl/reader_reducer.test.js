import reader_reducer from "../../../reducers/AccessControl/reader_reducer";;
import {REQUEST_GET_READERS,
    REQUEST_DELETE_READERS,
    REQUEST_ASSIGN_AL,
    REQUEST_GET_CARDFORMAT_IDS,
    REQUEST_CREATE_READER,
    REQUEST_EDIT_READER,
    RECEIVE_GET_READERS,
    RECEIVE_DELETE_READERS,
    RECEIVE_ASSIGN_AL,
    RECEIVE_GET_CARDFORMAT_IDS,
    REQUEST_EXIST_READERNAME,
    RECEIVE_EXIST_READERNAME,
    RECEIVE_CREATE_READER,
    RECEIVE_EDIT_READER,
    REQUEST_ERROR,
    REQUEST_GET_MOBILE_READERS,
    RECEIVE_GET_MOBILE_READERS} from "../../../actions/AccessControl/reader_actions";

describe('reader_reducer', () => {

    it('REQUEST_GET_READERS', () => {
        const initialState = {}
        const expectedState = {loading: true, successGetReaders: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_READERS, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_MOBILE_READERS', () => {
        const initialState = {}
        const expectedState = {loading: true, successGetMobileReaders: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_MOBILE_READERS, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_READERS', () => {
        const initialState = {}
        const expectedState = {loading: true, successDelete: false }
        const payload = {}
        const action = {
          type: REQUEST_DELETE_READERS, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ASSIGN_AL', () => {
        const initialState = {}
        const expectedState = {successAssignAL: false}
        const payload = {}
        const action = {
          type: REQUEST_ASSIGN_AL, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_CARDFORMAT_IDS', () => {
        const initialState = {}
        const expectedState = {successGetCardFormat: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_CARDFORMAT_IDS, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_READER', () => {
        const initialState = {}
        const expectedState = {loadingCreate: true, successCreate: false }
        const payload = {}
        const action = {
          type: REQUEST_CREATE_READER, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_EDIT_READER', () => {
        const initialState = {}
        const expectedState = {loadingCreate: true, successEdit: false }
        const payload = {}
        const action = {
          type: REQUEST_EDIT_READER, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_EXIST_READERNAME', () => {
        const initialState = {}
        const expectedState = {loadingExistReaderName: true,
            successExistReaderName: false }
        const payload = {}
        const action = {
          type: REQUEST_EXIST_READERNAME, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_EXIST_READERNAME', () => {
        const initialState = {}
        const expectedState = {loadingExistReaderName: false,
            successExistReaderName: true }
        const payload = {}
        const action = {
          type: RECEIVE_EXIST_READERNAME, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_READERS', () => {
        const initialState = {}
        const expectedState = { loading: false,
            successGetReaders: true, readers: undefined,
            readersCount: 0
          }
        const payload = {data:undefined,
          dataCount:0}
        const action = {
          type: RECEIVE_GET_READERS, 
          data:payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_MOBILE_READERS', () => {
        const initialState = {}
        const expectedState = {   loading: false,
            successGetMobileReaders: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_MOBILE_READERS, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_READERS', () => {
        const initialState = {}
        const expectedState = {loading: false, successDelete: true}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_READERS, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_ASSIGN_AL', () => {
        const initialState = {}
        const expectedState = {successAssignAL: true }
        const payload = {}
        const action = {
          type: RECEIVE_ASSIGN_AL, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_CARDFORMAT_IDS', () => {
        const initialState = {}
        const expectedState = {successGetCardFormat: true}
        const payload = {}
        const action = {
          type: RECEIVE_GET_CARDFORMAT_IDS, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_READER', () => {
        const initialState = {}
        const expectedState = {loadingCreate: false, successCreate: true }
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_READER, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_EDIT_READER', () => {
        const initialState = {}
        const expectedState = {loadingCreate: false, successEdit: true }
        const payload = {}
        const action = {
          type: RECEIVE_EDIT_READER, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR', () => {
        const initialState = {}
        const expectedState = {
            successAssignAL: false,
            successDelete: false,
            successGetReaders: false,
            successGetCardFormat: false,
            successCreate: false,
            loading: false,
            loadingCreate: false,
            successEdit: false}
        const payload = {}
        const action = {
          type: REQUEST_ERROR, 
          payload
        }
        expect(reader_reducer(initialState, action)).toEqual(expectedState)
      })
})