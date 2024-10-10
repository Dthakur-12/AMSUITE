import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { isNullOrUndefined } from "util";
import PlusIcon from "@mui/icons-material/AddRounded";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import LinearProgress from "@mui/material/LinearProgress";
import { List, Badge } from "@mui/material";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import NavBarAccesControl from "../../utils/NavBarAccessControl";
import Fab from "@mui/material/Fab";
import { withTranslation } from "react-i18next";
import {
  requestEditPanel,
  requestCreatePanel,
  requestGetById,
  requestGetReaderModes,
} from "../../../../actions/AccessControl/panel_actions";
import { requestBadges } from "../../../../actions/EasyAccess/Badges_actions";
import { connect } from "react-redux";
import styles from "../../../../assets/styles/AccessControl_styles/Panel_styles/newPanelStyles";
//import { purple } from "@mui/material/colors";
const formValues = {
  panelID: "",
  name: "",
  active: false,
  mode: 0,
  type: 1,
  entry: "",
  exit: "",
  panelType: 1,
  badge: undefined,
  readerMode: undefined,
};

const CustomSwitch = withStyles({
  switchBase: {
    color: "#bdbdbd !important",
    "&$checked": {
      color: "#296084 !important",
    },
  },
  checked: {},
  bar: {
    "&$checked": {
      backgroundColor: "#296084 !important",
      opacity: "1 !important",
    },
  },
})(Switch);

