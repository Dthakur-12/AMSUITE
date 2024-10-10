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
import CustomStyles from "../../../assets/styles/Settings_styles/EnterpriseSettingsStyles";
import green from "@mui/material/colors/green";

const mapDispatchToProps = {
  AddSettings: addSettings,
};
const mapStateToProps = ({ Settings }) => {
  return {
    settings: Settings.settings,
  };
};
class EnterpriseSettings extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      errorMessage: "",
      OptionRUT: [
        { value: null, label: t("Hidden") },
        { value: false, label: t("Visible") },
        { value: true, label: t("Required") },
      ],
      OptionAdress: [
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

      EnterpriseDTO: { ID: -1 },
      formErrors: {},
      RUT: 0,
      Adress: 0,
      Phone: 0,
      Email: 0,
    };
  }

  componentDidMount() {
    NavBarSettings.hideLoader();
    this.loadEnterpriseSettings();
  }

  loadEnterpriseSettings = () => {
    ApiHandler.Setting.Setting.getEnterpriseSetting()
      .then(({ data }) => {
        this.setState({
          EnterpriseDTO: {
            id: data.data.id,
            RUT: data.data.rut,
            adress: data.data.adress,
            phone: data.data.phone,
            email: data.data.email,
          },
          RUT: data.data.rut === null ? 0 : data.data.rut ? 2 : 1,
          adress: data.data.adress === null ? 0 : data.data.adress ? 2 : 1,
          phone: data.data.phone === null ? 0 : data.data.phone ? 2 : 1,
          email: data.data.email === null ? 0 : data.data.email ? 2 : 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeValueRUT = (value) => {
    this.setState({ RUT: value });
    if (value === 0) this.handleChange("RUT", null);
    if (value === 1) this.handleChange("RUT", false);
    if (value === 2) this.handleChange("RUT", true);
  };
  changeValueAdress = (value) => {
    this.setState({ adress: value });
    if (value === 0) this.handleChange("adress", null);
    if (value === 1) this.handleChange("adress", false);
    if (value === 2) this.handleChange("adress", true);
  };
  changeValuePhone = (value) => {
    this.setState({ phone: value });
    if (value === 0) this.handleChange("phone", null);
    if (value === 1) this.handleChange("phone", false);
    if (value === 2) this.handleChange("phone", true);
  };
  changeValueEmail = (value) => {
    this.setState({ email: value });
    if (value === 0) this.handleChange("email", null);
    if (value === 1) this.handleChange("email", false);
    if (value === 2) this.handleChange("email", true);
  };

  handleChange = (name, value) => {
    this.setState((prevState) => ({
      EnterpriseDTO: {
        ...prevState.EnterpriseDTO,
        [name]: value,
      },
    }));
  };

  handleCreate = () => {
    const { t, settings } = this.props;
    this.setState({
      isCreating: true,
    });
    ApiHandler.Setting.Setting.editEnterpriseSetting(this.state.EnterpriseDTO)
      .then(() => {
        this.props.AddSettings({
          ...settings,
          enterpriseSettings: this.state.EnterpriseDTO,
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
    setTimeout(() => {
      this.setState({
        isSuccess: false,
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
              {t("enterprise")}
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Typography
                        htmlFor="NameEmployee"
                        className={classes.customTypo}
                      >
                        {t("TIN")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.RUT}
                        className={classes.customStepper}
                      >
                        {this.state.OptionRUT.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (this.state.RUT !== index)
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
                                className={classes.customStepButton}
                                onClick={() => this.changeValueRUT(index)}
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Typography className={classes.customTypo}>
                        {t("Phone")}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.phone}
                        className={classes.customStepper}
                      >
                        {this.state.OptionPhone.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (this.state.phone !== index)
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Typography className={classes.customTypo}>
                        {t("address")}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.adress}
                        className={classes.customStepper}
                      >
                        {this.state.OptionAdress.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (this.state.adress === null && item.value === null)
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.adress !== index)
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
                                onClick={() => this.changeValueAdress(index)}
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
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Typography className={classes.customTypo}>
                        {t("email")}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.alignmentGrid}
                    >
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={this.state.email}
                        className={classes.customStepper}
                      >
                        {this.state.OptionEmail.map((item, index) => {
                          const props = {};
                          const buttonProps = {};
                          if (this.state.email === null && item.value === null)
                            buttonProps.icon = (
                              <Circle className={classes.circle} />
                            );
                          if (this.state.email !== index)
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
                </Grid>
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
                className={classes.customButton}
                style={{
                  background: this.state.isSuccess ? green[500] : undefined,
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

EnterpriseSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const EnterpriseSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterpriseSettings);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(EnterpriseSettingsConnected)
);
