import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import Init from "./Init";
import Login from "./Login";
import EasyAccessIndex from "../webApps/EasyAccess/Index";
import AludocIndex from "../webApps/Aludoc/Index";
import MusteringIndex from "../webApps/Mustering/Index";
import AccessControlIndex from "../webApps/AccessControl/Index";
import IndexUsers from "../webApps/Users/Index";
import IndexReports from "../webApps/Reports/Index";
import IndexSettings from "../webApps/Settings/Index";
import IndexTikas from "../webApps/Tikas/Index";
import IndexDeviceMap from "../webApps/DeviceMap/Index";
import AmSuiteNavBar from "../utils/AmSuiteNavBar";
import SnackbarHandler from "../utils/SnackbarHandler";
import Snackbar from "@mui/material/Snackbar";
import CustomSnackBar from "../webApps/Shared/CustomSnackbar";
import { isNullOrUndefined } from "util";
import ErrorPage from "../webApps/Shared/ErrorPage";
import SetUpAccount from "./SetUpAccount";
import { addWeb } from "../actions/AMSuite/web_actions";
import LoginSAML from "./LoginSAML";

const mapDispatchToProps = {
  onNavigation: addWeb,
};

const mapStateToProps = ({ WebNavigation }) => {
  return {
    currentWeb: WebNavigation.currentWeb,
  };
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    const { currentWeb } = props;
    this.state = {
      currentWeb: currentWeb,
      openSnackbar: false,
      positionSnackbar: {
        vertical: "bottom",
        horizontal: "left",
      },
      snackbarType: SnackbarHandler.types.success,
      snackbarMessage: "",
    };
  }

  componentDidMount() {
    const { currentWeb } = this.state;
    const { initialUrl } = this.props;

    let withInitialUrl = !isNullOrUndefined(initialUrl);
    if (!withInitialUrl) this.props.onNavigation(-1);
    if (withInitialUrl && currentWeb !== -1) {
      this.props.onNavigation(currentWeb);
      AmSuiteNavBar.appNavigation.history.push(initialUrl);
    }
    SnackbarHandler.setSnackbar(
      this.handleToggleSnackBar,
      this.updatePositionSnackBar
    );
  }

  handleToggleSnackBar = (
    e,
    message,
    type,
    positionSnackbar,
    noTimeOut,
    download,
    onDownload
  ) => {
    this.setState({
      noTimeOut: noTimeOut,
      openSnackbar: e,
      snackbarMessage: message ? message : this.state.snackbarMessage,
      positionSnackbar: positionSnackbar
        ? positionSnackbar
        : this.state.positionSnackbar,
      snackbarType: type ? type : this.state.snackbarType,
      download: download,
      onDownload: onDownload,
    });
  };

  updatePositionSnackBar = (vertical, horizontal) => {
    this.setState({
      positionSnackbar: {
        vertical: vertical,
        horizontal: horizontal,
      },
    });
  };

  render() {
    return (
      <div>
        <Router ref={(e) => AmSuiteNavBar.setAppNavigation(e)}>
          <Routes>
            <Route path="/" element={<Init />} />
            <Route path="/home/:token" element={<LoginSAML />} />
            <Route path="/home" element={<Home />} />
            <Route path="/setupaccount" element={<SetUpAccount />} />
            <Route path="/easyaccess" element={<EasyAccessIndex />} />
            <Route path="/aludoc" element={<AludocIndex />} />
            <Route path="/mustering" element={<MusteringIndex />} />
            <Route path="/accesscontrol" element={<AccessControlIndex />} />
            <Route path="/users" element={<IndexUsers />} />
            <Route path="/reports" element={<IndexReports />} />
            <Route path="/settings" element={<IndexSettings />} />
            <Route path="/tikas" element={<IndexTikas />} />
            <Route path="/devicesMap" element={<IndexDeviceMap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/serverError" element={<ErrorPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
        <Snackbar
          anchorOrigin={{
            vertical: this.state.positionSnackbar.vertical,
            horizontal: this.state.positionSnackbar.horizontal,
          }}
          open={this.state.openSnackbar}
          onClose={(e, reason) => {
            if (reason === "clickaway") return;
            this.handleToggleSnackBar(false);
          }}
          autoHideDuration={this.state.noTimeOut ? null : 4000}
          style={{
            top:
              this.state.positionSnackbar.vertical === "top" ? 75 : "inherit",
            zIndex: 2000,
          }}
        >
          <CustomSnackBar
            variant={this.state.snackbarType}
            message={this.state.snackbarMessage}
            onClose={() => this.handleToggleSnackBar(false)}
            download={this.state.download}
            onDownload={this.state.onDownload}
          />
        </Snackbar>
      </div>
    );
  }
}

const NavigationConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

export default NavigationConnected;