class NewPanel extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;

    this.state = {
      openDialogBadges: false,
      newPanel: initValues ? initValues : formValues,
      entranceReader: false,
      exitReader: false,
      active: false,
      deferred: false,
      formErrors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetById !== prevState.successGetById ||
      nextProps.successCreatePanel !== prevState.successCreatePanel ||
      nextProps.successEditPanel !== prevState.successEditPanel ||
      nextProps.loadingReaderModes !== prevState.loadingReaderModes
    ) {
      return {
        language: nextProps.i18n.language,
        successGetById: nextProps.successGetById,
        successCreatePanel: nextProps.successCreatePanel,
        successEditPanel: nextProps.successEditPanel,
        loadingReaderModes: nextProps.loadingReaderModes,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (
      this.state.successEditPanel &&
      prevState.successEditPanel !== this.state.successEditPanel
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      SnackbarHandler.showMessage(t("SuccessEditPanel"));
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          isCreating: false,
          newPanel: formValues,
          entranceReader: false,
          exitReader: false,
          active: false,
          deferred: false,
        });
        this.props.updateParent();
        this.props.onEdit();
      }, 500);
    }
    if (
      this.state.successCreatePanel &&
      prevState.successCreatePanel !== this.state.successCreatePanel
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      SnackbarHandler.showMessage(t("SuccessCreatePanel"));
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          isCreating: false,
          newPanel: formValues,
          entranceReader: false,
          exitReader: false,
          active: false,
        });
        this.actualizeReadersName("");
      }, 1000);
    }
    if (
      this.state.successGetById &&
      prevState.successGetById !== this.state.successGetById
    ) {
      const { panelById } = this.props;
      this.setState(
        (prevState) => ({
          deferred: panelById.mode === 1,
          newPanel: {
            ...prevState.newPanel,
            entranceReader: panelById.entranceName,
            mode: panelById.mode,
            exitReader: panelById.exitName,
            type: 1,
            panelType: 1,
            active: panelById.active,
            badge: panelById.badgeId
              ? { id: panelById.badgeId, number: panelById.badgeNumber }
              : undefined,
            readerModeObject: panelById.readerMode
              ? {
                  id: panelById.readerMode,
                  name: panelById.readerModeName,
                }
              : undefined,
          },
          entranceReader: !isValueEmptyOrNull(panelById.entranceName),
          exitReader: !isValueEmptyOrNull(panelById.exitName),
          active: panelById.active,
        }),
        () => this.initReadersName(this.state.newPanel.name)
      );
    }
  }

  actualizeReadersName = (value) => {
    const { t } = this.props;
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        entranceReader: `${value} ${t("EntranceReaderNameEnd")}`,
        exitReader: `${value} ${t("ExitReaderNameEnd")}`,
      },
    }));
  };

  initReadersName = (value) => {
    const { t } = this.props;
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        entranceReader: isNullOrUndefined(prevState.newPanel.entranceReader)
          ? `${value} ${t("EntranceReaderNameEnd")}`
          : prevState.newPanel.entranceReader,
        exitReader: isNullOrUndefined(prevState.newPanel.exitReader)
          ? `${value} ${t("ExitReaderNameEnd")}`
          : prevState.newPanel.exitReader,
      },
    }));
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
    NavBarAccesControl.hideLoader();
    if (this.props.isEdit || this.props.isDetails) {
      const { newPanel } = this.state;
      this.props.requestGetById(newPanel.id);
    }
  }

  handleBadgesSelected = (badge) => {
    this.setState((prevState) => ({
      openDialogBadges: false,
      newPanel: {
        ...prevState.newPanel,
        badge: badge,
      },
    }));
  };

  handleReaderModeSelected = (readerMode) => {
    this.setState((prevState) => ({
      openDialogLibraries: false,
      newPanel: {
        ...prevState.newPanel,
        readerMode,
        readerModeObject: readerMode,
      },
    }));
  };

  handleChangeBoolean = (name) => (event) => {
    let value = event.currentTarget.checked;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleOpenBadges = () => {
    this.setState({
      openDialogBadges: true,
    });
  };

  handleReaderNameChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        [name]: value,
      },
    }));
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    if (!this.props.isEdit) this.actualizeReadersName(value);
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        [name]: value,
      },
    }));
  };

  validateCreate = () => {
    const { newPanel } = this.state;
    return {
      name: isValueEmptyOrNull(newPanel.name),
      entranceReader:
        this.state.entranceReader &&
        isValueEmptyOrNull(newPanel.entranceReader),
      exitReader:
        this.state.exitReader && isValueEmptyOrNull(newPanel.exitReader),
    };
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      let newPanel = JSON.parse(JSON.stringify(this.state.newPanel));
      newPanel.badgeId = newPanel.badge ? newPanel.badge.id : 0;
      newPanel.readerMode = newPanel.readerModeObject
        ? newPanel.readerModeObject.id
        : -1;
      newPanel.entranceName = this.state.entranceReader
        ? newPanel.entranceReader
        : "";
      newPanel.exitName = this.state.exitReader ? newPanel.exitReader : "";
      newPanel.active = this.state.active;
      newPanel.mode = this.state.deferred ? 1 : 0;
      this.setState({
        isCreating: true,
      });
      this.props.requestCreatePanel(newPanel);
    } else {
      SnackbarHandler.showMessage(t("inputEmpty"), "error");
    }
  };

  handleEdit = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      let newPanel = JSON.parse(JSON.stringify(this.state.newPanel));
      newPanel.badgeId = newPanel.badge ? newPanel.badge.id : 0;
      newPanel.readerMode = newPanel.readerModeObject
        ? newPanel.readerModeObject.id
        : newPanel.readerMode;
      newPanel.entranceName = this.state.entranceReader
        ? newPanel.entranceReader
        : "";
      newPanel.exitName = this.state.exitReader ? newPanel.exitReader : "";
      newPanel.active = this.state.active;
      newPanel.mode = this.state.deferred ? 1 : 0;

      this.setState({
        isCreating: true,
      });
      this.props.requestEditPanel(newPanel);
    } else {
      SnackbarHandler.showMessage(t("inputEmpty"), "error");
    }
  };

  renderBadge = () => {
    const { classes, isDetails, t } = this.props;
    const { newPanel } = this.state;

    return (
      <List className={classes.listRoot}>
        <ListItem style={{ padding: 0 }}>
          {!isDetails && (
            <Fab
              size="small"
              className={classes.customFab}
              onClick={this.handleOpenBadges}
            >
              <PlusIcon />
            </Fab>
          )}
          <ListItemText
            primary={newPanel.badge ? newPanel.badge.number : t("Unspecified")}
          />
        </ListItem>
      </List>
    );
  };

  render() {
    const { newPanel, openDialogBadges, openDialogLibraries } = this.state;
    const { classes, isDialog, isDetails, isEdit, t, theme } = this.props;

    return (
      (<main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isCreatinh ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.customFab}>
              {this.props.isEdit ? <EditIcon /> : <PlusIcon />}
            </Avatar>
            {this.props.isEdit ? (
              <Typography component="h1" variant="h5">
                {t("EditPanel")}
              </Typography>
            ) : (
              <Typography component="h1" variant="h5">
                {t("NewPanel")}
              </Typography>
            )}

            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid
                container
                item
                xs={12}
                md={4}
                spacing={24}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{ display: "inline-block" }}
              >
                <Grid item xs={12} md={12}>
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
                        {t("AssociatedCard")}
                      </Typography>
                    </div>
                    <Divider style={{ marginBottom: 20 }} />
                    {this.renderBadge()}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  //style={{ marginTop: !this.state.isDesktop ? "40px" : "0px" }}
                >
                  {/* <DataTableSelectAction
                    handleConfirm={this.handleReaderModeSelected}
                    loadDataAction={this.props.requestGetReaderModes}
                    element={this.state.newPanel.readerModeObject}
                    primaryTitle={t("ReaderMode")}
                    title={t("ReaderMode")}
                    dataTableSubTitle={t("ReaderMode")}
                    mdSubtitle={3}
                    multipleSelect={false}
                    attribute={"name"}
                    info={this.props.readerModes}
                    success={this.props.loadingReaderModes}
                    loading={this.props.loadingReaderModes}
                    DataTableColumns={[
                      {
                        name: t("name"),
                        field: "name",
                        options: {
                          sort: true,
                          filter: true,
                        },
                      },
                    ]}
                  /> */}
                </Grid>
              </Grid>

              <Grid container item xs={12} md={8} spacing={24}>
                <Grid item xs={12} md={6} style={{ marginBottom: 5 }}>
                  <TextField
                    label={t("name")}
                    onChange={this.handleChange("name")}
                    required
                    fullWidth
                    value={newPanel.name}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.name ? 1 : 0 },
                    }}
                    error={this.state.formErrors.name}
                    InputProps={{
                      readOnly: isDetails,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  style={{
                    marginBottom: 5,
                    marginTop: !this.state.isDesktop ? "-45px" : "0px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <CustomSwitch
                        checked={this.state.active}
                        onChange={this.handleChangeBoolean("active")}
                        value={newPanel.active}
                        color="primary"
                      />
                    }
                    labelPlacement="end"
                    label={t("Active")}
                    style={{ marginTop: "6%", cursor: "default" }}
                    disabled={isDetails}
                  />
                </Grid>
                {/* <Grid
                  item
                  xs={12}
                  md={3}
                  style={{
                    marginBottom: 5,
                  }}
                >
                  <FormControlLabel
                    control={
                      <CustomSwitch
                        checked={this.state.deferred}
                        onChange={this.handleChangeBoolean("deferred")}
                        value={newPanel.deferred}
                        color="primary"
                      />
                    }
                    labelPlacement="end"
                    label={t("Deferred")}
                    style={{
                      marginTop: !this.state.isDesktop ? "-45px" : "6%",
                      cursor: "default",
                    }}
                    disabled={isDetails}
                  />
                </Grid> */}
                <Grid container style={{ marginBottom: 5, marginLeft: 12 }}>
                  <Typography variant="h6" style={{ width: "100%" }}>
                    {t("ReaderConfiguration")}
                  </Typography>
                  <Grid item xs={12} md={12}>
                    <Grid
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={this.state.entranceReader}
                              onChange={this.handleChangeBoolean(
                                "entranceReader"
                              )}
                              value={this.state.entranceReader}
                              color="primary"
                            />
                          }
                          labelPlacement="end"
                          label={t("EntranceReader")}
                          style={{
                            cursor: "default",
                            margin: 0,
                            marginLeft: "-15px",
                          }}
                          disabled={isDetails}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {this.state.entranceReader && (
                          <TextField
                            id="outlined-dense"
                            label={t("name")}
                            className={classes.readersName}
                            margin="dense"
                            variant="outlined"
                            value={
                              !isNullOrUndefined(
                                this.state.newPanel.entranceReader
                              )
                                ? this.state.newPanel.entranceReader
                                : ""
                            }
                            onChange={this.handleReaderNameChange}
                            name={"entranceReader"}
                            error={this.state.formErrors.entranceReader}
                            InputProps={{
                              readOnly: isDetails,
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Grid
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Grid item xs={12} md={4}>
                        <FormControlLabel
                          control={
                            <CustomSwitch
                              checked={this.state.exitReader}
                              onChange={this.handleChangeBoolean("exitReader")}
                              value={this.state.exitReader}
                              color="primary"
                            />
                          }
                          labelPlacement="end"
                          label={t("ExitReader")}
                          style={{
                            cursor: "default",
                            margin: 0,
                            marginLeft: "-15px",
                          }}
                          disabled={isDetails}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        {this.state.exitReader && (
                          <TextField
                            id="outlined-dense"
                            label={t("name")}
                            className={classes.readersName}
                            margin="dense"
                            variant="outlined"
                            value={
                              !isNullOrUndefined(this.state.newPanel.exitReader)
                                ? this.state.newPanel.exitReader
                                : ""
                            }
                            name={"exitReader"}
                            onChange={this.handleReaderNameChange}
                            error={this.state.formErrors.exitReader}
                            InputProps={{
                              readOnly: isDetails,
                            }}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <DataTableSelectAction
                        handleConfirm={this.handleReaderModeSelected}
                        loadDataAction={this.props.requestGetReaderModes}
                        element={{
                          id: 0,
                          name: "Seat Assigment",
                        }}
                        primaryTitle={t("Working Mode")}
                        title={t("Working Mode")}
                        dataTableSubTitle={t("Working Mode")}
                        mdSubtitle={3}
                        multipleSelect={false}
                        attribute={"name"}
                        info={this.props.readerModes}
                        success={this.props.loadingReaderModes}
                        loading={this.props.loadingReaderModes}
                        DataTableColumns={[
                          {
                            name: t("name"),
                            field: "name",
                            options: {
                              sort: true,
                              filter: true,
                            },
                          },
                        ]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: 30 }}
            >
              <Grid xs={12} md={3}>
                <DataTableSelectAction
                  handleConfirm={this.handleReaderModeSelected}
                  loadDataAction={this.props.requestGetReaderModes}
                  element={{
                    id: 0,
                    name: "White Bus",
                  }}
                  primaryTitle={t("Capacity")}
                  title={t("Capacity")}
                  dataTableSubTitle={t("Capacity")}
                  mdSubtitle={3}
                  multipleSelect={false}
                  attribute={"name"}
                  info={this.props.readerModes}
                  success={this.props.loadingReaderModes}
                  loading={this.props.loadingReaderModes}
                  DataTableColumns={[
                    {
                      name: t("name"),
                      field: "name",
                      options: {
                        sort: true,
                        filter: true,
                      },
                    },
                  ]}
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DataTableSelectAction
                  handleConfirm={this.handleReaderModeSelected}
                  loadDataAction={this.props.requestGetReaderModes}
                  element={{
                    id: 0,
                    name: "Back Left to Front Right",
                  }}
                  primaryTitle={t("Assigment Algorithm")}
                  title={t("Assigment Algorithm")}
                  dataTableSubTitle={t("Assigment Algorithm")}
                  mdSubtitle={3}
                  multipleSelect={false}
                  attribute={"name"}
                  info={this.props.readerModes}
                  success={this.props.loadingReaderModes}
                  loading={this.props.loadingReaderModes}
                  DataTableColumns={[
                    {
                      name: t("name"),
                      field: "name",
                      options: {
                        sort: true,
                        filter: true,
                      },
                    },
                  ]}
                />
              </Grid>
              <Grid xs={12} md={3}>
                <DataTableSelectAction
                  handleConfirm={this.handleReaderModeSelected}
                  loadDataAction={this.props.requestGetReaderModes}
                  element={{
                    id: 0,
                    name: "50%",
                  }}
                  primaryTitle={t("Occupancy percentage")}
                  title={t("Occupancy percentage")}
                  dataTableSubTitle={t("Occupancy percentage")}
                  mdSubtitle={3}
                  multipleSelect={false}
                  attribute={"name"}
                  info={this.props.readerModes}
                  success={this.props.loadingReaderModes}
                  loading={this.props.loadingReaderModes}
                  DataTableColumns={[
                    {
                      name: t("name"),
                      field: "name",
                      options: {
                        sort: true,
                        filter: true,
                      },
                    },
                  ]}
                />
              </Grid>
            </Grid>

            {!isDetails && (
              <div
                className={classes.submit}
                style={{ position: "relative", width: "100%" }}
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
                    ? t("EditPanel")
                    : t("CreatePanel")}
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
            )}
          </Paper>
          <DataTableDialogAction
            open={openDialogBadges}
            onConfirm={this.handleBadgesSelected}
            onClose={() => this.setState({ openDialogBadges: false })}
            title={t("ManagerCards")}
            subTitle={t("selectAssignCard")}
            loadDataAction={this.props.requestBadges}
            info={this.props.badges}
            loading={this.props.loadingBadges}
            success={this.props.successBadges}
            rowsSelected={
              !isNullOrUndefined(newPanel.badge)
                ? [
                    {
                      index: newPanel.badge.index,
                      page: newPanel.badge.page,
                      data: newPanel.badge.data,
                    },
                  ]
                : []
            }
            columns={[
              {
                name: t("number"),
                field: "number",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc",
                },
              },
              {
                name: t("name"),
                field: "name",
                options: {
                  sort: true,
                  filter: true,
                  customBodyRender: (data) => {
                    if (data.Name)
                      return (
                        <Typography value={data.Name}>{data.Name}</Typography>
                      );
                    else return <Chip label={t("Unassgned")} color="default" />;
                  },
                },
              },
            ]}
          />
        </div>
      </main>)
    );
  }
}

NewPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

const mapStateToProps = (store) => {
  const { Panel, Badges } = store;
  return {
    successEditPanel: Panel.successEditPanel,
    successCreatePanel: Panel.successCreatePanel,
    successGetById: Panel.successGetById,
    loading: Panel.loading,
    panelById: Panel.panelById,
    badges: Badges.badges,
    successBadges: Badges.successBadges,
    loadingBadges: Badges.loading,
    loadingReaderModes: Panel.loadingReaderModes,
    readerModes: Panel.readerModes,
  };
};

const mapDispatchToPrps = {
  requestEditPanel,
  requestBadges,
  requestCreatePanel,
  requestGetById,
  requestGetReaderModes,
};

const newPanelConnected = connect(mapStateToProps, mapDispatchToPrps)(NewPanel);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(newPanelConnected)
);
