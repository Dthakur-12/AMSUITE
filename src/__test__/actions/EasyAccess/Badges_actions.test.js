import { clearImageStore, requestBadgeByQR,printBadgeData, requestBadges, receiveBadges, requestBadgesStatuses,
  receiveBadgesStatuses, requestCountBadgesForAutoAssign, receiveCountBadgesForAutoAssign, requestUnassignedBadges,
  receiveUnassigned, requestBadgesError  } from '../../../actions/EasyAccess/Badges_actions'

  describe('Actions', () => {
     test('clearImageStore Action', () => {
        const payload = {};
        const expected = {
          type: "CLEAR_IMAGE_STORE",
        };    
        expect(clearImageStore(payload)).toEqual(expected);
      });

      test('requestBadgeByQR Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_BADGE_BY_QR",
          id:{}
        };    
        expect(requestBadgeByQR(payload)).toEqual(expected);
      });

      test('printBadgeData Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_PRINT_BADGE",
          badgeData:{}
        };    
        expect(printBadgeData(payload)).toEqual(expected);
      });

      test('requestBadges Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_BADGES",
          dataTable:{}
        };    
        expect(requestBadges(payload)).toEqual(expected);
      });

      test('receiveBadges Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_BADGES",
          badges:{}
        };    
        expect(receiveBadges(payload)).toEqual(expected);
      });

      test('requestBadgesStatuses Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_BADGES_STATUSES",
          dataTable:{}
        };    
        expect(requestBadgesStatuses(payload)).toEqual(expected);
      });
      
      test('receiveBadgesStatuses Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_BADGES_STATUSES",
          badges:{}
        };    
        expect(receiveBadgesStatuses(payload)).toEqual(expected);
      });

      test('requestCountBadgesForAutoAssign Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_COUNT_BADGES_FOR_AUTOASSIGN",
          personType:{}
        };    
        expect(requestCountBadgesForAutoAssign(payload)).toEqual(expected);
      });

      test('receiveCountBadgesForAutoAssign Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN",
          countbadges:{}
        };    
        expect(receiveCountBadgesForAutoAssign(payload)).toEqual(expected);
      });

      test('requestUnassignedBadges Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_UNASSIGNED_BADGES",
          dataTable:{}
        };    
        expect(requestUnassignedBadges(payload)).toEqual(expected);
      });

      test('receiveUnassigned Action', () => {
        const payload = {};
        const expected = {
          type: "RECEIVE_UNASSIGNED_BADGES",
          badges:{}
        };    
        expect(receiveUnassigned(payload)).toEqual(expected);
      });

      test('requestBadgesError Action', () => {
        const payload = {};
        const expected = {
          type: "REQUEST_BADGES_ERROR",
          error:{}
        };    
        expect(requestBadgesError(payload)).toEqual(expected);
      });
  })