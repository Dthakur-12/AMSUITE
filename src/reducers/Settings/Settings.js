import { ADD_SETTINGS } from "../../actions/Settings/system_actions";
import {
  REQUEST_GET_ALUDOC_SETTINGS,
  RECEIVE_GET_ALUDOC_SETTINGS,
  REQUEST_ALUDOC_SETTINGS_ERROR,
  REQUEST_SET_ALUDOC_SETTINGS,
  RECEIVE_SET_ALUDOC_SETTINGS,
  REQUEST_NUMERICAL_RECORDS_SETTINGS,
  RECEIVE_NUMERICAL_RECORDS_SETTINGS,
  REQUEST_SET_NUMERICAL_RECORDS_SETTINGS,
  RECEIVE_SET_NUMERICAL_RECORDS_SETTINGS,
  REQUEST_GET_DAYS_UNTIL_EXPIRED,
  RECEIVE_GET_DAYS_UNTIL_EXPIRED,
  REQUEST_SETTINGS_ERROR,
  REQUEST_CUSTOM_FIELDS,
  RECEIVE_CUSTOM_FIELDS,
  REQUEST_CREATE_CUSTOM_FIELDS,
  RECEIVE_CREATE_CUSTOM_FIELDS,
  REQUEST_CUSTOM_FIELD_TYPE_LIST_VALUES,
  RECEIVE_CUSTOM_FIELD_TYPE_LIST_VALUES,
  REQUEST_CREATE_CUSTOM_FIELD_TYPE_LIST,
  RECEIVE_CREATE_CUSTOM_FIELD_TYPE_LIST,
  REQUEST_DELETE_CUSTOM_FIELD,
  RECEIVE_DELETE_CUSTOM_FIELD,
  REQUEST_CUSTOM_FIELDS_INTEGRATOR,
  RECEIVE_CUSTOM_FIELDS_INTEGRATOR,
  REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY,
  RECEIVE_EDIT_CUSTOM_FIELD_VISIBILITY,
  UPDATE_CUSTOM_FIELD_STORE,
  REQUEST_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES,
  RECEIVE_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES,
  REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES,
  RECEIVE_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES,
  REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES,
  RECEIVE_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES,
  REQUEST_GROUP_PERSON_SETTINGS,
  RECEIVE_GROUP_PERSON_SETTINGS,
  REQUEST_SET_PERSON_GROUP_SETTINGS,
  RECEIVE_SET_PERSON_GROUP_SETTINGS,
  SELECTED_PERSON_GROUP_CHANGE,
} from "../../actions/Settings/settings_actions";

