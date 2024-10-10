export const SET_REQUEST_EA_NOTIFICATIONS = "SET_REQUEST_EA_NOTIFICATIONS";
export const SET_RECEIVE_EA_NOTIFICATIONS = "SET_RECEIVE_EA_NOTIFICATIONS";
export const REQUEST_EA_NOTIFICATIONS_ERROR = "REQUEST_EA_NOTIFICATIONS_ERROR";
export const REQUEST_EA_NOTIFICATIONS = "REQUEST_EA_NOTIFICATIONS";
export const RECEIVE_EA_NOTIFICATIONS = "RECEIVE_EA_NOTIFICATIONS";

export const setRequestEasyAccessNotifications = (EasyAccessNotifications) => ({
  type: SET_REQUEST_EA_NOTIFICATIONS,
  data: EasyAccessNotifications
});

export const setReceiveEasyAccessNotifications = id => ({
  type: SET_RECEIVE_EA_NOTIFICATIONS,
  id
});

export const requestEasyAccessNotificationsError = error => ({
  type: REQUEST_EA_NOTIFICATIONS_ERROR,
  error
});

// Getters
export const getRequestEasyAccessNotifications = () => ({
  type: REQUEST_EA_NOTIFICATIONS,
});

export const getReceiveEasyAccessNotifications = data => ({
  type: RECEIVE_EA_NOTIFICATIONS,
  data
});

// FIN



