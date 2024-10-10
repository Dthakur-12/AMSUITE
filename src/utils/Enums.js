import React from "react";
import BottomBarEasyAccess from "../webApps/EasyAccess/Components/NavigationBars/BottomAppBarEasyAccess";
import BottomBarAludoc from "../webApps/Aludoc/Components/NavigationBars/BottomAppBarAludoc";
import BottomBarMustering from "../webApps/Mustering/Components/NavigationBars/BottomAppBarMustering";
import BottomBarAccessControl from "../webApps/AccessControl/Components/NavigationBars/BottomAppBarAccessControl";
import AppBarEasyAccess from "../webApps/EasyAccess/Components/NavigationBars/AppBarEasyAccess";
import NavBarEasyAccess from "../webApps/EasyAccess/utils/NavBarEasyAccess";
import AppBarAludoc from "../webApps/Aludoc/Components/NavigationBars/AppBarAludoc";
import NavBarAludoc from "../webApps/Aludoc/utils/NavBarAludoc";
import AppBarMustering from "../webApps/Mustering/Components/NavigationBars/AppBarMustering";
import NavBarMustering from "../webApps/Mustering/utils/NavBarMustering";

import AppBarAccessControl from "../webApps/AccessControl/Components/NavigationBars/AppBarAccessControl";
import NavBarAccessControl from "../webApps/AccessControl/utils/NavBarAccessControl";

import AppBarUsers from "../webApps/Users/Components/NavigationBars/AppBarUsers";
import NavBarUsers from "../webApps/Users/utils/NavBarUsers";

import AppBarReports from "../webApps/Reports/Components/NavigationBars/AppBarReports";
import NavBarReports from "../webApps/Reports/utils/NavBarReports";

import AppBarSettings from "../webApps/Settings/Components/NavigationBars/AppBarSettings";
import NavBarSettings from "../webApps/Settings/utils/NavBarSettings";

import AppBarTikas from "../webApps/Tikas/Components/NavigationBars/AppBarTikas";
import NavBarTikas from "../webApps/Tikas/utils/NavBarTikas";

import SettingsImg from "../assets/Settings.jpg";
import ReportsImg from "../assets/reports.jpg";
import EasyAccessNavBarImg from "../assets/easyaccess.jpg";
import AludocNavBarImg from "../assets/aludoc.jpg";
import MusteringNavBarImg from "../assets/mustering.jpg";
import UsersNavBarImg from "../assets/users.jpg";
import AccessControlNavBarImg from "../assets/accessControl.jpg";

import AccessControlIcon from "../assets/webAppIcons/accessControl.png";
import AludocIcon from "../assets/webAppIcons/aludoc.png";
import EasyAccessIcon from "../assets/webAppIcons/easyaccess.png";
import MusteringIcon from "../assets/webAppIcons/mustering.png";
import ReportsIcon from "../assets/webAppIcons/reports.png";
import SettingsIcon from "../assets/webAppIcons/settings.png";
import UsersIcon from "../assets/webAppIcons/users.png";
import MapsIcon from "../assets/webAppIcons/maps.png";
export const Activity = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
  VISUALIZE: 4,
};

export const ActivitiesWithLogin = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
  LOG_IN: 5,
  LOG_OUT: 6,
};

export const Entities = {
  USERS: 1,
  // APP_USERS: 2,
  EMPLOYEES: 3,
  VISITORS: 4,
  VEHICLES: 5,
  COMPANIES: 6,
  BADGES: 7,
  PANELS: 8,
  READERS: 9,
  VIRTUAL_ZONES: 10,
  TIME_ZONES: 11,
  CARD_FORMATS: 12,
  ACCESS_LEVELS: 13,
  DOCUMENTS: 14,
  EVENTS: 15,
  PERSON_STATUS: 16,
  BADGE_STATUS: 17,
  BADGE_TYPES: 18,
  MUSTER_READERS: 19,
  MUSTER_ZONES: 20,
  PRODUCTS: 21,
  ORDERS: 22,
  PRINTERS: 23,
  ACCESS: 24,
  SETTINGS: 25,
  EVENTS_MONITOR: 26,
  DOCUMENT_TYPES: 27,
  CONTRACT_TASKS: 28,
  CONTROLS: 29,
  REQUIREMENTS: 30,
  REPORTS_EASYACCESS: 31,
  REPORTS_ALUDOC: 32,
  REPORTS_TIKAS: 33,
  REPORTS_MUSTERING: 34,
  REPORTS_ALUTEL_MOBILE: 35,
  LICENSES: 36,
  CONCURRENT_USERS: 37,
  APPROVE_VISIT: 38
};

