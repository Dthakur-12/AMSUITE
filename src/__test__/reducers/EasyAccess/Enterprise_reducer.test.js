import {
  REQUEST_ENTERPRISES,
  RECEIVE_ENTERPRISES,
  REQUEST_ENTERPRISES_HOST,
  RECEIVE_ENTERPRISES_HOST,
  REQUEST_ENTERPRISE_ERROR,
  REQUEST_CREATE_ENTERPRISES,
  RECEIVE_CREATE_ENTERPRISES,
  REQUEST_EDIT_ENTERPRISES,
  RECEIVE_EDIT_ENTERPRISES,
  REQUEST_ENTERPRISES_BY_ID,
  RECEIVE_ENTERPRISES_BY_ID,
  REQUEST_DELETE_ENTERPRISES,
  RECEIVE_DELETE_ENTERPRISES,
  RECEIVE_ENTERPRISES_ANONYMOUSE,
  RECEIVE_ENTERPRISESHOST_ANONYMOUSE,
  REQUEST_VISITS_ENTERPRISE,
  RECEIVE_VISITS_ENTERPRISE,
  REQUEST_VISITS_ENTERPRISE_REPORT,
  RECEIVE_VISITS_ENTERPRISE_REPORT,
} from '../../../actions/EasyAccess/Enterprise_actions'

import enterpriseReducer from '../../../reducers/EasyAccess/Enterprise_reducer'

describe('enterpriseReducer', () => {
  it('RECEIVE_ENTERPRISES_ANONYMOUSE', () => {
    const initialState = {}
    const expectedState = {enterpriseAnonymouse: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_ENTERPRISES_ANONYMOUSE, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_VISITS_ENTERPRISE', () => {
    const initialState = {}
    const expectedState = {loading: true }
    const payload = {}
    const action = {
      type: REQUEST_VISITS_ENTERPRISE, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_VISITS_ENTERPRISE_REPORT', () => {
    const initialState = {}
    const expectedState = {successGetVisitReport: true, successDownloadXLS: false, loading: true, error: undefined,
      visitReport: undefined, }
    const payload = {}
    const action = {
      type: REQUEST_VISITS_ENTERPRISE_REPORT, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_VISITS_ENTERPRISE_REPORT', () => {
    const initialState = {}
    const expectedState = {loading: false, successDownloadXLS: true, visitReport: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_VISITS_ENTERPRISE_REPORT, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_CREATE_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successCreateEnterprise: false, loading: true, newData: false,}
    const payload = {}
    const action = {
      type: REQUEST_CREATE_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })


  it('RECEIVE_CREATE_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successCreateEnterprise: true, loading: false, newData: true,}
    const payload = {}
    const action = {
      type: RECEIVE_CREATE_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_EDIT_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successEditEnterprise: false, loading: true,  newData: false,}
    const payload = {}
    const action = {
      type: REQUEST_EDIT_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_EDIT_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successEditEnterprise: true, loading: false, newData: true,}
    const payload = {}
    const action = {
      type: RECEIVE_EDIT_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successEnterprise: false, loading: true}
    const payload = {}
    const action = {
      type: REQUEST_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('RECEIVE_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successEnterprise: true, loading: false, enterprises:undefined,}
    const payload = {}
    const action = {
      type: RECEIVE_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_ENTERPRISES_HOST', () => {
    const initialState = {}
    const expectedState = {successEnterpriseHost: false, loading: true}
    const payload = {}
    const action = {
      type: REQUEST_ENTERPRISES_HOST, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_ENTERPRISESHOST_ANONYMOUSE', () => {
    const initialState = {}
    const expectedState = {successEnterpriseHost: false, loading: true, enterprisesHostAnonymouse: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_ENTERPRISESHOST_ANONYMOUSE, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_ENTERPRISES_HOST', () => {
    const initialState = {}
    const expectedState = {successEnterpriseHost: true, loading: false, enterprisesHost: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_ENTERPRISES_HOST, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_ENTERPRISE_ERROR', () => {
    const initialState = {}
    const expectedState = {loading: false, error: undefined, successDownloadXLS: false}
    const payload = {}
    const action = {
      type: REQUEST_ENTERPRISE_ERROR, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_ENTERPRISES_BY_ID', () => {
    const initialState = {}
    const expectedState = {successEnterpriseByID: false, loading: true}
    const payload = {}
    const action = {
      type: REQUEST_ENTERPRISES_BY_ID, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_ENTERPRISES_BY_ID', () => {
    const initialState = {}
    const expectedState = {successEnterpriseByID: true,loading: false, enterpriseById: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_ENTERPRISES_BY_ID, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_DELETE_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successDeleteEnterprise: false, loading: true, newData: false,}
    const payload = {}
    const action = {
      type: REQUEST_DELETE_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_DELETE_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successDeleteEnterprise: true, loading: false, newData: true}
    const payload = {}
    const action = {
      type: RECEIVE_DELETE_ENTERPRISES, 
      payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })
  it('RECEIVE_VISITS_ENTERPRISE', () => {
    const initialState = {}
    const expectedState = {loading: false, visitsEnterprise:undefined, visitsEnterpriseCount:0 }
    const payload = {
      data:undefined,
      totalCount:0
    }
    const action = {
      type: RECEIVE_VISITS_ENTERPRISE, 
      data: payload
    }
    expect(enterpriseReducer(initialState, action)).toEqual(expectedState)
  })
  
})
