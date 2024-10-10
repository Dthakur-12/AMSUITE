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
import { withTranslation } from "react-i18next";
import { addSettings } from "../../../actions/Settings/system_actions";
import CustomStyles from "../../../assets/styles/Settings_styles/EmployeeSettingsStyles";

const mapStateToProps = ({ Settings }) => {
  return {
    settings: Settings.settings,
  };
};
const mapDispatchToProps = {
  AddSettings: addSettings,
};

class EmployeeSettings extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      errorMessage: "",
      OptionName: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionLastName: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionDNI: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionPhone: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionEmail: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionCardEmployee: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionEnterprise: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionEmployeeIsHost: [
        { value: 2, label: t("Hidden") },
        { value: 1, label: t("Unchecked") },
        { value: 0, label: t("Checked") },
      ],
      // OptionEmpRes: [
      //   { value: null, label: t("Hidden") },
      //   { value: false, label: t("Visible") },
      //   { value: true, label: t("Required") }
      // ],
      EmployeeDTO: { ID: -1 },
      formErrors: {},
      valueLastName: 0,
      valueName: 0,
      valueDNI: 0,
      valuePhone: 0,
      valueEmail: 0,
      valueCard: 0,
      valueEnterprise: 0,
      valueEmployeeIsHost: 2,
      //valueEmpRes: 0
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
    this.loadEmployeeSettings();
  }

  loadEmployeeSettings = () => {
    ApiHandler.Setting.Setting.getEmployeeSetting()
      .then(({ data }) => {
        this.setState({
          EmployeeDTO: {
            id: data.data.id,
            name: data.data.name,
            lastName: data.data.lastName,
            dni: data.data.dni,
            phone: data.data.phone,
            email: data.data.email,
            card: data.data.card,
            enterprise: data.data.enterprise,
            employeeIsHost: data.data.employeeIsHost,
            //EmpRes: data.data.empRes
          },
          valueName: data.data.name === null ? 0 : data.data.name ? 2 : 1,
          valueLastName:
            data.data.lastName === null ? 0 : data.data.lastName ? 2 : 1,
          valueDNI: data.data.dni === null ? 0 : data.data.dni ? 2 : 1,
          valuePhone: data.data.phone === null ? 0 : data.data.phone ? 2 : 1,
          valueEmail: data.data.email === null ? 0 : data.data.email ? 2 : 1,
          valueCard: data.data.card === null ? 0 : data.data.card ? 2 : 1,
          valueEmployeeIsHost: data.data.employeeIsHost
            ? data.data.employeeIsHost
            : 0,
          valueEnterprise:
            data.data.enterprise === null ? 0 : data.data.enterprise ? 2 : 1,
          //valueEmpRes: data.data.empRes === null ? 0 : data.data.empRes ? 2 : 1
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (name, value) => {
    this.setState((prevState) => ({
      EmployeeDTO: {
        ...prevState.EmployeeDTO,
        [name]: value,
      },
    }));
  };
  handleCreate = () => {
    this.setState({
      isCreating: true,
    });
    const { t } = this.props;
    ApiHandler.Setting.Setting.editEmployeeSetting(this.state.EmployeeDTO)
      .then(() => {
        const settings = this.props.settings;

        this.props.AddSettings({
          ...settings,
          employeeSettings: this.state.EmployeeDTO,
        });
        SnackbarHandler.showMessage(t("SavedPreferencesMessage"));
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
    setTimeout(() => {
      this.setState({
        isSuccess: false,
      });
    }, 1000);
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
  };
  changeValueEnterprise = (value) => {
    this.setState({ valueEnterprise: value });
    if (value === 0) this.handleChange("enterprise", null);
    if (value === 1) this.handleChange("enterprise", false);
    if (value === 2) this.handleChange("enterprise", true);
  };

  changeValueEmployeeIsHost = (value) => {
    this.setState({ valueEmployeeIsHost: value });
    this.handleChange("employeeIsHost", value);
  };

  render() {
    const { classes, t, theme } = this.props;
    const { isDesktop } = this.state;
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
              {t("employee")}
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
                        {this.state.OptionName.map((item, index) => {
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
                                className={classes.customStep}
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
                        {this.state.OptionLastName.map((item, index) => {
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
                                className={classes.customStep}
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
                        {this.state.OptionDNI.map((item, index) => {
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
                                className={classes.customStep}
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
                        {this.state.OptionPhone.map((item, index) => {
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
                                className={classes.customStep}
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
                        {this.state.OptionEmail.map((item, index) => {
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
                                className={classes.customStep}
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
                        {this.state.OptionCardEmployee.map((item, index) => {
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
                                className={classes.customStep}
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
                        {this.state.OptionEnterprise.map((item, index) => {
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
                              {...props}
                              className={classes.customStep}
                            >
                              <StepButton
                                onClick={() =>
                                  this.changeValueEnterprise(index)
                                }
                                className={classes.customStep}
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
                        {t("EmployeeIsHost")}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueEmployeeIsHost}
                        className={classes.customStepper}
                      >
                        {this.state.OptionEmployeeIsHost.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (
                            this.state.valueEmployeeIsHost === null &&
                            item.value === null
                          )
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.valueEmployeeIsHost !== item.value)
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
                                  this.changeValueEmployeeIsHost(item.value)
                                }
                                className={classes.customStep}
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
                  {/* <Grid
                    item
                    xs={6}
                    md={6}
                    required 
                  > */}
                  {/* <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <Typography className={classes.customTypo}>
                        {t("ResponsibleEmployee")}
                      </Typography>
                    </Grid> */}

                  {/* <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.valueEmpRes}
                        className={classes.customStepper}
                      >
                        {this.state.OptionEmpRes.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (
                            this.state.valueEmpRes === null &&
                            item.value === null
                          )
                            buttonProps.icon = (
                              <Circle style={{ color: "#2196f3" }} />
                            );
                          if (this.state.valueEmpRes !== index)
                            buttonProps.icon = (
                              <Circle className={classes.circleDos} />
                            );
                          else
                            buttonProps.icon = (
                              <Circle style={{ color: "#2196f3" }} />
                            );
                          return (
                            <Step
                              key={item.label}
                              {...props}
                              className={classes.customStep}
                            >
                              <StepButton
                                onClick={() => this.changeValueEmpRes(index)}
                                className={classes.customStep}
                                {...buttonProps}
                              >
                                {item.label}
                              </StepButton>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Grid> */}
                  {/* </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            {/* </Grid> */}
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

EmployeeSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const EmployeeSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeSettings);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(EmployeeSettingsConnected)
);
