import { create } from 'apisauce'
import AmSuiteNavBar from '../../utils/AmSuiteNavBar'
import { TIMEOUT } from '../../Config'

let api

export const createMusterEvent = (musterZone, currentUser, datevalue) => {
  console.log("🚀 ~ file: Event.js:8 ~ createMusterEvent ~ currentUser:", currentUser)
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return new Promise((resolve, reject) => {
    api
      .post(
        '/Mustering/Start',
        { user: currentUser.id, start: datevalue, musterZones: musterZone },
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
  createMusterEvent, //
}

export default API
