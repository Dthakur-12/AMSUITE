import {
  REQUEST_UPDATE_TABLE,
  RECEIVE_UPDATE_TABLE,
  REQUEST_ERROR,
} from "../../actions/Settings/dataBase_actions";

function dataBase(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_UPDATE_TABLE:
      return { ...state, successUpdatedTable: false, mssgError: undefined, isLoading: true };
    case RECEIVE_UPDATE_TABLE:
      return { ...state, successUpdatedTable: true , isLoading: false };
    case REQUEST_ERROR:
      return { ...state, successUpdatedTable: false, mssgError: action.error, isLoading: false  };
    default:
      return state;
  }
}

export default dataBase;
