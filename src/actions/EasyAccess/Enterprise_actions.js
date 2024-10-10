export const REQUEST_CREATE_ENTERPRISES = "REQUEST_CREATE_ENTERPRISES";
export const RECEIVE_CREATE_ENTERPRISES = "RECEIVE_CREATE_ENTERPRISES";
export const REQUEST_ENTERPRISES = "REQUEST_ENTERPRISES";
export const RECEIVE_ENTERPRISES = "RECEIVE_ENTERPRISES";
export const REQUEST_ENTERPRISES_HOST = "REQUEST_ENTERPRISES_HOST";
export const RECEIVE_ENTERPRISES_HOST = "RECEIVE_ENTERPRISES_HOST";
export const REQUEST_ENTERPRISE_ERROR = " REQUEST_ENTERPRISE_ERROR";
export const REQUEST_EDIT_ENTERPRISES = "REQUEST_EDIT_ENTERPRISES";
export const RECEIVE_EDIT_ENTERPRISES = "RECEIVE_EDIT_ENTERPRISES";
export const REQUEST_ENTERPRISES_BY_ID = "REQUEST_ENTERPRISES_BY_ID";
export const RECEIVE_ENTERPRISES_BY_ID = "RECEIVE_ENTERPRISES_BY_ID";
export const REQUEST_DELETE_ENTERPRISES = "REQUEST_DELETE_ENTERPRISES";
export const RECEIVE_DELETE_ENTERPRISES = "RECEIVE_DELETE_ENTERPRISES";
export const RECEIVE_ENTERPRISES_ANONYMOUSE = "RECEIVE_ENTERPRISES_ANONYMOUSE";
export const REQUEST_ENTERPRISESHOST_ANONYMOUSE =
  "REQUEST_ENTERPRISESHOST_ANONYMOUSE";
export const REQUEST_ENTERPRISES_ANONYMOUSE = "REQUEST_ENTERPRISES_ANONYMOUSE";
export const RECEIVE_ENTERPRISESHOST_ANONYMOUSE =
  "RECEIVE_ENTERPRISESHOST_ANONYMOUSE";
export const REQUEST_VISITS_ENTERPRISE = "REQUEST_VISITS_ENTERPRISE";
export const RECEIVE_VISITS_ENTERPRISE = "RECEIVE_VISITS_ENTERPRISE";

export const REQUEST_VISITS_ENTERPRISE_REPORT =
  "REQUEST_VISITS_ENTERPRISE_REPORT";
export const RECEIVE_VISITS_ENTERPRISE_REPORT =
  "RECEIVE_VISITS_ENTERPRISE_REPORT";

export const requestVisitsEnterprisesReportXLS = (obj) => ({
  type: REQUEST_VISITS_ENTERPRISE_REPORT,
  obj,
});

export const requestVisitsEnterprises = (obj) => ({
  type: REQUEST_VISITS_ENTERPRISE,
  obj,
});

export const requestEnterprisesAnonymouse = (obj) => ({
  type: REQUEST_ENTERPRISES_ANONYMOUSE,
  obj,
});

export const requestEnterprisesHostAnonymouse = (obj) => ({
  type: REQUEST_ENTERPRISESHOST_ANONYMOUSE,
  obj,
});

export const requestCreateEnterprises = (ent) => ({
  type: REQUEST_CREATE_ENTERPRISES,
  ent,
});

export const receiveCreateEnterprises = (msjOk) => ({
  type: RECEIVE_CREATE_ENTERPRISES,
  msjOk,
});

export const requestEditEnterprises = (ent) => ({
  type: REQUEST_EDIT_ENTERPRISES,
  ent,
});

export const receiveEditEnterprises = (msjOk) => ({
  type: RECEIVE_EDIT_ENTERPRISES,
  msjOk,
});

export const requestEnterprises = (obj) => ({
  type: REQUEST_ENTERPRISES,
  obj,
});

export const receiveEnterprises = (ent) => ({
  type: RECEIVE_ENTERPRISES,
  ent,
});

export const requestEnterprisesHost = (obj) => ({
  type: REQUEST_ENTERPRISES_HOST,
  obj,
});

export const receiveEnterprisesHost = (ent) => ({
  type: RECEIVE_ENTERPRISES_HOST,
  ent,
});

export const receiveEnterprisesAnonymouse = (ent) => ({
  type: RECEIVE_ENTERPRISES_ANONYMOUSE,
  ent,
});

export const requestPersonError = (error) => ({
  type: REQUEST_ENTERPRISE_ERROR,
  error,
});

export const requestEnterprisesById = (id) => ({
  type: REQUEST_ENTERPRISES_BY_ID,
  id,
});

export const receiveEnterprisesById = (ent) => ({
  type: RECEIVE_ENTERPRISES_BY_ID,
  ent,
});

export const requestDeleteEnterprises = (ids) => ({
  type: REQUEST_DELETE_ENTERPRISES,
  ids,
});

export const receiveDeleteEnterprises = () => ({
  type: RECEIVE_DELETE_ENTERPRISES,
});
