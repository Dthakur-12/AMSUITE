import {requestVisitsEnterprisesReportXLS, requestVisitsEnterprises, requestEnterprisesAnonymouse,
  requestEnterprisesHostAnonymouse, requestCreateEnterprises, receiveCreateEnterprises, requestEditEnterprises,
  receiveEditEnterprises, requestEnterprises, receiveEnterprises, requestEnterprisesHost, receiveEnterprisesHost,
  receiveEnterprisesAnonymouse, requestPersonError, requestEnterprisesById, receiveEnterprisesById, 
  requestDeleteEnterprises, receiveDeleteEnterprises } from '../../../actions/EasyAccess/Enterprise_actions'

  describe('Actions', () => {
    test('requestVisitsEnterprisesReportXLS Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_VISITS_ENTERPRISE_REPORT",
        obj:{}
      };    
      expect(requestVisitsEnterprisesReportXLS(payload)).toEqual(expected);
    });

    test('requestVisitsEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_VISITS_ENTERPRISE",
        obj:{}
      };    
      expect(requestVisitsEnterprises(payload)).toEqual(expected);
    });
    
    test('requestEnterprisesAnonymouse Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_ENTERPRISES_ANONYMOUSE",
        obj:{}
      };    
      expect(requestEnterprisesAnonymouse(payload)).toEqual(expected);
    });
    
    test('requestEnterprisesHostAnonymouse Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_ENTERPRISESHOST_ANONYMOUSE",
        obj:{}
      };    
      expect(requestEnterprisesHostAnonymouse(payload)).toEqual(expected);
    });
    
    test('requestCreateEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CREATE_ENTERPRISES",
        ent:{}
      };    
      expect(requestCreateEnterprises(payload)).toEqual(expected);
    });
    
    test('receiveCreateEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_CREATE_ENTERPRISES",
        msjOk:{}
      };    
      expect(receiveCreateEnterprises(payload)).toEqual(expected);
    });
        
    test('requestEditEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_EDIT_ENTERPRISES",
        ent:{}
      };    
      expect(requestEditEnterprises(payload)).toEqual(expected);
    });
    
    test('receiveEditEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_EDIT_ENTERPRISES",
        msjOk:{}
      };    
      expect(receiveEditEnterprises(payload)).toEqual(expected);
    });
    
    test('requestEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_ENTERPRISES",
        obj:{}
      };    
      expect(requestEnterprises(payload)).toEqual(expected);
    });
    
    test('receiveEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_ENTERPRISES",
        ent:{}
      };    
      expect(receiveEnterprises(payload)).toEqual(expected);
    });
    
    test('requestEnterprisesHost Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_ENTERPRISES_HOST",
        obj:{}
      };    
      expect(requestEnterprisesHost(payload)).toEqual(expected);
    });
        
    test('receiveEnterprisesHost Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_ENTERPRISES_HOST",
        ent:{}
      };    
      expect(receiveEnterprisesHost(payload)).toEqual(expected);
    });

    test('receiveEnterprisesAnonymouse Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_ENTERPRISES_ANONYMOUSE",
        ent:{}
      };    
      expect(receiveEnterprisesAnonymouse(payload)).toEqual(expected);
    });

    test('requestPersonError Action', () => {
      const payload = {};
      const expected = {
        type: " REQUEST_ENTERPRISE_ERROR",
        error:{}
      };    
      expect(requestPersonError(payload)).toEqual(expected);
    });
    
    test('requestEnterprisesById Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_ENTERPRISES_BY_ID",
        id:{}
      };    
      expect(requestEnterprisesById(payload)).toEqual(expected);
    });
    
    test('receiveEnterprisesById Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_ENTERPRISES_BY_ID",
        ent:{}
      };    
      expect(receiveEnterprisesById(payload)).toEqual(expected);
    });

    test('requestDeleteEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_DELETE_ENTERPRISES",
        ids:{}
      };    
      expect(requestDeleteEnterprises(payload)).toEqual(expected);
    });

    test('receiveDeleteEnterprises Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_DELETE_ENTERPRISES",
      };    
      expect(receiveDeleteEnterprises(payload)).toEqual(expected);
    });
  })