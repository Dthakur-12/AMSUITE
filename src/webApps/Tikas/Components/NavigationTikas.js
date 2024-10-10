import React, { Component } from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import HomeTikas from "./Products/ProductList";
import NavBarTikas from "../utils/NavBarTikas";
import LinearProgress from "@mui/material/LinearProgress";
import { Entities } from "../../../utils/Enums";
import { connect } from "react-redux";
import NoPermission from "../../Shared/NoPermission";
import Stalls from "./Products/Stalls";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

const PrivateRoute = ({ component: Component, entities, permits, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return Object.keys(permits).filter((v) =>
          entities.includes(v.toString())
        ).length > 0 ? (
          <Component {...props} />
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
            NavBarTikas.setAppLoader((value) =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router ref={(e) => NavBarTikas.setAppNavigation(e)} basename="/tikas">
          <div>
            <Route path="/noPermission" component={NoPermission} />
            <PrivateRoute
              exact
              path="/"
              component={HomeTikas}
              entities={[Entities.PRODUCTS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/home"
              component={HomeTikas}
              entities={[Entities.PRODUCTS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/stalls"
              component={Stalls}
              entities={[Entities.PRODUCTS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
          </div>
        </Router>
      </div>
    );
  }
}

const NavigationConnected = connect(mapStateToProps, null)(Navigation);

export default NavigationConnected;
