import MessagesReducer from "../../../reducers/AccessControl/messages_reducer";

import {REQUEST_GET_MESSAGES,RECEIVE_GET_MESSAGES,REQUEST_GET_MESSAGES_COUNT,RECEIVE_GET_MESSAGES_COUNT,REQUEST_SEND_MESSAGE,RECEIVE_SEND_MESSAGE,REQUEST_ERROR   } from "../../../actions/AccessControl/messages_actions";


describe('MessagesReducer', () => {
    it('REQUEST_GET_MESSAGES', () => {
        const initialState = {}
        const expectedState = { successMesages: false }
        const payload = {}
        const action = {
          type: REQUEST_GET_MESSAGES, 
          payload
        }
        expect(MessagesReducer(initialState, action)).toEqual(expectedState)
      })
        it('RECEIVE_GET_MESSAGES', () => {
        const initialState = {}
        const expectedState = {successMesages: true,data:undefined,messagesDataCount:0}
        const payload = {data:undefined,
          dataCount:0}
        const action = {
          type: RECEIVE_GET_MESSAGES, 
          data:payload
        }
        expect(MessagesReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_MESSAGES_COUNT', () => {
        const initialState = {}
        const expectedState = { successMesagesCount: false  }
        const payload = {}
        const action = {
          type: REQUEST_GET_MESSAGES_COUNT, 
          payload
        }
        expect(MessagesReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_MESSAGES_COUNT', () => {
        const initialState = {}
        const expectedState = {successMesagesCount: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GET_MESSAGES_COUNT, 
          payload
        }
        expect(MessagesReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_SEND_MESSAGE', () => {
        const initialState = {}
        const expectedState = {successMesagesSended: false }
        const payload = {}
        const action = {
          type: REQUEST_SEND_MESSAGE, 
          payload
        }
        expect(MessagesReducer(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_SEND_MESSAGE', () => {
        const initialState = {}
        const expectedState = {successMesagesSended: true}
        const payload = {}
        const action = {
          type: RECEIVE_SEND_MESSAGE, 
          payload
        }
        expect(MessagesReducer(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR', () => {
        const initialState = {}
        const expectedState = {}
        const payload = {}
        const action = {
          type: REQUEST_ERROR, 
          payload
        }
        expect(MessagesReducer(initialState, action)).toEqual(expectedState)
      })
})