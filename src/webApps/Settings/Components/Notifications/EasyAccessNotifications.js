import React from "react";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Select from "react-select";
import Typography from "@mui/material/Typography";
//import Checkbox from "@mui/material/Checkbox";
import {
  getAludocSettings,
  editAludocSettings,
} from "../../../../actions/Settings/settings_actions";
import {
  setRequestEasyAccessNotifications,
  getRequestEasyAccessNotifications,
} from "../../../../actions/Notifications/easyAccessNotifications_action";
import { requestBadgesStatuses } from "../../../../actions/EasyAccess/Badges_actions";
import { requestGetStatuses } from "../../../../actions/EasyAccess/status_actions";
import CustomStyles from "../../../../assets/styles/Settings_styles/Notifications/EasyAccessNotificationsStyles";
import ReactSelectStyles from "../../../../assets/styles/Shared_Styles/ReactSelect/SelectStyles";
import components from "../../../Shared/ReactSelect";
import green from "@mui/material/colors/green";
import Button from "@mui/material/Button";
import { camelize } from "../../../../utils/HelperFunctions";

class EasyAccessNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeVisitorNotifications: false,
      isSuccess: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newValues = {};

    if (
      nextProps.succesBadgesStatus !== prevState.succesBadgesStatus ||
      nextProps.aludocSettings !== prevState.aludocSettings ||
      nextProps.successAludocSettings !== prevState.successAludocSettings ||
      nextProps.loading !== prevState.loading ||
      nextProps.successEditAludocSettings !==
        prevState.successEditAludocSettings ||
      nextProps.successGetStatuses !== prevState.successGetStatuses ||
      nextProps.statuses !== prevState.statuses ||
      nextProps.badgesStatuses !== prevState.badgesStatuses ||
      nextProps.successSet !== prevState.successSet ||
      nextProps.i18n.language !== prevState.language ||
      (nextProps.EasyAccessSettings &&
        nextProps.EasyAccessSettings.NewEventEmailNotification !==
          prevState.activeVisitorNotifications)
    ) {
      newValues.succesBadgesStatus = nextProps.succesBadgesStatus;
      newValues.aludocSettings = nextProps.aludocSettings;
      newValues.successAludocSettings = nextProps.successAludocSettings;
      newValues.loading = nextProps.loading;
      newValues.successEditAludocSettings = nextProps.successEditAludocSettings;
      newValues.successSet = nextProps.successSet;
      newValues.language = nextProps.i18n.language;
      newValues.successGetStatuses = nextProps.successGetStatuses;
      newValues.statuses = nextProps.statuses;
      newValues.badgesStatuses = nextProps.badgesStatuses;
      // newValues.activeVisitorNotifications = nextProps.EasyAccessSettings
      //   ? nextProps.EasyAccessSettings.newEventEmailNotification
      //   : prevState.activeVisitorNotifications;
      return newValues;
    }
    return null;
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
      succesBadgesStatus,
      badgesStatuses,
      loading,
      successEditAludocSettings,
      successAludocSettings,
      aludocSettings,
      language,
    } = this.state;
    const { t } = this.props;
    if (language !== prevState.language) {
      this.generateStatusSelect(statuses);
    }
    if (
      !loading &&
      successEditAludocSettings !== prevState.successEditAludocSettings
    ) {
      if (successEditAludocSettings) {
        this.setState({
          isSuccess: true,
        });
      }
    }
    if (!loading && successAludocSettings !== prevState.successAludocSettings) {
      if (aludocSettings && aludocSettings.personStatusWithExpiredDoc !== -1) {
        this.setState({
          personStatus: aludocSettings.personStatusWithExpiredDoc,
        });
      }
      if (
        aludocSettings &&
        aludocSettings.personBadgeStatusWithExpiredDoc !== -1
      ) {
        this.setState({
          badgStatus: aludocSettings.personBadgeStatusWithExpiredDoc,
        });
      }
    }
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
    if (
      succesBadgesStatus &&
      prevState.succesBadgesStatus !== succesBadgesStatus
    ) {
      let statusBadgesSuggestions = [];
      badgesStatuses &&
        badgesStatuses.data.map((status) =>
          statusBadgesSuggestions.push({
            value: status.id,
            label: t(status.name),
          })
        );
      this.setState((prevState) => ({
        statusBadgesSuggestions,
        badgStatus: this.state.badgStatus ? this.state.badgStatus : 1,
        isLoadingStatus: false,
      }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    this.props.getRequestEasyAccessNotifications();
    this.props.getAludocSettings();
    this.props.requestGetStatuses({
      start: 0,
      length: -1,
      order: "name asc",
      search: "",
    });
    this.props.requestBadgesStatuses({
      start: 0,
      length: -1,
      order: "name asc",
      search: "",
    });
  }

  onNotificationChange = () => {
    const { EasyAccessSettings } = this.props;
    this.setState((prevState) => ({
      activeVisitorNotifications: !prevState.activeVisitorNotifications,
    }));
    this.props.setRequestEasyAccessNotifications({
      ...EasyAccessSettings,
      newEventEmailNotification: !this.state.activeVisitorNotifications,
    });
    // (e, data) => {
    //   const { EasyAccessSettings } = this.props;
    //   this.setState({
    //     activeVisitorNotifications: data.checked
    //   });
    //   this.props.setRequestEasyAccessNotifications({
    //     ...EasyAccessSettings,
    //     newEventEmailNotification: data.checked
    //   });
  };

  onSetNotifications = (notifications) => {
    this.props.setRequestEasyAccessNotifications(notifications);
  };
  handleChangeStatus = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      personStatus: value,
    });
  };
  handleChangeBadgesStatus = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      badgStatus: value,
    });
  };
  handleConfirm = () => {
    const { personStatus, badgStatus } = this.state;
    this.props.editAludocSettings({
      personStatusWithExpiredDoc: personStatus,
      personBadgeStatusWithExpiredDoc: badgStatus,
    });
  };

  render() {
    const {
      statusSuggestions = [],
      personStatus,
      isLoadingStatus,
      statusBadgesSuggestions,
      badgStatus,
      isDesktop,
    } = this.state;
    const { classes, t, theme } = this.props;
    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
      input: (base) => ({
        ...base,
        color: theme.palette.text.main,
        "& input": {
          font: "inherit",
        },
        width: "50%",

        menuList: {
          maxHeight: 200,
        },
      }),
    };

    return (
      <div>
        <Grid item xs={12} style={{ marginBottom: 25 }}>
          <div>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              {t("StatusAtExpirationDoc")}
            </Typography>
          </div>
        </Grid>
        <Grid
          container
          style={{ padding: isDesktop ? "0 70px 0 70px" : "0 35px 0 35px" }}
        >
          <Grid item xs={12} md={6} className={classes.grid}>
            <div
              className={classes.formControl}
              style={{ padding: "20px 20px 20px 5px" }}
            >
              <label className={classes.formControlLabel}>
                {t("StatusPersonAtExpiration")}
              </label>
              <Select
                className={classes.select}
                classes={classes}
                styles={selectStyles}
                options={statusSuggestions}
                components={components}
                value={
                  statusSuggestions &&
                  statusSuggestions.map((option) =>
                    personStatus == null
                      ? statusSuggestions[0]
                      : option.value === personStatus
                      ? option
                      : ""
                  )
                }
                onChange={this.handleChangeStatus}
                placeholder={t("status")}
                maxMenuHeight={200}
                isLoading={isLoadingStatus}
                isDisabled={isLoadingStatus}
                noOptionsMessage={() => t("NoInformation")}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.grid}>
            <div
              className={classes.formControl}
              style={{ padding: "20px 20px 20px 5px" }}
            >
              <label className={classes.formControlLabel}>
                {t("StatusBadgeAtExpiration")}
              </label>
              <Select
                className={classes.select}
                classes={classes}
                styles={selectStyles}
                options={statusBadgesSuggestions}
                components={components}
                value={
                  statusBadgesSuggestions &&
                  statusBadgesSuggestions.map((option) =>
                    badgStatus == null
                      ? statusBadgesSuggestions[0]
                      : option.value === badgStatus
                      ? option
                      : ""
                  )
                }
                onChange={this.handleChangeBadgesStatus}
                placeholder={t("status")}
                maxMenuHeight={200}
                isLoading={isLoadingStatus}
                isDisabled={isLoadingStatus}
                noOptionsMessage={() => t("NoInformation")}
              />
            </div>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.handleConfirm}
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
      </div>
    );
  }
}

const mapStateToProps = ({ Status, Badges, Settings }) => {
  return {
    successGetStatuses: Status.successGetStatuses,
    statuses: Status.statuses,
    badgesStatuses: Badges.statuses,
    succesBadgesStatus: Badges.succesBadgesStatus,
    aludocSettings: Settings.aludocSettings,
    successAludocSettings: Settings.successAludocSettings,
    loading: Settings.loading,
    successEditAludocSettings: Settings.successEditAludocSettings,
  };
};

const mapDispatchToProps = {
  getAludocSettings: getAludocSettings,
  requestBadgesStatuses: requestBadgesStatuses,
  setRequestEasyAccessNotifications: setRequestEasyAccessNotifications,
  getRequestEasyAccessNotifications: getRequestEasyAccessNotifications,
  requestGetStatuses: requestGetStatuses,
  editAludocSettings: editAludocSettings,
};

const EasyAccessNotificationsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EasyAccessNotifications);

const componentWithSelectStyles = withStyles(ReactSelectStyles, {
  withTheme: true,
})(EasyAccessNotificationsConnected);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(componentWithSelectStyles)
);