export const WEB_APPS = {
  // HOME: {
  //   value: -1,
  //   name: "",
  //   description: "",
  //   url: "/home",
  //   // appBarOptions: <AppBarEasyAccess />,
  //   // bottomAppBarOptions: <BottomBarEasyAccess />,
  //   navBarAccess: NavBarUsers,
  //   homeImage: {
  //     // url: EasyAccessIcon, width: "15%"
  //   },
  //   webNavImage: {
  //     url: SettingsImg,
  //     backgroundPosition: "center",
  //     backgroundSize: "cover"
  //   }
  // },
  EASYACCESS: {
    value: 1,
    name: "EasyAccess",
    description: "MenuDescEasyAccess",
    url: "/easyaccess",
    appBarOptions: <AppBarEasyAccess />,
    bottomAppBarOptions: <BottomBarEasyAccess />,
    navBarAccess: NavBarEasyAccess,
    homeImage: { url: EasyAccessIcon, width: "15%" },
    webNavImage: {
      url: EasyAccessNavBarImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  ALUDOC: {
    value: 2,
    name: "Aludoc",
    description: "MenuDescAludoc",
    url: "/aludoc",
    appBarOptions: <AppBarAludoc />,
    bottomAppBarOptions: <BottomBarAludoc />,
    navBarAccess: NavBarAludoc,
    homeImage: { url: AludocIcon, width: "15%" },
    webNavImage: {
      url: AludocNavBarImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  TIKAS: {
    value: 3,
    name: "Tikas",
    description: "MenuDescTikas",
    url: "/tikas",
    appBarOptions: <AppBarTikas />,
    navBarAccess: NavBarTikas,
    homeImage: { url: ReportsIcon, width: "15%" },
    webNavImage: {
      url: ReportsImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  MUSTERING: {
    value: 4,
    name: "Mustering",
    description: "MenuDescMustering",
    url: "/mustering",
    appBarOptions: <AppBarMustering />,
    bottomAppBarOptions: <BottomBarMustering />,
    navBarAccess: NavBarMustering,
    homeImage: { url: MusteringIcon, width: "15%" },
    webNavImage: {
      url: MusteringNavBarImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  ACCESS_CONTROL: {
    value: 5,
    name: "Access Control",
    description: "MenuDescAccessControl",
    url: "/accesscontrol",
    appBarOptions: <AppBarAccessControl />,
    bottomAppBarOptions: <BottomBarAccessControl />,
    navBarAccess: NavBarAccessControl,
    homeImage: { url: AccessControlIcon, width: "15%" },
    webNavImage: {
      url: AccessControlNavBarImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  // APPROVALS: {
  //   value: 6,
  //   name: "Aprobaciones",
  //   description: "Aprobaciones",
  //   url: "/approvals",
  //   appBarOptions: <AppBarAccessControl />,
  //   bottomAppBarOptions: <BottomBarAccessControl />,
  //   navBarAccess: NavBarAccessControl,
  //   homeImage: { url: AccessControlIcon, width: "15%" },
  //   webNavImage: {
  //     url: AccessControlNavBarImg,
  //     backgroundPosition: "center",
  //     backgroundSize: "cover",
  //   },
  // },
  USERS: {
    value: 7,
    name: "Users",
    description: "MenuDescUsers",
    url: "/users",
    appBarOptions: <AppBarUsers />,
    navBarAccess: NavBarUsers,
    homeImage: { url: UsersIcon, width: "15%" },
    webNavImage: {
      url: UsersNavBarImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  REPORTS: {
    value: 8,
    name: "Reports",
    description: "MenuDescReports",
    url: "/reports",
    appBarOptions: <AppBarReports />,
    navBarAccess: NavBarReports,
    homeImage: { url: ReportsIcon, width: "15%" },
    webNavImage: {
      url: ReportsImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  DEVICE_MAP: {
    value: 9,
    name: "Maps",
    description: "MenuDescMaps",
    url: "/devicesMap",
    appBarOptions: <AppBarSettings />,
    navBarAccess: NavBarSettings,
    homeImage: { url: MapsIcon, width: "15%" },
    webNavImage: {
      url: ReportsImg,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  },
  SETTINGS: {
    value: 10,
    name: "Settings",
    description: "MenuDescSettings",
    url: "/settings",
    appBarOptions: <AppBarSettings />,
    navBarAccess: NavBarSettings,
    homeImage: { url: SettingsIcon, width: "15%" },
    webNavImage: { url: SettingsImg },
  },
};

export const FieldTypes = {
  INT: 0,
  FLOAT: 1,
  NVARCHAR: 2,
  DATETIME: 3,
  BIT: 4,
  LIST: 5,
  NVARCHARBLOCK: 6,
};

export const getAllWebAppNavImages = () => {
  let webImages = [];
  Object.keys(WEB_APPS).forEach(function (key) {
    webImages.push(WEB_APPS[key]);
  });
  return webImages;
};

export const getWebAppNavImage = (web) => {
  let webImage = {
    url: EasyAccessNavBarImg,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  Object.keys(WEB_APPS).forEach(function (key) {
    if (WEB_APPS[key].value === web) {
      webImage = WEB_APPS[key].webNavImage;
      return;
    }
  });
  return webImage;
};

export const getWebAppValueFromUrl = (webUrl) => {
  let webValue = -1;
  Object.keys(WEB_APPS).forEach((key) => {
    if (webUrl.includes(WEB_APPS[key].url)) {
      webValue = WEB_APPS[key].value;
      return;
    }
  });
  return webValue;
};

export const getWebAppName = (t, web) => {
  let webString;
  Object.keys(WEB_APPS).forEach(function (key) {
    if (WEB_APPS[key].value === web) {
      webString = t(WEB_APPS[key].name);
      //    return;
    }
  });
  return webString;
};

export const getWebAppUrl = (web) => {
  let webUrl;
  Object.keys(WEB_APPS).forEach(function (key) {
    if (WEB_APPS[key].value === web) {
      webUrl = WEB_APPS[key].url;
      return;
    }
  });
  return webUrl;
};

export const getWebAppDescription = (web) => {
  let webString;
  Object.keys(WEB_APPS).forEach(function (key) {
    if (WEB_APPS[key].value === web) {
      webString = WEB_APPS[key].description;
      return;
    }
  });
  return webString;
};

export const getWebAppBar = (web) => {
  let appBar;
  Object.keys(WEB_APPS).forEach(function (key) {
    if (WEB_APPS[key].value === web) {
      appBar = WEB_APPS[key].appBarOptions;
      return;
    }
  });
  return appBar;
};

export const getWebBottomAppBar = (web) => {
  let appBar;
  Object.keys(WEB_APPS).forEach(function (key) {
    if (WEB_APPS[key].value === web) {
      appBar = WEB_APPS[key].bottomAppBarOptions;
      return;
    }
  });
  return appBar;
};

export const getEntityName = (value) => {
  return Object.keys(Entities).find((key) => Entities[key] === value);
};

export const getActivityName = (value) => {
  return Object.keys(ActivitiesWithLogin).find(
    (key) => ActivitiesWithLogin[key] === value
  );
};

const TypeEnum = {
  1: 'EMPLOYEE',
  2: 'VISITOR',
}

const AMStuiteEnums = {
  WEB_APPS,
  getWebAppName,
  getWebAppDescription,
  getWebAppBar,
  getWebAppValueFromUrl,
  getWebAppNavImage,
  getAllWebAppNavImages,
  getWebAppUrl,
  getWebBottomAppBar,
  getEntityName,
  getActivityName,
  TypeEnum
};

export default AMStuiteEnums;
