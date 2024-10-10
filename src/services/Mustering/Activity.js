import { create } from 'apisauce'

import { TIMEOUT } from '../../Config'

let api

export const getSafeOrUnsafePeople = (
  date,
  isSafe,
  start,
  length,
  searchText,
  activeColumnSort,
  order,
  musterEventID
) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    let Date = date
    let Safe = isSafe
    let Start = start
    let Length = length
    let Order = order
    let ColumnSort = activeColumnSort
    let Search = searchText
    let MusterEventID = musterEventID
    api
      .get(
        '/Mustering/MusterZone/GetSafeOrUnsafePeople',
        { Safe, Start, Length, Search, Order, ColumnSort, MusterEventID },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const getPersonByZone = (
  date,
  zoneID,
  start,
  length,
  searchText,
  activeColumnSort,
  order,
  musterEventID
) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    let Date = date
    let Start = start
    let ZoneID = zoneID
    let Length = length
    let Order = order
    let ColumnSort = activeColumnSort
    let Search = searchText
    api
      .get(
        '/Mustering/MusterZone/GetPersonByZone',
        { MusterEventID: musterEventID, ZoneID, Start, Length, Search, Order, ColumnSort },
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
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const getAllPeople = (
  date,
  start,
  length,
  search,
  activeColumnSort,
  order,
  musterEventID
) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/Mustering/MusterZone/GetSafeAndUnsafePeople',
        {
          // Date: date,
          // Safe: true,
          Start: start,
          Length: length,
          Search: search,
          Order: order,
          ColumnSort: activeColumnSort,
          MusterEventID: musterEventID,
        },
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
          reject(response)

          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const getZones = (date, start, length, musterEventID, Safe = true) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  const data = { Start: 0, length: 1000,  MusterEventID: musterEventID }
  if (Safe) data.Safe = true
  return new Promise((resolve, reject) => {
    api
      .get(
        '/Mustering/MusterZone/GetZones',
        data,
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
          reject(response)
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const getActiveEvent = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get('/Mustering/ActiveEvents', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          })
        } else {
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          // else
          //     if (response.status === 401)
          //         AmSuiteNavBar.appNavigation.history.push('/')
          //     else
          //         reject({
          //             error: response.data
          //         })
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
  getSafeOrUnsafePeople,
  getAllPeople,
  getZones,
  getPersonByZone,
  getActiveEvent,
}

export default API
