import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarSettings from "../../utils/NavBarSettings";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../../services/ApiHandler";
import PersonIcon from "@mui/icons-material/PersonRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Circle from "@mui/icons-material/FiberManualRecord";
import { Icon } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import TextField from "@mui/material/TextField";
import { addSettings } from "../../../../actions/Settings/system_actions";
import CustomStyles from "../../../../assets/styles/Settings_styles/VisitorSettingsStyles";
import { selectedPersonGroupChange } from "../../../../actions/Settings/settings_actions";

const boolValue = {
  0: null,
  1: false,
  2: true,
};

class FieldsSettings extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser, t } = this.props;
    this.state = {
      errorMessage: "",
      formErrors: {},
      currentUser: currentUser,
    };
  }

  getOptions = (t) => [
    { value: null, label: t("Hidden") },
    { value: false, label: t("Visible") },
    { value: true, label: t("Required") },
  ];
  boolToValue = (value) => {
    return Object.values(boolValue).indexOf(value);
  };

  // componentWillUnmount() {}

  initOptionsValues = () => {
    const { fields, t } = this.props;
    const optionsValues = {};
    Object.keys(fields).map((key) => {
      if (key !== "id")
        optionsValues[key] = {
          options: this.getOptions(t),
          value: this.boolToValue(fields[key]) || 0,
        };
    });
    this.setState({ optionsValues });
  };

  componentDidMount() {
    NavBarSettings.hideLoader();
    this.initOptionsValues();
    this.props.requestSettings();
  }

  objectAreDifferents = (obj1, obj2) => {
    let areDifferent = Object.keys(obj1).some((k) => obj1[k] !== obj2[k]);
    return areDifferent;
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.objectAreDifferents(prevProps.fields, this.props.fields)) {
      this.initOptionsValues();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.isLoading !== prevState.isLoading ||
      nextProps.isSuccess !== prevState.isSuccess
    ) {
      return {
        isLoading: nextProps.isLoading,
        isSuccess: nextProps.isSuccess,
      };
    } else return null;
  }

  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  handleChange =
    ({ key, index }) =>
    (e) => {
      this.setState((prevState) => ({
        optionsValues: {
          ...prevState.optionsValues,
          [key]: {
            ...prevState.optionsValues[key],
            value: index,
          },
        },
      }));
    };

  handleCreate = () => {
    const { optionsValues = {} } = this.state;
    const newSettings = {};
    this.setState({
      isLoading: true,
    });
    Object.keys(optionsValues).forEach(
      (key) => (newSettings[key] = boolValue[optionsValues[key].value])
    );
    this.props.saveSettings(newSettings);
  };

  render() {
    const { classes, t, theme, title = "" } = this.props;
    const { formErrors, optionsValues = {} } = this.state;
    console.log("optionsValues: ", optionsValues);
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <LinearProgress
            style={{
              opacity: this.state.isLoading ? "1" : "0",
            }}
            className={classes.customLinearProgress}
            variant="query"
          />
          <Paper className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              {t(title)}
            </Typography>

            <Divider className={classes.customDivider} />
            <Grid item container xs={12} md={12}>
              {Object.keys(optionsValues).map((key) => {
                return (
                  <Grid item xs={6} md={6} style={{ margin: "15px 0" }}>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Typography
                        htmlFor="NameEmployee"
                        className={classes.customTypo}
                      >
                        {key === "name" ||
                        key === "enterprise" ||
                        key === "visitEnterprise"
                          ? t(key)
                          : t(this.capitalize(key))}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.customGrid}>
                      <Stepper
                        alternativeLabel
                        nonLinear
                        activeStep={optionsValues[key].value}
                        className={classes.customStepper}
                      >
                        {optionsValues[key].options &&
                          optionsValues[key].options.map((option, index) => {
                            const props = {};
                            const buttonProps = {};
                            buttonProps.icon = (
                              <Circle
                                className={
                                  optionsValues[key].value !== index
                                    ? classes.circleDos
                                    : classes.circle
                                }
                              />
                            );
                            return (
                              <Step
                                key={option.label}
                                className={classes.customStep}
                                {...props}
                              >
                                <StepButton
                                  onClick={this.handleChange({ key, index })}
                                  className={classes.customStepButton}
                                  {...buttonProps}
                                >
                                  {option.label}
                                </StepButton>
                              </Step>
                            );
                          })}
                      </Stepper>
                    </Grid>
                  </Grid>
                );
              })}
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
                disabled={this.state.isLoading}
                onClick={this.state.isLoading ? undefined : this.handleCreate}
                style={{
                  background: this.state.isSuccess ? green[500] : undefined,
                  color: theme.palette.text.main,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {this.state.isSuccess
                  ? t("SuccessfullySaved")
                  : this.state.isLoading
                  ? ""
                  : t("Save")}
                {this.state.isLoading && (
                  <CircularProgress
                    size={24}
                    clas={classes.customCircularProgress}
                  />
                )}
              </Button>
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

FieldsSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(FieldsSettings)
);
