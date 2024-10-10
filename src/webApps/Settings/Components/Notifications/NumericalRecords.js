import React from "react";
import { Icon, Input, Divider, Checkbox } from "semantic-ui-react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import { isNullOrUndefined } from "util";
import ApiHandler from "../../../../services/ApiHandler";
import { requestSetControlsNotifications } from "../../../../actions/Aludoc/controls_actions";
import {
  requestNumericalRecordsSettings,
  requestSetNumericalRecordsSettings,
} from "../../../../actions/Settings/settings_actions";
import EmailList from "./EmailList";
import { connect } from "react-redux";
import Paper from "@mui/material/Paper";
import { requestGetStatuses } from "../../../../actions/EasyAccess/status_actions";
import CustomStyles from "../../../../assets/styles/Settings_styles/Notifications/AludocNotificationsStyles";
import { debounce } from "throttle-debounce";
import { camelize } from "../../../../utils/HelperFunctions";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  isValueEmptyOrNull,
  isEmailValid,
} from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";

//import { SnackbarHandler } from "../../../../utils/SnackbarHandler";

const mapStateToProps = ({ User, Status, Badges, Control, Settings }) => {
  return {
    currentUser: User.currentUser,
    successGetStatuses: Status.successGetStatuses,
    statuses: Status.statuses,
    successNotif: Control.successNotif,
    loadingNotification: Control.loadingNotification,
    successGetNumRecordsSettings: Settings.successGetNumRecordsSettings,
    numRecordsSetting: Settings.numRecordsSetting,
    successSetNumRecordsSettings: Settings.successSetNumRecordsSettings,
    //badgeStatus: Badges.status
  };
};

