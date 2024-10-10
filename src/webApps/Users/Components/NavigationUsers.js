import LinearProgress from "@mui/material/LinearProgress";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Entities } from "../../../utils/Enums";
import NavBarUsers from "../utils/NavBarUsers";
import UserGroups from "./UserAdministration";
import NoPermission from "../../Shared/NoPermission";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

const PrivateRoute = ({ element, entities, activity, permits, ...rest }) => {
  const auth =
    activity != null
      ? entities.filter((entity) => permits[entity].includes(activity)).length >
        0
      : true;

  return Object.keys(permits).filter((v) => entities.includes(v.toString()))
    .length > 0 && auth ? (
    element
  ) : (
    <Navigate to="/noPermission" state={{ from: rest.location }} />
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
            NavBarUsers.setAppLoader((value) =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router ref={(e) => NavBarUsers.setAppNavigation(e)} basename="/users">
          <Routes>
            <Route path="/noPermission" element={<NoPermission />} />
            <Route
              path="/"
              element={
                <PrivateRoute
                  element={<UserGroups />}
                  entities={[Entities.USERS.toString()]}
                  permits={currentUser != null ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute
                  element={<UserGroups />}
                  entities={[Entities.USERS.toString()]}
                  permits={currentUser != null ? currentUser.permits : []}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

const NavigationConnected = connect(mapStateToProps, null)(Navigation);

export default NavigationConnected;
