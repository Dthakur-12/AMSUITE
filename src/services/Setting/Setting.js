import { create } from 'apisauce'

import { TIMEOUT } from '../../Config'

import AmSuiteNavBar from '../../utils/AmSuiteNavBar'

export const TOKEN_ANONYMOUS = 'oITQ86J+s7vz7thJArHfTY0tDys28Z8lUNXtRchELkI='
let api

export const getPersonGroupSettings = (ids) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.post(
    '/AMSuite/Settings/GetPersonGroupSettings',
    {},
    {
      data: ids,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    }
  )
}

export const setPersonGroupSettings = (item) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.put('/AMSuite/Settings/SetPersonGroupSettings', item, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    },
  })
}

export const getCustomFields = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.get(
    '/AMSuite/CustomFields/GetCustomFields',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
      },
    }
  )
}

export const getCustomFieldsMobileVisibilities = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.get(
    '/AMSuite/CustomFields/GetCustomFieldsMobileVisibilities',
    {},
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    }
  )
}

export const updateCustomFieldsMobileVisibilities = (data) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.put(
    '/AMSuite/CustomFields/UpdateCustomFieldsMobileVisibilities ',
    data,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    }
  )
}

export const createCustomField = (customField) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.post('/AMSuite/CustomFields/CreateCustomField', customField, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    },
  })
}

export const sendTestEmail = (systemDTO) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.post('/AMSuite/Settings/TestEmailConfiguration', systemDTO, {
    headers: {
      Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
    },
  })
}

export const editCustomFieldVisibility = (customField) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.put(
    '/AMSuite/CustomFields/EditCustomFieldVisibility',
    customField,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    }
  )
}

export const getCustomsFieldsInIntegrator = (data) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return api.get('/AMSuite/CustomFields/GetCustomsFieldsInIntegrator', data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    },
  })
}

export const deleteCustomsFields = (customFieldId) => {
  console.log('customFieldId: ', customFieldId)
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.delete(
    '/AMSuite/CustomFields/DeleteCustomsFields',
    { data: customFieldId },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    }
  )
}

export const deleteCustomsFieldsTypeListValues = (ids) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.delete(
    '/AMSuite/CustomFields/DeleteCustomFieldsTypeListValues',
    { ids },
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    }
  )
}

export const getCustomFieldTypeListValues = (customFieldId) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.get(
    '/AMSuite/CustomFields/getCustomFieldTypeListValues',
    { customFieldId },
    {
      headers: {
        Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
      },
    }
  )
}

export const createCustomFieldTypeList = (customField) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.post(
    '/AMSuite/CustomFields/CreateCustomFieldTypeList',
    customField,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
    }
  )
}

export const getSettings = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetSettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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
        console.log('error: ', error)
        reject({
          error: error,
        })
      })
  })
}
export const getAludocSettings = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetAludocSettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const editAludocSettings = (settings) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/SetAludocSettings', settings, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          })
          //AmSuiteNavBar.appNavigation.history.pop();
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
export const editSystemSetting = (SystemDTO) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/System', SystemDTO, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve()
        } else {
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          else
            reject({
              error: response.data,
            })
        }
      })
      .catch((error) => {
        console.log('error: ', error)
        reject({
          error: error,
        })
      })
  })
}

export const getSystemSetting = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetSystem',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const getLogoBannerSetting = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetLogoBanner',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const getAppLogo = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetAppLogo',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const SaveLogo = (file, settingID) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    let data = new FormData()
    data.append('file', file)
    const config = {
      headers: {
        contentType: false,
        processData: false,
        Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
      },
    }
    return new Promise((resolve, reject) => {
      api
        .post('/AMSuite/Settings/LogoBanner/' + settingID, data, config)
        .then((response) => {
          if (response.ok) {
            resolve({
              data: response.data,
            })
          } else {
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
  })
}

export const SaveAppLogo = (obj) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  let data = new FormData()
  data.append('file', obj.img)
  const config = {
    headers: {
      contentType: false,
      processData: false,
      Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
    },
  }
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/AppLogo/' + obj.id, data, config)
      .then((response) => {
        if (response.ok) {
          resolve({
            data: response.data,
          })
        }
      })
  })
}

export const getEmployeeSetting = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetEmployeeSettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const editEmployeeSetting = (EmployeeSettingDTO) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/EmployeeSettings', EmployeeSettingDTO, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve()
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

export const getVisitorSetting = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetVisitorSettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const editVisitorSetting = (VisitorSettingDTO) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/SetVisitorSettings', VisitorSettingDTO, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve()
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

export const getEnterpriseSetting = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetEnterpriseSettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const editEnterpriseSetting = (EnterpriseSettingDTO) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/SetEnterpriseSettings', EnterpriseSettingDTO, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve()
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

export const getVehicleSetting = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetVehicleSettings',
        { id: 7 },
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const editVehicleSetting = (VehicleSettingDTO) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/SetVehicleSettings', VehicleSettingDTO, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve()
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

