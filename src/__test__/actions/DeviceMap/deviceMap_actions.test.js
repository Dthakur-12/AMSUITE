import {requestPanelsPositions} from '../../../actions/DeviceMap/deviceMap_actions';
describe('Actions', () => {
    test('requestPanelsPositions Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_PANELS_POSITIONS",
          info: {}
        };    
        expect(requestPanelsPositions(payload)).toEqual(expected);
      })
    })
