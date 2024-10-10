import {requestGetAccesLevels,requestDeleteAccssLevel,requestGetAccesLevel,requestCreateAccssLevel,receiveGetAccessLevels,receiveGetAccessLevel,receiveDeleteAccessLevel,reciveCreateAccssLevel} from "../../../actions/AccessControl/accessLevel_actions"

describe('Actions', () => {
  test('requestGetAccesLevels Action', () => {
    const payload = {};
    const expected = {
      type: "REQUEST_GET_ACCESSLEVELS",
      datatable:{},
    };    
    expect(requestGetAccesLevels(payload)).toEqual(expected);
  });
  test('requestDeleteAccssLevel Action', () => {
    const payload = {};
    const expected = {
      type: "REQUEST_DELETE_ACCESSLEVEL",
      id:{},
    };    
    expect(requestDeleteAccssLevel(payload)).toEqual(expected);
  });
  test('requestGetAccesLevel Action', () => {
    const payload = {};
    const expected = {
      type: "REQUEST_GET_ACCESSLEVEL",
      id:{},
    };    
    expect(requestGetAccesLevel(payload)).toEqual(expected);
  });
  test('requestCreateAccssLevel Action', () => {
    const payload = {};
    const expected = {
      type: "REQUEST_CREATE_ACCESSLEVEL",
      data:{},
    };    
    expect(requestCreateAccssLevel(payload)).toEqual(expected);
  });
  test('receiveGetAccessLevels Action', () => {
    const payload = {};
    const expected = {
      type: "RECEIVE_GET_ACCESSLEVELS",
      data:{},
    };    
    expect(receiveGetAccessLevels(payload)).toEqual(expected);
  });
  test('receiveGetAccessLevel Action', () => {
    const payload = {};
    const expected = {
      type: "RECEIVE_GET_ACCESSLEVELS",
      data:{},
    };    
    expect(receiveGetAccessLevel(payload)).toEqual(expected);
  });
  //no action exported for this one
//   test('receiveDeleteAccessLevel Action', () => {
//     const payload = {};
//     const expected = {
//       type: "RECEIVE_DELEETE_ACCESSLEVEL",
//       data:{},
//     };    
//     expect(receiveDeleteAccessLevel(payload)).toEqual(expected);
//   });
  test('reciveCreateAccssLevel Action', () => {
    const payload = {};
    const expected = {
      type: "RECEIVE_CREATE_ACCESSLEVEL",
    };    
    expect(reciveCreateAccssLevel(payload)).toEqual(expected);
  });
});