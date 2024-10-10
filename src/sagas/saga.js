import { all, fork } from "redux-saga/effects";
import controlsSaga from "./Aludoc/control_saga";
import documentTypesSaga from "./Aludoc/documentType_saga";
import documentSaga from "./Aludoc/document_saga";
import easyAccessNotificationsSaga from "./Notifications/easyAccessNotifications_saga";
import userSaga from "./User/user_saga";
import systemSaga from "./Settings/system_saga";
import personSaga from "./EasyAccess/Person_saga";
import panelSaga from "./AccessControl/panel_saga";
import readerSaga from "./AccessControl/reader_saga";
import cardFormatSaga from "./AccessControl/cardFormat_saga";
import enterpriseSaga from "./EasyAccess/Enterprise_saga";
import eventMonitoringSaga from "./AccessControl/eventMonitoring_saga";
import registerSaga from "./EasyAccess/Register_saga";
import statusSaga from "./EasyAccess/status_saga";
import badgesSaga from "./EasyAccess/Badges_saga";
import imeiSaga from "./AccessControl/imei_saga";
import virtualZoneSaga from "./AccessControl/virtualZone_saga";
import termsAndConditionsSaga from "./EasyAccess/TermsAndConditions_saga";
import LiceenseSaga from "./Settings/license_saga";
import settingsSaga from "./Settings/settings_saga";
import tikasSaga from "./Tikas/Tikas_saga";
import accessControlBadgesSaga from "./AccessControl/Badge_saga";
import messageSaga from "./AccessControl/messages_saga";
import samlSaga from "./Settings/saml_saga";
import deviceMapSaga from "./DeviceMap/deviceMap_saga";
import tripSaga from "./AccessControl/trip_saga";
import dataBaseSaga from "./Settings/dataBase_saga";
import accessControl from "./Settings/accessControl_saga";
import busValidation from "./Reports/busValidation_saga";
import webReporSaga from "./Reports/webReoprt_saga";
export default function* rootSaga() {
  yield all([
    fork(controlsSaga),
    fork(documentTypesSaga),
    fork(documentSaga),
    fork(easyAccessNotificationsSaga),
    fork(userSaga),
    fork(systemSaga),
    fork(personSaga),
    fork(panelSaga),
    fork(readerSaga),
    fork(cardFormatSaga),
    fork(enterpriseSaga),
    fork(eventMonitoringSaga),
    fork(registerSaga),
    fork(statusSaga),
    fork(badgesSaga),
    fork(imeiSaga),
    fork(virtualZoneSaga),
    fork(termsAndConditionsSaga),
    fork(LiceenseSaga),
    fork(settingsSaga),
    fork(tikasSaga),
    fork(accessControlBadgesSaga),
    fork(messageSaga),
    fork(samlSaga),
    fork(deviceMapSaga),
    fork(tripSaga),
    fork(dataBaseSaga),
    fork(accessControl),
    fork(busValidation),
    fork(webReporSaga)
  ]);
}
