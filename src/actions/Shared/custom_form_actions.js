export const INPUT_CHANGE = "INPUT_CHANGE";
export const CLEAR_FORM = "CLEAR_FORM";
export const SET_INIT_VALUES = 'SET_INIT_VALUES';
export const DATE_INPUT_CHANGE = 'DATE_INPUT_CHANGE';
export const SET_INIT_DATE_VALUES = 'SET_INIT_DATE_VALUES';

export const handleDateFieldChange = (field) => ({
  type: DATE_INPUT_CHANGE,
  field
})

export const handleFieldChange = (field) => ({
  type: INPUT_CHANGE,
  field,
});

export const clearFormStore = () => ({
    type: CLEAR_FORM
})

export const setInitValues = (initValues) => ({
  type: SET_INIT_VALUES,
  initValues
})

export const setInitDateValues = (initValues) => ({
  type: SET_INIT_DATE_VALUES,
  initValues
})
