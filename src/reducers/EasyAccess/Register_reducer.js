import {
  REQUEST_REGISTERS,
  RECEIVE_REGISTERS,
  REQUEST_DELETE_REGISTERS,
  RECEIVE_DELETE_REGISTERS,
  REQUEST_BADGES_BY_REGISTER,
  RECEIVE_BADGES_BY_REGISTER,
  REQUEST_REGISTER_ERROR,
  REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED,
  RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED,
  REQUEST_NUMERICAL_RECORDS_BY_PEOPLE,
  REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES,
  RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE,
  RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES,
  REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS,
  REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS,
  REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS,
  RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS,
  RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS,
  RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS
} from "../../actions/EasyAccess/Register_actions";

const registersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED: {
      return {
        ...state,
        successInfectedContats: false,
        loadingInfectedContacts: true
      };
    }

    case RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED: {
      return {
        ...state,
        successInfectedContats: true,
        loadingInfectedContacts: false,
        infectedContacts: action.data
      };
    }
    case REQUEST_NUMERICAL_RECORDS_BY_PEOPLE: {
      return {
        ...state,
        successRecordsByPeople: false,
        loadingRecordsByPeople: true
      };
    }

    case RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE: {
      return {
        ...state,
        successRecordsByPeople: true,
        loadingRecordsByPeople: false,
        recordByPeople: action.data
      };
    }
    case REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES: {
      return {
        ...state,
        successRecordsByEnterprises: false,
        loadingRecordsByEnterprises: true
      };
    }

    case RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES: {
      return {
        ...state,
        successRecordsByEnterprises: true,
        loadingRecordsByEnterprises: false,
        recordByEnterprises: action.data
      };
    }
    case REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS: {
      return {
        ...state,
        successInfectedContatsXLS: false,
        loadingInfectedContatsXLS: true
      };
    }

    case RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS: {
      return {
        ...state,
        successInfectedContatsXLS: true,
        loadingInfectedContatsXLS: false,
        infectedContactsXLS: action.data
      };
    }
    case REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS: {
      return {
        ...state,
        successRecordsByPeopleXLS: false,
        loadingRecordsByPeopleXLS: true
      };
    }

    case RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS: {
      return {
        ...state,
        successRecordsByPeopleXLS: true,
        loadingRecordsByPeopleXLS: false,
        recordByPeopleXLS: action.data
      };
    }
    case REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS: {
      return {
        ...state,
        successRecordsByEnterprisesXLS: false,
        loadingRecordsByEnterprisesXLS: true
      };
    }

    case RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS: {
      return {
        ...state,
        successRecordsByEnterprisesXLS: true,
        loadingRecordsByEnterprisesXLS: false,
        recordByEnterprisesXLS: action.data
      };
    }
    case REQUEST_REGISTER_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        error: true,
        msjError: action.error
      };
    case REQUEST_REGISTERS:
      return { ...state, loading: true, successRegisters: false };
    case RECEIVE_REGISTERS:
      return {
        ...state,
        registers: action.data,
        successRegisters: true,
        loading: false
      };
    case REQUEST_DELETE_REGISTERS:
      return { ...state, loading: true, successDelRegisters: false };
    case RECEIVE_DELETE_REGISTERS:
      return {
        ...state,
        successDelRegisters: true,
        loading: false
      };
    case REQUEST_BADGES_BY_REGISTER:
      return { ...state, loading: true, successBdgsRegisters: false };
    case RECEIVE_BADGES_BY_REGISTER:
      return {
        ...state,
        badges: action.data,
        successBdgsRegisters: true,
        loading: false
      };
    default:
      return state;
  }
};

export default registersReducer;
