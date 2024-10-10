import {
  INPUT_CHANGE,
  CLEAR_FORM,
  SET_INIT_VALUES,
  DATE_INPUT_CHANGE,
  SET_INIT_DATE_VALUES,
} from "../../actions/Shared/custom_form_actions";

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case INPUT_CHANGE:
      return { ...state, formValues: { ...state.formValues, ...action.field } };
    case DATE_INPUT_CHANGE:
      return {
        ...state,
        formDateValues: { ...state.formDateValues, ...action.field },
      };
    case CLEAR_FORM:
      return { formValues: undefined };
    case SET_INIT_VALUES:
      return {
        ...state,
        formValues: { ...state.formValues, ...action.initValues },
        initValues: true,
      };
    case SET_INIT_DATE_VALUES:
      return {
        ...state,
        formDateValues: { ...state.formDateValues, ...action.initValues },
        initValues: true,
      };
    default:
      return state;
  }
};
