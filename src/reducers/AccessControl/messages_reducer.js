import * as actions from "../../actions/AccessControl/messages_actions";

const MessagesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actions.REQUEST_GET_MESSAGES:
      return { ...state, successMesages: false };
    case actions.RECEIVE_GET_MESSAGES:
      return { successMesages: true, data: action.data.data, messagesDataCount: action.data.dataCount };
    case actions.REQUEST_GET_MESSAGES_COUNT:
      return { ...state, successMesagesCount: false };
    case actions.RECEIVE_GET_MESSAGES_COUNT:
      return {
        ...state,
        successMesagesCount: true,
        messagesCount: action.data
      };
    case actions.REQUEST_SEND_MESSAGE:
      return { ...state, successMesagesSended: false };
    case actions.RECEIVE_SEND_MESSAGE:
      return { successMesagesSended: true };
    case actions.REQUEST_ERROR:
      return {
        error: action.error
      };

    default:
      return state;
  }
};

export default MessagesReducer;
