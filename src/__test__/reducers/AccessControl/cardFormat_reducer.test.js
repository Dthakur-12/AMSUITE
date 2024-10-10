import cardFormat_reducer from "../../../reducers/AccessControl/cardFormat_reducer";
import {REQUEST_GET_CARD_FORMATS,REQUEST_DELETE_CARD_FORMATS,REQUEST_GET_CARD_FORMAT_READERS,REQUEST_ASSIGN_CARD_FORMAT_READERS,
    REQUEST_UPDATE_CARD_FORMAT_BY_READER,REQUEST_CARD_FORMAT_BY_ID,REQUEST_CREATE_CARD_FORMAT,
    REQUEST_EDIT_CARD_FORMAT,RECEIVE_GET_CARD_FORMATS,RECEIVE_DELETE_CARD_FORMATS,RECEIVE_GET_CARD_FORMAT_READERS,
    RECEIVE_ASSIGN_CARD_FORMAT_READERS,RECEIVE_UPDATE_CARD_FORMAT_BY_READER,RECEIVE_EDIT_CARD_FORMAT,
    RECEIVE_CARD_FORMAT_BY_ID,REQUEST_ERROR,RECEIVE_CREATE_CARD_FORMAT,CLEAR_DATA_NEW} from "../../../actions/AccessControl/cardFormat_actions";


describe('cardFormat_reducer', () => {
    it('REQUEST_GET_CARD_FORMATS', () => {
        const initialState = {}
        const expectedState = { loading: true, successGetCardFormats: false }
        const payload = {}
        const action = {
          type: REQUEST_GET_CARD_FORMATS, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_CARD_FORMATS', () => {
        const initialState = {}
        const expectedState = { successDeleteCardFormat: false  }
        const payload = {}
        const action = {
          type: REQUEST_DELETE_CARD_FORMATS, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_CARD_FORMAT_READERS', () => {
        const initialState = {}
        const expectedState = {successGetCardFormatReaders: false  }
        const payload = {}
        const action = {
          type: REQUEST_GET_CARD_FORMAT_READERS, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ASSIGN_CARD_FORMAT_READERS', () => {
        const initialState = {}
        const expectedState = {successAssignCardFormatReaders: false   }
        const payload = {}
        const action = {
          type: REQUEST_ASSIGN_CARD_FORMAT_READERS, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_UPDATE_CARD_FORMAT_BY_READER', () => {
        const initialState = {}
        const expectedState = {successUpdateCardFormatByReader: false }
        const payload = {}
        const action = {
          type: REQUEST_UPDATE_CARD_FORMAT_BY_READER, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CARD_FORMAT_BY_ID', () => {
        const initialState = {}
        const expectedState = {        successCardFormatById: false,
            loadingGetCardFormatById: true, }
        const payload = {}
        const action = {
          type: REQUEST_CARD_FORMAT_BY_ID, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_CARD_FORMAT', () => {
        const initialState = {}
        const expectedState = { loading: true, successCreateCardFormat: false}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_CARD_FORMAT, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_EDIT_CARD_FORMAT', () => {
        const initialState = {}
        const expectedState = { successEditCardFormat: false, loading: true}
        const payload = {}
        const action = {
          type: REQUEST_EDIT_CARD_FORMAT, 
          payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_CARD_FORMATS', () => {
        const initialState = {}
        const expectedState = {    loading: false,
            successGetCardFormats: true,
            cardFormats: undefined,
            cardCount: 0,
            info:{ data:undefined,
            dataCount:0}
          }
            const payload = {
              data:undefined,
              dataCount:0
            }
        const action = {
          type: RECEIVE_GET_CARD_FORMATS, 
          data:payload
        }
        expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
      })
    it('RECEIVE_DELETE_CARD_FORMATS', () => {
            const initialState = {}
            const expectedState = { successDeleteCardFormat: true }
            const payload = {}
            const action = {
              type: RECEIVE_DELETE_CARD_FORMATS, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('RECEIVE_GET_CARD_FORMAT_READERS', () => {
            const initialState = {}
            const expectedState = {  successGetCardFormatReaders: true,}
            const payload = {}
            const action = {
              type: RECEIVE_GET_CARD_FORMAT_READERS, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('RECEIVE_ASSIGN_CARD_FORMAT_READERS', () => {
            const initialState = {}
            const expectedState = {successAssignCardFormatReaders: true}
            const payload = {}
            const action = {
              type: RECEIVE_ASSIGN_CARD_FORMAT_READERS, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('RECEIVE_UPDATE_CARD_FORMAT_BY_READER', () => {
            const initialState = {}
            const expectedState = {successUpdateCardFormatByReader: true}
            const payload = {}
            const action = {
              type: RECEIVE_UPDATE_CARD_FORMAT_BY_READER, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('RECEIVE_CREATE_CARD_FORMAT', () => {
            const initialState = {}
            const expectedState = {loading: false, successCreateCardFormat: true }
            const payload = {}
            const action = {
              type: RECEIVE_CREATE_CARD_FORMAT, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('RECEIVE_EDIT_CARD_FORMAT', () => {
            const initialState = {}
            const expectedState = {loading: false, successEditCardFormat: true }
            const payload = {}
            const action = {
              type: RECEIVE_EDIT_CARD_FORMAT, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('RECEIVE_CARD_FORMAT_BY_ID', () => {
            const initialState = {}
            const expectedState = {   loadingGetCardFormatById: false,
                //cardFormatById: action.data,
                successCardFormatById: true,}
            const payload = {}
            const action = {
              type: RECEIVE_CARD_FORMAT_BY_ID, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('REQUEST_ERROR', () => {
            const initialState = {}
            const expectedState = { loading: false,
                loadingCreate: false,
                loadingEdit: false,
                loadingGetCardFormatById: false,
                successGetCardFormats: false,
                successDeleteCardFormat: false,
                successGetCardFormatReaders: false,
                successAssignCardFormatReaders: false,
                successUpdateCardFormatByReader: false,
                successCardFormatById: false,
                successCreateCardFormat: false,
                successEditCardFormat: false, }
            const payload = {}
            const action = {
              type: REQUEST_ERROR, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
          it('CLEAR_DATA_NEW', () => {
            const initialState = {}
            const expectedState = { error:undefined,
                loading: false,
                loadingCreate: false,
                loadingEdit: false,
                loadingGetCardFormatById: false,
                successCardFormatById: false,
                successCreateCardFormat: false,
                successEditCardFormat: false, }
            const payload = {}
            const action = {
              type: CLEAR_DATA_NEW, 
              payload
            }
            expect(cardFormat_reducer(initialState, action)).toEqual(expectedState)
          })
    })