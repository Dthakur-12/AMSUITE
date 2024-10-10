
import settings from "../../../reducers/Settings/Settings";
import {ADD_SETTINGS,REQUEST_GROUP_PERSON_SETTINGS,RECEIVE_GROUP_PERSON_SETTINGS,REQUEST_SET_PERSON_GROUP_SETTINGS,RECEIVE_SET_PERSON_GROUP_SETTINGS
,SELECTED_PERSON_GROUP_CHANGE,REQUEST_CUSTOM_FIELDS,RECEIVE_CUSTOM_FIELDS,REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES,RECEIVE_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES,
REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES,RECEIVE_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES,UPDATE_CUSTOM_FIELD_STORE,REQUEST_CUSTOM_FIELDS_INTEGRATOR,
REQUEST_CREATE_CUSTOM_FIELDS,RECEIVE_CREATE_CUSTOM_FIELDS,REQUEST_CUSTOM_FIELD_TYPE_LIST_VALUES,RECEIVE_EDIT_CUSTOM_FIELD_VISIBILITY,REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY,
REQUEST_CREATE_CUSTOM_FIELD_TYPE_LIST,RECEIVE_CREATE_CUSTOM_FIELD_TYPE_LIST,REQUEST_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES,RECEIVE_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES,RECEIVE_DELETE_CUSTOM_FIELD,
      REQUEST_GET_DAYS_UNTIL_EXPIRED,RECEIVE_GET_DAYS_UNTIL_EXPIRED,REQUEST_ALUDOC_SETTINGS_ERROR,REQUEST_SETTINGS_ERROR,REQUEST_SET_ALUDOC_SETTINGS,RECEIVE_SET_ALUDOC_SETTINGS,REQUEST_NUMERICAL_RECORDS_SETTINGS,RECEIVE_NUMERICAL_RECORDS_SETTINGS,
      REQUEST_SET_NUMERICAL_RECORDS_SETTINGS, REQUEST_DELETE_CUSTOM_FIELD,REQUEST_GET_ALUDOC_SETTINGS,RECEIVE_GET_ALUDOC_SETTINGS,RECEIVE_CUSTOM_FIELDS_INTEGRATOR,RECEIVE_SET_NUMERICAL_RECORDS_SETTINGS,RECEIVE_CUSTOM_FIELD_TYPE_LIST_VALUES} from "../../../actions/Settings/settings_actions";
