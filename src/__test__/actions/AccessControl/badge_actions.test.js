import {getBadgeTypes,getBadgeById,getBadgeStatus,getAllBadgeStatus,createBadge,createBadgeType,editBadge,deleteBadge} from "../../../actions/AccessControl/badge_actions";

describe('Actions', () => {
    test('getBadgeTypes Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_BADGE_TYPES",
          dataTable:{},
        };    
        expect(getBadgeTypes(payload)).toEqual(expected);
      });
      test('getBadgeById Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_BADGE_BY_ID",
          badgeId:{},
        };    
        expect(getBadgeById(payload)).toEqual(expected);
      });
      test('getBadgeStatus Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_BADGE_STATUS",
          dataTable:{},
        };    
        expect(getBadgeStatus(payload)).toEqual(expected);
      });
      test('getAllBadgeStatus Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_GET_ALL_BADGE_STATUS",
        };    
        expect(getAllBadgeStatus(payload)).toEqual(expected);
      });
      test('createBadge Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_BADGE",
          badge:{}
        };    
        expect(createBadge(payload)).toEqual(expected);
      });
      test('createBadgeType Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_CREATE_BADGE_TYPE",
          badgeType:{}
        };    
        expect(createBadgeType(payload)).toEqual(expected);
      });
      test('editBadge Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_EDIT_BADGE",
          badge:{}
        };    
        expect(editBadge(payload)).toEqual(expected);
      });
      test('deleteBadge Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_DELETE_BADGES",
          badges:{}
        };    
        expect(deleteBadge(payload)).toEqual(expected);
      });
})