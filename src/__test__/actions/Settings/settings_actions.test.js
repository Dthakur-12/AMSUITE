import {selectedPersonGroupChange,requestSetGroupPersonSetting,requestGroupPersonSettings,requestCustomFields,requestGetCustomFieldsMobileVisibilities,
    requestUpdateCustomFieldsMobileVisibilities,requestCreateCustomField,updateCustomFieldStore,requestEditCustomFieldVisibility} from "../../../actions/Settings/settings_actions";
describe('Actions', () => {
    test('selectedPersonGroupChange Action', () => {
       const payload = {};
       const expected = {
         type: "SELECTED_PERSON_GROUP_CHANGE",
         payload
       };    
       expect(selectedPersonGroupChange(payload)).toEqual(expected);
     })
     test('requestSetGroupPersonSetting Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_SET_PERSON_GROUP_SETTINGS",
          payload
        };    
        expect(requestSetGroupPersonSetting(payload)).toEqual(expected);
      })
      test('requestGroupPersonSettings Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GROUP_PERSON_SETTINGS",
          payload
        };    
        expect(requestGroupPersonSettings(payload)).toEqual(expected);
      })
      test('requestCustomFields Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CUSTOM_FIELDS",
        };    
        expect(requestCustomFields(payload)).toEqual(expected);
      })
      test('requestGetCustomFieldsMobileVisibilities Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_CUSTOM_FIELDS_MOBILE_VIBILITIES",
        };    
        expect(requestGetCustomFieldsMobileVisibilities(payload)).toEqual(expected);
      })
      test('requestUpdateCustomFieldsMobileVisibilities Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_UPDATE_CUSTOM_FIELDS_MOBILE_VIBILITIES",
          data:{}
        };    
        expect(requestUpdateCustomFieldsMobileVisibilities(payload)).toEqual(expected);
      })
      test('requestCreateCustomField Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_CUSTOM_FIELDS",
          customField:{}
        };    
        expect(requestCreateCustomField(payload)).toEqual(expected);
      })
      test('updateCustomFieldStore Action', () => {
        const payload = {};
        const expected = {
          type: "UPDATE_CUSTOM_FIELD_STORE",
          customFields:{}
        };    
        expect(updateCustomFieldStore(payload)).toEqual(expected);
      })
      test('requestEditCustomFieldVisibility Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_EDIT_CUSTOM_FIELD_VISIBILITY",
          customField:{}
        };    
        expect(requestEditCustomFieldVisibility(payload)).toEqual(expected);
      })
    })