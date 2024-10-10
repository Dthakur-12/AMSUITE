export const REQUEST_REGISTERS = "REQUEST_REGISTERS";
export const RECEIVE_REGISTERS = "RECEIVE_REGISTERS";
export const REQUEST_BADGES_BY_REGISTER = "REQUEST_BADGES_BY_REGISTER";
export const RECEIVE_BADGES_BY_REGISTER = "RECEIVE_BADGES_BY_REGISTER";
export const REQUEST_DELETE_REGISTERS = "REQUEST_DELETE_REGISTERS";
export const RECEIVE_DELETE_REGISTERS = "RECEIVE_DELETE_REGISTERS";
export const REQUEST_REGISTER_ERROR = "REQUEST_REGISTER_ERROR";

//--------------Reportes temperatura ----------------------
//REQUEST

export const REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED =
  "REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED";
export const REQUEST_NUMERICAL_RECORDS_BY_PEOPLE =
  "REQUEST_NUMERICAL_RECORDS_BY_PEOPLE";
export const REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES =
  "REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES";
export const REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS =
  "REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS";
export const REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS =
  "REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS";
export const REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS =
  "REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS";

//RESPONSE

export const RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED =
  "RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED";

export const RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE =
  "RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE";
export const RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES =
  "RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES";

export const RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS =
  "RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS";
export const RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS =
  "RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS";
export const RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS =
  "RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS";
//----------------------------------------------------------

//--------------Reportes temperatura ----------------------

export const requestPeopleInContactWithInfected = info => ({
  type: REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED,
  info
});
export const requestNumericalRecordsByPeople = info => ({
  type: REQUEST_NUMERICAL_RECORDS_BY_PEOPLE,
  info
});
export const requestNumericalRecordsByEnterprises = info => ({
  type: REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES,
  info
});

export const requestPeopleInContactWithInfectedXLS = info => ({
  type: REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS,
  info
});
export const requestNumericalRecordsByPeopleXLS = info => ({
  type: REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS,
  info
});
export const requestNumericalRecordsByEnterprisesXLS = info => ({
  type: REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS,
  info
});

//----------------------------------------------------------

export const requestRegisterError = error => ({
  type: REQUEST_REGISTER_ERROR,
  error
});

export const requestRegisters = dataTable => ({
  type: REQUEST_REGISTERS,
  dataTable
});

export const receiveRegisters = registers => ({
  type: RECEIVE_REGISTERS,
  registers
});

export const requestDeleteRegisters = ids => ({
  type: REQUEST_DELETE_REGISTERS,
  ids
});

export const receiveDeleteRegisters = () => ({
  type: RECEIVE_DELETE_REGISTERS
});

export const requestBadgesByRegister = id => ({
  type: REQUEST_BADGES_BY_REGISTER,
  id
});

export const receiveBadgesByRegister = badges => ({
  type: RECEIVE_BADGES_BY_REGISTER,
  badges
});
