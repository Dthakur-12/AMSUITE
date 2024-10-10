import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
  Navigate,
  Routes,
} from "react-router-dom";
import NavBarEasyAccess from "../utils/NavBarEasyAccess";
import NoPermission from "../../Shared/NoPermission";
import Register from "./Register/Register";
import RegisterVisitRequest from "./Register/RegisterVisitRequest";
import NewPerson from "./Register/NewPerson";
import NewVisitorsEvent from "./Register/NewVisitorsEvent";
import DetailsPerson from "./Register/DetailsPerson";
import ImportRegister from "./ImportRegister";
import Enterprise from "./Enterprise/Enterprise";
import NewEnterprise from "./Enterprise/NewEnterprise";
import Status from "./Status/Status";
import NewStatus from "./Status/NewStatus";
import NewPersonGroup from "./Register/NewPersonGroup";
import PersonGroups from "./Register/PersonGroups";
//import Calendar from "./Agenda/Calendar";
import LinearProgress from "@mui/material/LinearProgress";
import { Entities, Activity } from "../../../utils/Enums";
import { connect } from "react-redux";
const mapStateToProps = ({ User, Notifications }) => {
  return {
    currentUser: User.currentUser,
    visitRequest: Notifications.visitRequest,
  };
};
const PrivateRoute = ({
  component: Component,
  entities,
  activity,
  permits,
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
          <Component {...props} />
        ) : entities.length === 0 ? (
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
    const { currentUser, visitRequest } = this.props;
    return (
      <div>
        <LinearProgress
          ref={() =>
            NavBarEasyAccess.setAppLoader((value) =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router
          ref={(e) => NavBarEasyAccess.setAppNavigation(e)}
          basename="/easyaccess"
        >
          <Route
            render={({ location }) => {
              return (
                <Routes location={location}>
                  <Route exact path="/" component={Register} />
                  <Route path="/home" component={Register} />
                  <Route path="/noPermission" component={NoPermission} />
                  <Route
                    path="/register"
                    component={Register}
                    entities={[
                      Entities.EMPLOYEES.toString(),
                      Entities.VISITORS.toString(),
                    ]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/registervisitrequest"
                    component={RegisterVisitRequest}
                    activity={Activity.VISUALIZE}
                    entities={visitRequest && visitRequest.active ? [] : ["38"]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/newperson"
                    component={NewPerson}
                    activity={Activity.CREATE}
                    entities={[
                      Entities.EMPLOYEES.toString(),
                      Entities.VISITORS.toString(),
                    ]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/newpersongroup"
                    component={NewPersonGroup}
                    activity={Activity.CREATE}
                    entities={[
                      Entities.EMPLOYEES.toString(),
                      Entities.VISITORS.toString(),
                    ]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/persongroups"
                    component={PersonGroups}
                    activity={Activity.CREATE}
                    entities={[
                      Entities.EMPLOYEES.toString(),
                      Entities.VISITORS.toString(),
                    ]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/newevent"
                    component={NewVisitorsEvent}
                    activity={Activity.CREATE}
                    entities={[
                      Entities.EMPLOYEES.toString(),
                      Entities.VISITORS.toString(),
                    ]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/detailsperson"
                    component={DetailsPerson}
                    activity={Activity.VISUALIZE}
                    entities={[
                      Entities.EMPLOYEES.toString(),
                      Entities.VISITORS.toString(),
                    ]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  {/* <PrivateRoute	
                    path="/newvehicle"	
                    component={NewVehicle}	
                    activity={Activity.CREATE}	
                    entities={[Entities.VEHICLES.toString()]}	
                    permits={currentUser != null ? currentUser.permits : []}	
                  /> */}
                  <PrivateRoute
                    path="/newenterprise"
                    component={NewEnterprise}
                    activity={Activity.CREATE}
                    entities={[Entities.COMPANIES.toString()]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  {/* <PrivateRoute	
                    path="/newgroup"	
                    component={NewGroup}	
                    activity={Activity.CREATE}	
                    entities={[	
                      Entities.EMPLOYEES.toString(),	
                      Entities.VISITORS.toString()	
                    ]}	
                    permits={currentUser != null ? currentUser.permits : []}	
                  /> */}
                  <PrivateRoute
                    path="/importregister"
                    component={ImportRegister}
                    activity={Activity.CREATE}
                    entities={[
                      Entities.EMPLOYEES.toString(),
                      Entities.VISITORS.toString(),
                    ]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/enterprise"
                    component={Enterprise}
                    entities={[Entities.COMPANIES.toString()]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/status"
                    component={Status}
                    entities={[Entities.PERSON_STATUS.toString()]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  <PrivateRoute
                    path="/newstatus"
                    component={NewStatus}
                    activity={Activity.CREATE}
                    entities={[Entities.PERSON_STATUS.toString()]}
                    permits={currentUser != null ? currentUser.permits : []}
                  />
                  {/* <PrivateRoute	
                    path="/calendar"	
                    component={Calendar}	
                    entities={[Entities.EVENTS.toString()]}	
                    permits={currentUser != null ? currentUser.permits : []}	
                  /> */}
                  {/* <PrivateRoute	
                    path="/vehicles"	
                    component={Vehicles}	
                    entities={[Entities.VEHICLES.toString()]}	
                    permits={currentUser != null ? currentUser.permits : []}	
                  /> */}
                </Routes>
              );
            }}
          />
        </Router>
      </div>
    );
  }
}
const NavigationConnected = connect(mapStateToProps, null)(Navigation);
export default NavigationConnected;
