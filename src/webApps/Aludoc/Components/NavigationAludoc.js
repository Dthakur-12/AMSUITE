import LinearProgress from "@mui/material/LinearProgress";
import React, { Component } from "react";
import { BrowserRouter as Router, Route,Navigate } from "react-router-dom";
import NavBarAludoc from "../utils/NavBarAludoc";
import DocumentsType from "./Document/DocumentType";
import NewDocument from "./Document/NewDocument";
import NewDocumentType from "./Document/NewDocumentType";
import Enterprise from "./Enterprise";
//import HomeAludoc from "./HomeAludoc";
import ImportRegister from "./ImportRegister";
import MyControls from "./Control/MyControls";
import NewControl from "./Control/NewControls";
//import DetailsControl from "./Control/DetailsControl";
// import NewVehicle from "./Register/NewVehicle";
import withControls from "../../../core/Aludoc/withControls";
import withNewControl from "../../../core/Aludoc/withNewControl";
import withNewDocumentType from "../../../core/Aludoc/withNewDocumentType";

import Register from "./Register/Register";
import NewPerson from "../../EasyAccess/Components/Register/NewPerson";
import Requirements from "./Requirements";
import Status from "./Status";
import NoPermission from "../../Shared/NoPermission";
import { Entities, Activity } from "../../../utils/Enums";
import { connect } from "react-redux";

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

const newControlWrapper = withNewControl(NewControl);

const newDocumentTypeWrapper = withNewDocumentType(NewDocumentType);

const newDocumentWrapper = withNewDocumentType(NewDocument);

const controlsWrapper = withControls(MyControls);

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
            NavBarAludoc.setAppLoader((value) =>
              this.setState({ isLoading: value })
            )
          }
          style={{ opacity: this.state.isLoading ? 1 : 0, background: "none" }}
        />
        <Router
          ref={(e) => NavBarAludoc.setAppNavigation(e)}
          basename="/aludoc"
        >
          <div style={{ display: "flex" }}>
            <Route exact path="/" component={Register} />
            <Route exact path="/home" component={Register} />
            <Route path="/noPermission" component={NoPermission} />

            {/* Borrrar Esto */}
            <Route path="/newDocument" component={NewDocument} />

            <PrivateRoute
              path="/register"
              exact
              component={Register}
              entities={[
                Entities.EMPLOYEES.toString(),
                Entities.VISITORS.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              exact
              path="/register/personDocument/:id"
              component={Register}
              entities={[
                Entities.EMPLOYEES.toString(),
                Entities.VISITORS.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              exact
              path="/register/personDocument/:id/:documentid"
              component={Register}
              entities={[
                Entities.EMPLOYEES.toString(),
                Entities.VISITORS.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/newperson"
              isAludoc={true}
              component={NewPerson}
              activity={Activity.CREATE}
              entities={[
                Entities.EMPLOYEES.toString(),
                Entities.VISITORS.toString(),
              ]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/newDocumentType"
              component={newDocumentTypeWrapper}
              activity={Activity.CREATE}
              entities={[Entities.DOCUMENT_TYPES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/documentType"
              component={DocumentsType}
              entities={[Entities.DOCUMENT_TYPES.toString()]}
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
              exact
              path="/enterprise"
              exact
              component={Enterprise}
              entities={[Entities.COMPANIES.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              exact
              path="/enterprise/enterpriseDocument/:id"
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
              path="/mycontracts"
              component={controlsWrapper}
              entities={[Entities.CONTROLS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/mycontrols/controlsDetails/:id"
              component={controlsWrapper}
              entities={[Entities.CONTROLS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/requirements"
              component={Requirements}
              entities={[Entities.REQUIREMENTS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/newDocument"
              component={newDocumentWrapper}
              activity={Activity.CREATE}
              entities={[Entities.DOCUMENTS.toString()]}
              permits={currentUser != null ? currentUser.permits : []}
            />
            <PrivateRoute
              path="/newControl"
              component={newControlWrapper}
              activity={Activity.CREATE}
              entities={[Entities.DOCUMENTS.toString()]}
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
