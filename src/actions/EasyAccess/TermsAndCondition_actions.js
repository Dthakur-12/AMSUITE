export const REQUEST_TERMS_AND_CONDITION = "REQUEST_TERMS_AND_CONDITION";
export const RECEIVE_TERMS_AND_CONDITION = "RECEIVE_TERMS_AND_CONDITION";

export const REQUEST_INSERT_TERMS_AND_CONDITION =
  "REQUEST_INSERT_TERMS_AND_CONDITION";
export const RECEIVE_INSERT_TERMS_AND_CONDITION =
  "RECEIVE_INSERT_TERMS_AND_CONDITION";

export const ERROR_TERMS_AND_CONDITION = "ERROR_TERMS_AND_CONDITION";

export const requestTermsAndConditions = () => ({
  type: REQUEST_TERMS_AND_CONDITION
});

export const requestInsertTermsAndConditions = value => ({
  type: REQUEST_INSERT_TERMS_AND_CONDITION,
  value
});
