import {createVirtualZone,deleteVirtualZone,editVirtualZone,requestVirtualZone} from "../../../actions/AccessControl/virtualZone_actions";;

describe('Actions', () => {
    test('createVirtualZone Action', () => {
        const payload = {};
        const expected = {
          type: "CREATE_REQUEST_VIRTUAL_ZONE",
          virtualZone:{},
        };    
        expect(createVirtualZone(payload)).toEqual(expected);
      });
      test('deleteVirtualZone Action', () => {
        const payload = {};
        const expected = {
          type: "DELETE_REQUEST_VIRTUAL_ZONE",
          virtualZone:{},
        };    
        expect(deleteVirtualZone(payload)).toEqual(expected);
      });
      test('editVirtualZone Action', () => {
        const payload = {};
        const expected = {
          type: "EDIT_REQUEST_VIRTUAL_ZONE",
          virtualZone:{},
        };    
        expect(editVirtualZone(payload)).toEqual(expected);
      });
      test('requestVirtualZone Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_VIRTUAL_ZONE",
          dataTable:{},
        };    
        expect(requestVirtualZone(payload)).toEqual(expected);
      });
    })