export const REQUEST_EMPLOYEES = "REQUEST_EMPLOYEES";
export const RECEIVE_EMPLOYEES = "RECEIVE_EMPLOYEES";

export const REQUEST_PERSONS = "REQUEST_PERSONS";
export const RECEIVE_PERSONS = "RECEIVE_PERSONS";

export const REQUEST_EDIT_PERSON = "REQUEST_EDIT_PERSON";
export const RECEIVE_EDIT_PERSON = "RECEIVE_EDIT_PERSON";
export const REQUEST_PERSONS_TYPES = "REQUEST_PERSONS_TYPES";
export const RECEIVE_PERSONS_TYPES = "RECEIVE_PERSONS_TYPES";
export const REQUEST_SET_IMAGE = "REQUEST_SET_IMAGE";
export const RECEIVE_SET_IMAGE = "RECEIVE_SET_IMAGE";
export const REQUEST_SET_IMAGE_URL = "REQUEST_SET_IMAGE_URL";
export const RECEIVE_SET_IMAGE_URL = "RECEIVE_SET_IMAGE_URL";
export const REQUEST_GET_IMAGE = "REQUEST_GET_IMAGE";
export const RECEIVE_GET_IMAGE = "RECEIVE_GET_IMAGE";
export const REQUEST_DELETE_IMAGE = "REQUEST_DELETE_IMAGE";
export const RECEIVE_DELETE_IMAGE = "RECEIVE_DELETE_IMAGE";
export const REQUEST_UPDATE_IMAGE = "REQUEST_UPDATE_IMAGE";
export const RECEIVE_UPDATE_IMAGE = "RECEIVE_UPDATE_IMAGE";
export const REQUEST_GET_PERSON_BY_ID = "REQUEST_GET_PERSON_BY_ID";
export const RECEIVE_GET_PERSON_BY_ID = "RECEIVE_GET_PERSON_BY_ID";
export const REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS =
  "REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS";
export const RECEIVE_GET_PERSON_BY_DOCUMENT_ANONYMOUS =
  "RECEIVE_GET_PERSON_BY_DOCUMENT_ANONYMOUS";

export const REQUEST_CREATE_PERSON = "REQUEST_CREATE_PERSON";
export const RECEIVE_CREATE_PERSON = "RECEIVE_CREATE_PERSON";

export const REQUEST_PERSON_ERROR = "REQUEST_PERSON_ERROR";
export const REQUEST_GET_PERSON_IMAGE_BY_ID = "REQUEST_GET_PERSON_IMAGE_BY_ID";

export const REQUEST_CREATE_PERSON_ANONYMOUSE =
  "REQUEST_CREATE_PERSON_ANONYMOUSE";

export const RECEIVE_CREATE_PERSON_ANONYMOUSE =
  "RECEIVE_CREATE_PERSON_ANONYMOUSE";
export const REQUEST_CREATE_PERSONS_GROUP = "REQUEST_CREATE_PERSONS_GROUP";

export const RECEIVE_CREATE_PERSONS_GROUP = "RECEIVE_CREATE_PERSONS_GROUP";

export const RECEIVE_GET_PERSON_IMAGE_BY_ID = "RECEIVE_GET_PERSON_IMAGE_BY_ID";
export const REQUEST_CLEAR_STORE_PERSON_IMAGE =
  "REQUEST_CLEAR_STORE_PERSON_IMAGE";

export const REQUEST_CREATE_VISITOR_GROUP = "REQUEST_CREATE_VISITOR_GROUP";
export const RECEIVE_CREATE_VISITOR_GROUP = "RECEIVE_CREATE_VISITOR_GROUP";

export const REQUEST_CHECK_DOC_NUMBER = "REQUEST_CHECK_DOC_NUMBER";
export const RECEIVE_CHECK_DOC_NUMBER = "RECEIVE_CHECK_DOC_NUMBER";

export const REQUEST_XLS_WITH_VISITOR_GROUP = "REQUEST_XLS_WITH_VISITOR_GROUP";
export const RECEIVE_XLS_WITH_VISITOR_GROUP = "RECEIVE_XLS_WITH_VISITOR_GROUP";

export const REQUEST_XLS_TEMPLATE = "REQUEST_XLS_TEMPLATE";
export const RECEIVE_XLS_TEMPLATE = "RECEIVE_XLS_TEMPLATE";
export const CLEAR_SUCCESS_CREATE_EVENT = "CLEAR_SUCCESS_CREATE_EVENT";
export const REQUEST_GET_PERSON_GROUPS = "REQUEST_GET_PERSON_GROUPS";
export const RECEIVE_GET_PERSON_GROUPS = "RECEIVE_GET_PERSON_GROUPS";
export const REQUEST_GET_PERSON_BY_GROUPS = "REQUEST_GET_PERSON_BY_GROUPS";
export const RECEIVE_GET_PERSON_BY_GROUPS = "RECEIVE_GET_PERSON_BY_GROUPS";

