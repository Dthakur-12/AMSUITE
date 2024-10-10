export const REQUEST_GET_BUS_REPORT = 'REQUEST_GET_BUS_REPORT'
export const RECEIVE_GET_BUS_REPORT = 'RECEIVE_GET_BUS_REPORT'
export const REQUEST_GET_BUS_SCAN_REPORT = 'REQUEST_GET_BUS_SCAN_REPORT'
export const RECEIVE_GET_BUS_SCAN_REPORT = 'RECEIVE_GET_BUS_SCAN_REPORT'
export const BUS_ERROR = 'BUS_ERROR'
export const CLEAR_BUS_ERROR = 'CLEAR_BUS_ERROR'
export const CLEAR_BUS_REPORT = 'CLEAR_BUS_REPORT'

export const requestGetBusReport = (payload) => ({
  type: REQUEST_GET_BUS_REPORT,
  payload
})

export const receiveGetBusReport = (payload) => ({
  type: RECEIVE_GET_BUS_REPORT,
  payload
})

export const requestGetBusScanReport = (payload) => ({
  type: REQUEST_GET_BUS_SCAN_REPORT,
  payload
})

export const receiveGetBusScanReport = (payload) => ({
  type: RECEIVE_GET_BUS_SCAN_REPORT,
  payload
})

export const busError = (payload) => ({
  type: BUS_ERROR,
  payload
})

export const clearBusError = () => ({
  type: CLEAR_BUS_ERROR
})

export const clearBusReport = () => ({
  type: CLEAR_BUS_REPORT
})

