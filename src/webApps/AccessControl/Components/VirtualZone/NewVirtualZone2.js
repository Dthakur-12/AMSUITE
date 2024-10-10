import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../../services/ApiHandler";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { FormHelperText, LinearProgress } from "@mui/material";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import LocationIcon from "@mui/icons-material/AddLocationRounded";
import GateCard from "./NewGateCard";
import renderDefineZone from "./NewVirtualZoneMap";
import ViewGateCard from "./ViewGateCard";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import AssignReadersDoors from "./AssignReadersDoors";
import StepButton from "@mui/material/StepButton";
import "leaflet/dist/leaflet.css";
import withRouter from "../withRouter";
import "leaflet-draw/dist/leaflet.draw.css";
import {
  createVirtualZone,
  editVirtualZone,
} from "../../../../actions/AccessControl/virtualZone_actions";
import styles from "../../../../assets/styles/AccessControl_styles/VirtualZone_Styles/newVirtualZoneStyles";
const formValues = {
  modeName: "Normal",
  name: "",
  type: 2,
  mode: 0,
  gates: [],
  zoneSelected: undefined,
  lastGateNumber: -1,
};

class NewVirtualZone2 extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;

    this.state = {
      isLoadingEntranceReaders: true,
      isLoadingExitReaders: true,
      newVirtualZone: initValues ? initValues : formValues,
      openDialogMap: false,
      formErrors: {},
      positionArea: [],
      polygon: initValues && initValues.gatesNumber > 0 ? false : true,
      rectangle: initValues && initValues.gatesNumber > 0 ? false : true,
      steps: [
        { name: "NewVirtualZone", step: 0 },
        { name: "AssignReader", step: 1 },
      ],
      activeStep: 0,
      positionCenter: [-34.917961, -56.163585],
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { successCreate, error, editSuccess } = nextProps;
    if (
      successCreate !== prevState.successCreate ||
      error !== prevState.error ||
      editSuccess !== prevState.editSuccess
    ) {
      return { successCreate, error, editSuccess };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t, navigate } = this.props;
    if (this.state.error && prevState.error !== this.state.error) {
      this.setState({
        isCreating: false,
      });
      SnackbarHandler.showMessage(this.props.messaggeError, "error");
    }
    if (
      this.state.successCreate &&
      prevState.successCreate !== this.state.successCreate
    ) {
      SnackbarHandler.showMessage(t("successCreateVirtualZone"));
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      if (this.props.isEdit) {
        this.props.onClose();
        this.props.updateParent();
      }
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          newVirtualZone: formValues,
        });
        navigate("/virtualzone");
      }, 1000);
    }
    if (
      this.state.editSuccess &&
      prevState.editSuccess !== this.state.editSuccess
    ) {
      SnackbarHandler.showMessage(t("successEdit"));
      this.props.onClose();
      this.props.updateParent();
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
    }
  }

  componentDidMount() {
    NavBarAccessControl.hideLoader();
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    if (this.props.isEdit || this.props.isDetails) {
      const { newVirtualZone } = this.state;
      ApiHandler.AccessControl.VirtualZones.getVirtualZoneById(
        newVirtualZone.id
      )
        .then(({ data }) => {
          let gatesToAdd = [];
          let i = -1;
          data.gates.forEach((gate) => {
            i = i + 1;
            let entrance = {
              value: gate.entranceReader,
              label: gate.entranceReaderName,
            };
            let exit = {
              value: gate.exitReader,
              label: gate.exitReaderName,
            };
            let gateToAdd = {
              gateNumber: i,
              entranceReader: entrance,
              exitReader: exit,
              coord1: gate.coord1,
              coord2: gate.coord2,
            };
            gatesToAdd.push(gateToAdd);
            this.setState((prevState) => ({
              positionArea: [
                ...prevState.positionArea,
                [gate.coord1.lat, gate.coord1.lng],
              ],
            }));
          });

          this.setState((prevState) => ({
            hayZona: this.props.isEdit ? true : false,
            newVirtualZone: {
              ...prevState.newVirtualZone,
              gates: gatesToAdd,
              zoneSelected: data.zoneSelected,
              lastGateNumber: i,
              type: 2,
              mode: data.mode,
            },
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    let modesSuggestions = [];
    modesSuggestions.push({
      value: 0,
      label: "Normal",
    });
    modesSuggestions.push({
      value: 1,
      label: "Trigger",
    });
    this.setState({
      modesSuggestions: modesSuggestions,
    });
  }

  handleDeleteGateCard = (gate) => {
    const { newVirtualZone } = this.state;
    let newVirtualZoneGates = newVirtualZone.gates.slice();

    const gates = newVirtualZoneGates.filter(
      (g) => g.gateNumber !== gate.gateNumber
    );
    //const gates = newVirtualZoneGates.slice(newVirtualZoneGates.indexOf(gate), 1);
    if (gates.length === 0) {
      this.setState((prevState) => ({
        polygon: true,
        rectangle: true,
        hayZona: false,
      }));
    }
    this.setState((prevState) => ({
      newVirtualZone: {
        ...prevState.newVirtualZone,
        gates: gates,
      },
    }));
    this.setState((prevState) => ({
      newVirtualZone: {
        ...prevState.newVirtualZone,
        zoneSelected: undefined,
      },
    }));
  };

  handleConfirmGates = (reader, gates, entrance) => {
    let oldGates = this.state.newVirtualZone.gates.slice();
    oldGates.map((g) => {
      if (entrance) {
        if (gates.includes(g.gateNumber)) {
          g.entranceReader = { value: reader.id, label: reader.name };
        } else if (g.entranceReader && reader.name === g.entranceReader.label) {
          g.entranceReader = { value: 0, label: "" };
        }
      } else if (!entrance)
        if (gates.includes(g.gateNumber)) {
          g.exitReader = { value: reader.id, label: reader.name };
        } else if (g.exitReader && reader.name === g.exitReader.label) {
          g.exitReader = { value: 0, label: "" };
        }
    });
    this.setState((prevState) => ({
      newVirtualZone: { ...prevState.newVirtualZone, gates: oldGates },
    }));
  };

  handleEditDoor = (id) => {
    const { newVirtualZone } = this.state;
    this.setState({
      editGate: newVirtualZone.gates[id],
      position: [
        [
          newVirtualZone.gates[id].coord1.lat,
          newVirtualZone.gates[id].coord1.lng,
        ],
        [
          newVirtualZone.gates[id].coord2.lat,
          newVirtualZone.gates[id].coord2.lng,
        ],
      ],
    });
  };

  renderGatesCards = () => {
    const { newVirtualZone, defaultGate, editGate } = this.state;
    const { isDetails, isEdit } = this.props;
    let gatesCards;
    if (!isNullOrUndefined(newVirtualZone.gates)) {
      gatesCards = newVirtualZone.gates.map((gate, index) => {
        return (
          <Grid key={index} item xs={6} md={3} style={{ marginBottom: 5 }}>
            {this.state.isDesktop && (
              <ViewGateCard
                handleEdit={() => this.handleEditDoor(index)}
                isDetails={true}
                // isEdit={isEdit}
                gate={gate}
                gateNumber={gate.gateNumber}
                onDelete={this.handleDeleteGateCard}
              />
            )}
          </Grid>
        );
      });
    } else {
      gatesCards = [];
    }
    // if (editGate && !isDetails) {
    //   gatesCards.unshift(
    //     <Grid key="gate" item xs={12} md={12} style={{ marginBottom: 5 }}>
    //       <GateCard
    //         onConfirm={this.handleEditGate}
    //         defaultValues={defaultGate}
    //         gate={editGate}
    //         virtualZone={newVirtualZone}
    //       />
    //     </Grid>
    //   );
    // }
    gatesCards.unshift(
      <Grid container spacing={12}>
        <Grid
          key="map"
          item
          xs={this.state.hayZona ? 6 : 12}
          md={this.state.hayZona ? 6 : 12}
          style={{ marginBottom: 5 }}
        >
          {this.state.hayZona &&
            renderDefineZone({
              ...this.props,
              ...this.state,
              heightValue: 0.25,
              onDeleted: this._onDeleted,
              onCreate: this._onCreate,
              onDeleteStart: this._onDeleteStart,
              hayZona: this.state.hayZona,
              width: 1000 * 0.34,
            })}
          {!this.state.hayZona &&
            renderDefineZone({
              ...this.props,
              ...this.state,
              heightValue: 0.35,
              onDeleted: this._onDeleted,
              onCreate: this._onCreate,
              onDeleteStart: this._onDeleteStart,
              hayZona: this.state.hayZona,
              width: 1000 * 0.75,
            })}
        </Grid>
        <Grid item xs={6} md={6} style={{ marginBottom: 5 }}>
          {this.state.hayZona &&
            this.initZoneInformation({ ...this.props, ...this.state })}
        </Grid>
      </Grid>
    );
    return gatesCards;
  };

  handleAddGate = (gate) => {
    let gates = this.state.newVirtualZone.gates.slice();
    let gateNumber = this.state.newVirtualZone.lastGateNumber + 1;
    let gateToAdd = {
      entranceReader: gate.entranceReader,
      exitReader: gate.exitReader,
      gateNumber: gateNumber,
      coord1: {
        lat: gate.coord1.lat,
        lng: gate.coord1.lng,
      },
      coord2: {
        lat: gate.coord2.lat,
        lng: gate.coord2.lng,
      },
    };
    gates.push(gateToAdd);
    this.setState((prevState) => ({
      newVirtualZone: {
        ...prevState.newVirtualZone,
        gates: gates,
        lastGateNumber: gateNumber,
        zoneSelected: undefined,
      },
      defaultGate: undefined,
    }));
  };

  handleEditGate = (gate) => {
    let gates = this.state.newVirtualZone.gates.filter(
      (ga) => ga.gateNumber !== gate.gateNumber
    );

    let gateToAdd = {
      entranceReader: gate.entranceReader,
      exitReader: gate.exitReader,
      gateNumber: gate.gateNumber,
      coord1: {
        lat: gate.coord1.lat,
        lng: gate.coord1.lng,
      },
      coord2: {
        lat: gate.coord2.lat,
        lng: gate.coord2.lng,
      },
    };
    gates.push(gateToAdd);
    this.setState((prevState) => ({
      newVirtualZone: {
        ...prevState.newVirtualZone,
        gates: gates,
        lastGateNumber: gate.gateNumber,
        zoneSelected: undefined,
      },
      defaultGate: undefined,
    }));
  };

  _onCreate = (event) => {
    this.setState({ hayZona: true });
    let firstCoord = undefined;
    let lastCoord = undefined;
    let lat =
      (event.layer._latlngs[0][0].lat + event.layer._latlngs[0][1].lat) / 2;
    let lng =
      (event.layer._latlngs[0][1].lng + event.layer._latlngs[0][2].lng) / 2;
    this.setState({ positionCenter: [lat, lng] });
    event.layer._latlngs[0].map((coord) => {
      this.setState((prevState) => ({
        positionArea: [...prevState.positionArea, [coord.lat, coord.lng]],
      }));
      if (!firstCoord) {
        firstCoord = { ...coord };
        lastCoord = { ...coord };
      } else {
        let gateToAdd = {
          coord1: lastCoord,
          coord2: { ...coord },
        };
        lastCoord = { ...coord };
        this.handleAddGate(gateToAdd);
      }
      return 0;
    });

    let gateToAdd = {
      coord1: lastCoord,
      coord2: firstCoord,
    };
    this.handleAddGate(gateToAdd);
    this.setState({
      polygon: false,
      rectangle: false,
      hayZona: true,
    });
  };

  delete = () => {
    this.setState((prevState) => ({
      hayZona: false,
      polygon: true,
      rectangle: true,
      editGate: undefined,
      newVirtualZone: {
        ...prevState.newVirtualZone,
        lastGateNumber: -1,
        gates: [],
      },
      position: [],
      positionArea: [],
    }));
  };

  _onDeleted = (event) => {
    const { newVirtualZone } = this.state;
    if (Object.keys(event.layers._layers).length > 0) {
      newVirtualZone.gates.map((gate) => this.handleDeleteGateCard(gate));
      this.setState((prevState) => ({
        polygon: true,
        rectangle: true,
        editGate: undefined,
        newVirtualZone: {
          ...prevState.newVirtualZone,
          lastGateNumber: -1,
        },
        position: [],
        positionArea: [],
      }));
    }
  };

  _onDeleteStart = (e) => {
    this.setState({ position: [] });
  };

  drawPolygon = () => {
    const { newVirtualZone } = this.state;
    const position = newVirtualZone.gates.map((gate) => gate.coord1);
    this.setState({
      position,
    });
  };

  renderAssignReader = (props) => {
    const { isDetails } = props;
    const { newVirtualZone } = this.state;

    return (
      <div style={{ width: "100%" }}>
        {!isDetails && !this.state.hayZona && (
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />
        )}
        <Grid container spacing={24}>
          {this.renderGatesCards()}
        </Grid>
        {!isDetails && (
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />
        )}
        {!isDetails &&
          !isNullOrUndefined(newVirtualZone.gates) &&
          newVirtualZone.gates.length > 0 &&
          this.state.hayZona && (
            <AssignReadersDoors
              virtualZone={this.state.newVirtualZone}
              handleConfirmGates={this.handleConfirmGates}
            />
          )}
      </div>
    );
  };

  initZoneInformation = () => {
    const { newVirtualZone, modesSuggestions, hayZona } = this.state;
    const { t, classes, isDetails, theme } = this.props;
    const selectStylesType = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
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
      <Grid container spacing={24}>
        <Grid
          item
          xs={this.state.hayZona ? 24 : 12}
          md={this.state.hayZona ? 12 : 6}
          className={classes.grid}
          style={{ paddingTop: 0, marginTop: this.state.hayZona ? 35 : 0 }}
        >
          <TextField
            required
            label={t("zoneName")}
            value={newVirtualZone.name}
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
        <Grid
          item
          xs={this.state.hayZona ? 24 : 12}
          md={this.state.hayZona ? 12 : 6}
          style={{ paddingTop: 0, marginTop: this.state.hayZona ? 25 : 12 }}
        >
          <Select
            style={{ paddingTop: 0, marginTop: 12 }}
            classes={classes}
            // styles={selectStylesType}
            options={modesSuggestions}
            components={components}
            onChange={this.handleChange("mode")}
            value={newVirtualZone.mode}
            placeholder={
              newVirtualZone.modeName ? newVirtualZone.modeName : t("mode")
            }
            maxMenuHeight={200}
            isDisabled={isDetails}
          />
          <FormHelperText
            style={{ opacity: this.state.formErrors.mode ? 1 : 0 }}
            error={this.state.formErrors.mode}
          >
            {t("inputEmpty")}
          </FormHelperText>
        </Grid>
        {this.state.hayZona && (
          <Grid
            xs={12}
            md={11}
            style={{ justifyContent: "flex-start", display: "flex" }}
          >
            <Button
              className={classes.buttonEnd}
              // fullWidth
              variant="contained"
              // color="secondary"

              onClick={() => this.delete()}
              // style={{
              //   background: this.state.isSuccess ? green[500] : undefined,
              //   color: "white"
              // }}
            >
              {t("ChangeZone")}
            </Button>
          </Grid>
        )}
      </Grid>
    );
  };

  handleCloseMap = () => {
    this.setState({
      openDialogMap: false,
    });
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    if (name === "mode") {
      let label = event.currentTarget ? event.currentTarget.label : event.label;
      this.setState((prevState) => ({
        newVirtualZone: {
          ...prevState.newVirtualZone,
          modeName: label,
        },
      }));
    }
    this.setState((prevState) => ({
      newVirtualZone: {
        ...prevState.newVirtualZone,
        [name]: value,
      },
    }));
  };

  handleEdit = () => {
    const { t, editVirtualZone } = this.props;
    const { newVirtualZone } = this.state;
    const errors = this.validateCreate(newVirtualZone);

    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      });

      this.props.editVirtualZone({ ...newVirtualZone });
    } else {
      SnackbarHandler.showMessage(t("inputIncompleteZone"), "error");
    }
  };

  handleCreate = () => {
    const { createVirtualZone } = this.props;
    const { newVirtualZone } = this.state;
    const errors = this.validateCreate(newVirtualZone);

    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      });

      createVirtualZone({ ...newVirtualZone });
    }
  };

  validateCreate = (newVirtualZone) => {
    return {
      name: isValueEmptyOrNull(newVirtualZone.name),
      mode: isValueEmptyOrNull(newVirtualZone.mode),
      gates: newVirtualZone.gates.length < 1,
    };
  };

  defineZone = (zoneSelected) => {
    this.setState((prevState) => ({
      newVirtualZone: {
        ...prevState.newVirtualZone,
        zoneSelected: zoneSelected.doorSides,
      },
    }));
  };

  handleChangeStep = (step) => {
    this.state.activeStep === 1 &&
      step === 0 &&
      this.setState({ drawArea: true });
    this.setState({
      activeStep: step,
    });
  };
  renderNewVirtualZone = (props) => {
    const { classes, isDetails, theme, t, newVirtualZone, modesSuggestions } =
      props;
    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
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
      <Grid container spacing={24}>
        <Grid item xs={12} md={6} className={classes.grid}>
          <TextField
            required
            label={t("NewVirtualZone")}
            value={newVirtualZone.name}
            fullWidth
            onChange={this.handleChange("name")}
            helperText={t("inputEmpty")}
            FormHelperTextProps={{
              style: { opacity: this.state.formErrors.name ? 1 : 0 },
            }}
            error={this.state.formErrors.name}
            disabled={isDetails}
          />
          <FormHelperText
            style={{ opacity: this.state.formErrors.name ? 1 : 0 }}
            error={this.state.formErrors.name}
          >
            {t("inputEmpty")}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} md={6} style={{ paddingTop: 0, marginTop: 12 }}>
          <Select
            style={{ paddingTop: 0, marginTop: 12 }}
            classes={classes}
            styles={selectStyles}
            options={modesSuggestions}
            components={components}
            onChange={this.handleChange("mode")}
            value={newVirtualZone.mode}
            placeholder={
              newVirtualZone.modeName ? newVirtualZone.modeName : t("mode")
            }
            maxMenuHeight={200}
            isDisabled={isDetails}
          />
          <FormHelperText
            style={{ opacity: this.state.formErrors.mode ? 1 : 0 }}
            error={this.state.formErrors.mode}
          >
            {t("inputEmpty")}
          </FormHelperText>
        </Grid>
      </Grid>
    );
  };
  render() {
    const { classes, isDialog, isEdit, isDetails, theme, t } = this.props;
    const { newVirtualZone, modesSuggestions, hayZona } = this.state;

    const { activeStep } = this.state;

    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
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

    if (!this.state.isDesktop && !isDetails) {
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
            <Paper style={{ marginLeft: isDialog ? 0 : 50 }}>
              <Grid container spacing={12}>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  spacing={12}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  //style={{ display: "inline-block" }}
                >
                  <Avatar className={classes.avatar}>
                    <LocationIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    {isEdit
                      ? t("EditingVirtualZone")
                      : isDetails
                      ? t("DetailsVirtualZone")
                      : t("NewVirtualZone")}
                  </Typography>
                  <Divider
                    style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
                  />
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ textAlign: "center", margin: 50 }}
                  >
                    {t("ViewNotAvailable")}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </main>)
      );
    }

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
              <LocationIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isEdit
                ? t("EditingVirtualZone")
                : isDetails
                ? t("DetailsVirtualZone")
                : t("NewVirtualZone")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            {/* -------------------- init information and map  --------------------------------------- */}
            {!this.state.hayZona &&
              this.initZoneInformation({ ...this.props, ...this.state })}
            {this.renderAssignReader({ ...this.props, ...this.state })}

            {/* --------------------------------------------------------------------------------------- */}

            {/* {activeStep === 0
              ? this.renderNewVirtualZone({ ...this.props, ...this.state })
              : this.renderAssignReader({ ...this.props, ...this.state })} */}
            {!isDetails && (
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
                  ? t("editVirtualZone")
                  : t("createVirtualZone")}
              </Button>
            )}
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
          </Paper>
        </div>
      </main>
    );
  }
}

NewVirtualZone2.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  createVirtualZone: createVirtualZone,
  editVirtualZone: editVirtualZone,
};

const mapStateToProps = ({ User, VirtualZone }) => {
  return {
    currentUser: User.currentUser,
    successCreate: VirtualZone.createSuccess,
    error: VirtualZone.error,
    messaggeError: VirtualZone.messagge,
    editSuccess: VirtualZone.editSuccess,
  };
};
const NewVirtualZoneConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVirtualZone2);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(NewVirtualZoneConnected))
);
