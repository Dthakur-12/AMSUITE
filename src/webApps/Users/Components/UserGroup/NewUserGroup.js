import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Slide,
} from "@mui/material";
import {
  withStyles,
} from "@mui/styles";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { withTranslation } from "react-i18next";
import ADTransfer from "../../../Shared/TransferList/ADTransfer";
import Transfer from "../../../Shared/TransferList/Transfer";
import ApiHandler from "../../../../services/ApiHandler";
import Grid from "@mui/material/Grid";
import Permits from "../Register/UserPermissions";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepButton from "@mui/material/StepButton";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import TextField from "@mui/material/TextField";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import styles from "../../../../assets/styles/User_styles/UserGroup_styles/newUserGroupStyles";
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const initValuesGroup = {
  id: 0,
  name: "",
  users: [],
  usersDetails: {},
  products: [],
};
const initValuesADGroups = {
  id: 0,
  guid: 0,
  name: "",
  groups: [],
  groupsDetails: {},
  products: [],
};
class NewUserGroup extends React.Component {
  constructor(props) {
    super(props);
    const { elementOnEdit, isADGroup, isEdit } = props;
    this.state = {
      newGroup: {
        id: elementOnEdit ? elementOnEdit.id : 0,
        name: elementOnEdit ? elementOnEdit.name : "",
        users: elementOnEdit ? elementOnEdit.users : [],
        usersDetails: elementOnEdit ? elementOnEdit.userDetails : {},
        products: [],
      },
      newADGroups: {
        id: elementOnEdit ? elementOnEdit.id : 0,
        guid: elementOnEdit ? elementOnEdit.guid : 0,
        name: elementOnEdit ? elementOnEdit.name : "",
        groups: [],
        groupsDetails: {},
        products: [],
      },
      permits: elementOnEdit
        ? this.setPermits(elementOnEdit)
        : { 1: [], 2: [], 3: [], 4: [] },
      currentStep: isEdit && isADGroup ? 1 : 0,
      formErrors: {},
    };
  }

  setPermits = (elementOnEdit) => {
    let permissionAux = { 1: [], 2: [], 3: [], 4: [] };

    elementOnEdit.permits[1].map((e) => permissionAux[1].push(Number(e)));
    elementOnEdit.permits[2].map((e) => permissionAux[2].push(Number(e)));
    elementOnEdit.permits[3].map((e) => permissionAux[3].push(Number(e)));
    elementOnEdit.permits[4].map((e) => permissionAux[4].push(Number(e)));

    return permissionAux;
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  handleCreateADGroups = () => {
    const { newADGroups, permits } = this.state;
    const { t, isADGroup } = this.props;

    let errors = this.validateObject(newADGroups.groups, permits, isADGroup);

    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      });

      let newPermits = { 1: [], 2: [], 3: [], 4: [] };
      Object.keys(permits).map((key) =>
        permits[key].map((value) => {
          if (newPermits[value])
            newPermits = {
              ...newPermits,
              [value]: [...newPermits[value], parseInt(key)],
            };
          else
            newPermits = {
              ...newPermits,
              [value]: [parseInt(key)],
            };
          return 0;
        })
      );

      const group = {
        groups: newADGroups.groupsDetails,
        permits: newPermits,
        guid: newADGroups.guid,
      };

