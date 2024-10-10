import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from '@mui/styles';
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { WEB_APPS } from "../utils/Enums";
import AmSuiteNavBar from "../utils/AmSuiteNavBar";
import CircularProgress from "@mui/material/CircularProgress";
import { Entities } from "../utils/Enums";
import ApiHandler from "../services/ApiHandler";
import { socketIO } from "../utils/WebSockets";
import { addWeb } from "../actions/AMSuite/web_actions";
import { currentUser, tryLogin } from "../actions/Users/user_actions";
import { addSettings } from "../actions/Settings/system_actions";
import SnackbarHandler from "../utils/SnackbarHandler";

import { withTranslation } from "react-i18next";
import {
  requestDaysUntilExpired,
  requestCustomFields,
} from "../actions/Settings/settings_actions";
import {
  cleanVisitRequest,
  receiveVisitRequest,
} from "../actions/Notifications/systemNotifications_actions";
import styles from "../assets/styles/AMSuite_styles/homeStyles";
const mapDispatchToProps = {
  addWeb: addWeb,
  onLogin: currentUser,
  addSettings: addSettings,
  tryLogin: tryLogin,
  cleanVisitRequest: cleanVisitRequest,
  receiveVisitRequest: receiveVisitRequest,
  requestDaysUntilExpired: requestDaysUntilExpired,
  requestCustomFields,
};

