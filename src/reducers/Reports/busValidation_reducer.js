import {
  REQUEST_GET_BUS_REPORT,
  RECEIVE_GET_BUS_REPORT,
  BUS_ERROR,
  CLEAR_BUS_ERROR,
  CLEAR_BUS_REPORT,
  REQUEST_GET_BUS_SCAN_REPORT,
  RECEIVE_GET_BUS_SCAN_REPORT
} from '../../actions/Reports/busValidation_actions'

const busValidationReducers = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case REQUEST_GET_BUS_REPORT:
      return {
        ...state,
        error: null,
        loading: true
      }
    case RECEIVE_GET_BUS_REPORT:
      return {
        ...state,
        loading: false,
        report: action.payload
      }
    case REQUEST_GET_BUS_SCAN_REPORT:
      return {
        ...state,
        error: null,
        loading: true
      }
    case RECEIVE_GET_BUS_SCAN_REPORT:
      return {
        ...state,
        loading: false,
        report: action.payload
      }
    case BUS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_BUS_ERROR:
      return {
        ...state,
        error: null
      }
    case CLEAR_BUS_REPORT:{
      return {
        ...state,
        report: null
      }
    }
    default:
      return state
  }
}

export default busValidationReducers
