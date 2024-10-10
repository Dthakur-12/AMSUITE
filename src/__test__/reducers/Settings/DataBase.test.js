import dataBase from "../../../reducers/Settings/DataBase"
import {REQUEST_UPDATE_TABLE,RECEIVE_UPDATE_TABLE,REQUEST_ERROR} from '../../../actions/Settings/dataBase_actions';
describe('dataBase', () => {
    it('REQUEST_UPDATE_TABLE', () => {
        const initialState = {}
        const expectedState = {successUpdatedTable: false, mssgError: undefined, isLoading: true }
        const payload = {}
        const action = {
          type: REQUEST_UPDATE_TABLE, 
          payload
        }
        expect(dataBase(initialState, action)).toEqual(expectedState)
      })
      it('RECEIVE_UPDATE_TABLE', () => {
        const initialState = {}
        const expectedState = {successUpdatedTable: true , isLoading: false }
        const payload = {}
        const action = {
          type: RECEIVE_UPDATE_TABLE, 
          payload
        }
        expect(dataBase(initialState, action)).toEqual(expectedState)
      })
      it('REQUEST_ERROR', () => {
        const initialState = {}
        const expectedState = {successUpdatedTable: false, mssgError:undefined, isLoading: false }
        const payload = {}
        const action = {
          type: REQUEST_ERROR, 
          payload
        }
        expect(dataBase(initialState, action)).toEqual(expectedState)
      })
    })
