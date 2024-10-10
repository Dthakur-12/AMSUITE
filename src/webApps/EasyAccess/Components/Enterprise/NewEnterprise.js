import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import {
  isValueEmptyOrNull,
  isEmailValid,
} from "../../../../utils/HelperFunctions";
import { isNullOrUndefined } from "util";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";
import {
  requestCreateEnterprises,
  requestEditEnterprises,
} from "../../../../actions/EasyAccess/Enterprise_actions";
import { requestGetStatuses } from "../../../../actions/EasyAccess/status_actions";
import styles from "../../../../assets/styles/EasyAccess_styles/Enterprise_styles/enterpriseStyles";

const mapStateToProps = ({ User, Settings, Enterprise, Status }) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings,
    successCreateEnterprise: Enterprise.successCreateEnterprise,
    loading: Enterprise.loading,
    error: Enterprise.error,
    successEditEnterprise: Enterprise.successEditEnterprise,
    successGetStatuses: Status.successGetStatuses,
    statuses: Status.statuses,
  };
};
const mapDispatchToProps = {
  requestCreateEnterprises: requestCreateEnterprises,
  requestEditEnterprises: requestEditEnterprises,
  requestGetStatuses,
};

const formValues = {
  name: "",
  rut: -1,
  address: "",
  phone: "",
  email: "",
  receivesVisits: false,
};

