import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import ReloadIcon from "@mui/icons-material/AutorenewRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import Lottie from "react-lottie";
import * as animationData from "../../assets/noPermission.json";
// import { withRouter } from "react-router-dom";
import withRouter from "../AccessControl/Components/withRouter";
import { connect } from "react-redux";
import ApiHandler from "../../services/ApiHandler";
import { setUrlApi } from "../../Config";
import { disconnectSocket } from "../../utils/WebSockets";
import { addWeb } from "../../actions/AMSuite/web_actions";
import { withStyles } from "@mui/styles";
import CustomStyles from "../../assets/styles/Shared_Styles/NoPermissionStyles";
import { clearStorage } from "../../utils/Utils";

let isMounted = false;

class NoPermission extends Component {
  constructor(props) {
    super(props);
    let redirectUrl = "/";
    let homeUrl = "/";
    if (!isNullOrUndefined(props.location.state)) {
      redirectUrl = props.location.state.redirectUrl
        ? props.location.state.redirectUrl
        : redirectUrl;
      homeUrl = props.location.state.homeUrl
        ? props.location.state.homeUrl
        : homeUrl;
    }
    this.state = {
      redirectUrl: redirectUrl,
      homeUrl: homeUrl,
      isLoading: false,
      isMounted: true
    };
  }

  componentDidMount() {
    isMounted = true;
  }

  componentWillUnmount() {
    isMounted = false;
  }

  tryAgain = () => {
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
      const { redirectUrl } = this.state;
      this.props.history.push(redirectUrl);
      if (isMounted)
        this.setState({
          isLoading: false
        });
    }, 1500);
  };

  goHome = () => {
    this.props.isLogoutFunction();
    ApiHandler.AMSuite.Session.logout();
    clearStorage()
    // localStorage.clear();
    setUrlApi();
    disconnectSocket();
    this.props.onNavigation(-1);
    this.props.history.push("/login", { some: "state" });
  };

  render() {
    const { t, classes,navigation } = this.props;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div className={classes.mainDiv}>
        <div className={classes.customdiv}>
          <div>
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
          <div className={classes.customdiv2}>
            <Typography
              type="title"
              color="inherit"
              style={{ padding: "0.5em" }}
              variant="h6"
            >
              {t("NoPermission")}
            </Typography>
          </div>
          <div className={classes.buttonsDiv}>
            <Fab
              color="primary"
              style={{ marginRight: "5%" }}
              onClick={this.goHome}
              disabled={this.state.isLoading}
              title={t("GoHome")}
            >
              <LogoutIcon />
            </Fab>
            <div
              style={{
                position: "relative",
                width: "50%"
              }}
            >
              <Fab
                variant="extended"
                color="primary"
                style={{ width: "100%" }}
                onClick={this.state.isLoading ? undefined : this.tryAgain}
                disabled={this.state.isLoading}
              >
                <ReloadIcon style={{ marginRight: 15 }} />
                {t("TryAgain")}
              </Fab>
              {this.state.isLoading && (
                <CircularProgress
                  size={24}
                  className={classes.customCircularProgress}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  onNavigation: addWeb
};

const NoPermissionConnected = connect(null, mapDispatchToProps)(NoPermission);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(
    withRouter(NoPermissionConnected)
  )
);
