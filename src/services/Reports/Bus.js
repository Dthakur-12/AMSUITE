import AmSuiteNavBar from '../../utils/AmSuiteNavBar'
import { create } from 'apisauce'

import { TIMEOUT } from '../../Config'

let api

export const GetBusValidationReport = (payload) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post(
        '/Reports/BusScanTrips',
        { ...payload },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          })
        } else {
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push('/')
          else if (response.status === 406)
            reject({
              error: 'TOO_MUCH_DATA',
            })
          else
            reject({
              error: response.data,
            })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}
export const BusScanning = (payload) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        `/Reports/BusScanning/${payload.panels}/${payload.toDate}/${payload.fromDate}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          })
        } else {
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push('/')
          else if (response.status === 406)
            reject({
              error: 'TOO_MUCH_DATA',
            })
          else
            reject({
              error: response.data,
            })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const API = {
  GetBusValidationReport,
  BusScanning,
}

export default API
