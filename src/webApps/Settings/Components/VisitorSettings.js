import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarSettings from "../utils/NavBarSettings";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
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
import { Icon } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import { isValueEmptyOrNull } from "../../../utils/HelperFunctions";
import TextField from "@mui/material/TextField";
import { addSettings } from "../../../actions/Settings/system_actions";
import CustomStyles from "../../../assets/styles/Settings_styles/VisitorSettingsStyles";

const mapStateToProps = ({ Settings }) => {
  return {
    settings: Settings.settings,
  };
};

const mapDispatchToProps = {
  AddSettings: addSettings,
};

class VisitorSettings extends Component {
  constructor(props) {
    super(props);
    const { currentUser, t } = this.props;
    this.state = {
      errorMessage: "",
      optionName: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      optionLastName: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      optionDNI: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      optionPhone: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      optionEmail: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      optionCardEmployee: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
        { value: -1, label: t("Automatic") },
      ],
      optionEnterprise: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      optionEmpRes: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      optionEmpVis: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      visitorDTO: { ID: -1 },
      formErrors: {},
      currentUser: currentUser,
      valueLastName: 2,
      valueName: 2,
      valueDNI: 2,
      valuePhone: 0,
      valueEmail: 1,
      valueCard: 1,
      valueEnterprise: 1,
      valueEmpRes: 1,
      valueEmpVis: 1,
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }
  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    NavBarSettings.hideLoader();
    this.loadVisitorSettings();
  }

  justNumbers = (e) => {
    let keynum = window.event ? window.event.keyCode : e.which;
    if (keynum === 8 || keynum === 46) return true;
    return /\d/.test(String.fromCharCode(keynum));
  };

  loadVisitorSettings = () => {
    ApiHandler.Setting.Setting.getVisitorSetting()
      .then(({ data }) => {
        this.setState({
          visitorDTO: {
            id: data.data.id,
            name: data.data.name,
            lastName: data.data.lastName,
            dni: data.data.dni,
            phone: data.data.phone,
            email: data.data.email,
            card: data.data.card,
            enterprise: data.data.enterprise,
            empRes: data.data.empRes,
            empVis: data.data.empVis,
            startBadgeRange: data.data.startBadgeRange,
            endBadgeRange: data.data.endBadgeRange,
          },
          valueName: data.data.name === null ? 0 : data.data.name ? 2 : 1,
          valueLastName:
            data.data.lastName === null ? 0 : data.data.lastName ? 2 : 1,
          valueDNI: data.data.dni === null ? 0 : data.data.dni ? 2 : 1,
          valuePhone: data.data.phone === null ? 0 : data.data.phone ? 2 : 1,
          valueEmail: data.data.email === null ? 0 : data.data.email ? 2 : 1,
          valueCard:
            data.data.startBadgeRange !== null
              ? 3
              : data.data.card === null
              ? 0
              : data.data.card
              ? 2
              : 1,
          valueEnterprise:
            data.data.enterprise === null ? 0 : data.data.enterprise ? 2 : 1,
          valueEmpRes: data.data.empRes === null ? 0 : data.data.empRes ? 2 : 1,
          valueEmpVis: data.data.empVis === null ? 0 : data.data.empVis ? 2 : 1,
          formErrors: {},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (name, value) => {
    this.setState((prevState) => ({
      visitorDTO: {
        ...prevState.visitorDTO,
        [name]: value,
      },
    }));
  };

  validateSettings = () => {
    const { visitorDTO } = this.state;
    let start = Number(visitorDTO.startBadgeRange);
    let end = Number(visitorDTO.endBadgeRange);
    let invalidRange = false;
    if (!isNaN(start) && !isNaN(end)) {
      invalidRange = start >= end;
    }
    return {
      startIsNotNumber: isNaN(start),
      startIsEmpty: isValueEmptyOrNull(visitorDTO.startBadgeRange),
      endIsNotNumber: isNaN(end),
      endIsEmpty: isValueEmptyOrNull(visitorDTO.endBadgeRange),
      invalidRange,
    };
  };

  changeValueName = (value) => {
    this.setState({ valueName: value });
    if (value === 0) this.handleChange("name", null);
    if (value === 1) this.handleChange("name", false);
    if (value === 2) this.handleChange("name", true);
  };
  changeValueLastName = (value) => {
    this.setState({ valueLastName: value });
    if (value === 0) this.handleChange("lastName", null);
    if (value === 1) this.handleChange("lastName", false);
    if (value === 2) this.handleChange("lastName", true);
  };
  changeValueDNI = (value) => {
    this.setState({ valueDNI: value });
    if (value === 0) this.handleChange("dni", null);
    if (value === 1) this.handleChange("dni", false);
    if (value === 2) this.handleChange("dni", true);
  };
  changeValuePhone = (value) => {
    this.setState({ valuePhone: value });
    if (value === 0) this.handleChange("phone", null);
    if (value === 1) this.handleChange("phone", false);
    if (value === 2) this.handleChange("phone", true);
  };
  changeValueEmail = (value) => {
    this.setState({ valueEmail: value });
    if (value === 0) this.handleChange("email", null);
    if (value === 1) this.handleChange("email", false);
    if (value === 2) this.handleChange("email", true);
  };
  changeValueCard = (value) => {
    this.setState({ valueCard: value });
    if (value === 0) this.handleChange("card", null);
    if (value === 1) this.handleChange("card", false);
    if (value === 2) this.handleChange("card", true);
    if (value === 3) this.handleChange("card", null);
  };
  changeValueEnterprise = (value) => {
    this.setState({ valueEnterprise: value });
    if (value === 0) this.handleChange("enterprise", null);
    if (value === 1) this.handleChange("enterprise", false);
    if (value === 2) this.handleChange("enterprise", true);
  };
  changeValueEmpRes = (value) => {
    this.setState({ valueEmpRes: value });
    if (value === 0) this.handleChange("empRes", null);
    if (value === 1) this.handleChange("empRes", false);
    if (value === 2) this.handleChange("empRes", true);
  };
  changeValueEmpVis = (value) => {
    this.setState({ valueEmpVis: value });
    if (value === 0) this.handleChange("empVis", null);
    if (value === 1) this.handleChange("empVis", false);
    if (value === 2) this.handleChange("empVis", true);
  };

  handleCreate = () => {
    const { t } = this.props;
    let startBadgeRange = null;
    let endBadgeRange = null;
    let errors = {};
    if (this.state.valueCard === 3) {
      errors = this.validateSettings();
      startBadgeRange = this.state.visitorDTO.startBadgeRange;
      endBadgeRange = this.state.visitorDTO.endBadgeRange;
    }
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
      });
      ApiHandler.Setting.Setting.editVisitorSetting({
        ...this.state.visitorDTO,
        startBadgeRange,
        endBadgeRange,
      })
        .then(() => {
          const settings = this.props.settings;
          this.props.AddSettings({
            ...settings,
            visitorSettings: {
              ...this.state.visitorDTO,
              startBadgeRange,
              endBadgeRange,
            },
          });
          SnackbarHandler.showMessage(t("SuccessfullySavedPreferences"));
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          setTimeout(() => {
            this.setState({
              isSuccess: false,
            });
          }, 1000);
        })
        .catch((error) => {
          this.setState({
            isCreating: false,
          });
          SnackbarHandler.showMessage(error.error, "error");
        });
    }
    setTimeout(() => {
      this.setState({
        isSuccess: false,
      });
    }, 1000);
  };

  render() {
    const { classes, t, theme } = this.props;
    const { formErrors, isDesktop } = this.state;
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
            }}
            className={classes.customLinearProgress}
            variant="query"
          />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("visitor")}
            </Typography>

            <Divider className={classes.customDivider} />
            <Grid container spacing={24}>
              <Grid item container xs={12} md={12}>
                <Grid item container xs={12} md={12}>
                  <Grid
                    item
                    xs={6}
                    md={
                      6
                    } /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography
                        htmlFor="NameEmployee"
                        className={classes.customTypo}
                      >
                        {t("name")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueName}
                        className={classes.customStepper}
                      >
                        {this.state.optionName.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          // if(this.state.valueName === null && item.value === null)
                          //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                          if (this.state.valueName !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValueName(index)}
                                className={classes.customStepButton}
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
                    md={6}
                    required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography className={classes.customTypo}>
                        {t("LastName")}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueLastName}
                        className={classes.customStepper}
                      >
                        {this.state.optionLastName.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (this.state.valueLastName !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValueLastName(index)}
                                className={classes.customStepButton}
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
                    md={6}
                    required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography className={classes.customTypo}>
                        {t("SSNO")}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueDNI}
                        className={classes.customStepper}
                      >
                        {this.state.optionDNI.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (
                            this.state.valueDNI === null &&
                            item.value === null
                          )
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.valueDNI !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValueDNI(index)}
                                className={classes.customStepButton}
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
                    md={6}
                    required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography className={classes.customTypo}>
                        {t("Phone")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valuePhone}
                        className={classes.customStepper}
                      >
                        {this.state.optionPhone.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (
                            this.state.valuePhone === null &&
                            item.value === null
                          )
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.valuePhone !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValuePhone(index)}
                                className={classes.customStepButton}
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
                    md={6}
                    required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography className={classes.customTypo}>
                        {t("email")}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueEmail}
                        className={classes.customStepper}
                      >
                        {this.state.optionEmail.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (
                            this.state.valueEmail === null &&
                            item.value === null
                          )
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.valueEmail !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValueEmail(index)}
                                className={classes.customStepButton}
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
                      <Typography
                        htmlFor="EmpVis"
                        className={classes.customTypo}
                      >
                        {t("visitEnterprise")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueEmpVis}
                        className={classes.customStepper}
                      >
                        {this.state.optionEmpVis.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          // if(this.state.valueName === null && item.value === null)
                          //     buttonProps.icon = <Circle style={{color:"#2196f3"}}/>
                          if (this.state.valueEmpVis !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValueEmpVis(index)}
                                className={classes.customStepButton}
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
                    md={6}
                    required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography className={classes.customTypo}>
                        {t("enterprise")}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueEnterprise}
                        className={classes.customStepper}
                      >
                        {this.state.optionEnterprise.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (
                            this.state.valueEnterprise === null &&
                            item.value === null
                          )
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.valueEnterprise !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() =>
                                  this.changeValueEnterprise(index)
                                }
                                className={classes.customStepButton}
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
                    md={6}
                    required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography className={classes.customTypo}>
                        {t("ResponsibleEmployee")}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueEmpRes}
                        className={classes.customStepper}
                      >
                        {this.state.optionEmpRes.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (
                            this.state.valueEmpRes === null &&
                            item.value === null
                          )
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.valueEmpRes !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          return (
                            <Step
                              key={item.label}
                              className={classes.customStep}
                              {...props}
                            >
                              <StepButton
                                onClick={() => this.changeValueEmpRes(index)}
                                className={classes.customStepButton}
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
                <Grid
                  item
                  xs={12}
                  md={6}
                  required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                >
                  <Grid item xs={12} md={12} className={classes.customGrid}>
                    <Typography className={classes.customTypo}>
                      {t("EmployeeBadge")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12} className={classes.customGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.valueCard}
                      className={classes.customStepper}
                    >
                      {this.state.optionCardEmployee.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        if (
                          this.state.valueCard === null &&
                          item.value === null
                        )
                          buttonProps.icon = (
                            <Circle className={classes.circle} />
                          );
                        if (this.state.valueCard !== index)
                          buttonProps.icon = (
                            <Circle className={classes.circleDos} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle className={classes.circle} />
                          );
                        return (
                          <Step
                            key={item.label}
                            className={classes.customStep}
                            {...props}
                          >
                            <StepButton
                              onClick={() => this.changeValueCard(index)}
                              className={classes.customStepButton}
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

                {this.state.valueCard === 3 && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    required /*style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}*/
                  >
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography className={classes.customTypo}>
                        {t("CardRange")}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <div className={classes.rangeContainer}>
                        <div className={classes.cardRange}>
                          <div className={classes.startRangeInput}>
                            <TextField
                              id="outlined-dense"
                              label={t("From")}
                              margin="dense"
                              variant="outlined"
                              className={classes.cardRangeTextField}
                              onKeyPress={(event) => {
                                if (!this.justNumbers(event))
                                  event.preventDefault();
                              }}
                              error={
                                formErrors.startIsNotNumber ||
                                formErrors.invalidRange ||
                                formErrors.startIsEmpty
                              }
                              onChange={(e) =>
                                this.handleChange(
                                  "startBadgeRange",
                                  e.target.value
                                )
                              }
                              value={this.state.visitorDTO.startBadgeRange}
                              helperText={
                                formErrors.startIsEmpty
                                  ? t("InputEmpty")
                                  : formErrors.invalidRange
                                  ? t("InvalidRange")
                                  : formErrors.startIsNotNumber
                                  ? t("StartIsNotNumber")
                                  : ""
                              }
                              FormHelperTextProps={{
                                style: {
                                  opacity:
                                    formErrors.startIsNotNumber ||
                                    formErrors.invalidRange ||
                                    formErrors.startIsEmpty
                                      ? 1
                                      : 0,
                                },
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "15%",
                              alignSelf: "flex-start",
                              display: "flex",
                            }}
                          >
                            <Icon
                              style={{
                                width: "100%",
                                alignSelf: "center",
                                color: "rgb(161, 161, 161)",
                              }}
                              name="window minimize"
                            />
                          </div>

                          <div className={classes.endRangeInput}>
                            <TextField
                              id="outlined-dense"
                              label={t("To")}
                              margin="dense"
                              variant="outlined"
                              onKeyPress={(event) => {
                                if (!this.justNumbers(event))
                                  event.preventDefault();
                              }}
                              className={classes.cardRangeTextField}
                              error={
                                formErrors.endIsNotNumber ||
                                formErrors.invalidRange ||
                                formErrors.endIsEmpty
                              }
                              onChange={(e) =>
                                this.handleChange(
                                  "endBadgeRange",
                                  e.target.value
                                )
                              }
                              value={this.state.visitorDTO.endBadgeRange}
                              helperText={
                                formErrors.endIsEmpty
                                  ? t("InputEmpty")
                                  : formErrors.invalidRange
                                  ? t("InvalidRange")
                                  : formErrors.endIsNotNumber
                                  ? t("EndIsNotNumber")
                                  : ""
                              }
                              FormHelperTextProps={{
                                style: {
                                  opacity:
                                    formErrors.startIsNotNumber ||
                                    formErrors.invalidRange ||
                                    formErrors.startIsEmpty
                                      ? 1
                                      : 0,
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>

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
                onClick={this.state.isCreating ? undefined : this.handleCreate}
                style={{
                  background: this.state.isSuccess ? green[500] : undefined,
                  color: theme.palette.text.main,
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
                  clas={classes.customCircularProgress}
                />
              )}
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

VisitorSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const VisitorSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitorSettings);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(VisitorSettingsConnected)
);
