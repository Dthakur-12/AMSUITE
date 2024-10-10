import React, { Component } from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";

import HomeReports from "./HomeReports";
import NavBarReports from "../utils/NavBarReports";
import LinearProgress from "@mui/material/LinearProgress";
import { Entities } from "../../../utils/Enums";
import { connect } from "react-redux";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser
  };
};

const PrivateRoute = ({
  component: Component,
  entities,
  permits,
  indexSelected,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return Object.keys(permits).filter(v => entities.includes(v.toString()))
          .length > 0 ? (
          indexSelected != null ? (
            <Component {...props} indexSelected={indexSelected} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Navigate
            to={{
              pathname: "/home",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <LinearProgress
          ref={() =>
            NavBarReports.setAppLoader(value =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router
          ref={e => NavBarReports.setAppNavigation(e)}
          basename="/reports"
        >
          <div style={{ height: "100%" }}>
            <PrivateRoute
              exact
              path="/"
              component={HomeReports}
              entities={[
                Entities.REPORTS_ALUDOC.toString(),
                Entities.REPORTS_ALUTEL_MOBILE.toString(),
                Entities.REPORTS_EASYACCESS.toString(),
                Entities.REPORTS_TIKAS.toString()
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/home"
              component={HomeReports}
              entities={[
                Entities.REPORTS_ALUDOC.toString(),
                Entities.REPORTS_ALUTEL_MOBILE.toString(),
                Entities.REPORTS_EASYACCESS.toString(),
                Entities.REPORTS_TIKAS.toString()
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/tikas"
              entities={[Entities.REPORTS_TIKAS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
              indexSelected={5}
              component={HomeReports}
            />
            <PrivateRoute
              path="/aludoc"
              exact
              entities={[Entities.REPORTS_ALUDOC.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
              indexSelected={1}
              component={HomeReports}
            />

            <PrivateRoute
              path="/aludoc/docsNearExpiration/:days"
              exact
              entities={[Entities.REPORTS_ALUDOC.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
              indexSelected={1}
              component={HomeReports}
            />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

const NavigationConnected = connect(
  mapStateToProps,
  null
)(Navigation);

export default NavigationConnected;
