import {requestPeopleInContactWithInfected,requestNumericalRecordsByPeople, requestNumericalRecordsByEnterprises,
  requestPeopleInContactWithInfectedXLS, requestNumericalRecordsByPeopleXLS, requestNumericalRecordsByEnterprisesXLS,
  requestRegisterError, requestRegisters, receiveRegisters, requestDeleteRegisters, receiveDeleteRegisters,
  requestBadgesByRegister, receiveBadgesByRegister } from '../../../actions/EasyAccess/Register_actions'

  describe('Actions', () => {
    test('requestPeopleInContactWithInfected Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED",
        info:{}
      };    
      expect(requestPeopleInContactWithInfected(payload)).toEqual(expected);
    });

    test('requestNumericalRecordsByPeople Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_NUMERICAL_RECORDS_BY_PEOPLE",
        info:{}
      };    
      expect(requestNumericalRecordsByPeople(payload)).toEqual(expected);
    });
    
    test('requestNumericalRecordsByEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES",
        info:{}
      };    
      expect(requestNumericalRecordsByEnterprises(payload)).toEqual(expected);
    });

    test('requestPeopleInContactWithInfectedXLS Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS",
        info:{}
      };    
      expect(requestPeopleInContactWithInfectedXLS(payload)).toEqual(expected);
    });

    test('requestNumericalRecordsByPeopleXLS Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS",
        info:{}
      };    
      expect(requestNumericalRecordsByPeopleXLS(payload)).toEqual(expected);
    });

    test('requestNumericalRecordsByEnterprisesXLS Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS",
        info:{}
      };    
      expect(requestNumericalRecordsByEnterprisesXLS(payload)).toEqual(expected);
    });
    
    test('requestRegisterError Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_REGISTER_ERROR",
        error:{}
      };    
      expect(requestRegisterError(payload)).toEqual(expected);
    });

    test('requestRegisters Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_REGISTERS",
        dataTable:{}
      };    
      expect(requestRegisters(payload)).toEqual(expected);
    });

    test('receiveRegisters Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_REGISTERS",
        registers:{}
      };    
      expect(receiveRegisters(payload)).toEqual(expected);
    });

    test('requestDeleteRegisters Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_DELETE_REGISTERS",
        ids:{}
      };    
      expect(requestDeleteRegisters(payload)).toEqual(expected);
    });
    
    test('receiveDeleteRegisters Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_DELETE_REGISTERS",
      };    
      expect(receiveDeleteRegisters(payload)).toEqual(expected);
    });

    test('requestBadgesByRegister Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_BADGES_BY_REGISTER",
        id:{}
      };    
      expect(requestBadgesByRegister(payload)).toEqual(expected);
    });

    test('receiveBadgesByRegister Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_BADGES_BY_REGISTER",
        badges:{}
      };    
      expect(receiveBadgesByRegister(payload)).toEqual(expected);
    });
  })