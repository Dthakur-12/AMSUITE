import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  SET_REQUEST_EA_NOTIFICATIONS,
  SET_RECEIVE_EA_NOTIFICATIONS,
  REQUEST_EA_NOTIFICATIONS_ERROR,
  REQUEST_EA_NOTIFICATIONS,
  RECEIVE_EA_NOTIFICATIONS
} from "../../actions/Notifications/easyAccessNotifications_action";
import ApiHandler from "../../services/ApiHandler";

function* fetchSetEasyAccessNotifications(data) {
  try {
    const { data: id } = yield call(
      ApiHandler.Setting.NotificationSettings.setEasyAccessSettings,
      data.data
    );
    yield put({ type: SET_RECEIVE_EA_NOTIFICATIONS, id: id });
  } catch ({ error }) {
    yield put({ type: REQUEST_EA_NOTIFICATIONS_ERROR, success: false });
  }
}

function* setEasyAccessNotificationsWatcher() {
  yield takeLatest(
    SET_REQUEST_EA_NOTIFICATIONS,
    fetchSetEasyAccessNotifications
  );
}

function* fetchGetEasyAccessNotifications() {
  try {
    const { data: notifications } = yield call(
      ApiHandler.Setting.NotificationSettings.getEasyAccessSettings,
      {}
    );
    yield put({
      type: RECEIVE_EA_NOTIFICATIONS,
      easyAccessNotifications: notifications
    });
  } catch ({ error }) {
    yield put({ type: REQUEST_EA_NOTIFICATIONS_ERROR, success: false });
  }
}

function* getEasyAccessNotificationsWatcher() {
  yield takeLatest(REQUEST_EA_NOTIFICATIONS, fetchGetEasyAccessNotifications);
}

export default function* easyAccessNotificationsSaga() {
  yield all([
    setEasyAccessNotificationsWatcher(),
    getEasyAccessNotificationsWatcher()
  ]);
}