      ApiHandler.AMSuite.User.CreateADGroups(group)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          SnackbarHandler.showMessage(t("SuccessCreateADGroup") + "!");
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newADGroups: initValuesADGroups,
              permits: [],
              currentStep: 0,
            });
            this.props.handleElementCreated();
          }, 1000);
        })
        .catch(({ error = {} }) => {
          SnackbarHandler.showMessage(error.errorData, "error");
          this.setState({
            isCreating: false,
            isSuccess: false,
          });
        });
    } else {
      this.processErrors(errors);
    }
  };

  processErrors = (errors) => {
    const { isADGroup, t } = this.props;
    if (!isADGroup && errors.name) {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      this.setState({
        currentStep: 0,
      });
      return;
    }
    if (errors.elements) {
      SnackbarHandler.showMessage(
        !isADGroup ? t("NeedAddSomeUser") : t("NeedAddSomeADGroup"),
        "error"
      );
      this.setState({
        currentStep: 0,
      });
      return;
    }
    if (errors.permits) {
      SnackbarHandler.showMessage(t("PermitsCanNotBeNull"), "error");
      this.setState({
        currentStep: 1,
      });
      return;
    }
  };

  updateEntities = (entities) => {
    if (Object.entries(this.state.permits).length !== 0) {
      this.setState((prevState) => ({
        permits: {
          ...prevState.permits,
          [1]: prevState.permits[1].filter((ent) =>
            entities.some((e) => e.id === Number(ent))
          ),
          [2]: prevState.permits[2].filter((ent) =>
            entities.some((e) => e.id === Number(ent))
          ),
          [3]: prevState.permits[3].filter((ent) =>
            entities.some((e) => e.id === Number(ent))
          ),
          [4]: prevState.permits[4].filter((ent) =>
            entities.some((e) => e.id === Number(ent) || Number(ent) === 38)
          ),
        },
      }));
    }
  };

  handleCreate = () => {
    const { newGroup, permits } = this.state;
    const { t, isADGroup } = this.props;

    let errors = this.validateObject(newGroup.users, permits, isADGroup);
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      });

      let newPermits = { 1: [], 2: [], 3: [], 4: [] };
      Object.keys(permits).map((key) =>
        permits[key].map((value) => {
          if (newPermits[value])
            newPermits = {
              ...newPermits,
              [value]: [...newPermits[value], parseInt(key)],
            };
          else
            newPermits = {
              ...newPermits,
              [value]: [parseInt(key)],
            };
          return 0;
        })
      );

      const group = {
        users: newGroup.users,
        permits: newPermits,
        name: newGroup.name,
        id: newGroup.id,
      };

      ApiHandler.AMSuite.User.CreateAMSuiteGroup(group)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          SnackbarHandler.showMessage(t("SuccessCreateGroup") + "!");
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newGroup: initValuesGroup,
              permits: [],
              currentStep: 0,
            });
            this.props.handleElementCreated();
          }, 1000);
        })
        .catch(({ error }) => {
          SnackbarHandler.showMessage(error.message, "error");
          this.setState({
            isCreating: false,
            isSuccess: false,
          });
        });
    } else {
      this.processErrors(errors);
    }
  };

  handleEditADGroup = () => {
    const { permits, newADGroups } = this.state;
    const { t } = this.props;
    if (Object.keys(permits).length > 0) {
      this.setState({
        isCreating: true,
      });

      let newPermits = {};
      Object.keys(permits).map((key) =>
        permits[key].map((value) => {
          if (newPermits[value])
            newPermits = {
              ...newPermits,
              [value]: [...newPermits[value], parseInt(key)],
            };
          else
            newPermits = {
              ...newPermits,
              [value]: [parseInt(key)],
            };
          return 0;
        })
      );

      const group = {
        permits: newPermits,
        id: newADGroups.id,
        guid: newADGroups.guid,
        name: newADGroups.name,
      };

      ApiHandler.AMSuite.User.CreateAMSuiteGroup(group)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          SnackbarHandler.showMessage(t("SuccessCreateGroup") + "!");
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newADGroups: initValuesADGroups,
              permits: [],
              currentStep: 0,
            });
            this.props.handleElementCreated();
          }, 1000);
        })
        .catch(({ error }) => {
          SnackbarHandler.showMessage(error.message, "error");
          this.setState({
            isCreating: false,
            isSuccess: false,
          });
        });
    } else {
      SnackbarHandler.showMessage(t("PermitsCanNotBeNull"), "error");
      return;
    }
  };

  validateObject = (elements, permits, isADGroup) => {
    if (isADGroup)
      return {
        permits: Object.keys(permits).length === 0,
        elements: elements.length === 0,
      };
    else
      return {
        permits: Object.keys(permits).length === 0,
        elements: elements.length === 0,
        name: isValueEmptyOrNull(this.state.newGroup.name),
      };
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(({ newGroup }) => ({
      newGroup: {
        ...newGroup,
        [name]: value,
      },
    }));
  };

  onUsersConfirm = (users, usersDetails) => {
    this.setState((prevState) => ({
      newGroup: {
        ...prevState.newGroup,
        users,
        usersDetails,
      },
    }));
  };

  onADGroupConfirm = (groups, groupsDetails) => {
    this.setState((prevState) => ({
      newADGroups: {
        ...prevState.newADGroups,
        groups,
        groupsDetails,
      },
    }));
  };

  handleStep = (step) => {
    this.setState({
      currentStep: step,
    });
  };

  handlePermissionChange = (e, { value: entityIds, entity: activityId }) => {
    const addElements =
      entityIds.length > this.state.permits[activityId].length;
    let elem;
    if (addElements) {
      elem = entityIds.filter(
        (e) => !this.state.permits[activityId].includes(e)
      );
    } else {
      elem = this.state.permits[activityId].filter(
        (e) => !entityIds.includes(e)
      );
    }
    if (
      elem.length === 1 &&
      [1, 2, 3].includes(activityId) &&
      ((elem[0] === 3 && !this.state.permits[4].includes(3)) ||
        (elem[0] === 4 && !this.state.permits[4].includes(4))) &&
      addElements
    ) {
      let permissionsVisualizate = this.state.permits[4].slice();
      elem[0] === 3
        ? permissionsVisualizate.push(3)
        : permissionsVisualizate.push(4);
      this.setState((prevState) => ({
        permits: {
          ...prevState.permits,
          [activityId]: entityIds,
          [4]: permissionsVisualizate,
        },
      }));
    } else if (
      elem.length === 1 &&
      !addElements &&
      activityId === 4 &&
      ((elem[0] === 3 &&
        (this.state.permits[1].includes(3) ||
          this.state.permits[2].includes(3) ||
          this.state.permits[3].includes(3))) ||
        (elem[0] === 4 &&
          (this.state.permits[1].includes(4) ||
            this.state.permits[2].includes(4) ||
            this.state.permits[3].includes(4))))
    ) {
      let permissionsCreate =
        elem[0] === 3
          ? this.state.permits[1].filter((elem) => elem !== 3)
          : this.state.permits[1].filter((elem) => elem !== 4);
      let permissionsUpdaate =
        elem[0] === 3
          ? this.state.permits[2].filter((elem) => elem !== 3)
          : this.state.permits[2].filter((elem) => elem !== 4);
      let permissionsDelete =
        elem[0] === 3
          ? this.state.permits[3].filter((elem) => elem !== 3)
          : this.state.permits[3].filter((elem) => elem !== 4);

      this.setState((prevState) => ({
        permits: {
          ...prevState.permits,
          [activityId]: entityIds,
          [1]: permissionsCreate,
          [2]: permissionsUpdaate,
          [3]: permissionsDelete,
        },
      }));
    } else {
      this.setState((prevState) => ({
        permits: {
          ...prevState.permits,
          [activityId]: entityIds,
        },
      }));
    }
  };

  onClose = () => {
    this.setState({
      currentStep: 0,
    });
    this.props.handleClose();
  };

  render() {
    const { classes, isEdit, open, t, isADGroup } = this.props;
    return (
      (<div>
        <Dialog
          fullScreen
          onClose={this.onClose}
          TransitionComponent={Transition}
          open={open}
          onBackdropClick={this.onClose}
          keepMounted={false}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                className={classes.customButton}
                disabled={this.state.isCreating}
                onClick={this.onClose}
                size="large">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {isEdit
                  ? isADGroup
                    ? t("ADGroupEdition")
                    : t("GroupEdition")
                  : t("NewGroup")}
              </Typography>
              <Button
                className={classes.customButton}
                disabled={this.state.isCreating}
                onClick={this.onClose}
              >
                {t("cancel")}
              </Button>
              <div
                style={{
                  position: "relative",
                }}
              >
                <Button
                  className={classes.customButton}
                  disabled={this.state.isCreating}
                  onClick={
                    this.state.isCreating
                      ? undefined
                      : isADGroup
                      ? isEdit
                        ? this.handleEditADGroup
                        : this.handleCreateADGroups
                      : this.handleCreate
                  }
                >
                  {t("confirm")}
                </Button>
                {this.state.isCreating && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -12,
                      marginLeft: -12,
                      color: "white",
                    }}
                  />
                )}
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.layout}>
            <div className={classes.fill}>
              <Grid
                container
                style={{
                  width: "100%",
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {!(isADGroup && isEdit) && (
                  <Stepper
                    nonLinear
                    activeStep={this.state.currentStep}
                    style={
                      this.state.isDesktop
                        ? { width: "60%" }
                        : { width: "100%" }
                    }
                    alternativeLabel
                  >
                    <Step key={0}>
                      <StepButton onClick={() => this.handleStep(0)}>
                        {isADGroup ? t("ADGroupsToImport") : t("UsersToAdd")}
                      </StepButton>
                    </Step>
                    <Step key={1}>
                      <StepButton onClick={() => this.handleStep(1)}>
                        {t("Permissions")}
                      </StepButton>
                    </Step>
                  </Stepper>
                )}
              </Grid>
              <Grid container spacing={24}>
                <Grid
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {this.state.currentStep === 0 && (
                    <Grid item xs={12} md={8}>
                      {!isADGroup && this.state.isDesktop && (
                        <TextField
                          required
                          style={{ width: "50%" }}
                          label={t("name")}
                          value={this.state.newGroup.name}
                          fullWidth
                          onChange={this.handleChange("name")}
                          helperText={t("inputEmpty")}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.userName ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.name}
                        />
                      )}
                      {!isADGroup && !this.state.isDesktop && (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TextField
                            required
                            style={{ width: "80%" }}
                            label={t("name")}
                            value={this.state.newGroup.name}
                            fullWidth
                            onChange={this.handleChange("name")}
                            helperText={t("inputEmpty")}
                            FormHelperTextProps={{
                              style: {
                                opacity: this.state.formErrors.userName ? 1 : 0,
                              },
                            }}
                            error={this.state.formErrors.name}
                          />
                        </div>
                      )}
                      {!isADGroup ? (
                        <Transfer
                          loadData={ApiHandler.AMSuite.User.GetUsers}
                          handleUserConfirm={this.onUsersConfirm}
                          attribute={"userName"}
                          idAttribute={"id"}
                          isServerSide={true}
                          firstTitle={t("AllSystemUser")}
                          secondTitle={t("UsersAddedToGroup")}
                          addedElements={this.state.newGroup.users}
                          addedElementsDetails={
                            this.state.newGroup.usersDetails
                          }
                        />
                      ) : (
                        <ADTransfer
                          loadData={
                            ApiHandler.AMSuite.User
                              .GetActiveDirectoryGroupByName
                          }
                          handleUserConfirm={this.onADGroupConfirm}
                          attribute={"name"}
                          idAttribute={"guid"}
                          isServerSide={true}
                          firstTitle={t("ADGroups")}
                          secondTitle={t("SelectedADGroups")}
                          addedElements={this.state.newADGroups.groups}
                          addedElementsDetails={
                            this.state.newADGroups.groupsDetails
                          }
                        />
                      )}
                      <div className={classes.submitNext}>
                        <Button
                          variant="contained"
                          className={classes.customButtonNext}
                          disabled={this.state.isCreating}
                          onClick={() => this.handleStep(1)}
                          style={{
                            background: this.state.isSuccess
                              ? green[500]
                              : undefined,
                          }}
                        >
                          {`${t("Next")}`}
                        </Button>
                      </div>
                    </Grid>
                  )}
                  {this.state.currentStep === 1 && (
                    <Grid item xs={12} md={8}>
                      <Permits
                        permissionsSelected={this.state.permits}
                        handlePermissionChange={this.handlePermissionChange}
                        updateEntities={this.updateEntities}
                        {...this.props}
                      />
                      <div className={classes.submitNext}>
                        <Button
                          variant="contained"
                          className={classes.customButtonNext}
                          disabled={this.state.isCreating}
                          onClick={() => this.handleStep(0)}
                          style={{
                            background: this.state.isSuccess
                              ? green[500]
                              : undefined,
                          }}
                        >
                          {`${t("Back")}`}
                        </Button>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </Dialog>
      </div>)
    );
  }
}

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewUserGroup)
);
