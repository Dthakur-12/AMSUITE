import { ADD_WEB } from "../../actions/AMSuite/web_actions";
import { getWebAppValueFromUrl } from "../../utils/Enums";

const usersReducers = (
  state = { currentWeb: getWebAppValueFromUrl(window.location.pathname) },
  action
) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_WEB:
      return { ...state, currentWeb: action.payload };
    default:
      return state;
  }
};

export default usersReducers;
