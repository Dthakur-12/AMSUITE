import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from '@mui/styles';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Navigation from "./Navigation";
import AccountCircle from "@mui/icons-material/FaceRounded";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import Notifications from "@mui/icons-material/Notifications";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import {
  WEB_APPS,
  getWebAppName,
  getWebAppBar,
  getWebAppNavImage,
  getAllWebAppNavImages,
  getWebBottomAppBar,
} from "../utils/Enums";
import { isNullOrUndefined } from "util";
import { Entities } from "../utils/Enums";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import { setUrlApi } from "../Config";
import { isValueEmptyOrNull } from "../utils/HelperFunctions";
import { socketIO, disconnectSocket } from "../utils/WebSockets";
import { addWeb } from "../actions/AMSuite/web_actions";
import { cleanVisitRequest } from "../actions/Notifications/systemNotifications_actions";
import {
  requestCustomFields,
  updateCustomFieldStore,
} from "../actions/Settings/settings_actions";
import { getAppLogo } from "../actions/Settings/system_actions";
import styles from "../assets/styles/AMSuite_styles/webDrawerStyles";
import { clearStorage } from "../utils/Utils";

const LenguageButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
  },
})(Button);

const WebDrawer = ({
  classes,
  theme,
  currentWeb,
  t,
  currentUser,
  visitRequest,
  settings,
  AppLogo,
  onNavigation,
  cleanVisitRequest,
  getAppLogo,
  requestCustomFields,
  updateCustomFieldStore,
  isLogoutFunction,
  history,
}) => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);
  const [anchorElNotify, setAnchorElNotify] = useState(null);
  const [webApps] = useState(WEB_APPS);
  const [license, setLicense] = useState([]);
  const [language, setLanguage] = useState(
    t("spanish") === "Spanish"
      ? "English"
      : t("spanish") === "Espagnol"
      ? "Français"
      : t("spanish") === "Espanhol"
      ? "Português"
      : "Español"
  );
  const [userMenuOpen, setUserMenuOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 900);

  useEffect(() => {
    setAuth(auth && !isNullOrUndefined(localStorage.getItem("userToken")));
    requestCustomFields();
    if (auth && currentUser) {
      const logout = handleLogout;
      socketIO.on("logOut", logout);
      socketIO.on("newsCustomFields", (data) => {
        if (data.customFields) {
          updateCustomFieldStore(data.customFields);
        }
      });
    }
    getAppLogo();
    AmSuiteNavBar.update();

    window.addEventListener("resize", updateScreenMode);
    return () => {
      socketIO.off("newsCustomFields", updateCustomFieldStore);
      window.removeEventListener("resize", updateScreenMode);
    };
  }, [
    auth,
    currentUser,
    getAppLogo,
    requestCustomFields,
    updateCustomFieldStore,
  ]);

  const updateScreenMode = () => {
    setIsDesktop(window.innerWidth > 900);
  };

  const handleDrawerOpen = () => setUserMenuOpen(true);
  const handleDrawerClose = () => setUserMenuOpen(false);

  const preloadImages = () => (
    <div id="preload" style={{ display: "none" }}>
      {getAllWebAppNavImages().map((image) => (
        <img key={image.value} src={image.webNavImage.url} alt="" />
      ))}
    </div>
  );

  const handleLogout = () => {
    isLogoutFunction();
    ApiHandler.AMSuite.Session.logout();
    clearStorage();
    setUrlApi();
    disconnectSocket();
    setAuth(false);
    setUserMenuOpen(true);
    onNavigation(-1);
    history.push("/");
  };

  const handleAccount = () => {
    onNavigation(-1);
    AmSuiteNavBar.appNavigation.history.push("/setupaccount");
  };

  const visitRequestHandler = () => {
    handleCloseNotify();
    if (currentWeb !== webApps.EASYACCESS.value) {
      handleChangeWebApp(webApps.EASYACCESS);
      AmSuiteNavBar.appNavigation.history.push(
        "/easyaccess/registervisitrequest"
      );
    } else {
      webApps.EASYACCESS.navBarAccess.appNavigation.history.push(
        "/registervisitrequest"
      );
    }
  };

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMenuLanguage = (event) =>
    setAnchorElLanguage(event.currentTarget);
  const handleMenuNotify = (event) => setAnchorElNotify(event.currentTarget);
  const handleCloseNotify = () => setAnchorElNotify(null);
  const handleCloseLanguage = () => setAnchorElLanguage(null);
  const handleClose = () => setAnchorEl(null);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setLanguage(
      language === "es"
        ? t("spanish")
        : language === "en"
        ? t("english")
        : language === "fr"
        ? t("french")
        : t("portugues")
    );
    handleCloseLanguage();
  };

  const handleChangeWebApp = (webApp) => {
    if (currentWeb === webApp.value && webApp.navBarAccess.appNavigation) {
      if (
        webApp.navBarAccess.appNavigation.history.location.pathname !== "/home"
      ) {
        webApp.navBarAccess.appNavigation.history.push("/home");
      }
    } else {
      AmSuiteNavBar.appNavigation.history.push(webApp.url);
      onNavigation(webApp.value);
    }
  };

  const handleReports = (web) => {
    return currentUser != null
      ? Object.keys(currentUser.permits).filter(
          (e) => Number(web.value) === Number(webApps.REPORTS.value)
        ).length > 0
      : false;
  };

  const handleUsers = (web) => {
    return currentUser != null
      ? Object.keys(currentUser.permits).filter(
          (e) =>
            Number(e) === Entities.USERS && web.value === webApps.USERS.value
        ).length > 0
      : false;
  };

  const handleSettings = (web) => {
    return currentUser != null
      ? Object.keys(currentUser.permits).filter(
          (e) =>
            Number(e) === Entities.SETTINGS &&
            web.value === webApps.SETTINGS.value
        ).length > 0
      : false;
  };

  const handleDeviceMap = (web) => {
    return currentUser != null
      ? Object.keys(currentUser.permits).filter(
          (e) => Number(e) === Entities.PANELS
        ).length > 0 && license.some((l) => l === "ALUTEL MOBILE")
      : false;
  };

  const handleWebs = () => {
    if (currentUser && Object.keys(currentUser.permits).length < 1) {
      history.push("/unauthorized");
    }
    return Object.keys(webApps).filter((web) => {
      const authProduct = license.some((l) =>
        l === "SYSTEM"
          ? "SETTINGS" === web
          : l === "EASY ACCESS"
          ? "EASYACCESS" === web
          : l === "ALUTEL MOBILE"
          ? "ACCESS_CONTROL" === web
          : l === web
      );
      const authReports = handleReports(webApps[web]);
      const authUsers = handleUsers(webApps[web]);
      const authSettings = handleSettings(webApps[web]);
      return (
        currentUser != null &&
        (authUsers || authProduct || authReports || authSettings)
      );
    });
  };

  const getLicense = () => {
    ApiHandler.Setting.Setting.getLicense()
      .then(({ data }) => {
        if (data) {
          localStorage.setItem("operatingMode", data.operatingMode);
          setLicense(data.license || []);
        }
      })
      .catch(console.error);
  };

  return (
    (<div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: userMenuOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classNames(classes.menuButton, {
              [classes.hide]: userMenuOpen,
            })}
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {t("appTitle")}
          </Typography>
          <div className={classes.grow} />
          <IconButton color="inherit" onClick={handleMenuNotify} size="large">
            <Badge
              badgeContent={
                visitRequest && visitRequest.length > 0
                  ? visitRequest.length
                  : 0
              }
              color="secondary"
            >
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            size="large">
            <Avatar
              alt={currentUser ? currentUser.username : ""}
              src={AppLogo ? AppLogo.logo : ""}
            />
            <KeyboardArrowDown />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAccount}>{t("accountSettings")}</MenuItem>
            <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
          </Menu>
          <Menu
            id="language-menu"
            anchorEl={anchorElLanguage}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElLanguage)}
            onClose={handleCloseLanguage}
          >
            <MenuItem onClick={() => changeLanguage("es")}>
              {t("spanish")}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("en")}>
              {t("english")}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("fr")}>
              {t("french")}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage("pr")}>
              {t("portugues")}
            </MenuItem>
          </Menu>
          {preloadImages()}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={userMenuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} size="large">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {handleWebs().map((web, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleChangeWebApp(webApps[web])}
            >
              <ListItemIcon>
                {getWebAppNavImage(webApps[web].value)}
              </ListItemIcon>
              <ListItemText primary={t(webApps[web].label)} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {Object.keys(webApps)
            .filter((web) => handleDeviceMap(webApps[web]))
            .map((web, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleChangeWebApp(webApps[web])}
              >
                <ListItemIcon>
                  {getWebAppNavImage(webApps[web].value)}
                </ListItemIcon>
                <ListItemText primary={t(webApps[web].label)} />
              </ListItem>
            ))}
        </List>
      </Drawer>
    </div>)
  );
};

WebDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  currentWeb: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  visitRequest: PropTypes.array,
  settings: PropTypes.object,
  AppLogo: PropTypes.object,
  onNavigation: PropTypes.func.isRequired,
  cleanVisitRequest: PropTypes.func.isRequired,
  getAppLogo: PropTypes.func.isRequired,
  requestCustomFields: PropTypes.func.isRequired,
  updateCustomFieldStore: PropTypes.func.isRequired,
  isLogoutFunction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(
    connect(null, {
      addWeb,
      cleanVisitRequest,
      requestCustomFields,
      updateCustomFieldStore,
      getAppLogo,
    })(WebDrawer)
  )
);
