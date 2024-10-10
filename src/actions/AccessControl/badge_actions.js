export const REQUEST_GET_BADGE_TYPES = 'REQUEST_GET_BADGE_TYPES';
export const REQUEST_GET_BADGE_BY_ID = 'REQUEST_GET_BADGE_BY_ID';
export const REQUEST_GET_BADGE_STATUS = 'REQUEST_GET_BADGE_STATUS';
export const REQUEST_GET_ALL_BADGE_STATUS = 'REQUEST_GET_ALL_BADGE_STATUS';
export const REQUEST_CREATE_BADGE = 'REQUEST_CREATE_BADGE';
export const REQUEST_CREATE_BADGE_TYPE = 'REQUEST_CREATE_BADGE_TYPE';
export const REQUEST_EDIT_BADGE = 'REQUEST_EDIT_BADGE';
export const REQUEST_DELETE_BADGES = 'REQUEST_DELETE_BADGES';

export const RECEIVE_GET_BADGE_TYPES = 'RECEIVE_GET_BADGE_TYPES';
export const RECEIVE_GET_BADGE_BY_ID = 'RECEIVE_GET_BADGE_BY_ID';
export const RECEIVE_GET_BADGE_STATUS = 'RECEIVE_GET_BADGE_STATUS';
export const RECEIVE_GET_ALL_BADGE_STATUS = 'RECEIVE_GET_ALL_BADGE_STATUS';
export const RECEIVE_CREATE_BADGE = 'RECEIVE_CREATE_BADGE';
export const RECEIVE_CREATE_BADGE_TYPE = 'RECEIVE_CREATE_BADGE_TYPE';
export const RECEIVE_EDIT_BADGE = 'RECEIVE_EDIT_BADGE';
export const RECEIVE_DELETE_BADGES = 'RECEIVE_DELETE_BADGES';

export const REQUEST_BADGE_ERROR = 'REQUEST_BADGE_ERROR';

export const getBadgeTypes = (dataTable) => ({
    type: REQUEST_GET_BADGE_TYPES,
    dataTable
});

export const getBadgeById = (badgeId) => ({
    type: REQUEST_GET_BADGE_BY_ID,
    badgeId
});

export const getBadgeStatus = (dataTable) => ({
    type: REQUEST_GET_BADGE_STATUS,
    dataTable
});

export const getAllBadgeStatus = () => ({
    type: REQUEST_GET_ALL_BADGE_STATUS,   
});

export const createBadge = (badge) => ({
    type: REQUEST_CREATE_BADGE,
    badge
});

export const createBadgeType = (badgeType) => ({
    type: REQUEST_CREATE_BADGE_TYPE,
    badgeType
});

export const editBadge = (badge) => ({
    type: REQUEST_EDIT_BADGE,
    badge
});

export const deleteBadge = (badges) => ({
    type: REQUEST_DELETE_BADGES,
    badges
});









