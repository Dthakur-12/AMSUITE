import {
  REQUEST_CREATE_PERSON,
  RECEIVE_CREATE_PERSON,
  REQUEST_EDIT_PERSON,
  RECEIVE_EDIT_PERSON,
  REQUEST_GET_PERSON_BY_ID,
  RECEIVE_GET_PERSON_BY_ID,
  REQUEST_EMPLOYEES,
  RECEIVE_EMPLOYEES,
  REQUEST_PERSONS,
  RECEIVE_PERSONS,
  REQUEST_PERSONS_TYPES,
  RECEIVE_PERSONS_TYPES,
  REQUEST_SET_IMAGE,
  RECEIVE_SET_IMAGE,
  REQUEST_SET_IMAGE_URL,
  RECEIVE_SET_IMAGE_URL,
  REQUEST_GET_IMAGE,
  RECEIVE_GET_IMAGE,
  REQUEST_DELETE_IMAGE,
  RECEIVE_DELETE_IMAGE,
  REQUEST_UPDATE_IMAGE,
  RECEIVE_UPDATE_IMAGE,
  REQUEST_PERSON_ERROR,
  REQUEST_CLEAR_STORE_PERSON_IMAGE,
  RECEIVE_CREATE_PERSON_ANONYMOUSE,
  REQUEST_CREATE_PERSON_ANONYMOUSE,
  REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS,
  RECEIVE_GET_PERSON_BY_DOCUMENT_ANONYMOUS,
  REQUEST_CREATE_VISITOR_GROUP,
  RECEIVE_CREATE_VISITOR_GROUP,
  REQUEST_CHECK_DOC_NUMBER,
  RECEIVE_CHECK_DOC_NUMBER,
  REQUEST_XLS_WITH_VISITOR_GROUP,
  RECEIVE_XLS_WITH_VISITOR_GROUP,
  REQUEST_XLS_TEMPLATE,
  RECEIVE_XLS_TEMPLATE,
  CLEAR_SUCCESS_CREATE_EVENT,
  REQUEST_GET_PERSON_GROUPS,
  RECEIVE_GET_PERSON_GROUPS,
  REQUEST_CREATE_PERSONS_GROUP,
  RECEIVE_CREATE_PERSONS_GROUP,
  REQUEST_GET_PERSON_BY_GROUPS,
  RECEIVE_GET_PERSON_BY_GROUPS,
  REQUEST_GET_PERSON_GROUPS_REPORT_XLS,
  RECEIVE_GET_PERSON_GROUPS_REPORT_XLS,
} from '../../../actions/EasyAccess/Person_actions'

import personReducer from '../../../reducers/EasyAccess/Person_reducer'

