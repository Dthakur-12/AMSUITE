import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import ApiHandler from "../../../../services/ApiHandler";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TimeZoneIcon from "@mui/icons-material/Timelapse";
import LinearProgress from "@mui/material/LinearProgress";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import TablePicker from "../../../Shared/TimePickerTable/TablePicker";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/TimeZone_styles/newTimeZoneStyles";

const formValues = {
  name: "",
};

class NewTimeZone extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;
    this.state = {
      newTimeZone: initValues ? initValues : formValues,
      formErrors: {},
      AMIntervals: [[], [], [], [], [], [], []],
      PMIntervals: [[], [], [], [], [], [], []],
    };
  }

  // handleChangeSchedule = newSchedule => {
  //     this.setState({ schedule: newSchedule })
  //   }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    if (this.props.isEdit || this.props.isDetails) {
      const { newTimeZone } = this.state;
      ApiHandler.AccessControl.TimeZones.getTimeZoneById(newTimeZone.id)
        .then(({ data }) => {
          this.setState({
            AMIntervals: data.data.AMTimeIntervals,
            PMIntervals: data.data.PMTimeIntervals,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    NavBarAccessControl.hideLoader();
  }

  handleEventRemove = (event) => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex(
      (interval) => interval.uid === event.uid
    );
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({ selectedIntervals });
    }
  };

  handleEventUpdate = (event) => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex(
      (interval) => interval.uid === event.uid
    );
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({ selectedIntervals });
    }
  };

  handleSelect = (newIntervals) => {
    const { lastUid, selectedIntervals } = this.state;
    const intervals = newIntervals.map((interval, index) => {
      return {
        ...interval,
        uid: lastUid + index,
      };
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length,
    });
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newTimeZone: {
        ...prevState.newTimeZone,
        [name]: value,
      },
    }));
  };

  handleChangeDate = (name) => (event) => {
    let value = event.toDate();
    this.setState((prevState) => ({
      newTimeZone: {
        ...prevState.newTimeZone,
        [name]: value,
      },
    }));
  };

  handleChangeDays = (event, days) => {
    this.setState((prevState) => ({
      newTimeZone: {
        ...prevState.newTimeZone,
        days: days,
      },
    }));
  };

  validateCreate = () => {
    const { newTimeZone } = this.state;
    return {
      name: isValueEmptyOrNull(newTimeZone.name),
      // startDateRange: isValueEmptyOrNull(newTimeZone.startDateRange),
      // endDateRange: isValueEmptyOrNull(newTimeZone.endDateRange) && newTimeZone.endDateRange >= newTimeZone.startDateRange,
    };
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      let newTimeZone = JSON.parse(JSON.stringify(this.state.newTimeZone));
      newTimeZone.AMIntervals = JSON.parse(
        JSON.stringify(this.state.AMIntervals)
      );
      newTimeZone.PMIntervals = JSON.parse(
        JSON.stringify(this.state.PMIntervals)
      );
      this.setState({
        isCreating: true,
      });
      ApiHandler.AccessControl.TimeZones.createTimeZone(newTimeZone)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          SnackbarHandler.showMessage(t("successCreateTimeZone"));
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newTimeZone: formValues,
              AMIntervals: [[], [], [], [], [], [], []],
              PMIntervals: [[], [], [], [], [], [], []],
            });
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          SnackbarHandler.showMessage(t(error.error.errorData), "error");
          this.setState({
            isCreating: false,
          });
        });
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
      let newTimeZone = JSON.parse(JSON.stringify(this.state.newTimeZone));
      newTimeZone.AMIntervals = JSON.parse(
        JSON.stringify(this.state.AMIntervals)
      );
      newTimeZone.PMIntervals = JSON.parse(
        JSON.stringify(this.state.PMIntervals)
      );
      this.setState({
        isCreating: true,
      });
      ApiHandler.AccessControl.TimeZones.editTimeZone(newTimeZone)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          SnackbarHandler.showMessage(t("successEditTimeZone"));
          setTimeout(() => {
            this.setState({
              isSuccess: false,
            });
            this.props.onCreate();
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          SnackbarHandler.showMessage(error.message, "error");
          this.setState({
            isCreating: false,
          });
        });
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  render() {
    const { classes, isDialog, isEdit, isDetails, t } = this.props;
    const { AMIntervals, PMIntervals } = this.state;

    if (!this.state.isDesktop) {
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
            <Paper style={{ marginLeft: 0 }}>
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
                    <TimeZoneIcon />
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
              <TimeZoneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isEdit
                ? t("EditTimeZone")
                : isDetails
                ? t("TimeZone")
                : t("NewTimeZone")}{" "}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid container item xs={12} spacing={24}>
                <Grid item xs={12} md={4} className={classes.grid}>
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
                    value={this.state.newTimeZone.name}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div style={{ position: "relative" }}>
                  <Grid item xs={12} sm={12}>
                    <TablePicker
                      AMIntervals={AMIntervals}
                      PMIntervals={PMIntervals}
                    />
                  </Grid>
                </div>
              </Grid>
            </Grid>
            {!isDetails && (
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
                    color: "white",
                  }}
                >
                  {this.state.isSuccess
                    ? isEdit
                      ? t("successEdit")
                      : t("successCreate")
                    : this.state.isCreating
                    ? ""
                    : isEdit
                    ? t("EditTimeZone")
                    : t("CreateTimeZone")}
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
        </div>
      </main>
    );
  }
}

NewTimeZone.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewTimeZone)
);
