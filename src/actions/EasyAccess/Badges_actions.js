export const REQUEST_COUNT_BADGES_FOR_AUTOASSIGN =
  "REQUEST_COUNT_BADGES_FOR_AUTOASSIGN";
export const RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN =
  "RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN";
export const REQUEST_BADGES = "REQUEST_BADGES";
export const RECEIVE_BADGES = "RECEIVE_BADGES";
export const REQUEST_UNASSIGNED_BADGES = "REQUEST_UNASSIGNED_BADGES";
export const RECEIVE_UNASSIGNED_BADGES = "RECEIVE_UNASSIGNED_BADGES";
export const REQUEST_BADGES_ERROR = "REQUEST_BADGES_ERROR";
export const REQUEST_BADGES_STATUSES = "REQUEST_BADGES_STATUSES";
export const RECEIVE_BADGES_STATUSES = "RECEIVE_BADGES_STATUSES";
export const REQUEST_PRINT_BADGE = 'REQUEST_PRINT_BADGE';
export const RECEIVE_PRINT_BADGE = 'RECEIVE_PRINT_BADGE';
export const REQUEST_BADGE_ERROR = 'REQUEST_BADGE_ERROR';
export const REQUEST_BADGE_BY_QR = 'REQUEST_BADGE_BY_QR';
export const RECEIVE_BADGE_BY_QR = 'RECEIVE_BADGE_BY_QR';
export const CLEAR_IMAGE_STORE = 'CLEAR_IMAGE_STORE';


export const clearImageStore = () => ({
  type: CLEAR_IMAGE_STORE
})

export const requestBadgeByQR = id => ({
  type: REQUEST_BADGE_BY_QR,
  id
})

export const printBadgeData = badgeData => ({
  type: REQUEST_PRINT_BADGE,
  badgeData
})

export const requestBadges = dataTable => ({
  type: REQUEST_BADGES,
  dataTable
});

export const receiveBadges = badges => ({
  type: RECEIVE_BADGES,
  badges
});

export const requestBadgesStatuses = dataTable => ({
  type: REQUEST_BADGES_STATUSES,
  dataTable
});

export const receiveBadgesStatuses = badges => ({
  type: RECEIVE_BADGES_STATUSES,
  badges
});

export const requestCountBadgesForAutoAssign = personType => ({
  type: REQUEST_COUNT_BADGES_FOR_AUTOASSIGN,
  personType
});

export const receiveCountBadgesForAutoAssign = countbadges => ({
  type: RECEIVE_COUNT_BADGES_FOR_AUTOASSIGN,
  countbadges
});

export const requestUnassignedBadges = dataTable => ({
  type: REQUEST_UNASSIGNED_BADGES,
  dataTable
});

export const receiveUnassigned = badges => ({
  type: RECEIVE_UNASSIGNED_BADGES,
  badges
});

export const requestBadgesError = error => ({
  type: REQUEST_BADGES_ERROR,
  error
});
