import { combineReducers } from "redux";
import Settings from "./Settings/Settings";
import WebNavigation from "./AMSuite/web_reducer";
import controlsReducer from "./Aludoc/controls_reducers";
import documentTypeReducer from "./Aludoc/documentType_reducers";
import documentReducer from "./Aludoc/document_reducers";
import EasyAccessNotificationsReducer from "./Notifications/easyAccessNotifications_reducers";
import userReducer from "./User/users_reducers";
import systemSettingsReducer from "./Settings/System";
import personReducer from "./EasyAccess/Person_reducer";
import enterpriseReducer from "./EasyAccess/Enterprise_reducer";
import panel_reducer from "./AccessControl/panel_reducer";
import reader_reducer from "./AccessControl/reader_reducer";
import cardFormat_reducer from "./AccessControl/cardFormat_reducer";
import eventMonitoring from "./AccessControl/eventMonitoring_reducer";
import registersReducer from "./EasyAccess/Register_reducer";
import statusReducer from "./EasyAccess/status_reducer";
import badgesReducer from "./EasyAccess/Badges_reducer";
import imeiReducer from "./AccessControl/imei_reducer";
import virtualZoneReducer from ".//AccessControl/virtualZone_reducers";
import systemNotifications from "./Notifications/systemNotifications_reducers";
import termsAndCondition from "./EasyAccess/TermsAndCondition_reducer";
import LicenseReducer from "./Settings/License";
import AccessControlReducer from "./Settings/AccessControl";
import TikasReducer from "./Tikas/Tikas_reducer";
import AccessControlBadge from "./AccessControl/badge_reducer";
import MessagesReducer from "./AccessControl/messages_reducer";
import DeviceMapReducer from "./DeviceMap/deviceMap_reducer";
import TripReducer from "./AccessControl/trip_reducer";
import CustomFormReducer from "./Shared/custom_form_reducer";
import { reducer as formReducer } from "redux-form";
import DataBaseReducer from "./Settings/DataBase";
import BusValidationReducer from './Reports/busValidation_reducer';
import webReportValidationReducers from './Reports/webReport_reducer';

const RootReducer = combineReducers({
  Settings: Settings,
  SystemSettings: systemSettingsReducer,
  WebNavigation: WebNavigation,
  Control: controlsReducer,
  DocumentType: documentTypeReducer,
  Document: documentReducer,
  Enterprise: enterpriseReducer,
  EasyAccessNotificationsReducer: EasyAccessNotificationsReducer,
  User: userReducer,
  Persons: personReducer,
  Panel: panel_reducer,
  Reader: reader_reducer,
  CardFormat: cardFormat_reducer,
  EventMonitoring: eventMonitoring,
  Registers: registersReducer,
  Status: statusReducer,
  Badges: badgesReducer,
  Imei: imeiReducer,
  Notifications: systemNotifications,
  VirtualZone: virtualZoneReducer,
  TermsAndCondition: termsAndCondition,
  License: LicenseReducer,
  Tikas: TikasReducer,
  form: formReducer,
  AccessControlBadge: AccessControlBadge,
  Messages: MessagesReducer,
  DeviceMap: DeviceMapReducer,
  Trips: TripReducer,
  DataBase: DataBaseReducer,
  CustomForm: CustomFormReducer,
  AccessControlSettings: AccessControlReducer,
  BusValidation: BusValidationReducer,
  webReportValidation: webReportValidationReducers
});

export default RootReducer;
