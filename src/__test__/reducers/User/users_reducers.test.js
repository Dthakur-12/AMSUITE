import {
  REQUEST_CHECK_CREDENTIALS,
  RECEIVE_CHECK_CREDENTIALS,
  REQUEST_CHECK_CREDENTIALS_ERROR,
  RECEIVE_CURRENT_USER,
  USER_ERROR,
  LOGIN_ACTIVE_DIRECTORY,
  LOGIN,
  LOGIN_SAML,
  LOGIN_CLEAR_STORE,
  REQUEST_USER_ACTIVITIES,
  RECEIVE_USER_ACTIVITIES,
  RECEIVE_USERS,
  REQUEST_CREATE_USER_SAML_PERMITS,
  RECEIVE_CREATE_USER_SAML_PERMITS,
} from "../../../actions/Users/user_actions";
import usersReducers from '../../../reducers/User/users_reducers'

describe('usersReducers', () => {
  it('REQUEST_CHECK_CREDENTIALS', () => {
    const initialState = {}
    const expectedState = {checkingCredentials: true, validCredentials: false, invalidCredentials: false }
    const payload = {}
    const action = {
      type: REQUEST_CHECK_CREDENTIALS, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_USERS', () => {
    const initialState = {}
    const expectedState = {users:undefined}
    const payload = {}
    const action = {
      type: RECEIVE_USERS, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_CHECK_CREDENTIALS', () => {
    const initialState = {}
    const expectedState = {checkingCredentials: false, validCredentials: true }
    const payload = {}
    const action = {
      type: RECEIVE_CHECK_CREDENTIALS, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_CHECK_CREDENTIALS_ERROR', () => {
    const initialState = {}
    const expectedState = {checkingCredentials: false, invalidCredentials: true }
    const payload = {}
    const action = {
      type: REQUEST_CHECK_CREDENTIALS_ERROR, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_CURRENT_USER', () => {
    const initialState = {}
    const expectedState = {currentUser: undefined, isLogin: false }
    const payload = {}
    const action = {
      type: RECEIVE_CURRENT_USER, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })
  
  it('LOGIN', () => {
    const initialState = {}
    const expectedState = {isLoginButton: true, isLogin: true }
    const payload = {}
    const action = {
      type: LOGIN, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })
  
 
  it('LOGIN_ACTIVE_DIRECTORY', () => {
    const initialState = {}
    const expectedState = {isLoginButtonActiveDirectory: true, isLogin: true }
    const payload = {}
    const action = {
      type: LOGIN_ACTIVE_DIRECTORY, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })
 
  it('USER_ERROR', () => {
    const initialState = {}
    const expectedState = {error: undefined, isLoginButtonActiveDirectory: false,isLoginButton: false,isLogin: false }
    const payload = {}
    const action = {
      type: USER_ERROR, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })
   
  it('LOGIN_CLEAR_STORE', () => {
    const initialState = {}
    const expectedState = {isLoginButton: false, isLogin: false, isLoginButtonActiveDirectory: false, error: ""}
    const payload = {}
    const action = {
      type: LOGIN_CLEAR_STORE, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })
 
  it('REQUEST_USER_ACTIVITIES', () => {
    const initialState = {}
    const expectedState = {isLoading: true, succesUserActivities: false }
    const payload = {}
    const action = {
      type: REQUEST_USER_ACTIVITIES, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_USER_ACTIVITIES', () => {
    const initialState = {}
    const expectedState = {isLoading: false, userActivities: undefined,  succesUserActivities: true }
    const payload = {}
    const action = {
      type: RECEIVE_USER_ACTIVITIES, 
      payload
    }
    expect(usersReducers(initialState, action)).toEqual(expectedState)
  })

})