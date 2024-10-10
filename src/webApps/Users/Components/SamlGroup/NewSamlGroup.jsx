import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Slide,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  withStyles,
} from "@mui/styles";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import { Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import PermissionIcon from "@mui/icons-material/AccessibilityNewRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { withTranslation } from "react-i18next";
import Transfer from "../../../Shared/TransferList/Transfer";
import ApiHandler from "../../../../services/ApiHandler";
import Grid from "@mui/material/Grid";
import Permits from "../Register/UserPermissions";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepButton from "@mui/material/StepButton";
import Chip from "@mui/material/Chip";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import TextField from "@mui/material/TextField";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import { createSamlPermits } from "../../../../actions/Users/user_actions";
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
class NewSamlGroup extends React.Component {
  constructor(props) {
    super(props);
    const { elementOnEdit, isADGroup, isEdit } = props;
    this.state = {
      newSamlGroup: elementOnEdit ? elementOnEdit : { attributes: [] },
      newGroup: {},
      permits: elementOnEdit
        ? this.setPermits(elementOnEdit)
        : { 1: [], 2: [], 3: [], 4: [] },
      formErrors: {},
      newAttribute: {},
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

  handleUpdate = () => {
    const { permits, newSamlGroup } = this.state;
    const { t, createSamlPermits } = this.props;
    let newPermits = { 1: [], 2: [], 3: [], 4: [] };
    let newAttributes = {};
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
      ...newSamlGroup,
      permits: newPermits,
    };
    ApiHandler.AMSuite.User.CreateAMSuiteGroup(group)
      .then(() => {
        this.setState({
          isCreating: false,
          isSuccess: true,
          open: false,
        });
        SnackbarHandler.showMessage(t("SuccessUpdateGroup") + "!");
        // setTimeout(() => {
        //   this.setState({
        //     isSuccess: false,
        //     newADGroups: initValuesADGroups,
        //     permits: [],
        //     currentStep: 0
        //   });
        //   this.props.handleElementCreated();
        // }, 1000);
      })
      .catch(({ error }) => {
        SnackbarHandler.showMessage(error.message, "error");
        this.setState({
          isCreating: false,
          isSuccess: false,
        });
      });
  };

  handleCreate = () => {
    const { permits, newSamlGroup } = this.state;
    const { t, createSamlPermits } = this.props;
    let newPermits = { 1: [], 2: [], 3: [], 4: [] };
    let newAttributes = {};
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
    newSamlGroup.attributes.map((value) => {
      newAttributes = {
        ...newAttributes,
        [value.attribute]: value.value,
      };
      return 0;
    });
    const group = {
      permits: newPermits,
      attributes: newAttributes,
    };
    createSamlPermits(group);
    this.onClose();
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
    const { isEdit } = this.props;
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    if (isEdit) {
      this.setState(({ newSamlGroup }) => ({
        newSamlGroup: {
          ...newSamlGroup,
          [name]: value,
        },
      }));
    } else {
      this.setState(({ newGroup }) => ({
        newGroup: {
          ...newGroup,
          [name]: value,
        },
      }));
    }
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

  onClose = () => {
    this.props.handleClose();
  };
  validate = () => {
    const { newGroup } = this.state;

    let unique = isValueEmptyOrNull(
      this.state.newSamlGroup.attributes.find(
        (att) =>
          att.attribute === newGroup.attribute && att.value === newGroup.value
      )
    );

    return {
      atributo: isValueEmptyOrNull(newGroup.attribute),
      value: isValueEmptyOrNull(newGroup.value),
      notUnique: !unique,
    };
  };

  agregarAtributo = () => {
    const errors = this.validate();
    if (!Object.keys(errors).some((x) => errors[x])) {
      const { newGroup } = this.state;
      this.setState((prevState) => ({
        newGroup: {},
        newSamlGroup: {
          ...prevState.newSamlGroup,
          attributes: [...prevState.newSamlGroup.attributes, newGroup],
        },
      }));
    } else if (errors.notUnique) {
      SnackbarHandler.showMessage("Alrredy exist", "error");
    }
  };
  handleDelete = (att) => {
    let updateAttributes = this.state.newSamlGroup.attributes.filter(
      (a) => a.attribute !== att.attribute || a.value !== att.value
    );
    this.setState((prevState) => ({
      newSamlGroup: {
        ...prevState.newSamlGroup,
        attributes: updateAttributes,
      },
    }));
  };

  render() {
    const { newSamlGroup, newGroup } = this.state;
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
                {isEdit ? t("GroupEdition") : t("NewGroup")}
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
                  onClick={isEdit ? this.handleUpdate : this.handleCreate}
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
              <Grid container spacing={24}>
                <Grid
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid item xs={12} md={12}>
                    <div className={classes.avatarDiv}>
                      <Avatar className={classes.avatar}>
                        <PermissionIcon />
                      </Avatar>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography
                      component="h1"
                      variant="h5"
                      className={classes.customTitle}
                    >
                      {t("Permissions")}
                    </Typography>
                  </Grid>
                  <div style={{ width: "100%", marginBottom: 14 }}>
                    <Divider className={classes.customDivider} />
                    {/* {isLoading && <LinearProgress style={{ height: 1 }} />} */}
                  </div>
                  {isEdit ? (
                    <Grid container spacing={24} xs={8} md={8}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          style={{ width: "100%" }}
                          label={t("attribute")}
                          value={newSamlGroup.attribute}
                          fullWidth
                          onChange={this.handleChange("attribute")}
                          helperText={t("inputEmpty")}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.userName ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          style={{ width: "100%" }}
                          label={t("value")}
                          value={newSamlGroup.value}
                          fullWidth
                          onChange={this.handleChange("value")}
                          helperText={t("inputEmpty")}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.userName ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.name}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={24} xs={8} md={8}>
                      <Grid item xs={12} md={5}>
                        <TextField
                          required
                          style={{ width: "100%" }}
                          label={t("attribute")}
                          value={newGroup.attribute ? newGroup.attribute : ""}
                          fullWidth
                          onChange={this.handleChange("attribute")}
                          helperText={t("inputEmpty")}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.userName ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <TextField
                          required
                          style={{ width: "100%" }}
                          label={t("value")}
                          value={newGroup.value ? newGroup.value : ""}
                          fullWidth
                          onChange={this.handleChange("value")}
                          helperText={t("inputEmpty")}
                          FormHelperTextProps={{
                            style: {
                              opacity: this.state.formErrors.userName ? 1 : 0,
                            },
                          }}
                          error={this.state.formErrors.name}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} style={{ paddingTop: 30 }}>
                        <Button
                          onClick={this.agregarAtributo}
                          fullWidth
                          variant="contained"
                          color="primary"
                          // disabled={this.state.isCreating}
                          className={classes.customButton}
                          style={{
                            background: this.state.isSuccess
                              ? green[500]
                              : undefined,
                          }}
                        >
                          {t("Add")}
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                  <Grid container spacing={35} xs={12} md={8}>
                    {!isEdit &&
                      newSamlGroup.attributes.map((att) => (
                        <Chip
                          label={`${att.attribute}:${att.value}`}
                          className={classes.chip}
                          onDelete={(data) => this.handleDelete(att)}
                        />
                      ))}
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Permits
                      updateEntities={this.updateEntities}
                      hideHeader={true}
                      permissionsSelected={this.state.permits}
                      handlePermissionChange={this.handlePermissionChange}
                      {...this.props}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* </Grid> */}
            </div>
          </div>
        </Dialog>
      </div>)
    );
  }
}

const mapDispatchToProps = {
  createSamlPermits,
};

const mapStateToProps = ({}) => {
  return {};
};

const NewSamlGroupConnected = connect(null, mapDispatchToProps)(NewSamlGroup);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewSamlGroupConnected)
);