const mapDispatchToProps = {
  requestGetStatuses: requestGetStatuses,
  requestSetControlsNotifications: requestSetControlsNotifications,
  requestNumericalRecordsSettings: requestNumericalRecordsSettings,
  requestSetNumericalRecordsSettings: requestSetNumericalRecordsSettings,
  //getBadgeStatus: getBadgeStatus
};

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class NumericalRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      isLoadingStatus: true,
      offsetEmails: 0,
      limit: 8,
      emails: [],
      emailsToSend: [],
      success: false,
      emailLimit: 5,
      selectedControlId: 0,
      selectedControl: "-",
      searchText: "",
      controls: [],
      formErrors: {},
      numericalRecordsEnabled: false,
      notifications: {
        emailNotifications: true,
        personAdition: true,
        personRemoval: false,
        documentAdition: false,
        documentEdition: false,
        documentRemoval: false,
        documentExpiration: false,
        daysToExpire: [],
      },
      isLoadingControls: true,
      isLoadingNotifications: true,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  // public class NumericalRecordsSettingsDTO
  // {
  //     public int Id { get; set; }
  //     public string LabelName { get; set; }
  //     public float LimitValue { get; set; }
  //     public int Randomness { get; set; }
  //     public bool NotiEnabled { get; set; }
  //     public List<string> Emails { get; set; }
  // }

  componentDidMount() {
    //const { selectedControlId, selectedControlName } = this.props;
    // if (selectedControlId) this.getControlWithSearch();
    // else this.getControls();
    this.props.requestNumericalRecordsSettings();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successGetStatuses !== prevState.successGetStatuses ||
      nextProps.statuses !== prevState.statuses ||
      nextProps.successNotif !== prevState.successNotif ||
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetNumRecordsSettings !==
        prevState.successGetNumRecordsSettings ||
      nextProps.numRecordsSetting !== prevState.numRecordsSetting ||
      nextProps.successSetNumRecordsSettings !==
        prevState.successSetNumRecordsSettings
    ) {
      return {
        successGetStatuses: nextProps.successGetStatuses,
        statuses: nextProps.statuses,
        successNotif: nextProps.successNotif,
        language: nextProps.i18n.language,
        successGetNumRecordsSettings: nextProps.successGetNumRecordsSettings,
        numRecordsSetting: nextProps.numRecordsSetting,
        successSetNumRecordsSettings: nextProps.successSetNumRecordsSettings,
      };
    } else return null;
  }
  generateStatusSelect = (statuses) => {
    const { t } = this.props;
    if (statuses) {
      let statusSuggestions = [];
      statuses.data.map((status) =>
        statusSuggestions.push({
          value: status.id,
          label: t(camelize(status.name)),
        })
      );
      this.setState({
        statusSuggestions,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      statuses,
      successGetStatuses,
      language,
      numRecordsSetting,
      successSetNumRecordsSettings,
    } = this.state;
    if (
      successGetStatuses &&
      prevState.successGetStatuses !== successGetStatuses
    ) {
      this.generateStatusSelect(statuses);
      this.setState((prevState) => ({
        personStatus: this.state.personStatus ? this.state.personStatus : 1,
        isLoadingStatus: false,
      }));
    }
    if (this.state.successNotif !== prevState.successNotif) {
      if (this.state.successNotif) {
        this.setState({ success: true });
      }
    }
    if (
      successSetNumRecordsSettings &&
      successSetNumRecordsSettings !== prevState.successSetNumRecordsSettings
    ) {
      SnackbarHandler.showMessage(this.props.t("successEdit"));
    }
    if (
      this.state.successGetNumRecordsSettings &&
      this.state.successGetNumRecordsSettings !==
        prevState.successGetNumRecordsSettings
    ) {
      this.setState({
        numericalRecordsEnabled: numRecordsSetting.numericalRecordsEnabled,
        emailNotifications: numRecordsSetting.notiEnabled,
        labelName: numRecordsSetting.labelName,
        emails:
          numRecordsSetting.emails !== null ? numRecordsSetting.emails : [],
        emailsToSend:
          numRecordsSetting.emails !== null ? numRecordsSetting.emails : [],
        record: numRecordsSetting.notiEnabled
          ? numRecordsSetting.limitValue
          : undefined,
      });
    }
  }

  validateCreate = () => {
    const { labelName } = this.state;
    return {
      labelName: isValueEmptyOrNull(labelName),
    };
  };

  handleConfirm = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    const {
      labelName,
      emailNotifications,
      emailsToSend,
      record,
      numericalRecordsEnabled,
    } = this.state;
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.props.requestSetNumericalRecordsSettings({
        labelName: labelName,
        notiEnabled: emailNotifications,
        emails: emailsToSend,
        limitValue: record,
        numericalRecordsEnabled: numericalRecordsEnabled,
      });
    } else {
      //   SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      [name]: value,
    }));
  };

  onNotificationChange = () => {
    this.setState((prevState) => ({
      emailNotifications: !prevState.emailNotifications,
    }));
  };

  handleChangeNumericalRecord = () => {
    this.setState(
      (prevState) => ({
        numericalRecordsEnabled: !prevState.numericalRecordsEnabled,
      }),
      () => {
        if (this.state.numericalRecordsEnabled === false) {
          this.props.requestSetNumericalRecordsSettings({
            numericalRecordsEnabled: false,
          });
        }
      }
    );
  };

  handleQueryChange = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  //---------------------   emails   ----------------------------

  emailPageChange = (offset, e) => {
    this.setState({
      offset,
    });
  };

  addEmail = (input) => {
    const { email, emailsToSend } = this.state;

    if (isEmailValid(email)) {
      let data = [];
      if (emailsToSend.length > 0) {
        let dataAux = this.state.emailsToSend.slice();
        data = dataAux.filter((e) => e.toLowerCase() !== email.toLowerCase());
      }
      data.push(email);
      this.setState((state) => ({
        ...state,
        emails: data,
        emailsToSend: data,
        offset: 0,
      }));
    }
  };

  handleRemoveEmail = (item, index) => {
    const { offset } = this.state;
    let emailsCopytoSend = [...this.state.emailsToSend];
    let emailsCopy = [...this.state.emails];
    emailsCopy.splice(offset + index, 1);
    let indexToDelete = emailsCopytoSend.indexOf(item);
    emailsCopytoSend.splice(indexToDelete, 1);
    this.setState((prevState) => ({
      emails: emailsCopy,
      emailsToSend: emailsCopytoSend,
    }));
  };

  handleEmailQueryChange = (query) => {
    const value = query.currentTarget.value;
    let data = this.state.emailsToSend.slice();
    this.setState({
      email: value,
      emails: data.filter((email) =>
        email.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };
  //--------------------------------------------------

  render() {
    const {
      controls,
      offset,
      limit,
      selectedControlId,
      labelName,
      record,
      numericalRecordsEnabled,
    } = this.state;
    const { classes, t } = this.props;

    return (
      <main className={classes.layout}>
        <Paper elevation={2} className={classes.paper}>
          <Grid container style={{ padding: "20px 50px 0px" }}>
            <Grid item xs={12}>
              <div>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  {t("PeopleNumericRecords")}
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={8}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={numericalRecordsEnabled}
                    value={numericalRecordsEnabled}
                    color="primary"
                    name="printQROnAutoAssignment "
                    onChange={this.handleChangeNumericalRecord}
                  />
                }
                label={t("ActivateNumericalRecord")}
              />
            </Grid>
            {numericalRecordsEnabled && (
              <Grid
                container
                spacing={24}
                style={{ padding: 4, margin: "0 30px 0px " }}
              >
                <TextField
                  required
                  label={t("RecordName")}
                  value={labelName}
                  style={{ marginBottom: "20px" }}
                  fullWidth
                  onChange={this.handleChange("labelName")}
                  //helperText={t("inputEmpty")}
                  //   FormHelperTextProps={{
                  //   style: { opacity: this.state.formErrors.name ? 1 : 0 }
                  //  }}
                  error={this.state.formErrors.labelName}
                />
                <Grid item xs={12} md={12} className={classes.emailsContainer}>
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginBottom: 15 }}
                  >
                    {t("NotificationWay")}
                  </Typography>
                  <Checkbox
                    name="emailNotifications"
                    checked={this.state.emailNotifications}
                    className={classes.checkBox}
                    toggle
                    label={t("NotificationsByEmail")}
                    onChange={this.onNotificationChange}
                  />
                  <Divider className={classes.customDivider} />
                  {this.state.emailNotifications && (
                    <div>
                      <TextField
                        style={{ marginBottom: "10px" }}
                        required={this.state.notifications.emailNotifications}
                        type="number"
                        label={t("ThresholdValue")}
                        value={record}
                        onChange={this.handleChange("record")}

                        //helperText={t("inputEmpty")}
                        // FormHelperTextProps={{
                        //  style: { opacity: this.state.formErrors.rut ? 1 : 0 }
                        //  }}
                        //error={this.state.formErrors.rut}
                      />
                      <EmailList
                        showProp="name"
                        notifications={this.state.notifications}
                        handleChange={this.onNotificationChange}
                        hasError={this.state.hasEmailError}
                        controlId={this.state.selectedControlId}
                        emailPageChange={this.emailPageChange}
                        addEmail={this.addEmail}
                        handleRemoveEmail={this.handleRemoveEmail}
                        handleEmailQueryChange={this.handleEmailQueryChange}
                        emails={this.state.emails}
                        offset={this.state.offset}
                      />
                    </div>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    justifyContent: "flex-end",
                    display: "flex",
                    marginTop: "3%",
                  }}
                >
                  {/* {ReactHtmlParser(this.state.text)} */}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.isCreating}
                    onClick={this.handleConfirm}
                  >
                    {t("Save")}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Paper>
      </main>
    );
  }
}

const NumericalRecordsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NumericalRecords);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(NumericalRecordsConnected)
);
