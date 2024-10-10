export const REQUEST_GET_WEB_REPORT = 'REQUEST_GET_WEB_REPORT'
export const RECEIVE_GET_WEB_REPORT = 'RECEIVE_GET_WEB_REPORT'
export const REQUEST_DOWNLOAD_WEB_REPORT = 'REQUEST_DOWNLOAD_WEB_REPORT'
export const RECEIVE_DOWNLOAD_WEB_REPORT = 'RECEIVE_DOWNLOAD_WEB_REPORT'
export const WEB_REPORT_ERROR = 'WEB_REPORT_ERROR'
export const CLEAR_WEB_REPORT_ERROR = 'CLEAR_WEB_REPORT_ERROR'
export const CLEAR_WEB_REPORT_REPORT = 'CLEAR_WEB_REPORT_REPORT'

export const requestGetWebReportReport = (payload) => ({
  type: REQUEST_GET_WEB_REPORT,
  payload
})

export const receiveGetWebReportReport = (payload) => ({
  type: RECEIVE_GET_WEB_REPORT,
  payload
})

export const requestDownloadWebReportReport = (payload) => ({
  type: REQUEST_DOWNLOAD_WEB_REPORT,
  payload
})

export const receiveDownloadWebReportReport = (payload) => ({
  type: RECEIVE_DOWNLOAD_WEB_REPORT,
  payload
})

export const webReportError = (payload) => ({
  type: WEB_REPORT_ERROR,
  payload
})

export const clearWebReportError = () => ({
  type: CLEAR_WEB_REPORT_ERROR
})

export const clearWebReportReport = () => ({
  type: CLEAR_WEB_REPORT_REPORT
})

