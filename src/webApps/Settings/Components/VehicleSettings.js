import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarSettings from "../utils/NavBarSettings";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../services/ApiHandler";
import PersonIcon from "@mui/icons-material/PersonRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import SnackbarHandler from "../../../utils/SnackbarHandler";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Circle from "@mui/icons-material/FiberManualRecord";
import { withTranslation } from "react-i18next";
import { addSettings } from "../../../actions/Settings/system_actions";
import CustomStyles from "../../../assets/styles/Settings_styles/VehicleSettingsStyles";

const mapStateToProps = ({ Settings }) => {
  return {
    settings: Settings.settings
  };
};

const mapDispatchToProps = {
  AddSettings: addSettings
};

class VehicleSettings extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      errorMessage: "",
      optionPlate: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionDrivers: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionEnterprise: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionInputADJ: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionInput1: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionInput2: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionInput3: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionInput4: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      optionInput5: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") }
      ],
      vehicleDTO: { ID: -1 },
      formErrors: {},
      inputAdjTitle: "",
      inputADJ: "",

      input1Title: "",
      input1: "",
      input2Title: "",
      input2: "",
      input3Title: "",
      input3: "",
      input4Title: "",
      input4: "",
      input5Title: "",
      input5: ""
    };
  }

  componentDidMount() {
    NavBarSettings.hideLoader();
    this.loadVehicleSettings();
  }

  loadVehicleSettings = () => {
    ApiHandler.Setting.Setting.getVehicleSetting()
      .then(({ data }) => {
        this.setState({
          vehicleDTO: {
            ID: data.data.id,
            plate: data.data.vehMatricula,
            drivers: data.data.vehConductores,
            enterprise: data.data.vehEmpresa,

            inputAdjTitle: data.data.vehCampoConfigurableADJTitulo,
            inputADJ: data.data.vehCampoConfigurableADJ,

            input1Title: data.data.vehCampoConfigurable1Titulo,
            input1: data.data.vehCampoConfigurable1,
            input2Title: data.data.vehCampoConfigurable2Titulo,
            input2: data.data.vehCampoConfigurable2,
            input3Title: data.data.vehCampoConfigurable3Titulo,
            input3: data.data.vehCampoConfigurable3,
            input4Title: data.data.vehCampoConfigurable4Titulo,
            input4: data.data.vehCampoConfigurable4,
            input5Title: data.data.vehCampoConfigurable5Titulo,
            input5: data.data.vehCampoConfigurable5
          },
          valuePlate:
            data.data.vehMatricula === null
              ? 0
              : data.data.vehMatricula
              ? 2
              : 1,
          valueDrivers:
            data.data.vehConductores === null
              ? 0
              : data.data.vehConductores
              ? 2
              : 1,
          valueEnterprise:
            data.data.vehEmpresa === null ? 0 : data.data.vehEmpresa ? 2 : 1,
          valueInputADJ:
            data.data.vehCampoConfigurableADJ === null
              ? 0
              : data.data.vehCampoConfigurableADJ
              ? 2
              : 1,
          valueInput1:
            data.data.vehCampoConfigurable1 === null
              ? 0
              : data.data.vehCampoConfigurable1
              ? 2
              : 1,
          valueInput2:
            data.data.vehCampoConfigurable2 === null
              ? 0
              : data.data.vehCampoConfigurable2
              ? 2
              : 1,
          valueInput3:
            data.data.vehCampoConfigurable3 === null
              ? 0
              : data.data.vehCampoConfigurable3
              ? 2
              : 1,
          valueInput4:
            data.data.vehCampoConfigurable4 === null
              ? 0
              : data.data.vehCampoConfigurable4
              ? 2
              : 1,
          valueInput5:
            data.data.vehCampoConfigurable5 === null
              ? 0
              : data.data.vehCampoConfigurable5
              ? 2
              : 1,
          inputAdjTitle: data.data.vehCampoConfigurableADJTitulo,
          input1Title: data.data.vehCampoConfigurable1Titulo,
          input2Title: data.data.vehCampoConfigurable2Titulo,
          input3Title: data.data.vehCampoConfigurable3Titulo,
          input4Title: data.data.vehCampoConfigurable4Titulo,
          input5Title: data.data.vehCampoConfigurable5Titulo
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeValuePlate = value => {
    this.setState({ valuePlate: value });
    if (value === 0) this.handleChange("plate", null);
    if (value === 1) this.handleChange("plate", false);
    if (value === 2) this.handleChange("plate", true);
  };

  changeValueDrivers = value => {
    this.setState({ valueDrivers: value });
    if (value === 0) this.handleChange("drivers", null);
    if (value === 1) this.handleChange("drivers", false);
    if (value === 2) this.handleChange("drivers", true);
  };

  changeValueEnterprise = value => {
    this.setState({ valueEnterprise: value });
    if (value === 0) this.handleChange("enterprise", null);
    if (value === 1) this.handleChange("enterprise", false);
    if (value === 2) this.handleChange("enterprise", true);
  };

  changeValueConfigurableInput = (value, name) => {
    if (name === "inputADJ") {
      this.setState({ valueInputADJ: value });
      if (value === 0) this.handleChange("inputADJ", null);
      if (value === 1) this.handleChange("inputADJ", false);
      if (value === 2) this.handleChange("inputADJ", true);
    }
    if (name === "input1") {
      this.setState({ valueInput1: value });
      if (value === 0) this.handleChange("input1", null);
      if (value === 1) this.handleChange("input1", false);
      if (value === 2) this.handleChange("input1", true);
    }
    if (name === "input2") {
      this.setState({ valueInput2: value });
      if (value === 0) this.handleChange("input2", null);
      if (value === 1) this.handleChange("input2", false);
      if (value === 2) this.handleChange("input2", true);
    }
    if (name === "input3") {
      this.setState({ valueInput3: value });
      if (value === 0) this.handleChange("input3", null);
      if (value === 1) this.handleChange("input3", false);
      if (value === 2) this.handleChange("input3", true);
    }
    if (name === "input4") {
      this.setState({ valueInput4: value });
      if (value === 0) this.handleChange("input4", null);
      if (value === 1) this.handleChange("input4", false);
      if (value === 2) this.handleChange("input4", true);
    }
    if (name === "input5") {
      this.setState({ valueInput5: value });
      if (value === 0) this.handleChange("input5", null);
      if (value === 1) this.handleChange("input5", false);
      if (value === 2) this.handleChange("input5", true);
    }
  };

  handelChangeConfigurablesInput = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    if (name === "inputAdjTitle") {
      if (value === "" || value === null)
        this.setState(prevState => ({
          valueInputADJ: 0,
          vehicleDTO: {
            ...prevState.vehicleDTO,
            inputADJ: null
          }
        }));
      this.setState(prevState => ({
        vehicleDTO: {
          ...prevState.vehicleDTO,
          inputAdjTitle: value
        },
        inputAdjTitle: value
      }));
    }
    if (name === "input1Title") {
      if (value === "" || value === null)
        this.setState(prevState => ({
          valueInput1: 0,
          vehicleDTO: {
            ...prevState.vehicleDTO,
            input1: null
          }
        }));
      this.setState(prevState => ({
        vehicleDTO: {
          ...prevState.vehicleDTO,
          input1Title: value
        },
        input1Title: value
      }));
    }

    if (name === "input2Title") {
      if (value === "" || value === null)
        this.setState(prevState => ({
          valueInput2: 0,
          vehicleDTO: {
            ...prevState.vehicleDTO,
            input2: null
          }
        }));
      this.setState(prevState => ({
        vehicleDTO: {
          ...prevState.vehicleDTO,
          input2Title: value
        },
        input2Title: value
      }));
    }
    if (name === "input3Title") {
      if (value === "" || value === null)
        this.setState(prevState => ({
          valueInput3: 0,
          vehicleDTO: {
            ...prevState.vehicleDTO,
            input3: null
          }
        }));
      this.setState(prevState => ({
        vehicleDTO: {
          ...prevState.vehicleDTO,
          input3Title: value
        },
        input3Title: value
      }));
    }
    if (name === "input4Title") {
      if (value === "" || value === null)
        this.setState(prevState => ({
          valueInput4: 0,
          vehicleDTO: {
            ...prevState.vehicleDTO,
            input4: null
          }
        }));
      this.setState(prevState => ({
        vehicleDTO: {
          ...prevState.vehicleDTO,
          input4Title: value
        },
        input4Title: value
      }));
    }
    if (name === "input5Title") {
      if (value === "" || value === null)
        this.setState(prevState => ({
          valueInput5: 0,
          vehicleDTO: {
            ...prevState.vehicleDTO,
            input5: null
          }
        }));
      this.setState(prevState => ({
        vehicleDTO: {
          ...prevState.vehicleDTO,
          input5Title: value
        },
        input5Title: value
      }));
    }
  };
  handleChange = (name, value) => {
    this.setState(prevState => ({
      vehicleDTO: {
        ...prevState.vehicleDTO,
        [name]: value
      }
    }));
  };

  handleCreate = () => {
    this.setState({
      isCreating: true
    });
    const { t } = this.props;
    ApiHandler.Setting.Setting.editVehicleSetting(this.state.vehicleDTO)
      .then(() => {
        const settings = this.props.settings;

        this.props.AddSettings({
          ...settings,
          vehicleSettings: this.state.vehicleDTO
        });
        this.props.AddSettings(this.state.vehicleDTO);
        SnackbarHandler.showMessage(t("SuccessfullySavedPreferences"));
        this.setState({
          isCreating: false,
          isSuccess: true
        });
        setTimeout(() => {
          this.setState({
            isSuccess: false
          });
        }, 1000);
      })
      .catch(error => {
        this.setState({
          isCreating: false
        });
        SnackbarHandler.showMessage(error.error, "error");
      });
    setTimeout(() => {
      this.setState({
        isSuccess: false
      });
    }, 1000);
  };

  render() {
    const { classes, t } = this.props;

    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0"
            }}
            className={classes.customLinearProgress}
            variant="query"
          />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("vehicle")}
            </Typography>

            <Divider className={classes.customDivider} />

            <Grid container spacing={24}>
              <Grid item container xs={12} md={12} required>
                <Grid item container xs={12} md={12}>
                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography style={{ fontSize: "20px" }}>
                        {t("PlateNumber")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valuePlate}
                        style={{ padding: "0px", width: "80%" }}
                      >
                        {this.state.optionPlate.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          // if(this.state.valueName === null && item.value === null)
                          //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                          if (this.state.valuePlate !== index)
                            buttonProps.icon = (
                              <Circle style={{ color: "#9e9e9e" }} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle style={{ color: "#2196f3" }} />
                            );
                          return (
                            <Step
                              key={item.label}
                              style={{ margin: "0px", padding: "0px" }}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValuePlate(index)}
                                style={{ margin: "0px", padding: "0px" }}
                                {...buttonProps}
                              >
                                {item.label}
                              </StepButton>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography style={{ fontSize: "20px" }}>
                        {t("Drivers")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueDrivers}
                        style={{ padding: "0px", width: "80%" }}
                      >
                        {this.state.optionDrivers.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          // if(this.state.valueName === null && item.value === null)
                          //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                          if (this.state.valueDrivers !== index)
                            buttonProps.icon = (
                              <Circle style={{ color: "#9e9e9e" }} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle style={{ color: "#2196f3" }} />
                            );
                          return (
                            <Step
                              key={item.label}
                              style={{ margin: "0px", padding: "0px" }}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValueDrivers(index)}
                                style={{ margin: "0px", padding: "0px" }}
                                {...buttonProps}
                              >
                                {item.label}
                              </StepButton>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider className={classes.customDivider} />
                <Grid item container xs={12} md={12}>
                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography style={{ fontSize: "20px" }}>
                        {t("enterprise")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueEnterprise}
                        style={{ padding: "0px", width: "80%" }}
                      >
                        {this.state.optionEnterprise.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          // if(this.state.valueName === null && item.value === null)
                          //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                          if (this.state.valueEnterprise !== index)
                            buttonProps.icon = (
                              <Circle style={{ color: "#9e9e9e" }} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle style={{ color: "#2196f3" }} />
                            );
                          return (
                            <Step
                              key={item.label}
                              style={{ margin: "0px", padding: "0px" }}
                              {...props}
                            >
                              <StepButton
                                onClick={() =>
                                  this.changeValueEnterprise(index)
                                }
                                style={{ margin: "0px", padding: "0px" }}
                                {...buttonProps}
                              >
                                {item.label}
                              </StepButton>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider className={classes.customDivider} />
              <Grid item xs={12} md={12} className={classes.customGrid}>
                <Typography style={{ fontSize: "20px" }}>
                  {t("ConfigurableFields")}
                </Typography>
              </Grid>
              <Divider className={classes.customDivider} />
              <Grid item container xs={12} md={12} required>
                <Grid item container xs={12} md={12}>
                  <Grid
                    item
                    xs={12}
                    md={
                      12
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Typography style={{ fontSize: "20px" }}>
                      {t("FieldAttached")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        label={t("InputAdjTitle")}
                        fullWidth
                        value={this.state.inputAdjTitle}
                        onChange={this.handelChangeConfigurablesInput(
                          "inputAdjTitle"
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.customGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.valueInputADJ}
                      style={{ padding: "0px", width: "80%" }}
                    >
                      {this.state.optionInputADJ.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        // if(this.state.valueName === null && item.value === null)
                        //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                        if (this.state.valueInputADJ !== index)
                          buttonProps.icon = (
                            <Circle style={{ color: "#9e9e9e" }} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle style={{ color: "#2196f3" }} />
                          );
                        return (
                          <Step
                            key={item.label}
                            style={{ margin: "0px", padding: "0px" }}
                            {...props}
                          >
                            <StepButton
                              onClick={() =>
                                this.changeValueConfigurableInput(
                                  index,
                                  "inputADJ"
                                )
                              }
                              style={{ margin: "0px", padding: "0px" }}
                              disabled={
                                this.state.inputAdjTitle === "" ||
                                this.state.inputAdjTitle === null
                              }
                              {...buttonProps}
                            >
                              {item.label}
                            </StepButton>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>
                </Grid>
                <Divider className={classes.customDivider} />
                <Grid item container xs={12} md={12}>
                  <Grid
                    item
                    xs={12}
                    md={
                      12
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Typography style={{ fontSize: "20px" }}>
                      {t("TextFields")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        label={t("InputTitle") + " 1"}
                        fullWidth
                        value={this.state.input1Title}
                        onChange={this.handelChangeConfigurablesInput(
                          "input1Title"
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.customGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.valueInput1}
                      style={{ padding: "0px", width: "80%" }}
                    >
                      {this.state.optionInput1.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        // if(this.state.valueName === null && item.value === null)
                        //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                        if (this.state.valueInput1 !== index)
                          buttonProps.icon = (
                            <Circle style={{ color: "#9e9e9e" }} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle style={{ color: "#2196f3" }} />
                          );
                        return (
                          <Step
                            key={item.label}
                            style={{ margin: "0px", padding: "0px" }}
                            {...props}
                          >
                            <StepButton
                              onClick={() =>
                                this.changeValueConfigurableInput(
                                  index,
                                  "input1"
                                )
                              }
                              style={{ margin: "0px", padding: "0px" }}
                              disabled={
                                this.state.input1Title === "" ||
                                this.state.input1Title === null
                              }
                              {...buttonProps}
                            >
                              {item.label}
                            </StepButton>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        label={t("InputTitle") + " 2"}
                        fullWidth
                        value={this.state.input2Title}
                        onChange={this.handelChangeConfigurablesInput(
                          "input2Title"
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.customGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.valueInput2}
                      style={{ padding: "0px", width: "80%" }}
                    >
                      {this.state.optionInput2.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        // if(this.state.valueName === null && item.value === null)
                        //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                        if (this.state.valueInput2 !== index)
                          buttonProps.icon = (
                            <Circle style={{ color: "#9e9e9e" }} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle style={{ color: "#2196f3" }} />
                          );
                        return (
                          <Step
                            key={item.label}
                            style={{ margin: "0px", padding: "0px" }}
                            {...props}
                          >
                            <StepButton
                              onClick={() =>
                                this.changeValueConfigurableInput(
                                  index,
                                  "input2"
                                )
                              }
                              style={{ margin: "0px", padding: "0px" }}
                              disabled={
                                this.state.input2Title === "" ||
                                this.state.input2Title === null
                              }
                              {...buttonProps}
                            >
                              {item.label}
                            </StepButton>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        label={t("InputTitle") + " 3"}
                        fullWidth
                        value={this.state.input3Title}
                        onChange={this.handelChangeConfigurablesInput(
                          "input3Title"
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.customGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.valueInput3}
                      style={{ padding: "0px", width: "80%" }}
                    >
                      {this.state.optionInput3.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        // if(this.state.valueName === null && item.value === null)
                        //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                        if (this.state.valueInput3 !== index)
                          buttonProps.icon = (
                            <Circle style={{ color: "#9e9e9e" }} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle style={{ color: "#2196f3" }} />
                          );
                        return (
                          <Step
                            key={item.label}
                            style={{ margin: "0px", padding: "0px" }}
                            {...props}
                          >
                            <StepButton
                              onClick={() =>
                                this.changeValueConfigurableInput(
                                  index,
                                  "input3"
                                )
                              }
                              style={{ margin: "0px", padding: "0px" }}
                              disabled={
                                this.state.input3Title === "" ||
                                this.state.input3Title === null
                              }
                              {...buttonProps}
                            >
                              {item.label}
                            </StepButton>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        label={t("InputTitle") + " 4"}
                        fullWidth
                        value={this.state.input4Title}
                        onChange={this.handelChangeConfigurablesInput(
                          "input4Title"
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.customGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.valueInput4}
                      style={{ padding: "0px", width: "80%" }}
                    >
                      {this.state.optionInput4.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        // if(this.state.valueName === null && item.value === null)
                        //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                        if (this.state.valueInput4 !== index)
                          buttonProps.icon = (
                            <Circle style={{ color: "#9e9e9e" }} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle style={{ color: "#2196f3" }} />
                          );
                        return (
                          <Step
                            key={item.label}
                            style={{ margin: "0px", padding: "0px" }}
                            {...props}
                          >
                            <StepButton
                              onClick={() =>
                                this.changeValueConfigurableInput(
                                  index,
                                  "input4"
                                )
                              }
                              style={{ margin: "0px", padding: "0px" }}
                              disabled={
                                this.state.input4Title === "" ||
                                this.state.input4Title === null
                              }
                              {...buttonProps}
                            >
                              {item.label}
                            </StepButton>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: 'flex', flexDirection: 'column ', alignItems: 'center ' }}*/
                  >
                    <Grid item xs={12} md={12}>
                      <TextField
                        label={t("InputTitle") + " 5"}
                        fullWidth
                        value={this.state.input5Title}
                        onChange={this.handelChangeConfigurablesInput(
                          "input5Title"
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} className={classes.customGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.valueInput5}
                      style={{ padding: "0px", width: "80%" }}
                    >
                      {this.state.optionInput5.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        // if(this.state.valueName === null && item.value === null)
                        //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                        if (this.state.valueInput5 !== index)
                          buttonProps.icon = (
                            <Circle style={{ color: "#9e9e9e" }} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle style={{ color: "#2196f3" }} />
                          );
                        return (
                          <Step
                            key={item.label}
                            style={{ margin: "0px", padding: "0px" }}
                            {...props}
                          >
                            <StepButton
                              onClick={() =>
                                this.changeValueConfigurableInput(
                                  index,
                                  "input5"
                                )
                              }
                              style={{ margin: "0px", padding: "0px" }}
                              disabled={
                                this.state.input5Title === "" ||
                                this.state.input5Title === null
                              }
                              {...buttonProps}
                            >
                              {item.label}
                            </StepButton>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div
              className={classes.submit}
              style={{
                position: "relative",
                width: "100%"
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={this.state.isCreating}
                onClick={this.state.isCreating ? undefined : this.handleCreate}
                style={{
                  background: this.state.isSuccess ? green[500] : undefined,
                  color: "white"
                }}
              >
                {this.state.isSuccess
                  ? t("SuccessfullySaved")
                  : this.state.isCreating
                  ? ""
                  : t("Save")}
              </Button>
              {this.state.isCreating && (
                <CircularProgress
                  size={24}
                  className={classes.customCircularProgress}
                />
              )}
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

VehicleSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const VehicleSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(VehicleSettings);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(VehicleSettingsConnected)
);
