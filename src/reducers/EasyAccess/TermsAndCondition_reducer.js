import {
  REQUEST_TERMS_AND_CONDITION,
  RECEIVE_TERMS_AND_CONDITION,
  REQUEST_INSERT_TERMS_AND_CONDITION,
  RECEIVE_INSERT_TERMS_AND_CONDITION,
  ERROR_TERMS_AND_CONDITION
} from "../../actions/EasyAccess/TermsAndCondition_actions";

const termsAndConditionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_TERMS_AND_CONDITION:
      return { ...state, loading: true };
    case RECEIVE_TERMS_AND_CONDITION:
      return {
        ...state,
        loading: false,
        termsAndConditions: action.response
      };
    case REQUEST_INSERT_TERMS_AND_CONDITION:
      return { ...state, loading: true };
    case RECEIVE_INSERT_TERMS_AND_CONDITION:
      return { ...state, loading: false };
    case ERROR_TERMS_AND_CONDITION:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default termsAndConditionsReducer;
