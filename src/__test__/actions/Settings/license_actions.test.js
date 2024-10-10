import {
  requestGetUnlicensedIMEIs,
  requestGetLicense,
  receiveGetLicense,
  saveLicense,
} from '../../../actions/Settings/license_actions'
describe('Actions', () => {
  test('requestGetUnlicensedIMEIs Action', () => {
    const payload = {}
    const expected = {
      type: 'REQUEST_GET_LICENSED_IMEI_LIST',
    }
    expect(requestGetUnlicensedIMEIs(payload)).toEqual(expected)
  })
  test('requestGetLicense Action', () => {
    const payload = {}
    const expected = {
      type: 'REQUEST_GET_LICENSE',
    }
    expect(requestGetLicense(payload)).toEqual(expected)
  })
  test('receiveGetLicense Action', () => {
    const payload = {}
    const expected = {
      type: 'RECEIVE_GET_LICENSE',
      data: {},
    }
    expect(receiveGetLicense(payload)).toEqual(expected)
  })
})
