import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { connect } from "react-redux";
import Panels from "./Panel/Panels";
import Readers from "./Reader/Readers";
import TimeZones from "./TimeZone/TimeZones";
import AccessLevels from "./AccessLevel/AccessLevels";
import CardFormats from "./CardFormat/CardFormats";
import RouteReader from "./Panel/RouteReader";
import Badges from "./Badge/Badges";
import EventMonitoring from "./EventMonitoring/EventMonitoring";
import NewReader from "./Reader/NewReader";
import NewMultiplePanel from "./Panel/NewMultiplePanel";
import NewPanel from "./Panel/NewPanel";
import NewTimeZone from "./TimeZone/NewTimeZone";
import NewAccessLevel from "./AccessLevel/NewAccessLevel";
import NewCardFormat from "./CardFormat/NewCardFormat";
import NewVirtualZone2 from "./VirtualZone/NewVirtualZone2";
import NewVirtualZone from "./VirtualZone/NewVirtualZone";
import NewBadge from "./Badge/NewBadge";
import BadgeStatus from "./Badge/BadgeStatus";
import BadgeTypes from "./Badge/BadgeTypes";
import Imei from "./Imei";
import VirtualZones from "./VirtualZone/VirtualZones";
import NavBarAccessControl from "../utils/NavBarAccessControl";
import NoPermission from "../../Shared/NoPermission";
import { Entities, Activity } from "../../../utils/Enums";

const mapStateToProps = ({ User }) => ({
  currentUser: User.currentUser,
});

const PrivateRoute = ({ element, entities, activity, permits, ...rest }) => {
  const auth =
    activity != null
      ? entities.filter(
          (entity) =>
            permits[entity] != null && permits[entity].includes(activity)
        ).length > 0
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
            NavBarAccessControl.setAppLoader((value) =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router
          ref={(e) => NavBarAccessControl.setAppNavigation(e)}
          basename="/accesscontrol"
        >
          <Routes>
            <Route path="/noPermission" element={<NoPermission />} />
            <Route
              path="/"
              element={
                <PrivateRoute
                  element={<EventMonitoring />}
                  entities={[Entities.EVENTS_MONITOR.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/panels"
              element={
                <PrivateRoute
                  element={<Panels />}
                  entities={[Entities.PANELS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/readers"
              element={
                <PrivateRoute
                  element={<Readers />}
                  entities={[Entities.READERS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/timezone"
              element={
                <PrivateRoute
                  element={<TimeZones />}
                  entities={[Entities.TIME_ZONES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/accesslevel"
              element={
                <PrivateRoute
                  element={<AccessLevels />}
                  entities={[Entities.ACCESS_LEVELS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/cardformat"
              element={
                <PrivateRoute
                  element={<CardFormats />}
                  entities={[Entities.CARD_FORMATS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/virtualzone"
              element={
                <PrivateRoute
                  element={<VirtualZones />}
                  entities={[Entities.VIRTUAL_ZONES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/badges"
              element={
                <PrivateRoute
                  element={<Badges />}
                  entities={[Entities.BADGES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/eventmonitoring"
              element={
                <PrivateRoute
                  element={<EventMonitoring />}
                  entities={[Entities.EVENTS_MONITOR.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newreader"
              element={
                <PrivateRoute
                  element={<NewReader />}
                  activity={Activity.CREATE}
                  entities={[Entities.READERS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newpanel"
              element={
                <PrivateRoute
                  element={<NewPanel />}
                  activity={Activity.CREATE}
                  entities={[Entities.PANELS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newMultiplePanel"
              element={
                <PrivateRoute
                  element={<NewMultiplePanel />}
                  activity={Activity.CREATE}
                  entities={[Entities.PANELS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newtimezone"
              element={
                <PrivateRoute
                  element={<NewTimeZone />}
                  activity={Activity.CREATE}
                  entities={[Entities.TIME_ZONES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newaccesslevel"
              element={
                <PrivateRoute
                  element={<NewAccessLevel />}
                  activity={Activity.CREATE}
                  entities={[Entities.ACCESS_LEVELS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newcardformat"
              element={
                <PrivateRoute
                  element={<NewCardFormat />}
                  activity={Activity.CREATE}
                  entities={[Entities.CARD_FORMATS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newvirtualzone2"
              element={
                <PrivateRoute
                  element={<NewVirtualZone2 />}
                  activity={Activity.CREATE}
                  entities={[Entities.VIRTUAL_ZONES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newvirtualzone"
              element={
                <PrivateRoute
                  element={<NewVirtualZone />}
                  activity={Activity.CREATE}
                  entities={[Entities.VIRTUAL_ZONES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/newbadge"
              element={
                <PrivateRoute
                  element={<NewBadge />}
                  activity={Activity.CREATE}
                  entities={[Entities.BADGES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/badgeStatus"
              element={
                <PrivateRoute
                  element={<BadgeStatus />}
                  activity={Activity.CREATE}
                  entities={[Entities.BADGE_STATUS.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route
              path="/badgeTypes"
              element={
                <PrivateRoute
                  element={<BadgeTypes />}
                  activity={Activity.CREATE}
                  entities={[Entities.BADGE_TYPES.toString()]}
                  permits={currentUser ? currentUser.permits : []}
                />
              }
            />
            <Route path="/imeis" element={<Imei />} />
            <Route path="/routes" element={<RouteReader />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

const NavigationConnected = connect(mapStateToProps, null)(Navigation);

export default NavigationConnected;