const mapStateToProps = ({ WebNavigation, User, Settings }) => {
  return {
    successDaysToExpired: Settings.successDaysToExpired,
    daysToExpired: Settings.daysToExpired,
    currentWeb: WebNavigation.currentWeb,
    currentUser: User.currentUser,
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    let webImagesLoad = new Array(Object.keys(WEB_APPS).length);
    const { currentUser } = props;
    this.state = {
      currentUser: currentUser,
      webApps: WEB_APPS,
      license: [],
      webImagesLoad: webImagesLoad.fill(false, 0, webImagesLoad.length),
    };
    this.getLicense();
    this.loadSettings();
  }
  handleNavigation = () => {
    this.props.history.push("/noPermission");
  };

  componentWillMount() {
    this.props.tryLogin();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }
  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 1450 });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.successDaysToExpired &&
      prevState.successDaysToExpired !== this.state.successDaysToExpired
    ) {
      if (this.state.daysToExpired <= 15) {
        this.showMessage("warning");
      }
    }
  }

  componentDidMount() {
    const { currentUser } = this.state;
    const { cleanVisitRequest, receiveVisitRequest, history } = this.props;

    this.updateScreenMode();
    // connectSocket();
    this.props.addWeb(-1);
    if (localStorage.getItem("user") != null && currentUser == null) {
      const user = localStorage.getItem("user");
      const current = JSON.parse(user);
      //let loginValid = false;
      const handleNavigation = this.handleNavigation;
      const cleanVisit = cleanVisitRequest;
      const receiveVisit = receiveVisitRequest;
      socketIO.emit("logIn", current.id, current.token);
      socketIO.on("logInValid", function (data) {
        // loginValid = data.message;
        if (data.message) {
          socketIO.emit("subscriptionNotifications", current.token);
        }
        if (!data.message) handleNavigation();
      });
      socketIO.on("AnyVisitsToApprove", function (data) {
        if (!data.message) {
          cleanVisit();
        } else {
          receiveVisit();
        }
        // if (!data.message) handleNavigation();
      });
      this.props.onLogin(current);
      this.setState((prevState) => ({
        ...prevState,
        currentUser: current,
      }));
    } else {
      const onlyApproveVisit =
        Object.keys(currentUser.permits).length === 1 &&
        Object.keys(currentUser.permits)[0] == 38;

      if (onlyApproveVisit) history.push("/easyaccess/registervisitrequest");
    }
  }

  showMessage = (type) => {
    type === "warning"
      ? SnackbarHandler.showMessage(
          `${this.props.t("SoonExpirationMessage")} ${
            this.state.daysToExpired
          } ${this.props.t("days")}`,
          "warning",
          {
            vertical: "top",
            horizontal: "center",
          },
          true
        )
      : SnackbarHandler.showMessage(
          this.props.t("LicenseExpiredMessage"),
          "error",
          {
            vertical: "top",
            horizontal: "center",
          },
          true
        );
  };

  loadSettings = () => {
    ApiHandler.Setting.Setting.getSettings()
      .then(({ data }) => {
        this.props.addSettings(data);
      })
      .catch((err) => {
        console.log("Error settings", err);
      });
  };

  handleChangeWebApp = (webApp) => {
    AmSuiteNavBar.appBar.handleChangeWebApp(webApp);
  };

  appHomeImageLoaded = (appIndex) => {
    let webImagesLoad = this.state.webImagesLoad.slice();
    webImagesLoad[appIndex] = true;
    this.setState({
      webImagesLoad: webImagesLoad,
    });
  };
  handleReports = (web) => {
    const { webApps, currentUser } = this.state;
    return currentUser.id != null
      ? Object.keys(currentUser.permits).filter(
          (e) =>
            Number(e) === Entities.REPORTS_ALUDOC ||
            Number(e) === Entities.REPORTS_ALUTEL_MOBILE ||
            Number(e) === Entities.REPORTS_EASYACCESS ||
            Number(e) === Entities.REPORTS_TIKAS
          // Number(web.value) === Number(webApps.REPORTS.value)
        ).length > 0
      : false;
  };

  handleUsers = (web) => {
    const { webApps, currentUser } = this.state;
    return currentUser.id != null
      ? Object.keys(currentUser.permits).filter(
          (e) =>
            Number(e) === Entities.USERS && web.value === webApps.USERS.value
        ).length > 0
      : false;
  };

  handleSettings = (web) => {
    const { webApps, currentUser } = this.state;
    return currentUser.id != null
      ? Object.keys(currentUser.permits).filter(
          (e) =>
            Number(e) === Entities.SETTINGS &&
            web.value === webApps.SETTINGS.value
        ).length > 0
      : false;
  };

  handleWebs = () => {
    const { webApps, license } = this.state;
    const { currentUser, history } = this.props;
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
      const authReports = this.handleReports(webApps[web]);

      const authUsers = this.handleUsers(webApps[web]);
      const authSettings = this.handleSettings(webApps[web]);
      return currentUser != null &&
        (authUsers || authProduct || authReports || authSettings)
        ? currentUser.products.includes(webApps[web].value) ||
            (webApps[web].value === 8 && authReports) ||
            (webApps[web].value === 7 && authUsers) ||
            (webApps[web].value === 10 && authSettings)
        : false;
    });
  };

  getLicense = () => {
    ApiHandler.Setting.Setting.getLicense()
      .then(({ data }) => {
        if (data) {
          this.setState(
            {
              expired: new Date(data.expirationDate) < new Date(),
              license: data.productNames,
            },
            () => {
              if (this.state.isDesktop) {
                this.state.expired
                  ? this.showMessage("error")
                  : this.props.requestDaysUntilExpired();
              }
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { classes, theme } = this.props;
    const { webApps, currentUser } = this.state;
    if (!currentUser) return <div />;
    return (
      <div className={classes.root}>
        {this.handleWebs().map((web) => {
          return (
            <ButtonBase
              focusRipple
              key={webApps[web].name}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: webApps[web].homeImage.width,
              }}
              onClick={() => this.handleChangeWebApp(webApps[web])}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <img
                  src={webApps[web].homeImage.url}
                  className={classes.imageSrc}
                  alt=""
                  onLoad={(e) => this.appHomeImageLoaded(webApps[web].value)}
                />
                {!this.state.webImagesLoad[webApps[web].value] && (
                  <CircularProgress
                    size={50}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -25,
                      marginLeft: -25,
                      color: theme.palette.text.main,
                    }}
                  />
                )}
              </div>
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  style={{ fontSize: 24 }}
                  className={classes.imageTitle}
                >
                  {webApps[web].name}
                </Typography>
              </span>
            </ButtonBase>
          );
        })}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const HomeConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Home));

export default withTranslation()(HomeConnected);