function settings(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case ADD_SETTINGS:
      return { ...state, settings: action.payload };
    case REQUEST_GROUP_PERSON_SETTINGS:
      return {
        ...state,
        isLoading: true,
        successGetPersonGrSettings: false,
      };
    case RECEIVE_GROUP_PERSON_SETTINGS:
      return {
        ...state,
        isLoading: false,
        personGroupSettings: action.data,
        successGetPersonGrSettings: true,
      };
    case REQUEST_SET_PERSON_GROUP_SETTINGS:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case RECEIVE_SET_PERSON_GROUP_SETTINGS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case SELECTED_PERSON_GROUP_CHANGE:
      return { ...state, selectedPersonGroup: action.payload };
    case REQUEST_CUSTOM_FIELDS:
      return {
        ...state,
        loadingCustomFields: true,
        successCustomFields: false,
      };
    case RECEIVE_CUSTOM_FIELDS:
      return {
        ...state,
        loadingCustomFields: false,
        successCustomFields: true,
        customFields: action.data,
      };
    case REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES: {
      return { ...state, loading: true, success: false };
    }
    case RECEIVE_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES: {
      return {
        ...state,
        loading: false,
        success: true,
        customFieldsMobileVisibility: action.data,
      };
    }
    case REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES: {
      return {
        ...state,
        isCreating: true,
        successUpdateCustomFieldsMobileVisibilities: false,
      };
    }
    case RECEIVE_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES: {
      return {
        ...state,
        isCreating: false,
        successUpdateCustomFieldsMobileVisibilities: true,
      };
    }
    case UPDATE_CUSTOM_FIELD_STORE:
      return {
        ...state,
        customFields: action.customFields,
      };
    case REQUEST_CUSTOM_FIELDS_INTEGRATOR:
      return {
        ...state,
        loadingCustomFieldsIntegrator: true,
      };
    case RECEIVE_CUSTOM_FIELDS_INTEGRATOR:
      return {
        ...state,
        loadingCustomFieldsIntegrator: false,
        customFieldsIntegrator: action.data,
      };

    case REQUEST_CREATE_CUSTOM_FIELDS:
      return {
        ...state,
        isCreating: true,
        isSuccess: false,
        isSuccessCreate: false,
        error: false,
      };

    case RECEIVE_CREATE_CUSTOM_FIELDS:
      return {
        ...state,
        isCreating: false,
        isSuccess: true,
        isSuccessCreate: true,
        dataId: action.data,
      };
    case REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY:
      return { ...state, successVisibilityUpdated: false };
    case RECEIVE_EDIT_CUSTOM_FIELD_VISIBILITY:
      return { ...state, successVisibilityUpdated: true };
    case REQUEST_CUSTOM_FIELD_TYPE_LIST_VALUES:
      return {
        ...state,
        isSuccess: false,
        isSuccessListValues: false,
        loadingValues: true,
      };

    case RECEIVE_CUSTOM_FIELD_TYPE_LIST_VALUES:
      return {
        ...state,
        customFieldsListValues: {
          ...state.customFieldsListValues,
          [action.data.customFieldId]: action.data.values,
        },
        currentValues: action.data.values,
        isSuccess: true,
        isSuccessListValues: true,
        loadingValues: false,
      };

    case REQUEST_CREATE_CUSTOM_FIELD_TYPE_LIST:
      return {
        ...state,
        isCreating: true,
        isSuccess: false,
      };

    case RECEIVE_CREATE_CUSTOM_FIELD_TYPE_LIST:
      return {
        ...state,
        isCreating: false,
        isSuccess: true,
      };
    case REQUEST_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES:
      return {
        ...state,
        loadingDeleteCustomFieldsListValues: true,
        successDeleteCustomFieldsListValues: false,
      };
    case RECEIVE_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES:
      return {
        ...state,
        loadingDeleteCustomFieldsListValues: false,
        successDeleteCustomFieldsListValues: true,
      };
    case REQUEST_DELETE_CUSTOM_FIELD:
      return {
        ...state,
        loadingDeleteCustomFields: true,
        successDeleteCustomFields: false,
      };
    case RECEIVE_DELETE_CUSTOM_FIELD:
      return {
        ...state,
        loadingDeleteCustomFields: false,
        successDeleteCustomFields: true,
      };
    case REQUEST_GET_ALUDOC_SETTINGS:
      return {
        ...state,
        successAludocSettings: false,
        loadingAludocSettings: true,
      };
    case RECEIVE_GET_ALUDOC_SETTINGS:
      return {
        ...state,
        successAludocSettings: true,
        loadingAludocSettings: false,
        aludocSettings: action.data,
      };
    case REQUEST_GET_DAYS_UNTIL_EXPIRED:
      return {
        ...state,
        successDaysToExpired: false,
      };
    case RECEIVE_GET_DAYS_UNTIL_EXPIRED:
      return {
        ...state,
        successDaysToExpired: true,
        daysToExpired: action.data,
      };
    case REQUEST_ALUDOC_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        msgError: action.error,
        error: true,
        isCreating: false,
      };
    case REQUEST_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        msgError: action.error,
        error: true,
      };
    case REQUEST_SET_ALUDOC_SETTINGS:
      return {
        ...state,
        loading: true,
        successEditAludocSettings: false,
      };
    case RECEIVE_SET_ALUDOC_SETTINGS:
      return { ...state, loading: false, successEditAludocSettings: true };

    case REQUEST_NUMERICAL_RECORDS_SETTINGS:
      return { ...state, loading: true, successGetNumRecordsSettings: false };
    case RECEIVE_NUMERICAL_RECORDS_SETTINGS:
      return {
        ...state,
        loading: false,
        successGetNumRecordsSettings: true,
        numRecordsSetting: action.data,
      };

    case REQUEST_SET_NUMERICAL_RECORDS_SETTINGS:
      return { ...state, loading: true, successSetNumRecordsSettings: false };
    case RECEIVE_SET_NUMERICAL_RECORDS_SETTINGS:
      return { ...state, loading: false, successSetNumRecordsSettings: true };

    default:
      return state;
  }
}

export default settings;
