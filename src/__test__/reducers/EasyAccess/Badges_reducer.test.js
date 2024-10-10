import { RECEIVE_BADGE_BY_QR, REQUEST_BADGE_BY_QR, CLEAR_IMAGE_STORE, REQUEST_BADGES, RECEIVE_BADGES, REQUEST_BADGES_STATUSES,
  RECEIVE_BADGES_STATUSES, REQUEST_UNASSIGNED_BADGES, RECEIVE_UNASSIGNED_BADGES, REQUEST_COUNT_BADGES_FOR_AUTOASSIGN,
  RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN, REQUEST_BADGES_ERROR, REQUEST_PRINT_BADGE, RECEIVE_PRINT_BADGE  } from '../../../actions/EasyAccess/Badges_actions'
import badgesReducer from '../../../reducers/EasyAccess/Badges_reducer'

describe('badgesReducer', () => {
  it('REQUEST_BADGE_BY_QR', () => {
    const initialState = {}
    const expectedState = {successQR:false }
    const payload = {}
    const action = {
      type: REQUEST_BADGE_BY_QR, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_BADGE_BY_QR', () => {
    const initialState = {}
    const expectedState = { qrImage: undefined,successQR:true }
    const payload = {}
    const action = {
      type: RECEIVE_BADGE_BY_QR, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('CLEAR_IMAGE_STORE', () => {
    const initialState = {}
    const expectedState = {qrImage: null }
    const payload = {}
    const action = {
      type: CLEAR_IMAGE_STORE, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_BADGES', () => {
    const initialState = {}
    const expectedState = { successBadges: false, loading: true }
    const payload = {}
    const action = {
      type: REQUEST_BADGES, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_BADGES', () => {
    const initialState = {}
    const expectedState = { successBadges: true, loading: false, badges: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_BADGES, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('REQUEST_BADGES_STATUSES', () => {
    const initialState = {}
    const expectedState = { succesBadgesStatus: false, loadingStatus: true }
    const payload = {}
    const action = {
      type: REQUEST_BADGES_STATUSES, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })
  
  it('RECEIVE_BADGES_STATUSES', () => {
    const initialState = {}
    const expectedState = { succesBadgesStatus: true, loadingStatus: false, statuses: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_BADGES_STATUSES, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_UNASSIGNED_BADGES', () => {
    const initialState = {}
    const expectedState = { successUnassignedBadges: false, loading: true }
    const payload = {}
    const action = {
      type: REQUEST_UNASSIGNED_BADGES, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_UNASSIGNED_BADGES', () => {
    const initialState = {}
    const expectedState = { successUnassignedBadges: true, loading: false,  unassignedBadges: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_UNASSIGNED_BADGES, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_COUNT_BADGES_FOR_AUTOASSIGN', () => {
    const initialState = {}
    const expectedState = { successCountBadges: false, loading: true, error: false }
    const payload = {}
    const action = {
      type: REQUEST_COUNT_BADGES_FOR_AUTOASSIGN, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN', () => {
    const initialState = {}
    const expectedState = { successCountBadges: true, loading: false, countbadges: undefined }
    const payload = {}
    const action = {
      type: RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_BADGES_ERROR', () => {
    const initialState = {}
    const expectedState = { loading: false, msgError:undefined, error: true }
    const payload = {}
    const action = {
      type: REQUEST_BADGES_ERROR, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('REQUEST_PRINT_BADGE', () => {
    const initialState = {}
    const expectedState = { loading: true }
    const payload = {}
    const action = {
      type: REQUEST_PRINT_BADGE, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

  it('RECEIVE_PRINT_BADGE', () => {
    const initialState = {}
    const expectedState = { loading: false, successPrint: true}
    const payload = {}
    const action = {
      type: RECEIVE_PRINT_BADGE, 
      payload
    }
    expect(badgesReducer(initialState, action)).toEqual(expectedState)
  })

})
