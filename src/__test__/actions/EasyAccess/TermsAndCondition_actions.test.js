import {requestTermsAndConditions,requestInsertTermsAndConditions } from '../../../actions/EasyAccess/TermsAndCondition_actions'

  describe('Actions', () => {
    test('requestTermsAndConditions Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_TERMS_AND_CONDITION"
      };    
      expect(requestTermsAndConditions(payload)).toEqual(expected);
    });

    test('requestInsertTermsAndConditions Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_INSERT_TERMS_AND_CONDITION",
        value:{}
      };    
      expect(requestInsertTermsAndConditions(payload)).toEqual(expected);
    });
  })