export const getNotifySetting = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetNotifySettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const editNotifySetting = (VehicleSettingDTO) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/SetNotifySettings', VehicleSettingDTO, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve()
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

export const getMusteringSettings = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetMusteringSettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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

export const editMusteringSettings = (id, offsetMustering) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post(
        '/AMSuite/Settings/SetMusteringSettings',
        { Id: id, OffsetMustering: offsetMustering },
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve()
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

export const getUnlicensedIMEIs = (payload) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return api.get('/AMSuite/Licenses/Get', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    },
  })
}

export const getLicense = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Licenses/Get',
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
        }
      })
      .catch((error) => {
        console.log('error: ', error)
        reject({
          error: error,
        })
      })
  })
}

export const activeLicense = (licenseStream, deleteUnlicensedIMEIs) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    let data = new FormData()
    data.append('file', licenseStream)
    api
      .post('/AMSuite/Licenses/LoadFromStream', data, {
        params: { deleteUnlicensedIMEIs },
        headers: {
          contentType: false,
          processData: false,
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        console.log('response: ', response)
        if (response.ok) {
          resolve()
        } else {
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          if (response.data) reject(response.data)
        }
      })
      .catch((error) => {
        console.log('error: ', error)
        reject({
          error: error,
        })
      })
  })
}

export const checkLicense = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Licenses/CheckLicense',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const getToken = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Licenses/GetLicenseRequestKey',
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
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const downloadToken = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Licenses/DownloadLicenseRequestFile',
        {},
        {
          headers: {
            ContentType: 'application/octet-stream',
            ContentDisposition: 'attachment',
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const testActiveDirectoryDomain = (domain) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Sessions/TestActiveDirectoryDomain',
        { domain },
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
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
        console.log('error: ', error)
        reject({
          error: error,
        })
      })
  })
}

export const getNumericalRecordsSettings = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .get(
        '/AMSuite/Settings/GetNumericalRecordsSettings',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          resolve({ data: response.data })
        } else {
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push('/')
          else {
            reject({
              error: response.data,
            })
          }
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const setNumericalRecordsSettings = (settings) => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return new Promise((resolve, reject) => {
    api
      .post('/AMSuite/Settings/SetNumericalRecordsSettings', settings, {
        headers: {
          Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
        },
      })
      .then((response) => {
        if (response.ok) {
          resolve({ data: '' })
        } else {
          if (response.problem === 'NETWORK_ERROR') console.log('Network error')
          else if (response.status === 401)
            AmSuiteNavBar.appNavigation.history.push('/')
          else {
            reject({
              error: response.data,
            })
          }
        }
      })
      .catch((error) => {
        reject({
          error: error,
        })
      })
  })
}

export const getVersion = () => {
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })

  return api.get('/AMSuite/Settings/GetVersion', null, {
    headers: {
      Authorization: 'Bearer ' + TOKEN_ANONYMOUS,
    },
  })
}

export const updateTable = ({ file }) => {
  const form = new FormData()
  form.append('file', file)
  const config = {
    headers: {
      contentType: false,
      processData: false,
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    },
    params: {},
  }
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: 0,
  })
  return api.post('/EasyAccess/Persons/UpdateCardholdersFromTSF', form, config)
}

export const forceManualSync = () => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    },
  }
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return api.put('/AMSuite/Settings/LenelSync', {}, config)
}

export const forceFullSync = () => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    },
  }
  api = create({
    baseURL: localStorage.getItem('urlApi'),
    timeout: TIMEOUT,
  })
  return api.put('/AMSuite/Settings/FullLenelSync', {}, config)
}

export const API = {
  updateTable,
  editSystemSetting,
  getSystemSetting,
  getLogoBannerSetting,
  SaveLogo,
  getEmployeeSetting,
  editEmployeeSetting,
  getVisitorSetting,
  editVisitorSetting,
  getEnterpriseSetting,
  editEnterpriseSetting,
  getVehicleSetting,
  editVehicleSetting,
  getNotifySetting,
  editNotifySetting,
  editMusteringSettings,
  getMusteringSettings,
  getSettings,
  getLicense,
  activeLicense,
  checkLicense,
  getToken,
  downloadToken,
  testActiveDirectoryDomain,
  SaveAppLogo,
  getAppLogo,
  getAludocSettings,
  editAludocSettings,
  getVersion,
  getNumericalRecordsSettings,
  setNumericalRecordsSettings,
  getUnlicensedIMEIs,
  getCustomFields,
  getCustomsFieldsInIntegrator,
  createCustomField,
  deleteCustomsFields,
  deleteCustomsFieldsTypeListValues,
  editCustomFieldVisibility,
  getCustomFieldTypeListValues,
  createCustomFieldTypeList,
  sendTestEmail,
  getCustomFieldsMobileVisibilities,
  updateCustomFieldsMobileVisibilities,
  getPersonGroupSettings,
  setPersonGroupSettings,
  forceManualSync,
  forceFullSync,
}

export default API