class NewEnterprise extends Component {
  constructor(props) {
    super(props);
    const { initValues, currentUser, settings } = props;
    this.state = {
      isLoadingEnterprises: true,
      isLoadingStatus: true,
      newEnterprise: initValues ? initValues : formValues,
      currentUser: currentUser,
      enterpriseSettings: settings.enterpriseSettings,
      formErrors: {},
    };
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
    this.loadStatus();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successCreateEnterprise !== prevState.successCreateEnterprise ||
      nextProps.loading !== prevState.loading ||
      nextProps.error !== prevState.error ||
      nextProps.successEditEnterprise !== prevState.successEditEnterprise ||
      nextProps.successGetStatuses !== prevState.successGetStatuses
    ) {
      return {
        successGetStatuses: nextProps.successGetStatuses,
        statuses: nextProps.statuses,
        successEditEnterprise: nextProps.successEditEnterprise,
        successCreateEnterprise: nextProps.successCreateEnterprise,
        loading: nextProps.loading,
        error: nextProps.error,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.successGetStatuses &&
      prevState.successGetStatuses !== this.state.successGetStatuses
    ) {
      let statusSuggestions = [];
      this.state.statuses.data.map((status) =>
        statusSuggestions.push({
          value: status.id,
          label: status.name,
        })
      );
      this.setState((prevState) => ({
        statusSuggestions,
        newPerson: {
          ...prevState.newPerson,
          status: statusSuggestions[0].value,
        },
        isLoadingStatus: false,
      }));
    }

    if (
      this.state.successCreateEnterprise &&
      this.state.successCreateEnterprise !== prevState.successCreateEnterprise
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
        newEnterprise: formValues,
      });
      SnackbarHandler.showMessage(this.props.t("SuccessCreateEnterprise"));
    }
    if (
      (!this.state.successCreateEnterprise &&
        this.state.successCreateEnterprise !==
          prevState.successCreateEnterprise &&
        this.state.loading === false) ||
      (!this.state.successEditEnterprise &&
        this.state.successEditEnterprise !== prevState.successEditEnterprise &&
        this.state.loading === false)
    ) {
      this.setState({
        isCreating: false,
        isSuccess: false,
      });
      SnackbarHandler.showMessage(this.props.t(this.state.error), "error");
    }
    if (
      this.state.successEditEnterprise &&
      this.state.successEditEnterprise !== prevState.successEditEnterprise
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      SnackbarHandler.showMessage(this.props.t("successEditEnterprise"));
      this.props.onCreate();
    }
  }
  loadStatus = () => {
    this.props.requestGetStatuses({
      start: 0,
      length: -1,
      order: "name asc",
      search: "",
    });
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newEnterprise: {
        ...prevState.newEnterprise,
        [name]: value,
      },
    }));
  };

  handleChangeBoolean = (name) => (event) => {
    let value = event.currentTarget.checked;
    this.setState((prevState) => ({
      newEnterprise: {
        ...prevState.newEnterprise,
        [name]: value,
      },
    }));
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
      this.props.requestCreateEnterprises(this.state.newEnterprise);
      setTimeout(() => {
        this.setState({
          isSuccess: false,
        });
      }, 1000);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
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
      this.props.requestEditEnterprises(this.state.newEnterprise);
      setTimeout(() => {
        this.setState({
          isSuccess: false,
        });
      }, 1000);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  validateCreate = () => {
    const { newEnterprise, enterpriseSettings } = this.state;
    let RUT = enterpriseSettings.rut
      ? isValueEmptyOrNull(newEnterprise.rut)
      : false;
    let Address = enterpriseSettings.address
      ? isValueEmptyOrNull(newEnterprise.address)
      : false;
    let Phone = enterpriseSettings.phone
      ? isValueEmptyOrNull(newEnterprise.phone)
      : false;
    let Email = enterpriseSettings.email
      ? !isEmailValid(newEnterprise.email)
      : false;
    return {
      name: isValueEmptyOrNull(newEnterprise.name),
      rut: RUT,
      address: Address,
      phone: Phone,
      email: Email,
    };
  };

  render() {
    const { classes, isDialog, isEdit, t, theme } = this.props;
    const { newEnterprise, enterpriseSettings } = this.state;
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
              <BusinessIcon />
            </Avatar>
            {this.props.isEdit ? (
              <Typography component="h1" variant="h5">
                {t("EditEnterprise")}
              </Typography>
            ) : (
              <Typography component="h1" variant="h5">
                {t("NewEnterprise")}
              </Typography>
            )}
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  label={t("name")}
                  value={newEnterprise.name}
                  fullWidth
                  onChange={this.handleChange("name")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 },
                  }}
                  error={this.state.formErrors.name}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.rut)}
              >
                <TextField
                  required={enterpriseSettings.rut}
                  type="number"
                  label={t("RUT")}
                  value={newEnterprise.rut}
                  onChange={this.handleChange("rut")}
                  fullWidth
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.rut ? 1 : 0 },
                  }}
                  error={this.state.formErrors.rut}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.address)}
              >
                <TextField
                  required={enterpriseSettings.address}
                  label={t("address")}
                  value={newEnterprise.address}
                  onChange={this.handleChange("address")}
                  fullWidth
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.address ? 1 : 0 },
                  }}
                  error={this.state.formErrors.address}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.phone)}
              >
                <TextField
                  required={enterpriseSettings.phone}
                  type="number"
                  label={t("Phone")}
                  value={newEnterprise.phone}
                  fullWidth
                  onChange={this.handleChange("phone")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.phone ? 1 : 0 },
                  }}
                  error={this.state.formErrors.phone}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.email)}
              >
                <TextField
                  required={enterpriseSettings.email}
                  type="email"
                  label={t("email")}
                  value={newEnterprise.email}
                  fullWidth
                  onChange={this.handleChange("email")}
                  helperText={t("invalidEmail")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.email ? 1 : 0 },
                  }}
                  error={this.state.formErrors.email}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newEnterprise.receivesVisits}
                      onChange={this.handleChangeBoolean("receivesVisits")}
                      value="receivesVisits"
                      color="primary"
                    />
                  }
                  labelPlacement="end"
                  label={`${t("receiveVisits")}`}
                  style={{
                    marginBottom: "10%",
                    cursor: "default",
                  }}
                />
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
                className={classes.primaryButton}
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
                  ? t("EditEnterprise")
                  : t("CreateEnterprise")}
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
                    color: theme.palette.text,
                  }}
                />
              )}
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

NewEnterprise.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const NewEnterpriseConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEnterprise);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewEnterpriseConnected)
);
