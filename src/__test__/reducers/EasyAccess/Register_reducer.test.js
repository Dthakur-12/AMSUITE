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
} from '../../../actions/EasyAccess/Register_actions'

import registersReducer from '../../../reducers/EasyAccess/Register_reducer'

describe('registersReducer', () => {
  it('REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED', () => {
    const initialState = {}
    const expectedState = {successInfectedContats: false, loadingInfectedContacts: true }
    const payload = {}
    const action = {
      type: REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED', () => {
    const initialState = {}
    const expectedState = {successInfectedContats: true, loadingInfectedContacts: false, infectedContacts: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_NUMERICAL_RECORDS_BY_PEOPLE', () => {
    const initialState = {}
    const expectedState = {successRecordsByPeople: false, loadingRecordsByPeople: true }
    const payload = {}
    const action = {
      type: REQUEST_NUMERICAL_RECORDS_BY_PEOPLE, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE', () => {
    const initialState = {}
    const expectedState = {successRecordsByPeople: true, loadingRecordsByPeople: false, recordByPeople: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successRecordsByEnterprises: false,loadingRecordsByEnterprises: true }
    const payload = {}
    const action = {
      type: REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES', () => {
    const initialState = {}
    const expectedState = {successRecordsByEnterprises: true, loadingRecordsByEnterprises: false,  recordByEnterprises: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS', () => {
    const initialState = {}
    const expectedState = {successInfectedContatsXLS: false, loadingInfectedContatsXLS: true}
    const payload = {}
    const action = {
      type: REQUEST_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS', () => {
    const initialState = {}
    const expectedState = {successInfectedContatsXLS: true, loadingInfectedContatsXLS: false, infectedContactsXLS: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_PEOPLE_IN_CONTACT_WITH_INFECTED_XLS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })  

  it('REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS', () => {
    const initialState = {}
    const expectedState = {successRecordsByPeopleXLS: false, loadingRecordsByPeopleXLS: true}
    const payload = {}
    const action = {
      type: REQUEST_NUMERICAL_RECORDS_BY_PEOPLE_XLS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS', () => {
    const initialState = {}
    const expectedState = {successRecordsByPeopleXLS: true, loadingRecordsByPeopleXLS: false, recordByPeopleXLS: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_NUMERICAL_RECORDS_BY_PEOPLE_XLS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS', () => {
    const initialState = {}
    const expectedState = {successRecordsByEnterprisesXLS: false, loadingRecordsByEnterprisesXLS: true}
    const payload = {}
    const action = {
      type: REQUEST_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS', () => {
    const initialState = {}
    const expectedState = {successRecordsByEnterprisesXLS: true, loadingRecordsByEnterprisesXLS: false, recordByEnterprisesXLS: undefined}
    const payload = {}
    const action = {
      type: RECEIVE_NUMERICAL_RECORDS_BY_ENTERPRISES_XLS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_REGISTER_ERROR', () => {
    const initialState = {}
    const expectedState = {success: false, loading: false, error: true,  msjError: undefined}
    const payload = {}
    const action = {
      type: REQUEST_REGISTER_ERROR, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('REQUEST_REGISTERS', () => {
    const initialState = {}
    const expectedState = {loading: true, successRegisters: false}
    const payload = {}
    const action = {
      type: REQUEST_REGISTERS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('RECEIVE_REGISTERS', () => {
    const initialState = {}
    const expectedState = {registers: undefined, successRegisters: true, loading: false}
    const payload = {}
    const action = {
      type: RECEIVE_REGISTERS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
    
  it('REQUEST_DELETE_REGISTERS', () => {
    const initialState = {}
    const expectedState = {loading: true, successDelRegisters: false}
    const payload = {}
    const action = {
      type: REQUEST_DELETE_REGISTERS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_DELETE_REGISTERS', () => {
    const initialState = {}
    const expectedState = {successDelRegisters: true, loading: false}
    const payload = {}
    const action = {
      type: RECEIVE_DELETE_REGISTERS, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_BADGES_BY_REGISTER', () => {
    const initialState = {}
    const expectedState = {loading: true, successBdgsRegisters: false}
    const payload = {}
    const action = {
      type: REQUEST_BADGES_BY_REGISTER, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_BADGES_BY_REGISTER', () => {
    const initialState = {}
    const expectedState = {badges: undefined, successBdgsRegisters: true, loading: false}
    const payload = {}
    const action = {
      type: RECEIVE_BADGES_BY_REGISTER, 
      payload
    }
    expect(registersReducer(initialState, action)).toEqual(expectedState)
  })
})