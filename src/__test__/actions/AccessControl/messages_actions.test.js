import {requestMessages,requestMessagesCount,requestSendMessage} from "../../../actions/AccessControl/messages_actions"
describe('Actions', () => {
    test('requestMessages Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_MESSAGES",
          info:{},
        };    
        expect(requestMessages(payload)).toEqual(expected);
      });
      test('requestMessagesCount Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_MESSAGES_COUNT",
          info:{},
        };    
        expect(requestMessagesCount(payload)).toEqual(expected);
      });
      test('requestSendMessage Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_SEND_MESSAGE",
          info:{},
        };    
        expect(requestSendMessage(payload)).toEqual(expected);
      });
})