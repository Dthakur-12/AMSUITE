export const REQUEST_GET_MESSAGES = "REQUEST_GET_MESSAGES";
export const REQUEST_SEND_MESSAGE = "REQUEST_SEND_MESSAGE";
export const RECEIVE_GET_MESSAGES = "RECEIVE_GET_MESSAGES";
export const RECEIVE_SEND_MESSAGE = "RECEIVE_SEND_MESSAGE";
export const REQUEST_GET_MESSAGES_COUNT = "REQUEST_GET_MESSAGES_COUNT";
export const RECEIVE_GET_MESSAGES_COUNT = "RECEIVE_GET_MESSAGES_COUNT";
export const REQUEST_ERROR = "REQUEST_ERROR";


export function requestMessages(info) {
  return { type: REQUEST_GET_MESSAGES, info };
}

export function requestMessagesCount(info) {
  return { type: REQUEST_GET_MESSAGES_COUNT, info };
}

export function requestSendMessage(info) {
    return { type: REQUEST_SEND_MESSAGE, info };
  }

  

