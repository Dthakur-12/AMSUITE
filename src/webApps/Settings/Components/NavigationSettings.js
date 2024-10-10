import React, { Component } from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";

import SystemSettings from "./System/SystemSettings";
import CustomFieldsTabs from "./CustomFieldsTabs";
import AdministrationFields from "./AdministrationFields";
import EmployeeSettings from "./EmployeeSettings";
import VisitorSettings from "./VisitorSettings";
import EnterpriseSettings from "./EnterpriseSettings";
import AccessControlSettings from "./AccessControl/AccessControlSettings";

import NotificationSettings from "./Notifications/NotificationSettings";
import MusteringSettings from "./MusteringSettings";
import LicenceSettings from "./Licences/LicenceSetting";

import NavBarSettings from "../utils/NavBarSettings";
import LinearProgress from "@mui/material/LinearProgress";
import { Entities } from "../../../utils/Enums";
import { connect } from "react-redux";
import NoPermission from "../../Shared/NoPermission";
import EasyAccesSettings from "./EasyAccess/EasyAccessSettings";
import SamlSettings from "./SAML/Index";
import withSamlIndex from "../../../core/Settings/SAML/withIndex";
import withAccessControl from "../../../core/Settings/AccessControl/withAccessControl";

import TikasSettings from "./Tikas/TikasSettings";
import FileUpload from "./FileUpload";
import NumericalRecords from "./Notifications/NumericalRecords";

import AccessControlSettingsHome from "./AccessControl/AccessControlSettingsHome";
import PersonGroupSettings from "./PersonGroup/PersonGroupSettings";

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
  extraProps = {},
  ...rest
}) => {
  // const auth =
  //   activity != null
  //     ? entities.filter(entity => permits[entity].includes(activity)).length > 0
  //     : true;

  return (
    // <Route
    //   {...rest}
    //   render={props => {
    //     return Object.keys(permits).filter(v => entities.includes(v.toString()))
    //       .length > 0 && auth ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: "/noPermission",
    //           state: { from: props.location }
    //         }}
    //       />
    //     );
    //   }}
    // />
    (<Route
      {...rest}
      render={(props) => {
        return Object.keys(permits).filter((v) =>
          entities.includes(v.toString())
        ).length > 0 ? (
          <Component {...props} {...extraProps} />
        ) : (
          <Navigate
            to={{
              pathname: "/noPermission",
              state: { from: props.location },
            }}
          />
        );
      }}
    />)
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
            NavBarSettings.setAppLoader((value) =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router
          ref={(e) => NavBarSettings.setAppNavigation(e)}
          basename="/settings"
        >
          <div>
            <Route path="/noPermission" component={NoPermission} />
            <PrivateRoute
              exact
              path="/"
              component={SystemSettings}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/home"
              component={SystemSettings}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/system"
              component={SystemSettings}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/employeeSettings"
              component={EmployeeSettings}
              entities={[
                Entities.SETTINGS.toString(),
                Entities.EMPLOYEES.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/CustomFieldsTabs"
              component={CustomFieldsTabs}
              entities={[
                Entities.SETTINGS.toString(),
                Entities.EMPLOYEES.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/visitorSettings"
              component={VisitorSettings}
              entities={[
                Entities.SETTINGS.toString(),
                Entities.VISITORS.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/enterpriseSettings"
              component={EnterpriseSettings}
              entities={[
                Entities.SETTINGS.toString(),
                Entities.COMPANIES.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/personGroupSettings"
              component={PersonGroupSettings}
              entities={[
                Entities.SETTINGS.toString(),
                Entities.VISITORS.toString(),
                Entities.EMPLOYEES.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            {/* <PrivateRoute
              path="/vehicleSettings"
              component={VehicleSettings}
              entities={[
                Entities.SETTINGS.toString(),
                Entities.VEHICLES.toString()
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            /> */}
            <PrivateRoute
              path="/notificationSettings"
              component={NotificationSettings}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/musteringSettings"
              component={MusteringSettings}
              entities={[
                Entities.SETTINGS.toString(),
                Entities.REPORTS_MUSTERING.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/easyAccessSettings"
              component={EasyAccesSettings}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/accessControlSettings"
              component={AccessControlSettingsHome}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/numericalRecordsSettings"
              component={NumericalRecords}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />

            <PrivateRoute
              path="/tikasSettings"
              component={TikasSettings}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/AdministrationFields"
              component={AdministrationFields}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
              extraProps={{ entity: "BADGE" }}
            />

            <PrivateRoute
              path="/controlNotifications/notificationSettings/:controlName/:controlId"
              exact
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
              indexSelected={1}
              component={NotificationSettings}
            />

            <PrivateRoute
              path="/samlSetting"
              component={withSamlIndex(SamlSettings)}
              entities={[Entities.SETTINGS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <Route path="/licenceSetting" component={LicenceSettings} />
            {/* <Route path="/fileUpload" component={FileUpload} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

const NavigationConnected = connect(mapStateToProps, null)(Navigation);

export default NavigationConnected;