describe('personReducer', () => {
  it('CLEAR_SUCCESS_CREATE_EVENT', () => {
    const initialState = {}
    const expectedState = {successCreateEvent: false }
    const payload = {}
    const action = {
      type: CLEAR_SUCCESS_CREATE_EVENT, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_GET_PERSON_GROUPS_REPORT_XLS', () => {
    const initialState = {}
    const expectedState = {successXlsPersonByGroups: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_PERSON_GROUPS_REPORT_XLS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_GET_PERSON_GROUPS_REPORT_XLS', () => {
    const initialState = {}
    const expectedState = {successXlsPersonByGroups: true,GroupReport: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_GET_PERSON_GROUPS_REPORT_XLS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_GET_PERSON_BY_GROUPS', () => {
    const initialState = {}
    const expectedState = {isLoading: true }
    const payload = {}
    const action = {
      type: REQUEST_GET_PERSON_BY_GROUPS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_GET_PERSON_BY_GROUPS', () => {
    const initialState = {}
    const expectedState = {isLoading: false, personByGroup: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_GET_PERSON_BY_GROUPS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_GET_PERSON_GROUPS', () => {
    const initialState = {}
    const expectedState = {isLoading: true,successPersonGroupData: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_PERSON_GROUPS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_GET_PERSON_GROUPS', () => {
    const initialState = {}
    const expectedState = {isLoading: false, personGroups: undefined, successPersonGroupData: true }
    const payload = {}
    const action = {
      type: RECEIVE_GET_PERSON_GROUPS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_CREATE_PERSONS_GROUP', () => {
    const initialState = {}
    const expectedState = {successCreateGroup: false, loadingCreateGroup: true }
    const payload = {}
    const action = {
      type: REQUEST_CREATE_PERSONS_GROUP, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_CREATE_PERSONS_GROUP', () => {
    const initialState = {}
    const expectedState = {successCreateGroup: true, loadingCreateGroup: false }
    const payload = {}
    const action = {
      type: RECEIVE_CREATE_PERSONS_GROUP, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_CREATE_PERSON_ANONYMOUSE', () => {
    const initialState = {}
    const expectedState = {persons: undefined, successCreate: true, msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_CREATE_PERSON_ANONYMOUSE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS', () => {
    const initialState = {}
    const expectedState = {succesGetPrsByDocAnonymous: false, error: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_PERSON_BY_DOCUMENT_ANONYMOUS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('RECEIVE_GET_PERSON_BY_DOCUMENT_ANONYMOUS', () => {
    const initialState = {}
    const expectedState = {succesGetPrsByDocAnonymous: true, personAnonymous: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_GET_PERSON_BY_DOCUMENT_ANONYMOUS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('REQUEST_CREATE_PERSON_ANONYMOUSE', () => {
    const initialState = {}
    const expectedState = {successCreate: false, error: false }
    const payload = {}
    const action = {
      type: REQUEST_CREATE_PERSON_ANONYMOUSE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
      
  it('REQUEST_GET_PERSON_BY_ID', () => {
    const initialState = {}
    const expectedState = {loading: true, successPerson: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_PERSON_BY_ID, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
      
  it('REQUEST_CREATE_VISITOR_GROUP', () => {
    const initialState = {}
    const expectedState = {successCreateEvent: false, success: false, isCreating: true, error: false }
    const payload = {}
    const action = {
      type: REQUEST_CREATE_VISITOR_GROUP, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_CREATE_VISITOR_GROUP', () => {
    const initialState = {}
    const expectedState = {successCreateEvent: true, eventData: undefined, success: true, isCreating: false,
      error: false, msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_CREATE_VISITOR_GROUP, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_CHECK_DOC_NUMBER', () => {
    const initialState = {}
    const expectedState = {successCheckDoc: false, loadingCheck: true, checkDocNumber: undefined, error: false }
    const payload = {}
    const action = {
      type: REQUEST_CHECK_DOC_NUMBER, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_CHECK_DOC_NUMBER', () => {
    const initialState = {}
    const expectedState = {successCheckDoc: true,loadingCheck: false, error: false}
    const payload = {}
    const action = {
      type: RECEIVE_CHECK_DOC_NUMBER, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_XLS_WITH_VISITOR_GROUP', () => {
    const initialState = {}
    const expectedState = {successXls: false, loadingXls: true, error: false }
    const payload = {}
    const action = {
      type: REQUEST_XLS_WITH_VISITOR_GROUP, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_XLS_WITH_VISITOR_GROUP', () => {
    const initialState = {}
    const expectedState = {successXls: true, loadingXls: false,  dataXls: undefined, error: false }
    const payload = {}
    const action = {
      type: RECEIVE_XLS_WITH_VISITOR_GROUP, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_XLS_TEMPLATE', () => {
    const initialState = {}
    const expectedState = {successXlsTemplate: false, loadingXlsTemplate: true, error: false }
    const payload = {}
    const action = {
      type: REQUEST_XLS_TEMPLATE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_XLS_TEMPLATE', () => {
    const initialState = {}
    const expectedState = {successXlsTemplate: true, loadingXlsTemplate: false, dataXls: undefined, error: false }
    const payload = {}
    const action = {
      type: RECEIVE_XLS_TEMPLATE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_GET_PERSON_BY_ID', () => {
    const initialState = {}
    const expectedState = {person:undefined, successPerson: true, loading: false, msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_GET_PERSON_BY_ID, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_EMPLOYEES', () => {
    const initialState = {}
    const expectedState = {loading: true, successEmployees: false,  loadingEmp: true }
    const payload = {}
    const action = {
      type: REQUEST_EMPLOYEES, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_EMPLOYEES', () => {
    const initialState = {}
    const expectedState = {loading: false, successEmployees: true, employees: undefined, loadingEmp: false,
      msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_EMPLOYEES, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_PERSONS', () => {
    const initialState = {}
    const expectedState = {loading: true, successPrs: false }
    const payload = {}
    const action = {
      type: REQUEST_PERSONS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_PERSONS', () => {
    const initialState = {}
    const expectedState = {loading: false, successPrs: true, persons: undefined,  msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_PERSONS, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_CREATE_PERSON', () => {
    const initialState = {}
    const expectedState = {loading: true, successCreatePrs: false, error: false,success: false, isCreating: true }
    const payload = {}
    const action = {
      type: REQUEST_CREATE_PERSON, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_CREATE_PERSON', () => {
    const initialState = {}
    const expectedState = {loading: false, successCreatePrs: true, personData: undefined, success: true, isCreating: false,
      msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_CREATE_PERSON, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_EDIT_PERSON', () => {
    const initialState = {}
    const expectedState = {loading: true, successEditPrs: false, error: false, success: false, isCreating: true }
    const payload = {}
    const action = {
      type: REQUEST_EDIT_PERSON, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_EDIT_PERSON', () => {
    const initialState = {}
    const expectedState = {loading: false,successEditPrs: true, personData: undefined, success: true,isCreating: false,
      msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_EDIT_PERSON, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_PERSON_ERROR', () => {
    const initialState = {}
    const expectedState = {success: false, loading: false, error: true, msjError: undefined, isCreating: false,
      successCreatePrs: false }
      const payload = {
        errorData:undefined,
      }
    const action = {
      type: REQUEST_PERSON_ERROR, 
      error:payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_PERSONS_TYPES', () => {
    const initialState = {}
    const expectedState = {loading: true, successPrsTypes: false }
    const payload = {}
    const action = {
      type: REQUEST_PERSONS_TYPES, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_PERSONS_TYPES', () => {
    const initialState = {}
    const expectedState = {loading: false, successPrsTypes: true, personDataTypes:undefined, msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_PERSONS_TYPES, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_SET_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: true, successSetImage: false}
    const payload = {}
    const action = {
      type: REQUEST_SET_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_SET_IMAGE_URL', () => {
    const initialState = {}
    const expectedState = {loading: true, successSetImage: false }
    const payload = {}
    const action = {
      type: REQUEST_SET_IMAGE_URL, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_SET_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: false, successSetImage: true, msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_SET_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_SET_IMAGE_URL', () => {
    const initialState = {}
    const expectedState = {loading: false, successSetImage: true, msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_SET_IMAGE_URL, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_GET_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: true, successGetImage: false }
    const payload = {}
    const action = {
      type: REQUEST_GET_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_GET_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: false, successGetImage: true, img: undefined,  msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_GET_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_DELETE_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: true, successDeleteImage: false }
    const payload = {}
    const action = {
      type: REQUEST_DELETE_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('RECEIVE_DELETE_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: false,successDeleteImage: true, msjError: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_DELETE_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('REQUEST_UPDATE_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: true, successUpdateImage: false }
    const payload = {}
    const action = {
      type: REQUEST_UPDATE_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
      
  it('RECEIVE_UPDATE_IMAGE', () => {
    const initialState = {}
    const expectedState = {loading: false, successUpdateImage: true, msjError: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_UPDATE_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
         
  it('REQUEST_CLEAR_STORE_PERSON_IMAGE', () => {
    const initialState = {}
    const expectedState = {img: "" }
    const payload = {}
    const action = {
      type: REQUEST_CLEAR_STORE_PERSON_IMAGE, 
      payload
    }
    expect(personReducer(initialState, action)).toEqual(expectedState)
  })
})
