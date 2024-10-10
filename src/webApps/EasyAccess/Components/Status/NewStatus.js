import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import StatusIcon from "@mui/icons-material/LibraryAddRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import PlusIcon from "@mui/icons-material/AddRounded";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import { connect } from "react-redux";
import {
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  IconButton,
  FormHelperText,
  LinearProgress,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import classnames from "classnames";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import { withTranslation } from "react-i18next";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import {
  requestGetStatusById,
  requestEditStatus,
  requestCreateStatus,
  requestResetData,
} from "../../../../actions/EasyAccess/status_actions";
import styles from "../../../../assets/styles/EasyAccess_styles/Status_styles/newStatusStyles";

const formValues = {
  name: "",
  changeBadgeStatus: false,
  changeStatusOnReader: false,
  unassignBadge: false,
  allEnterprises: true,
  enterprises: [],
  readers: [],
  badgeTypes: [],
};

class NewStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEnterprises: true,
      openDialogEnterprises: false,
      showReaders: true,
      openDialogReaders: false,
      showBadgeTypes: true,
      openDialogBadgeTypes: false,
      isLoadingBadgeStatus: true,
      isLoadingPersonStatus: true,
      newStatus: formValues,
      formErrors: {},
    };
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
    //this.loadBadgeStatus();
    //this.loadPersonStatus();
    if (this.props.isEdit || this.props.isDetails) {
      this.props.requestGetStatusById(this.state.id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.loadingGetStatuses !== prevState.loadingGetStatuses ||
      nextProps.successGetStatuses !== prevState.successGetStatuses ||
      nextProps.successCreateStatus !== prevState.successCreateStatus ||
      nextProps.successEditStatus !== prevState.successEditStatus ||
      nextProps.successGetStatusById !== prevState.successGetStatusById ||
      nextProps.id !== prevState.id ||
      nextProps.loadingCreateStatus !== prevState.isCreating
    ) {
      return {
        id: nextProps.id,
        loadingGetStatuses: nextProps.loadingGetStatuses,
        successGetStatuses: nextProps.successGetStatuses,
        successCreateStatus: nextProps.successCreateStatus,
        successEditStatus: nextProps.successEditStatus,
        successGetStatusById: nextProps.successGetStatusById,
        data: nextProps.data,
        dataCount: nextProps.dataCount,
        newStatus: nextProps.statusById
          ? nextProps.statusById
          : prevState.newStatus,
        isCreating: nextProps.loadingCreateStatus,
        isSuccess: nextProps.successCreateStatus || nextProps.successEditStatus,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (
      this.state.successEditStatus &&
      prevState.successEditStatus !== this.state.successEditStatus
    ) {
      SnackbarHandler.showMessage(t("editSuccessStatus"));
      this.resetData();
      this.props.updateParent();
      this.props.onCreate();
    }
    if (
      this.state.successCreateStatus &&
      prevState.successCreateStatus !== this.state.successCreateStatus
    ) {
      SnackbarHandler.showMessage(t("createSuccessStatus"));
      this.resetData();
    }
  }

  resetData = () => {
    this.props.requestResetData();
    this.setState({ newStatus: formValues });
  };

  handleEnterprisesSelected = (enterprises) => {
    this.setState((prevState) => ({
      openDialogEnterprises: false,
      newStatus: {
        ...prevState.newStatus,
        enterprises: enterprises,
      },
    }));
  };

  handleReadersSelected = (readers) => {
    this.setState((prevState) => ({
      openDialogReaders: false,
      newStatus: {
        ...prevState.newStatus,
        readers: readers,
      },
    }));
  };

  handleBadgeTypesSelected = (badgeTypes) => {
    this.setState((prevState) => ({
      openDialogBadgeTypes: false,
      newStatus: {
        ...prevState.newStatus,
        badgeTypes: badgeTypes,
      },
    }));
  };

  handleOpenEnterprises = () => {
    this.setState({
      openDialogEnterprises: true,
    });
  };

  handleOpenReaders = () => {
    this.setState({
      openDialogReaders: true,
    });
  };

  handleOpenBadgeTypes = () => {
    this.setState({
      openDialogBadgeTypes: true,
    });
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newStatus: {
        ...prevState.newStatus,
        [name]: value,
      },
    }));
  };

  handleChangeBoolean = (name) => (event) => {
    let value = event.currentTarget.checked;
    this.setState((prevState) => ({
      newStatus: {
        ...prevState.newStatus,
        [name]: value,
        enterprises:
          name === "allEnterprises" && value
            ? []
            : prevState.newStatus.enterprises,
        readers:
          name === "changeStatusOnReader" && value
            ? []
            : prevState.newStatus.readers,
        badgeTypes:
          name === "changeStatusOnReader" && value
            ? []
            : prevState.newStatus.badgeTypes,
      },
    }));
  };

  handleEdit = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      });
      let newStatus = JSON.parse(JSON.stringify(this.state.newStatus));
      newStatus.enterprises = newStatus.allEnterprises
        ? []
        : newStatus.enterprises.map((b) => b.id);
      newStatus.readers = newStatus.changeStatusOnReader
        ? newStatus.readers.map((b) => b.id)
        : [];
      newStatus.badgeTypes = newStatus.changeStatusOnReader
        ? newStatus.badgeTypes.map((b) => b.id)
        : [];
      this.props.requestEditStatus(newStatus);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      });
      let newStatus = JSON.parse(JSON.stringify(this.state.newStatus));
      newStatus.enterprises = newStatus.allEnterprises
        ? []
        : newStatus.enterprises.map((b) => b.id);
      newStatus.readers = newStatus.changeStatusOnReader
        ? newStatus.readers.map((b) => b.id)
        : [];
      newStatus.badgeTypes = newStatus.changeStatusOnReader
        ? newStatus.badgeTypes.map((b) => b.id)
        : [];
      this.props.requestCreateStatus(newStatus);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  validateCreate = () => {
    const { newStatus } = this.state;
    return {
      name: isValueEmptyOrNull(newStatus.name),
      personStatus:
        newStatus.changeStatusOnReader &&
        (isValueEmptyOrNull(newStatus.personStatus) ||
          newStatus.personStatus < 0),
      badgeStatus:
        newStatus.changeBadgeStatus &&
        isValueEmptyOrNull(newStatus.badgeStatus || newStatus.badgeStatus < 0),
    };
  };

  renderEnterprises = () => {
    const { classes, isDetails, t } = this.props;
    const { newStatus } = this.state;

    if (isValueEmptyOrNull(newStatus.enterprises)) {
      return <span />;
    } else
      return (
        (<List className={classes.listRoot}>
          <ListItem style={{ padding: 0 }} disabled={newStatus.allEnterprises}>
            {!isDetails && (
              <Fab
                size="small"
                color="default"
                onClick={this.handleOpenEnterprises}
                disabled={newStatus.allEnterprises}
                className={classes.fab}
              >
                <PlusIcon className={classes.fabIcon} />
              </Fab>
            )}
            <ListItemText
              inset
              primary={
                t("enterprises") +
                (newStatus.enterprises.length !== 0
                  ? ": " + newStatus.enterprises.length
                  : "")
              }
            />
            {
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.showEnterprises,
                })}
                disabled={newStatus.enterprises.length === 0}
                onClick={() =>
                  this.setState({
                    showEnterprises: !this.state.showEnterprises,
                  })
                }
                size="large">
                <ExpandMore />
              </IconButton>
            }
          </ListItem>
          <Collapse
            in={this.state.showEnterprises}
            timeout="auto"
            unmountOnExit
          >
            <List dense component="div" disablePadding>
              {newStatus.enterprises.map((enterprise) => (
                <ListItem key={enterprise.id} className={classes.nested}>
                  <ListItemIcon>
                    <ChevronIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={enterprise.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>)
      );
  };

  renderReaders = () => {
    const { classes, isDetails, t } = this.props;
    const { newStatus } = this.state;

    if (isValueEmptyOrNull(newStatus.readers)) return <span />;
    else
      return (
        (<List className={classes.listRoot}>
          <ListItem style={{ padding: 0 }}>
            {!isDetails && (
              <Fab
                size="small"
                color="default"
                onClick={this.handleOpenReaders}
                className={classes.fab}
              >
                <PlusIcon className={classes.fabIcon} />
              </Fab>
            )}
            <ListItemText
              inset
              primary={
                t("Readers") +
                (newStatus.readers.length !== 0
                  ? ": " + newStatus.readers.length
                  : "")
              }
            />
            {
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.showReaders,
                })}
                disabled={newStatus.readers.length === 0}
                onClick={() =>
                  this.setState({ showReaders: !this.state.showReaders })
                }
                size="large">
                <ExpandMore />
              </IconButton>
            }
          </ListItem>
          <Collapse in={this.state.showReaders} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              {newStatus.readers.map((reader) => (
                <ListItem key={reader.id} className={classes.nested}>
                  <ListItemIcon>
                    <ChevronIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={reader.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>)
      );
  };

  renderBadgeTypes = () => {
    const { classes, isDetails, t } = this.props;
    const { newStatus } = this.state;

    if (isValueEmptyOrNull(newStatus.badgeTypes)) return <span />;
    return (
      (<List className={classes.listRoot}>
        <ListItem style={{ padding: 0 }}>
          {!isDetails && (
            <Fab
              size="small"
              color="default"
              onClick={this.handleOpenBadgeTypes}
              className={classes.fab}
            >
              <PlusIcon className={classes.fabIcon} />
            </Fab>
          )}
          <ListItemText
            inset
            primary={
              t("Types") +
              (newStatus.badgeTypes.length !== 0
                ? ": " + newStatus.badgeTypes.length
                : "")
            }
          />
          {
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.showBadgeTypes,
              })}
              disabled={newStatus.badgeTypes.length === 0}
              onClick={() =>
                this.setState({ showBadgeTypes: !this.state.showBadgeTypes })
              }
              size="large">
              <ExpandMore />
            </IconButton>
          }
        </ListItem>
        <Collapse in={this.state.showBadgeTypes} timeout="auto" unmountOnExit>
          <List dense component="div" disablePadding>
            {newStatus.badgeTypes.map((badgeType) => (
              <ListItem key={badgeType.id} className={classes.nested}>
                <ListItemIcon>
                  <ChevronIcon />
                </ListItemIcon>
                <ListItemText inset primary={badgeType.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>)
    );
  };

  render() {
    const { classes, isDialog, isEdit, isDetails, theme, t } = this.props;
    const {
      newStatus,
      openDialogEnterprises,
      personStatusSuggestions,
      isLoadingPersonStatus,
      badgeStatusSuggestions,
      isLoadingBadgeStatus,
    } = this.state;
    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };

    return (
      <main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <StatusIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isEdit
                ? t("EditingStatus")
                : isDetails
                ? t("DetailsStatus")
                : t("NewStatus")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  label={t("name")}
                  value={newStatus.name}
                  fullWidth
                  onChange={this.handleChange("name")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 },
                  }}
                  error={this.state.formErrors.name}
                  disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newStatus.unassignBadge}
                      onChange={this.handleChangeBoolean("unassignBadge")}
                      value="unassignBadge"
                      color="primary"
                    />
                  }
                  labelPlacement="end"
                  label={t("FreeBadges")}
                  style={{ cursor: "default" }}
                  disabled={isDetails}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                style={{ paddingTop: 0 }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={newStatus.allEnterprises}
                      onChange={this.handleChangeBoolean("allEnterprises")}
                      value="allEnterprises"
                      color="primary"
                    />
                  }
                  labelPlacement="end"
                  label={t("Visibility")}
                  style={{
                    cursor: "default",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  disabled={
                    (isEdit &&
                      !newStatus.allEnterprises &&
                      !newStatus.enterprises) ||
                    isDetails
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component="h1" variant="subtitle1">
                      {!newStatus.allEnterprises
                        ? t("SpecificEnterprises")
                        : t("AllEnteprises")}
                    </Typography>
                    {isValueEmptyOrNull(newStatus.enterprises) && (
                      <CircularProgress
                        size={20}
                        style={{ color: theme.palette.text.main }}
                      />
                    )}
                  </div>
                  <Divider style={{ marginBottom: 10 }} />
                  {this.renderEnterprises()}
                </div>
              </Grid>
              {this.state.ocultar && (
                <Grid item xs={12} md={6} className={classes.grid}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={newStatus.changeBadgeStatus}
                        onChange={this.handleChangeBoolean("changeBadgeStatus")}
                        value="changeBadgeStatus"
                        color="primary"
                      />
                    }
                    labelPlacement="end"
                    label={t("ModifyStatusBadge")}
                    style={{
                      cursor: "default",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                    disabled={isDetails}
                  />
                </Grid>
              )}

              {newStatus.changeBadgeStatus && (
                <Grid item xs={12} md={6} className={classes.grid}>
                  <div
                    style={{
                      opacity: newStatus.changeBadgeStatus ? 1 : 0,
                      transition: "opacity 0.2s ease-in-out",
                    }}
                  >
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      options={badgeStatusSuggestions}
                      components={components}
                      onChange={this.handleChange("badgeStatus")}
                      placeholder={
                        newStatus.badgeStatus !== -1
                          ? newStatus.badgeStatusName
                          : t("changeStatusBadgeTo")
                      }
                      maxMenuHeight={200}
                      isLoading={isLoadingBadgeStatus}
                      isDisabled={isLoadingBadgeStatus || isDetails}
                    />
                    <FormHelperText
                      style={{
                        opacity: this.state.formErrors.badgeStatus ? 1 : 0,
                      }}
                      error={this.state.formErrors.badgeStatus}
                    >
                      {t("inputEmpty")}
                    </FormHelperText>
                  </div>
                </Grid>
              )}
              {this.state.ocultar && (
                <div>
                  <Grid item xs={12} md={6} className={classes.grid}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={newStatus.changeStatusOnReader}
                          onChange={this.handleChangeBoolean(
                            "changeStatusOnReader"
                          )}
                          value="changeStatusOnReader"
                          color="primary"
                        />
                      }
                      labelPlacement="start"
                      label={t("ModifyStatusWhenPassForReader")}
                      style={{
                        cursor: "default",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                      disabled={isDetails}
                    />
                  </Grid>
                  <Collapse
                    in={newStatus.changeStatusOnReader}
                    timeout="auto"
                    unmountOnExit
                    style={{ width: "100%", paddingRight: 24, paddingLeft: 24 }}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      md={12}
                      className={classes.innerForm}
                    >
                      <Grid item xs={12} md={12}>
                        <Select
                          classes={classes}
                          styles={selectStyles}
                          options={personStatusSuggestions}
                          components={components}
                          value={this.state.personStatus}
                          onChange={this.handleChange("personStatus")}
                          placeholder={
                            newStatus.personStatus !== -1
                              ? newStatus.personStatusName
                              : t("SelectNewStatus")
                          }
                          maxMenuHeight={200}
                          isLoading={isLoadingPersonStatus}
                          isDisabled={isLoadingPersonStatus || isDetails}
                        />
                        <FormHelperText
                          style={{
                            opacity: this.state.formErrors.personStatus ? 1 : 0,
                          }}
                          error={this.state.formErrors.personStatus}
                        >
                          {t("inputEmpty")}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.grid}>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingRight: 15,
                            }}
                          >
                            <Typography component="h1" variant="subtitle1">
                              {t("Readers")}
                            </Typography>
                            {isValueEmptyOrNull(newStatus.readers) && (
                              <CircularProgress
                                size={20}
                                style={{ color: theme.palette.text.main }}
                              />
                            )}
                          </div>
                          <Divider style={{ marginBottom: 10 }} />
                          {this.renderReaders()}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} className={classes.grid}>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography component="h1" variant="subtitle1">
                              {t("BadgeType")}
                            </Typography>
                            {isValueEmptyOrNull(newStatus.badgeTypes) && (
                              <CircularProgress
                                size={20}
                                style={{ color: theme.palette.text.main }}
                              />
                            )}
                          </div>
                          <Divider style={{ marginBottom: 10 }} />
                          {this.renderBadgeTypes()}
                        </div>
                      </Grid>
                    </Grid>
                  </Collapse>
                </div>
              )}
            </Grid>
            {!isDetails && (
              <div
                className={classes.submit}
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={this.state.isCreating}
                  onClick={
                    this.state.isCreating
                      ? undefined
                      : isEdit
                      ? this.handleEdit
                      : this.handleCreate
                  }
                  style={{
                    background: this.state.isSuccess ? green[500] : undefined,
                    color: theme.palette.text.main,
                  }}
                >
                  {this.state.isSuccess
                    ? isEdit
                      ? t("successEdit")
                      : t("successCreate")
                    : this.state.isCreating
                    ? ""
                    : isEdit
                    ? t("editStatus")
                    : t("CreateStatus")}
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
                      color: theme.palette.text.main,
                    }}
                  />
                )}
              </div>
            )}
          </Paper>
          {!isValueEmptyOrNull(newStatus.enterprises) && (
            <DataTableDialogAction
              open={openDialogEnterprises}
              onConfirm={this.handleEnterprisesSelected}
              onClose={() => this.setState({ openDialogEnterprises: false })}
              title={t("ManageEnterprise")}
              subTitle={t("SelectEnterpriseToAssign")}
              loadDataAction={this.props.requestEnterprises}
              rowsSelected={newStatus.enterprises}
              multipleSelect={true}
              info={this.props.enterprises}
              success={this.props.successEnterprise}
              loading={this.props.isLoadingEnterprises}
              columns={[
                {
                  name: t("name"),
                  field: "name",
                  options: {
                    filter: true,
                    sort: true,
                    sortDirection: "asc",
                  },
                },
                {
                  name: t("RUT"),
                  field: "rut",
                  options: {
                    filter: true,
                    sort: true,
                  },
                },
              ]}
            />
          )}
        </div>
      </main>
    );
  }
}

NewStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Enterprise, Status }) => {
  return {
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
    isLoadingEnterprises: Enterprise.loading,
    successGetStatuses: Status.successGetStatuses,
    loadingGetStatuses: Status.loading,
    successGetStatusById: Status.successGetStatusById,
    statusById: Status.statusById,
    successEditStatus: Status.successEditStatus,
    successCreateStatus: Status.successCreateStatus,
    data: Status.statuses ? Status.statuses.data : [],
    dataCount: Status.statuses ? Status.statuses.dataCount : 0,
    loadingCreateStatus: Status.loadingCreateStatus,
  };
};

const mapDispatchToProps = {
  requestEnterprises,
  requestGetStatusById,
  requestEditStatus,
  requestCreateStatus,
  requestResetData,
};

const NewStatusConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStatus);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewStatusConnected)
);
