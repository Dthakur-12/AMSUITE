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
import { List, Badge, Slide, Dialog } from "@mui/material";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import NavBarAccesControl from "../../utils/NavBarAccessControl";
import Fab from "@mui/material/Fab";
import { withTranslation } from "react-i18next";
import BusCapacityForm from "./NewBusCapacity";
import {
  requestEditPanel,
  requestCreatePanel,
  requestGetById,
  requestGetReaderModes,
  requestGetWorkingModes,
  requestGetBusTypesCapacity,
  requestUpdateBusCapacity,
  requestDeleteBusCapacity,
} from "../../../../actions/AccessControl/panel_actions";
import { requestBadges } from "../../../../actions/EasyAccess/Badges_actions";
import { connect } from "react-redux";
import styles from "../../../../assets/styles/AccessControl_styles/Panel_styles/newPanelStyles";
//import { purple } from "@mui/material/colors";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
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
  occupancyPercentage: null,
  assignmentAlgorithm: null,
  busCapacityId: null,
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
    const { initValues, t } = props;
    this.state = {
      translateWorkingModes: [],
      openDialogBadges: false,
      openDialogNewBusCapacity: false,
      newPanel: initValues ? initValues : formValues,
      entranceReader: false,
      exitReader: false,
      active: false,
      deferred: false,
      formErrors: {},
      algortimsOptionsTranslate: [
        { id: 0, name: t("BackLeftToFrontRightWhite") },
        { id: 1, name: t("BackLeftToFrontRightCoach") },
        { id: 2, name: t("Dispersed") },
        { id: 3, name: "Back to Front - FH COACH B2F BUS" },
        { id: 4, name: "Back to Front - FH NC40 B2F BUS" },
        { id: 5, name: "Back to Front - FH NC44 B2F BUS" },
      ],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetById !== prevState.successGetById ||
      nextProps.successCreatePanel !== prevState.successCreatePanel ||
      nextProps.successEditPanel !== prevState.successEditPanel ||
      nextProps.loadingReaderModes !== prevState.loadingReaderModes ||
      nextProps.successWorkingModes !== prevState.successWorkingModes ||
      nextProps.loadingCreateorEdit !== prevState.loadingCreateorEdit ||
      nextProps.errorData !== prevState.errorData
    ) {
      return {
        language: nextProps.i18n.language,
        successGetById: nextProps.successGetById,
        successCreatePanel: nextProps.successCreatePanel,
        successEditPanel: nextProps.successEditPanel,
        loadingReaderModes: nextProps.loadingReaderModes,
        successWorkingModes: nextProps.successWorkingModes,
        loadingCreateorEdit: nextProps.loadingCreateorEdit,
        errorData: nextProps.errorData,
      };
    }
    return null;
  }
  translateWorkingModes = () => {
    const { t, workingModes = [] } = this.props;
    let translateWorkingModes = [];
    workingModes.map((elem) =>
      translateWorkingModes.push({ id: elem.id, name: t(elem.name) })
    );
    this.setState({ translateWorkingModes: translateWorkingModes });
  };

  componentDidUpdate(prevProps, prevState) {
    const { t, successDeleteBusCapacity } = this.props;
    const { newPanel, loadingCreateorEdit, errorData } = this.state;
    // if (newPanel.mode !== prevState.newPanel.mode) {

    // }

    if (
      successDeleteBusCapacity &&
      successDeleteBusCapacity !== prevProps.successDeleteBusCapacity
    ) {
      this.props.requestGetBusTypesCapacity({
        start: 0,
        length: 10,
        order: "name asc",
        search: "",
      });
      SnackbarHandler.showMessage(t("SuccessDelete"));
    }
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
    if (this.state.language !== prevState.language) {
      this.translateWorkingModes();
      if (newPanel.mode === 2) {
        this.setState({
          algortimsOptionsTranslate: [
            { id: 0, name: t("BackLeftToFrontRightWhite") },
            { id: 1, name: t("BackLeftToFrontRightCoach") },
            { id: 2, name: t("Dispersed") },
            { id: 3, name: "Back to Front - FH COACH B2F BUS" },
            { id: 4, name: "Back to Front - FH NC40 B2F BUS" },
            { id: 5, name: "Back to Front - FH NC44 B2F BUS" },
          ],
        });
      }
      if (newPanel.mode === 3) {
        this.setState({
          algortimsOptionsTranslate: [
            { id: 0, name: t("BackLeftToFrontRightWhite") },
            { id: 3, name: "Back to Front - FH COACH B2F BUS" },
            { id: 4, name: "Back to Front - FH NC40 B2F BUS" },
            { id: 5, name: "Back to Front - FH NC44 B2F BUS" },
          ],
        });
      }
    }
    if (
      this.state.successWorkingModes &&
      this.state.successWorkingModes !== prevState.successWorkingModes
    ) {
      this.translateWorkingModes();
    }
    if (
      !loadingCreateorEdit &&
      !(this.state.successCreatePanel || this.state.successEditPanel) &&
      prevState.loadingCreateorEdit !== this.state.loadingCreateorEdit
    ) {
      SnackbarHandler.showMessage(t(errorData), "error");
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          isCreating: false,
        });
      }, 1000);
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
            occupancyPercentage: !isNullOrUndefined(
              panelById.occupancyPercentage
            )
              ? panelById.occupancyPercentage
              : null,
            assignmentAlgorithm: !isNullOrUndefined(
              panelById.assignmentAlgorithm
            )
              ? panelById.assignmentAlgorithm
              : null,
            busCapacityId: !isNullOrUndefined(panelById.busCapacityId)
              ? panelById.busCapacityId
              : null,
            busCapacity: !isNullOrUndefined(panelById.busCapacityId)
              ? { id: panelById.busCapacityId, name: panelById.busCapacityName }
              : null,
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
          algortimsOptionsTranslate:
            panelById.mode === 2
              ? [
                  { id: 0, name: t("BackLeftToFrontRightWhite") },
                  { id: 1, name: t("BackLeftToFrontRightCoach") },
                  { id: 2, name: t("Dispersed") },
                  { id: 3, name: "Back to Front - FH COACH B2F BUS" },
                  { id: 4, name: "Back to Front - FH NC40 B2F BUS" },
                  { id: 5, name: "Back to Front - FH NC44 B2F BUS" },
                ]
              : panelById.mode === 3
              ? [
                  { id: 0, name: t("BackLeftToFrontRightWhite") },
                  { id: 3, name: "Back to Front - FH COACH B2F BUS" },
                  { id: 4, name: "Back to Front - FH NC40 B2F BUS" },
                  { id: 5, name: "Back to Front - FH NC44 B2F BUS" },
                ]
              : [],
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
  onCreateBusCapacity = () => {
    this.setState({ openDialogNewBusCapacity: false });
    // this.props.requestGetBusTypesCapacity({ search: "", order: "name asc" });
  };

  handleBadgesSelected = (badge) => {
    this.setState((prevState) => ({
      openDialogBadges: false,
      newPanel: {
        ...prevState.newPanel,
        badge: badge,
      },
    }));
  };
  handlePercentageSelected = (select) => {
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        occupancyPercentage: select.id,
      },
    }));
  };

  handleCapacitySelected = (select) => {
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        busCapacity: select ? select[0] : undefined,
        busCapacityId: select && select[0] ? select[0].id : undefined,
      },
    }));
  };

  handleWorkingModeSelected = (select) => {
    
    const { t } = this.props;
    // if (newPanel.mode === 2) {
    //   this.setState({
    //     algortimsOptionsTranslate: [
    //       { id: 0, name: t("BackLeftToFrontRight") },
    //       { id: 1, name: t("Dispersed") },
    //     ],
    //   });
    // }
    // if (newPanel.mode === 3) {
    //   this.setState({
    //     algortimsOptionsTranslate: [
    //       { id: 0, name: t("BackLeftToFrontRight") },
    //     ],
    //   });
    // }
    this.setState((prevState) => ({
      algortimsOptionsTranslate:
        select.id === 2
          ? [
              { id: 0, name: t("BackLeftToFrontRightWhite") },
              { id: 1, name: t("BackLeftToFrontRightCoach") },
              { id: 2, name: t("Dispersed") },
              { id: 3, name: "Back to Front - FH COACH B2F BUS" },
              { id: 4, name: "Back to Front - FH NC40 B2F BUS" },
              { id: 5, name: "Back to Front - FH NC44 B2F BUS" },
            ]
          : select.id === 3
          ? [
              { id: 0, name: t("BackLeftToFrontRightWhite") },
              { id: 3, name: "Back to Front - FH COACH B2F BUS" },
              { id: 4, name: "Back to Front - FH NC40 B2F BUS" },
              { id: 5, name: "Back to Front - FH NC44 B2F BUS" },
            ]
          : [],
      newPanel: {
        ...prevState.newPanel,
        mode: select.id,
        assignmentAlgorithm: undefined,
      },
    }));
  };

  handleAlgoritmSelected = (select) => {
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        assignmentAlgorithm: select.id,
        occupancyPercentage: undefined,
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
      newPanel.occupancyPercentage = !isNullOrUndefined(
        newPanel.occupancyPercentage
      )
        ? newPanel.occupancyPercentage
        : null;
      newPanel.assignmentAlgorithm = !isNullOrUndefined(
        newPanel.assignmentAlgorithm
      )
        ? newPanel.assignmentAlgorithm
        : null;
      newPanel.busCapacityId = !isNullOrUndefined(newPanel.busCapacityId)
        ? newPanel.busCapacityId
        : null;
      newPanel.mode = newPanel.mode;
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
      newPanel.occupancyPercentage = !isNullOrUndefined(
        newPanel.occupancyPercentage
      )
        ? newPanel.occupancyPercentage
        : null;
      newPanel.assignmentAlgorithm = !isNullOrUndefined(
        newPanel.assignmentAlgorithm
      )
        ? newPanel.assignmentAlgorithm
        : null;
      newPanel.busCapacityId = !isNullOrUndefined(newPanel.busCapacityId)
        ? newPanel.busCapacityId
        : null;
      newPanel.mode = newPanel.mode;

      this.setState({
        isCreating: true,
      });
      this.props.requestEditPanel(newPanel);
    } else {
      SnackbarHandler.showMessage(t("inputEmpty"), "error");
    }
  };

  handleUpdateBusCapacity = (busCapacity) => {
    this.setState({
      busCapacityToEdit: busCapacity,
    });
    // this.props.requestUpdateBusCapacity
  };

  handleDeleteBusCapacity = (ids) => {
    if (ids[0] === this.state.newPanel.busCapacityId) {
      this.setState((prevState) => ({
        newPanel: {
          ...prevState.newPanel,
          busCapacity: undefined,
          busCapacityId: undefined,
        },
      }));
    }
    this.props.requestDeleteBusCapacity(ids);
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
    const {
      newPanel,
      openDialogBadges,
      openDialogNewBusCapacity,
      translateWorkingModes,
      algortimsOptionsTranslate,
    } = this.state;
    const { classes, isDialog, isDetails, isEdit, t, theme } = this.props;
    const percentageOptions =
      newPanel.assignmentAlgorithm &&
      [3, 4, 5].includes(newPanel.assignmentAlgorithm)
        ? [
            {
              id: 25,
              name: "25%",
            },
            { id: 50, name: "50%" },
            { id: 100, name: "100% - No seat assignment" },
            { id: 101, name: "100% - Seat assignment" },
          ]
        : [
            {
              id: 25,
              name: "25%",
            },
            { id: 50, name: "50%" },
            { id: 100, name: "100% - No seat assignment" },
          ];

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
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="flex-start"
            >
              {/* <Grid xs={12} md={3}>
                <DataTableSelectAction
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
                />
              </Grid> */}
              <Grid
                item
                xs={12}
                md={3}
                hidden={newPanel.mode !== 1}
                style={{ marginTop: "3%" }}
              >
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
                md={7}
                xs={12}
                justifyContent="space-evenly"
                alignItems="center"
                direction="column"
              >
                <Grid>
                  <Grid
                    container
                    md={12}
                    xs={12}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid md={8} xs={12}>
                      <TextField
                        label={t("name")}
                        onChange={this.handleChange("name")}
                        required
                        fullWidth
                        value={newPanel.name}
                        helperText={t("inputEmpty")}
                        FormHelperTextProps={{
                          style: {
                            opacity: this.state.formErrors.name ? 1 : 0,
                          },
                        }}
                        error={this.state.formErrors.name}
                        InputProps={{
                          readOnly: isDetails,
                        }}
                      />
                    </Grid>
                    <Grid md={3} xs={12} item>
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
                  </Grid>
                  <Grid container>
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
                                onChange={this.handleChangeBoolean(
                                  "exitReader"
                                )}
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
                                !isNullOrUndefined(
                                  this.state.newPanel.exitReader
                                )
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
                      <Grid xs={12} md={12}>
                        <DataTableSelectAction
                          handleConfirm={this.handleWorkingModeSelected}
                          loadDataAction={this.props.requestGetWorkingModes}
                          element={translateWorkingModes.find(
                            (elem) => elem.id === newPanel.mode
                          )}
                          primaryTitle={t("Working Mode")}
                          title={t("Working Mode")}
                          dataTableSubTitle={t("Working Mode")}
                          mdSubtitle={3}
                          multipleSelect={false}
                          attribute={"name"}
                          info={{
                            data: translateWorkingModes,
                            dataCount: translateWorkingModes.length,
                          }}
                          success={this.props.successWorkingModes}
                          loading={this.props.loadingWorkingModes}
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
                container
                spacing={24}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ margin: "15px  30px 0 10px" }}
                hidden={newPanel.mode === 0 || newPanel.mode === 1}
              >
                <Grid
                  xs={12}
                  md={3}
                  hidden={true} //newPanel.mode === 0 || newPanel.mode === 1}
                >
                  <DataTableSelectAction
                    handleConfirm={this.handleCapacitySelected}
                    loadDataAction={this.props.requestGetBusTypesCapacity}
                    // elements={
                    //   this.props.capacities
                    //     ? this.props.capacities.find(
                    //         (elem) => elem.id === newPanel.busCapacityId
                    //       )
                    //     : []
                    // }
                    elements={
                      newPanel.busCapacity ? [newPanel.busCapacity] : []
                    }
                    primaryTitle={t("Capacity")}
                    title={t("Capacity")}
                    dataTableSubTitle={t("Capacity")}
                    mdSubtitle={3}
                    multipleSelect={true}
                    onlyOneRowSelected={1}
                    attribute={"name"}
                    info={{
                      data: this.props.capacities,
                      dataCount: this.props.capacities
                        ? this.props.capacities.length
                        : 0,
                    }}
                    success={this.props.successGetCapacities}
                    loading={this.props.loadingGetCapacities}
                    enableCreate
                    createData={{
                      title: t("NewCapacity"),
                      onCreate: () => {
                        this.setState({ openDialogNewBusCapacity: true });
                      }, //
                    }}
                    handleDelete={this.handleDeleteBusCapacity}
                    handleUpdate={this.handleUpdateBusCapacity}
                    DataTableColumns={[
                      {
                        name: t("name"),
                        field: "name",
                        options: {
                          sort: true,
                          filter: true,
                        },
                      },
                      {
                        name: t("Capacity"),
                        field: "capacity",
                        options: {
                          sort: true,
                          filter: true,
                        },
                      },
                    ]}
                  />
                </Grid>
                <Grid
                  xs={10}
                  md={5}
                  hidden={newPanel.mode === 0 || newPanel.mode === 1 || newPanel.mode === 4}
                >
                  <DataTableSelectAction
                    handleConfirm={this.handleAlgoritmSelected}
                    loadDataAction={this.props.requestGetReaderModes}
                    element={algortimsOptionsTranslate.find(
                      (elem) => elem.id === newPanel.assignmentAlgorithm
                    )}
                    primaryTitle={t("AssigmentAlgorithm")}
                    title={t("AssigmentAlgorithm")}
                    dataTableSubTitle={t("AssigmentAlgorithm")}
                    mdSubtitle={3}
                    multipleSelect={false}
                    attribute={"name"}
                    info={{
                      data: algortimsOptionsTranslate,
                      dataCount: algortimsOptionsTranslate.length,
                    }}
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
                <Grid
                  xs={10}
                  md={5}
                  hidden={newPanel.mode === 0 || newPanel.mode === 1 || newPanel.mode === 4}
                >
                  <DataTableSelectAction
                    handleConfirm={this.handlePercentageSelected}
                    loadDataAction={this.props.requestGetReaderModes}
                    element={percentageOptions.find(
                      (elem) => elem.id === newPanel.occupancyPercentage
                    )}
                    primaryTitle={t("OccupancyPercentage")}
                    title={t("OccupancyPercentage")}
                    dataTableSubTitle={t("Occupancy percentage")}
                    mdSubtitle={3}
                    multipleSelect={false}
                    attribute={"name"}
                    info={{
                      data: percentageOptions.filter((p) => {
                        return newPanel.assignmentAlgorithm &&
                          newPanel.assignmentAlgorithm > 2
                          ? p.id !== 25
                          : true;
                      }),
                      dataCount: percentageOptions.filter((p) => {
                        return newPanel.assignmentAlgorithm &&
                          newPanel.assignmentAlgorithm > 2
                          ? p.id !== 25
                          : true;
                      }).length,
                    }}
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
        <Dialog
          open={openDialogNewBusCapacity}
          TransitionComponent={Transition}
          onClose={() => this.setState({ openDialogNewBusCapacity: false })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <BusCapacityForm
            isDialog
            isInModal
            onCreate={this.onCreateBusCapacity}
            //initValues={documentTypeOnCreate}
            //isDetails={true}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(this.state.busCapacityToEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ busCapacityToEdit: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <BusCapacityForm
            isDialog
            isEdit
            isInModal
            initValues={this.state.busCapacityToEdit}
            onCreate={() => this.setState({ busCapacityToEdit: undefined })}
            //isDetails={true}
          />
        </Dialog>
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
    loadingWorkingModes: Panel.loadingWorkingModes,
    successWorkingModes: Panel.successWorkingModes,
    workingModes: Panel.workingModes,
    successGetCapacities: Panel.successGetCapacities,
    capacities: Panel.capacities,
    loadingGetCapacities: Panel.loadingGetCapacities,
    errorData: Panel.errorData,
    loadingCreateorEdit: Panel.loadingCreateorEdit,
    successDeleteBusCapacity: Panel.successDeleteBusCapacity,
  };
};

const mapDispatchToPrps = {
  requestEditPanel,
  requestBadges,
  requestCreatePanel,
  requestGetById,
  requestGetReaderModes,
  requestGetWorkingModes,
  requestGetBusTypesCapacity,
  requestDeleteBusCapacity,
  requestUpdateBusCapacity,
};

const newPanelConnected = connect(mapStateToProps, mapDispatchToPrps)(NewPanel);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(newPanelConnected)
);