describe('settings', () => {
    it('ADD_SETTINGS', () => {
        const initialState = {}
        const expectedState = {settings: undefined}
        const payload = {}
        const action = {
          type: ADD_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GROUP_PERSON_SETTINGS', () => {
        const initialState = {}
        const expectedState = { isLoading: true,
            successGetPersonGrSettings: false,}
        const payload = {}
        const action = {
          type: REQUEST_GROUP_PERSON_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GROUP_PERSON_SETTINGS', () => {
        const initialState = {}
        const expectedState = {      isLoading: false,
            personGroupSettings:undefined,
            successGetPersonGrSettings: true,}
        const payload = {}
        const action = {
          type: RECEIVE_GROUP_PERSON_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_SET_PERSON_GROUP_SETTINGS', () => {
        const initialState = {}
        const expectedState = {   isLoading: true,
            isSuccess: false,}
        const payload = {}
        const action = {
          type: REQUEST_SET_PERSON_GROUP_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_SET_PERSON_GROUP_SETTINGS', () => {
        const initialState = {}
        const expectedState = {    isLoading: false,
            isSuccess: true,}
        const payload = {}
        const action = {
          type: RECEIVE_SET_PERSON_GROUP_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('SELECTED_PERSON_GROUP_CHANGE', () => {
        const initialState = {}
        const expectedState = {selectedPersonGroup: {}}
        const payload = {}
        const action = {
          type: SELECTED_PERSON_GROUP_CHANGE, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CUSTOM_FIELDS', () => {
        const initialState = {}
        const expectedState = {loadingCustomFields: true,
            successCustomFields: false,}
        const payload = {}
        const action = {
          type: REQUEST_CUSTOM_FIELDS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CUSTOM_FIELDS', () => {
        const initialState = {}
        const expectedState = {  loadingCustomFields: false,
            successCustomFields: true,
            customFields:undefined}
        const payload = {}
        const action = {
          type: RECEIVE_CUSTOM_FIELDS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES', () => {
        const initialState = {}
        const expectedState = {loading: true, success: false}
        const payload = {}
        const action = {
          type: REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES', () => {
        const initialState = {}
        const expectedState = {  loading: false,
            success: true,
            customFieldsMobileVisibility: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES', () => {
        const initialState = {}
        const expectedState = { isCreating: true,
            successUpdateCustomFieldsMobileVisibilities: false,}
        const payload = {}
        const action = {
          type: REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES', () => {
        const initialState = {}
        const expectedState = { isCreating: false,
            successUpdateCustomFieldsMobileVisibilities: true,}
        const payload = {}
        const action = {
          type: RECEIVE_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('UPDATE_CUSTOM_FIELD_STORE', () => {
        const initialState = {}
        const expectedState = { customFields: undefined}
        const payload = {}
        const action = {
          type: UPDATE_CUSTOM_FIELD_STORE, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CUSTOM_FIELDS_INTEGRATOR', () => {
        const initialState = {}
        const expectedState = {  loadingCustomFieldsIntegrator: true,}
        const payload = {}
        const action = {
          type: REQUEST_CUSTOM_FIELDS_INTEGRATOR, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CUSTOM_FIELDS_INTEGRATOR', () => {
        const initialState = {}
        const expectedState = {  loadingCustomFieldsIntegrator: false,
            customFieldsIntegrator: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_CUSTOM_FIELDS_INTEGRATOR, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CREATE_CUSTOM_FIELDS', () => {
        const initialState = {}
        const expectedState = {  isCreating: true,
            isSuccess: false,
            isSuccessCreate: false,
            error: false,}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_CUSTOM_FIELDS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_CUSTOM_FIELDS', () => {
        const initialState = {}
        const expectedState = {   isCreating: false,
            isSuccess: true,
            isSuccessCreate: true,
            dataId: undefined,}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_CUSTOM_FIELDS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY', () => {
        const initialState = {}
        const expectedState = { successVisibilityUpdated: false}
        const payload = {}
        const action = {
          type: REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_EDIT_CUSTOM_FIELD_VISIBILITY', () => {
        const initialState = {}
        const expectedState = {  successVisibilityUpdated: true }
        const payload = {}
        const action = {
          type: RECEIVE_EDIT_CUSTOM_FIELD_VISIBILITY, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_CUSTOM_FIELD_TYPE_LIST_VALUES', () => {
        const initialState = {}
        const expectedState = { isSuccess: false,
            isSuccessListValues: false,
            loadingValues: true,}
        const payload = {}
        const action = {
          type: REQUEST_CUSTOM_FIELD_TYPE_LIST_VALUES, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CUSTOM_FIELD_TYPE_LIST_VALUES', () => {
        const initialState = {}
        const expectedState = {  
          isSuccess: true,
          isSuccessListValues: true,
          loadingValues: false,
          currentValues:undefined,
          customFieldsListValues: {
            [undefined]: undefined,
          }}
          
        const payload = {
          customFieldId:undefined,
          values:undefined
        }
        const action = {
          type: RECEIVE_CUSTOM_FIELD_TYPE_LIST_VALUES, 
          data:payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
    it('REQUEST_CREATE_CUSTOM_FIELD_TYPE_LIST', () => {
        const initialState = {}
        const expectedState = { isCreating: true,
            isSuccess: false,}
        const payload = {}
        const action = {
          type: REQUEST_CREATE_CUSTOM_FIELD_TYPE_LIST, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_CREATE_CUSTOM_FIELD_TYPE_LIST', () => {
        const initialState = {}
        const expectedState = {  isCreating: false,
            isSuccess: true,}
        const payload = {}
        const action = {
          type: RECEIVE_CREATE_CUSTOM_FIELD_TYPE_LIST, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES', () => {
        const initialState = {}
        const expectedState = {     loadingDeleteCustomFieldsListValues: true,
            successDeleteCustomFieldsListValues: false,}
        const payload = {}
        const action = {
          type: REQUEST_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES', () => {
        const initialState = {}
        const expectedState = {loadingDeleteCustomFieldsListValues: false,
            successDeleteCustomFieldsListValues: true,}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_CUSTOM_FIELD_TYPE_LIST_VALUES, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_DELETE_CUSTOM_FIELD', () => {
        const initialState = {}
        const expectedState = {loadingDeleteCustomFields: true,
            successDeleteCustomFields: false,}
        const payload = {}
        const action = {
          type: REQUEST_DELETE_CUSTOM_FIELD, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_DELETE_CUSTOM_FIELD', () => {
        const initialState = {}
        const expectedState = {loadingDeleteCustomFields: false,
            successDeleteCustomFields: true,}
        const payload = {}
        const action = {
          type: RECEIVE_DELETE_CUSTOM_FIELD, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_ALUDOC_SETTINGS', () => {
        const initialState = {}
        const expectedState = { successAludocSettings: false,
            loadingAludocSettings: true,}
        const payload = {}
        const action = {
          type: REQUEST_GET_ALUDOC_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_ALUDOC_SETTINGS', () => {
        const initialState = {}
        const expectedState = {  successAludocSettings: true,
            loadingAludocSettings: false,
            aludocSettings: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_GET_ALUDOC_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_GET_DAYS_UNTIL_EXPIRED', () => {
        const initialState = {}
        const expectedState = {   successDaysToExpired: false,}
        const payload = {}
        const action = {
          type: REQUEST_GET_DAYS_UNTIL_EXPIRED, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_GET_DAYS_UNTIL_EXPIRED', () => {
        const initialState = {}
        const expectedState = { successDaysToExpired: true,
            daysToExpired: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_GET_DAYS_UNTIL_EXPIRED, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ALUDOC_SETTINGS_ERROR', () => {
        const initialState = {}
        const expectedState = {loading: false,
            msgError: undefined,
            error: true,
            isCreating: false,}
        const payload = {}
        const action = {
          type: REQUEST_ALUDOC_SETTINGS_ERROR, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })

      it('REQUEST_SETTINGS_ERROR', () => {
        const initialState = {}
        const expectedState = {loading: false,
            msgError: undefined,
            error: true,}
        const payload = {}
        const action = {
          type: REQUEST_SETTINGS_ERROR, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_SET_ALUDOC_SETTINGS', () => {
        const initialState = {}
        const expectedState = {  loading: true,
            successEditAludocSettings: false,}
        const payload = {}
        const action = {
          type: REQUEST_SET_ALUDOC_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_SET_ALUDOC_SETTINGS', () => {
        const initialState = {}
        const expectedState = {loading: false, successEditAludocSettings: true }
        const payload = {}
        const action = {
          type: RECEIVE_SET_ALUDOC_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_NUMERICAL_RECORDS_SETTINGS', () => {
        const initialState = {}
        const expectedState = {loading: true, successGetNumRecordsSettings: false}
        const payload = {}
        const action = {
          type: REQUEST_NUMERICAL_RECORDS_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })

      it('RECEIVE_NUMERICAL_RECORDS_SETTINGS', () => {
        const initialState = {}
        const expectedState = { loading: false,
            successGetNumRecordsSettings: true,
            numRecordsSetting: undefined}
        const payload = {}
        const action = {
          type: RECEIVE_NUMERICAL_RECORDS_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_SET_NUMERICAL_RECORDS_SETTINGS', () => {
        const initialState = {}
        const expectedState = {loading: true, successSetNumRecordsSettings: false}
        const payload = {}
        const action = {
          type: REQUEST_SET_NUMERICAL_RECORDS_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_SET_NUMERICAL_RECORDS_SETTINGS', () => {
        const initialState = {}
        const expectedState = {loading: false, successSetNumRecordsSettings: true}
        const payload = {}
        const action = {
          type: RECEIVE_SET_NUMERICAL_RECORDS_SETTINGS, 
          payload
        }
        expect(settings(initialState, action)).toEqual(expectedState)
      })
    })