export const REQUEST_GET_PERSON_GROUPS_REPORT_XLS =
  "REQUEST_GET_PERSON_GROUPS_REPORT_XLS";
export const RECEIVE_GET_PERSON_GROUPS_REPORT_XLS =
  "RECEIVE_GET_PERSON_GROUPS_REPORT_XLS";

export const requestGetPersonGroupReportXLS = (payload) => ({
  type: REQUEST_GET_PERSON_GROUPS_REPORT_XLS,
  payload,
});

export const requestGetPersonByGroup = (payload) => ({
  type: REQUEST_GET_PERSON_BY_GROUPS,
  payload,
});

export const requestGetPersonGroups = (payload) => ({
  type: REQUEST_GET_PERSON_GROUPS,
  payload,
});

export const createPersonsGroup = (infoGroup) => ({
  type: REQUEST_CREATE_PERSONS_GROUP,
  infoGroup,
});

export const requestClearSuccessCreate = () => ({
  type: CLEAR_SUCCESS_CREATE_EVENT,
});

export const requestCreatePerson = (person) => ({
  type: REQUEST_CREATE_PERSON,
  person,
});

export const requestCreatePersonAnonymouse = (person) => ({
  type: REQUEST_CREATE_PERSON_ANONYMOUSE,
  person,
});

export const requestCreateVisitorGroup = (info) => ({
  type: REQUEST_CREATE_VISITOR_GROUP,
  info,
});

export const requestCheckDocumentNumbers = (info) => ({
  type: REQUEST_CHECK_DOC_NUMBER,
  info,
});

export const requestGetXLSWithVisitorGroup = (info) => ({
  type: REQUEST_XLS_WITH_VISITOR_GROUP,
  info,
});

export const requestDownloadExcelTemplate = () => ({
  type: REQUEST_XLS_TEMPLATE,
  info: [],
});

export const requestGetPersonByDocumentAnonymous = (document) => ({
  type: REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS,
  document,
});

export const receiveCreatePerson = () => ({
  type: RECEIVE_CREATE_PERSON,
});

export const requestEditPerson = (person) => ({
  type: REQUEST_EDIT_PERSON,
  person,
});
export const receiveEditPerson = () => ({
  type: RECEIVE_EDIT_PERSON,
});

export const requestPersonById = (id) => ({
  type: REQUEST_GET_PERSON_BY_ID,
  id,
});

export const receivePersonById = (person) => ({
  type: RECEIVE_GET_PERSON_BY_ID,
  person,
});

export const requestEmployees = (dataTable) => ({
  type: REQUEST_EMPLOYEES,
  dataTable,
});

export const receiveEmployees = (emps) => ({
  type: RECEIVE_EMPLOYEES,
  emps,
});

export const requestPersons = (dataTable) => ({
  type: REQUEST_PERSONS,
  dataTable,
});

export const receivePersons = (persons) => ({
  type: RECEIVE_PERSONS,
  persons,
});

export const requestPersonsTypes = () => ({
  type: REQUEST_PERSONS_TYPES,
});

export const receivePersonsTypes = (types) => ({
  type: RECEIVE_PERSONS_TYPES,
  types,
});

export const requesSetImage = (obj) => ({
  type: REQUEST_SET_IMAGE,
  obj,
});

export const receiveSetImage = () => ({
  type: RECEIVE_SET_IMAGE,
});

export const requesSetImageURL = (obj) => ({
  type: REQUEST_SET_IMAGE_URL,
  obj,
});

export const receiveSetImageURL = () => ({
  type: RECEIVE_SET_IMAGE_URL,
});

export const requestGetImage = (id) => ({
  type: REQUEST_GET_IMAGE,
  id,
});

export const receiveGetImage = (img) => ({
  type: RECEIVE_GET_IMAGE,
  img,
});

export const requestDeleteImage = (id) => ({
  type: REQUEST_DELETE_IMAGE,
  id,
});

export const receiveDeleteImage = () => ({
  type: RECEIVE_DELETE_IMAGE,
});

export const requestUpdateImage = (obj) => ({
  type: REQUEST_UPDATE_IMAGE,
  obj,
});

export const receiveUpdateImage = () => ({
  type: RECEIVE_UPDATE_IMAGE,
});

export const requestPersonError = (error) => ({
  type: REQUEST_PERSON_ERROR,
  error,
});

export const requestPersonImageById = (id) => ({
  type: REQUEST_GET_PERSON_IMAGE_BY_ID,
  id,
});

export const requestClearStorePersonImage = () => ({
  type: REQUEST_CLEAR_STORE_PERSON_IMAGE,
});
