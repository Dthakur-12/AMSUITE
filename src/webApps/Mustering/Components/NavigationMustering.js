import React, { Component } from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Zones from "./Zone/Zones";
import Area from "./Area/Area";
import AreaGroup from './AreaGroup/AreaGroup';
import ActivityView from "./Activity/Activity";
import NewZone from "./Zone/NewZone";
import NewAreaGroup from "./AreaGroup/NewAreaGroup";
import NewArea from "./Area/NewArea";
import NavBarMustering from "../utils/NavBarMustering";
import LinearProgress from "@mui/material/LinearProgress";
import { Entities, Activity } from "../../../utils/Enums";
import { connect } from "react-redux";
import NoPermission from "../../Shared/NoPermission";
import NewMustering from "./AreaGroup/NewMustering";
import ActiveEvents from "./Events/ActiveEvents";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser
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
          entity =>
            permits[entity] != null && permits[entity].includes(activity)
        ).length > 0
      : true;
  return (
    <Route
      {...rest}
      render={props => {
        return Object.keys(permits).filter(v => entities.includes(v.toString()))
          .length > 0 && auth ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{
              pathname: "/noPermission",
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
      <div>
        <LinearProgress
          ref={() =>
            NavBarMustering.setAppLoader(value =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router
          ref={e => NavBarMustering.setAppNavigation(e)}
          basename="/mustering"
        >
          <div>
            <Route exact path="/" component={Zones} />
            <Route exact path="/home" component={Zones} />
            <Route path="/noPermission" component={NoPermission} />
            <PrivateRoute
              exact
              path="/zones"
              component={Zones}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              exact
              path="/area"
              component={Area}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              exact
              path="/areagroup"
              component={AreaGroup}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              exact
              path="/newmusterevent"
              component={NewMustering}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              exact
              path="/activity"
              component={ActivityView}
              entities={[Entities.REPORTS_MUSTERING.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/activemusterevent"
              component={ActiveEvents}
              activity={Activity.CREATE}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/newzone"
              component={NewZone}
              activity={Activity.CREATE}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/newareagroup"
              component={NewAreaGroup}
              activity={Activity.CREATE}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/newarea"
              component={NewArea}
              activity={Activity.CREATE}
              entities={[Entities.MUSTER_ZONES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
          </div>
        </Router>
      </div>
    );
  }
}
const NavigationConnected = connect(
  mapStateToProps,
  null
)(Navigation);

export default NavigationConnected;
