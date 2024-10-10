import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import CardIcon from "@mui/icons-material/CreditCard";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import { FormHelperText } from "@mui/material";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import {
  requestCreateCardFormat,
  requestEditCardFormat,
  requestGetCardFormatByID,
  clearDataNew,
} from "../../../../actions/AccessControl/cardFormat_actions";
import { connect } from "react-redux";
import styles from "../../../../assets/styles/AccessControl_styles/CardFormat_styles/newCardFormatStyles";
import { receiveGetStatuses } from "../../../../actions/EasyAccess/status_actions";
const formValues = {
  name: "",
  facilityCode: "",
  totalBits: "",
  facilityCodeBitStart: "",
  facilityCodeBitEnd: "",
  cardNumberBitStart: "",
  cardNumberBitEnd: "",
};

class NewCardFormat extends Component {
  constructor(props) {
    super(props);
    //const { initValues } = props;
    this.state = {
      newCardFormat: formValues, //initValues ? initValues : formValues,
      formErrors: {},
      bitsErrors: undefined,
    };
  }

  componentDidMount() {
    NavBarAccessControl.hideLoader();
    if (this.props.isEdit || this.props.isDetails) {
      this.props.requestGetCardFormatByID(this.props.id);
    } else {
      this.setState({ newCardFormat: formValues });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.loadingData !== prevState.isLoading ||
      nextProps.loading != prevState.loading ||
      nextProps.successCardFormatById !== prevState.successCardFormatById ||
      nextProps.loadingRequest !== prevState.isCreating ||
      nextProps.successCreateCardFormat !== prevState.successCreateCardFormat ||
      nextProps.successEditCardFormat !== prevState.successEditCardFormat ||
      nextProps.error !== prevState.error
    ) {
      return {
        isLoading: nextProps.loading,
        newCardFormatByID: nextProps.cardFormatById,
        successCardFormatById: nextProps.successCardFormatById,
        isCreating: nextProps.loadingRequest,
        isSuccess:
          nextProps.successCreateCardFormat || nextProps.successEditCardFormat,
        successEditCardFormat: nextProps.successEditCardFormat,
        loading: nextProps.loading,
        successCreateCardFormat: nextProps.successCreateCardFormat,
        apiError: nextProps.error,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (
      this.state.successCardFormatById &&
      this.state.successCardFormatById !== prevState.successCardFormatById
    ) {
      this.setState({ newCardFormat: this.state.newCardFormatByID });
    }
    if (this.state.isSuccess && prevState.isSuccess !== this.state.isSuccess) {
      if (this.props.isEdit) {
        SnackbarHandler.showMessage(t("SuccessEditCardFormat"));
        // this.resetData();
        this.props.updateParent();
        this.props.onCreate();
      } else {
        SnackbarHandler.showMessage(t("SuccessEditCardFormat"));
      }
      this.resetData();
    }

    if (
      !this.state.isSuccess &&
      !this.state.loading &&
      this.state.loading !== prevState.loading &&
      this.state.apiError
    ) {
      SnackbarHandler.showMessage(
        this.props.t(this.state.apiError, this.state.apiError),
        "error"
      );
    }
  }

  resetData = () => {
    this.setState({
      newCardFormat: formValues,
      // isSuccess: false,
      // successEditCardFormat: false,
      // successCreateCardFormat: false
    });

    this.props.clearDataNew();
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newCardFormat: {
        ...prevState.newCardFormat,
        [name]: value,
      },
    }));
  };

  handleCreate = () => {
    const errors = this.validateCreate();
    const { t } = this.props;
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        isCreating: true,
        bitsErrors: undefined,
      });
      let newCardFormat = JSON.parse(JSON.stringify(this.state.newCardFormat));
      this.props.requestCreateCardFormat(newCardFormat);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  validateCreate = () => {
    const { newCardFormat } = this.state;
    return {
      name: isValueEmptyOrNull(newCardFormat.name),
      facilityCode: isValueEmptyOrNull(newCardFormat.facilityCode),
      totalBits: isValueEmptyOrNull(newCardFormat.totalBits),
      facilityCodeBitStart: isValueEmptyOrNull(
        newCardFormat.facilityCodeBitStart
      ),
      facilityCodeBitEnd: isValueEmptyOrNull(newCardFormat.facilityCodeBitEnd),
      cardNumberBitStart: isValueEmptyOrNull(newCardFormat.cardNumberBitStart),
      cardNumberBitEnd: isValueEmptyOrNull(newCardFormat.cardNumberBitEnd),
    };
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
        bitsErrors: undefined,
      });
      let newCardFormat = JSON.parse(JSON.stringify(this.state.newCardFormat));
      this.props.requestEditCardFormat(newCardFormat);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  render() {
    const { classes, isDialog, isEdit, isDetails, t, theme } = this.props;
    const { newCardFormat, isLoading, bitsErrors } = this.state;
    if (isLoading) return <div />;
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
              <CardIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isEdit
                ? t("EditCardFormat")
                : isDetails
                ? t("DetailsCardFormat")
                : t("NewCardFormat")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={12} className={classes.grid}>
                <TextField
                  required
                  label={t("name")}
                  value={newCardFormat.name}
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
                <TextField
                  required
                  type="number"
                  label={t("installCode")}
                  InputProps={{ inputProps: { min: 0 } }}
                  value={newCardFormat.facilityCode}
                  onChange={this.handleChange("facilityCode")}
                  fullWidth
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: {
                      opacity: this.state.formErrors.facilityCode ? 1 : 0,
                    },
                  }}
                  error={this.state.formErrors.facilityCode}
                  disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  label={t("AllBits")}
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  value={newCardFormat.totalBits}
                  onChange={this.handleChange("totalBits")}
                  fullWidth
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.totalBits ? 1 : 0 },
                  }}
                  error={this.state.formErrors.totalBits}
                  disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  type="number"
                  label={t("InitBitsOfInstallCode")}
                  InputProps={{ inputProps: { min: 0 } }}
                  value={newCardFormat.facilityCodeBitStart}
                  fullWidth
                  onChange={this.handleChange("facilityCodeBitStart")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: {
                      opacity: this.state.formErrors.facilityCodeBitStart
                        ? 1
                        : 0,
                    },
                  }}
                  error={this.state.formErrors.facilityCodeBitStart}
                  disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  type="number"
                  label={t("LastBitsOfInstallCode")}
                  InputProps={{ inputProps: { min: 0 } }}
                  value={newCardFormat.facilityCodeBitEnd}
                  fullWidth
                  onChange={this.handleChange("facilityCodeBitEnd")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: {
                      opacity: this.state.formErrors.facilityCodeBitEnd ? 1 : 0,
                    },
                  }}
                  error={this.state.formErrors.facilityCodeBitEnd}
                  disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  type="number"
                  label={t("InitBitsOfCardNumber")}
                  InputProps={{ inputProps: { min: 0 } }}
                  value={newCardFormat.cardNumberBitStart}
                  fullWidth
                  onChange={this.handleChange("cardNumberBitStart")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: {
                      opacity: this.state.formErrors.cardNumberBitStart ? 1 : 0,
                    },
                  }}
                  error={this.state.formErrors.cardNumberBitStart}
                  disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  type="number"
                  label={t("LastBitsOfCardNumber")}
                  InputProps={{ inputProps: { min: 0 } }}
                  value={newCardFormat.cardNumberBitEnd}
                  fullWidth
                  onChange={this.handleChange("cardNumberBitEnd")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: {
                      opacity: this.state.formErrors.cardNumberBitEnd ? 1 : 0,
                    },
                  }}
                  error={this.state.formErrors.cardNumberBitEnd}
                  disabled={isDetails}
                />
              </Grid>
              <Grid>
                {!isNullOrUndefined(bitsErrors) &&
                  bitsErrors.map((error, index) => (
                    <FormHelperText style={{ opacity: 1 }} error={error}>
                      {error}
                    </FormHelperText>
                  ))}
              </Grid>
            </Grid>
            <div
              className={classes.submit}
              style={{
                position: "relative",
                width: "100%",
              }}
            >
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
                    ? t("editCardFormat")
                    : t("CreateCardFormat")}
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
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

NewCardFormat.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  requestCreateCardFormat,
  requestEditCardFormat,
  requestGetCardFormatByID,
  clearDataNew,
};

const mapStateToProps = ({ CardFormat }) => {
  return {
    cardFormatById: CardFormat.cardFormatById,
    successCardFormatById: CardFormat.successCardFormatById,
    successCreateCardFormat: CardFormat.successCreateCardFormat,
    successEditCardFormat: CardFormat.successEditCardFormat,
    loadingData: CardFormat.loadingGetCardFormatById,
    error: CardFormat.error,
    loading: CardFormat.loading,
    loadingRequest: CardFormat.loadingEdit || CardFormat.loadingCreate,
  };
};

const NewCardFormatsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCardFormat);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewCardFormatsConnected)
);
