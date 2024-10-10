import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/ErrorRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import ReloadIcon from "@mui/icons-material/AutorenewRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../assets/styles/Shared_Styles/ErrorPageStyles";
import { withStyles } from '@mui/styles';

let isMounted = false;

class ErrorPage extends Component {
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
    const { homeUrl } = this.state;
    this.props.history.push(homeUrl);
  };

  render() {
    const { t, classes } = this.props;
    return (
      <div className={classes.mianDiv}>
        <div className={classes.customDiv}>
          <ErrorIcon className={classes.customErrorIcon} />
          <div className={classes.customDiv2}>
            <Typography
              type="title"
              color="inherit"
              style={{ borderRight: "1px solid gray", padding: "0.5em" }}
              variant="h4"
            >
              500
            </Typography>
            <Typography
              type="title"
              color="inherit"
              style={{ padding: "0.5em", color: "gray" }}
              variant="h6"
            >
              {t("OOPS")}
            </Typography>
          </div>
          <div className={classes.buttonsDiv}>
            <Fab
              color="primary"
              style={{ marginRight: "5%" }}
              onClick={this.goHome}
              disabled={this.state.isLoading}
              title="Ir a inicio"
            >
              <HomeIcon />
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

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(ErrorPage)
);
