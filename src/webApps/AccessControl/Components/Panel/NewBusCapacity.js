import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import styles from "../../../../assets/styles/Aludoc_styles/Document_styles/newDocumentTypeStyles.js";
import {
  requestCreateBusCapacity,
  requestGetBusTypesCapacity,
  requestUpdateBusCapacity,
} from "../../../../actions/AccessControl/panel_actions";
import CircularProgress from "@mui/material/CircularProgress";
import {
  isValueEmptyOrNull,
  isArrayEmptyOrNull,
} from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";

const formValues = {
  name: "",
  capacity: null,
};

class NewBusCapacity extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;
    this.state = {
      newBusCapacity: initValues ? initValues : formValues,
      formErrors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successCreateCapacity !== prevState.successCreateCapacity ||
      nextProps.error !== prevState.error ||
      nextProps.loadingCreateCapacity !== prevState.loadingCreateCapacity
    ) {
      return {
        successCreateCapacity: nextProps.successCreateCapacity,
        error: nextProps.error,
        errorData: nextProps.errorData,
        loadingCreateCapacity: nextProps.loadingCreateCapacity,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t, isInModal, onCreate, successUpdateBusCapacity, isEdit } = this.props;
    if (
      (this.state.successCreateCapacity &&
        prevState.successCreateCapacity !== this.state.successCreateCapacity) ||
      (successUpdateBusCapacity &&
        successUpdateBusCapacity !== prevProps.successUpdateBusCapacity)
    ) {
      this.props.requestGetBusTypesCapacity({
        start: 0,
        length: 10,
        order: "name asc",
        search: "",
      });
      if (isEdit) SnackbarHandler.showMessage(t("successEdit"));
      else SnackbarHandler.showMessage(t("successCreate"));
      onCreate();
    }

    if (
      !this.state.loadingCreateCapacity &&
      this.state.error &&
      prevState.loadingCreateCapacity !== this.state.loadingCreateCapacity
    ) {
      SnackbarHandler.showMessage(t(this.state.error), "error");
      this.props.requestGetBusTypesCapacity({
        start: 0,
        length: 10,
        order: "name asc",
        search: "",
      });
      this.setState({
        isCreating: false,
        isSuccess: false,
      });
    }
  }

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;

    this.setState((prevState) => ({
      newBusCapacity: {
        ...prevState.newBusCapacity,
        [name]: value,
      },
      discriminator: undefined,
    }));
  };

  validateCreate = () => {
    const { newBusCapacity } = this.state;
    return {
      name: isValueEmptyOrNull(newBusCapacity.name),
      enterprises: isValueEmptyOrNull(newBusCapacity.capacity),
    };
  };

  handleCreate = () => {
    const { newBusCapacity } = this.state;
    const { t, isInModal, onCreate } = this.props;
    const errors = this.validateCreate();

    this.setState({
      formErrors: errors,
    });

    if (!Object.keys(errors).some((x) => errors[x])) {
      this.props.requestCreateBusCapacity(newBusCapacity);
      isInModal && onCreate();
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  handleEdit = () => {
    const { newBusCapacity } = this.state;
    const { t, isInModal, onCreate } = this.props;
    const errors = this.validateCreate();

    this.setState({
      formErrors: errors,
    });

    if (!Object.keys(errors).some((x) => errors[x])) {
      this.props.requestUpdateBusCapacity(newBusCapacity);
      isInModal && onCreate();
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  render() {
    const { isDialog, classes, theme, t, isEdit } = this.props;
    const { newBusCapacity } = this.state;
    return (
      <main className={!isDialog ? classes.layout : undefined}>
        <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "3%" }}
          >
            {isEdit ? t("EditBusTypeCapacity") : t("NewCapacity")}
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6} className={classes.center}>
              <TextField
                required
                label={t("name")}
                onChange={this.handleChange("name")}
                fullWidth
                helperText={t("inputEmpty")}
                FormHelperTextProps={{
                  style: { opacity: this.state.formErrors.name ? 1 : 0 },
                }}
                error={this.state.formErrors.name}
                value={newBusCapacity.name}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.center}>
              <TextField
                required
                type="number"
                label={t("Capacity")}
                value={newBusCapacity.capacity}
                fullWidth
                onChange={this.handleChange("capacity")}
                helperText={t("inputEmpty")}
                FormHelperTextProps={{
                  style: { opacity: this.state.formErrors.capacity ? 1 : 0 },
                }}
                error={this.state.formErrors.capacity}
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
                // marginTop: "-6%",
              }}
            >
              {this.state.isSuccess
                ? isEdit
                  ? t("successEdit")
                  : t("successCreate")
                : this.state.isCreating
                ? ""
                : isEdit
                ? t("EditDocumentType")
                : t("Create")}
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
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = ({ Panel }) => {
  return {
    successCreateCapacity: Panel.successCreateCapacity,
    loadingCreateCapacity: Panel.loadingCreateCapacity,
    successUpdateBusCapacity: Panel.successUpdateBusCapacity,
    error: Panel.error,
  };
};

const mapDispatchToProps = {
  requestCreateBusCapacity,
  requestGetBusTypesCapacity,
  requestUpdateBusCapacity,
};

const NewBusCapacityConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBusCapacity);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewBusCapacityConnected)
);
