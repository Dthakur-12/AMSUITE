import LinearProgress from "@mui/material/LinearProgress";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Navigate, Route } from "react-router-dom";
import NoPermission from "../../Shared/NoPermission";
import NavBarDeviceMap from "../utils/NavBarDeviceMap";
import DeviceMap from "./DeviceMapHome";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

const PrivateRoute = ({
  component: Component,
  entities,
  activity,
  permits,
  isAludoc,
  ...rest
}) => {
  const auth =
    activity != null
      ? entities.filter(
          (entity) =>
            permits[entity] != null && permits[entity].includes(activity)
        ).length > 0
      : true;
  return (
    <Route
      {...rest}
      render={(props) => {
        return Object.keys(permits).filter((v) =>
          entities.includes(v.toString())
        ).length > 0 && auth ? (
          isAludoc != null ? (
            <Component {...props} isAludoc={true} />
          ) : (
            <Component {...props} />
          )
        ) : (
          <Navigate
            to={{
              pathname: "/noPermission",
              state: { from: props.location },
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
      <div>
        <LinearProgress
          ref={() =>
            NavBarDeviceMap.setAppLoader((value) =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router
          ref={(e) => NavBarDeviceMap.setAppNavigation(e)}
          basename="/devicesMap"
        >
          <div>
            <Route exact path="/" component={DeviceMap} />
            <Route exact path="/home" component={DeviceMap} />
            <Route path="/noPermission" component={NoPermission} />
          </div>
        </Router>
      </div>
    );
  }
}

const NavigationConnected = connect(mapStateToProps, null)(Navigation);

export default NavigationConnected;
