
import {requestUpdateTable} from "../../../actions/Settings/dataBase_actions";
describe('Actions', () => {
    test('requestUpdateTable Action', () => {
       const payload = {};
       const expected = {
         type: "REQUEST_UPDATE_TABLE",
         payload
       };    
       expect(requestUpdateTable(payload)).toEqual(expected);
     })
    })