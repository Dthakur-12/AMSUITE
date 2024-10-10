import {requestGetPersonGroupReportXLS, requestGetPersonByGroup, requestGetPersonGroups, createPersonsGroup,
  requestClearSuccessCreate, requestCreatePerson, requestCreatePersonAnonymouse, requestCreateVisitorGroup,
  requestCheckDocumentNumbers, requestGetXLSWithVisitorGroup, requestDownloadExcelTemplate, requestGetPersonByDocumentAnonymous,
  receiveCreatePerson, requestEditPerson, receiveEditPerson, requestPersonById, receivePersonById,
  requestEmployees, receiveEmployees, requestPersons, receivePersons, requestPersonsTypes, receivePersonsTypes, 
  requesSetImage, receiveSetImage, requesSetImageURL, receiveSetImageURL, requestGetImage,receiveGetImage,
  requestDeleteImage, receiveDeleteImage, requestUpdateImage, receiveUpdateImage, requestPersonError,requestPersonImageById,
  requestClearStorePersonImage} from '../../../actions/EasyAccess/Person_actions'

  describe('Actions', () => {
    test('requestGetPersonGroupReportXLS Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_PERSON_GROUPS_REPORT_XLS",
        payload:{}
      };    
      expect(requestGetPersonGroupReportXLS(payload)).toEqual(expected);
    });

    test('requestGetPersonByGroup Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_PERSON_BY_GROUPS",
        payload:{}
      };    
      expect(requestGetPersonByGroup(payload)).toEqual(expected);
    });

    test('requestGetPersonGroups Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_PERSON_GROUPS",
        payload:{}
      };    
      expect(requestGetPersonGroups(payload)).toEqual(expected);
    });

    test('createPersonsGroup Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CREATE_PERSONS_GROUP",
        infoGroup:{}
      };    
      expect(createPersonsGroup(payload)).toEqual(expected);
    });

    test('requestClearSuccessCreate Action', () => {
      const payload = {};
      const expected = {
        type: "CLEAR_SUCCESS_CREATE_EVENT",
      };    
      expect(requestClearSuccessCreate(payload)).toEqual(expected);
    });

    test('requestCreatePerson Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CREATE_PERSON",
        person:{}
      };    
      expect(requestCreatePerson(payload)).toEqual(expected);
    });

    test('requestCreatePersonAnonymouse Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CREATE_PERSON_ANONYMOUSE",
        person:{}
      };    
      expect(requestCreatePersonAnonymouse(payload)).toEqual(expected);
    });

    test('requestCreateVisitorGroup Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CREATE_VISITOR_GROUP",
        info:{}
      };    
      expect(requestCreateVisitorGroup(payload)).toEqual(expected);
    });

    test('requestCheckDocumentNumbers Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CHECK_DOC_NUMBER",
        info:{}
      };    
      expect(requestCheckDocumentNumbers(payload)).toEqual(expected);
    });

    test('requestGetXLSWithVisitorGroup Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_XLS_WITH_VISITOR_GROUP",
        info:{}
      };    
      expect(requestGetXLSWithVisitorGroup(payload)).toEqual(expected);
    });

    test('requestDownloadExcelTemplate Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_XLS_TEMPLATE",
        info:[]
      };    
      expect(requestDownloadExcelTemplate(payload)).toEqual(expected);
    });

    test('requestGetPersonByDocumentAnonymous Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS",
        document:{}
      };    
      expect(requestGetPersonByDocumentAnonymous(payload)).toEqual(expected);
    });

    test('receiveCreatePerson Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_CREATE_PERSON",
      };    
      expect(receiveCreatePerson(payload)).toEqual(expected);
    });

    test('requestEditPerson Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_EDIT_PERSON",
        person:{}
      };    
      expect(requestEditPerson(payload)).toEqual(expected);
    });

    test('receiveEditPerson Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_EDIT_PERSON",
      };    
      expect(receiveEditPerson(payload)).toEqual(expected);
    });

    test('requestPersonById Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_PERSON_BY_ID",
        id:{}
      };    
      expect(requestPersonById(payload)).toEqual(expected);
    });

    test('receivePersonById Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_GET_PERSON_BY_ID",
        person:{}
      };    
      expect(receivePersonById(payload)).toEqual(expected);
    });

    test('requestEmployees Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_EMPLOYEES",
        dataTable:{}
      };    
      expect(requestEmployees(payload)).toEqual(expected);
    });

    test('receiveEmployees Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_EMPLOYEES",
        emps:{}
      };    
      expect(receiveEmployees(payload)).toEqual(expected);
    });

    test('requestPersons Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_PERSONS",
        dataTable:{}
      };    
      expect(requestPersons(payload)).toEqual(expected);
    });

    test('receivePersons Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_PERSONS",
        persons:{}
      };    
      expect(receivePersons(payload)).toEqual(expected);
    });

    test('requestPersonsTypes Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_PERSONS_TYPES",
      };    
      expect(requestPersonsTypes(payload)).toEqual(expected);
    });

    test('receivePersonsTypes Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_PERSONS_TYPES",
        types:{}
      };    
      expect(receivePersonsTypes(payload)).toEqual(expected);
    });

    test('requesSetImage Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_SET_IMAGE",
        obj:{}
      };    
      expect(requesSetImage(payload)).toEqual(expected);
    });

    test('receiveSetImage Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_SET_IMAGE",
      };    
      expect(receiveSetImage(payload)).toEqual(expected);
    });

    test('requesSetImageURL Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_SET_IMAGE_URL",
        obj:{}
      };    
      expect(requesSetImageURL(payload)).toEqual(expected);
    });

    test('receiveSetImageURL Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_SET_IMAGE_URL",
      };    
      expect(receiveSetImageURL(payload)).toEqual(expected);
    });

    test('requestGetImage Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_IMAGE",
        id:{}
      };    
      expect(requestGetImage(payload)).toEqual(expected);
    });

    test('receiveGetImage Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_GET_IMAGE",
        img:{}
      };    
      expect(receiveGetImage(payload)).toEqual(expected);
    });

    test('requestDeleteImage Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_DELETE_IMAGE",
        id:{}
      };    
      expect(requestDeleteImage(payload)).toEqual(expected);
    });

    test('receiveDeleteImage Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_DELETE_IMAGE",
      };    
      expect(receiveDeleteImage(payload)).toEqual(expected);
    });

    test('requestUpdateImage Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_UPDATE_IMAGE",
        obj:{}
      };    
      expect(requestUpdateImage(payload)).toEqual(expected);
    });

    test('receiveUpdateImage Action', () => {
      const payload = {};
      const expected = {
        type: "RECEIVE_UPDATE_IMAGE",
      };    
      expect(receiveUpdateImage(payload)).toEqual(expected);
    });

    test('requestPersonError Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_PERSON_ERROR",
        error:{}
      };    
      expect(requestPersonError(payload)).toEqual(expected);
    });

    test('requestPersonImageById Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_GET_PERSON_IMAGE_BY_ID",
        id:{}
      };    
      expect(requestPersonImageById(payload)).toEqual(expected);
    });

    test('requestClearStorePersonImage Action', () => {
      const payload = {};
      const expected = {
        type: "REQUEST_CLEAR_STORE_PERSON_IMAGE",
      };    
      expect(requestClearStorePersonImage(payload)).toEqual(expected);
    });
  })