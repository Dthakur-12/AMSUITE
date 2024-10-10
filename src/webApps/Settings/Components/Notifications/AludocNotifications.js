import React from "react";
import { Icon, Input, Divider, Checkbox } from "semantic-ui-react";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import AludocControlNotifications from "./AludocControlNotifications";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import AludocControlTable from "./AludocControlTable";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
//import { isNullOrUndefined } from "util";
import ApiHandler from "../../../../services/ApiHandler";
import { requestSetControlsNotifications } from "../../../../actions/Aludoc/controls_actions";
import AludocEmailList from "./AludocEmailList";
import { connect } from "react-redux";
import { requestGetStatuses } from "../../../../actions/EasyAccess/status_actions";
import CustomStyles, {
  StyledPagination,
} from "../../../../assets/styles/Settings_styles/Notifications/AludocNotificationsStyles";
import { debounce } from "throttle-debounce";
import { camelize } from "../../../../utils/HelperFunctions";

const mapStateToProps = ({ User, Status, Badges, Control }) => {
  return {
    currentUser: User.currentUser,
    successGetStatuses: Status.successGetStatuses,
    statuses: Status.statuses,
    successNotif: Control.successNotif,
    loadingNotification: Control.loadingNotification,
    //badgeStatus: Badges.status
  };
};

const mapDispatchToProps = {
  requestGetStatuses: requestGetStatuses,
  requestSetControlsNotifications: requestSetControlsNotifications,
  //getBadgeStatus: getBadgeStatus
};

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class AludocNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      isLoadingStatus: true,
      offsetEmails: 0,
      limit: 8,
      success: false,
      emailLimit: 5,
      selectedControlId: 0,
      selectedControl: "-",
      searchText: "",
      controls: [],
      emails: [],
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
      showDaysBeforeNotify: false,
      days1: 0,
      days2: 0,
      days3: 0,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    const { selectedControlId, selectedControlName } = this.props;
    if (selectedControlId) this.getControlWithSearch();
    else this.getControls();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successGetStatuses !== prevState.successGetStatuses ||
      nextProps.statuses !== prevState.statuses ||
      nextProps.successNotif !== prevState.successNotif ||
      nextProps.i18n.language !== prevState.language
    ) {
      return {
        successGetStatuses: nextProps.successGetStatuses,
        statuses: nextProps.statuses,
        successNotif: nextProps.successNotif,
        language: nextProps.i18n.language,
      };
    }
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
    const { statuses, successGetStatuses, language } = this.state;
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
  }
  getControls = () => {
    ApiHandler.Setting.NotificationSettings.getControls({
      start: this.state.offset,
      length: 10,
      order: "",
      search: this.state.searchText,
      id: this.props.currentUser.id,
    })
      .then((response) => {
        this.setState({
          controls: response.data.data,
          controlsConst: response.data.data,
          dataCount: response.data.dataCount,
          selectedControl:
            response.data.data.length > 0 ? response.data.data[0].name : "",
          selectedControlId:
            response.data.data.length > 0 && response.data.data[0].id,
          isLoadingControls: false,
        });
        if (response.data.data.length > 0)
          this.getControlNotifications(response.data.data[0].id);
      })
      .catch((e) => {
        this.setState({
          isLoadingControls: false,
        });
      });
  };

  getControlWithSearch = () => {
    const { selectedControlId, selectedControlName } = this.props;
    ApiHandler.Setting.NotificationSettings.getControls({
      start: 0,
      length: 10,
      order: "",
      search: this.state.searchText,
      id: this.props.currentUser.id,
    })
      .then((response) => {
        this.setState({
          searchText: selectedControlName,
          controls: response.data.data,
          controlsConst: response.data.data,
          dataCount: response.data.dataCount,
          selectedControl:
            response.data.data.length > 0 ? selectedControlName : "",
          selectedControlId: response.data.data.length > 0 && selectedControlId,
          isLoadingControls: false,
        });
        if (response.data.data.length > 0)
          this.getControlNotifications(selectedControlId);
      })
      .catch((e) => {
        this.setState({
          isLoadingControls: false,
        });
      });
  };

  getControlNotifications = (id) => {
    this.setState({ isLoadingNotifications: true });
    ApiHandler.Setting.NotificationSettings.getControlNotifications(id)
      .then((response) => {
        this.setState({
          notifications: {
            ...response.data,
            daysToExpire: response.data.daysToExpire
              ? response.data.daysToExpire
              : null,
          },
          isLoadingNotifications: false,
          showDaysBeforeNotify:
            response.data.emailNotifications &&
            response.data.documentExpiration,
          days1: response.data.daysToExpire ? response.data.daysToExpire[0] : 0,
          days2:
            response.data.daysToExpire && response.data.daysToExpire.length > 1
              ? response.data.daysToExpire[1]
              : 0,
          days3:
            response.data.daysToExpire && response.data.daysToExpire.length > 2
              ? response.data.daysToExpire[2]
              : 0,
        });
      })
      .catch((e) => {
        this.setState({
          isLoadingNotifications: false,
        });
      });
  };

  onDaysChange = (e) => {
    const onlyNums = e.currentTarget.value.replace(/[^0-9]/g, "");
    this.setState({ [e.currentTarget.id]: onlyNums });
  };

  onConfirmDays = () => {
    this.setState(
      (prevState) => ({
        notifications: {
          ...prevState.notifications,
          daysToExpire:
            this.state.days1 && this.state.days2 && this.state.days3
              ? [this.state.days1, this.state.days2, this.state.days3]
              : this.state.days1 && this.state.days2
              ? [this.state.days1, this.state.days2]
              : this.state.days2 && this.state.days3
              ? [this.state.days2, this.state.days3]
              : this.state.days1 && this.state.days3
              ? [this.state.days1, this.state.days3]
              : this.state.days1
              ? [this.state.days1]
              : this.state.days2
              ? [this.state.days2]
              : this.state.days3
              ? [this.state.days3]
              : [],
        },
      }),
      () => {
        this.props.requestSetControlsNotifications({
          selectedControlId: this.state.selectedControlId,
          notifications: this.state.notifications,
        });
        setTimeout(() => {
          this.setState({
            success: false,
          });
        }, 1000);
      }
    );
  };

  onNotificationChange = (e, data) => {
    const { selectedControlId } = this.state;
    const name = data.name;
    const checked = data.checked;
    ApiHandler.Setting.NotificationSettings.SetControlNotificationValue(
      selectedControlId,
      name,
      checked
    ).then((data) => {
      this.setState((prevState) => ({
        notifications: {
          ...prevState.notifications,
          [name]: checked,
        },
        showDaysBeforeNotify:
          name === "emailNotifications"
            ? checked && prevState.notifications.documentExpiration
            : name === "documentExpiration"
            ? checked && prevState.notifications.emailNotifications
            : prevState.showDaysBeforeNotify,
      }));
    });
  };

  selectControl = (id, name) => {
    this.setState({
      success: false,
      selectedControlId: id,
      selectedControl: name,
    });
    this.getControlNotifications(id);
  };

  pageChange = (offset, e) => {
    this.setState({
      offset,
    });
  };

  // handleQueryChange = query => {
  //   let data = this.state.controlsConst.slice();
  //   let value = query.currentTarget.value;
  //   this.setState(state => ({
  //     searchText: value,
  //     controls: data.filter(control =>
  //       control.name.toLowerCase().includes(value.toLowerCase())
  //     ),
  //     offset: 0
  //   }));
  // };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
      offset: 0,
    });
    this.getControls();
  };

  handleQueryChange = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  render() {
    const {
      controls,
      offset,
      limit,
      selectedControlId,
      isDesktop,
    } = this.state;
    const { classes, t } = this.props;

    if (isDesktop)
      return (
        <Grid container>
          <Grid item xs={12} md={3}>
            <Typography className={classes.message}>
              {t("ControlSelection")}
            </Typography>

            <Input
              icon="search"
              className={classes.searchInput}
              //type="text"
              value={this.state.searchText}
              iconPosition="left"
              placeholder={`${t("search")}...`}
              onChange={this.handleQueryChange}
            />
            <AludocControlTable
              handleSelectControl={this.selectControl}
              items={controls.slice(offset, offset + limit)}
              selectedControl={selectedControlId}
              showProp="name"
              isLoadingData={this.state.isLoadingControls}
            />
            <div style={{ marginTop: 15 }}>
              {controls.length > 0 && (
                <StyledPagination
                  limit={limit}
                  offset={offset}
                  total={controls.length}
                  onClick={(e, offset) => this.pageChange(offset, e)}
                  currentPageColor="inherit"
                  otherPageColor="inherit"
                  previousPageLabel={
                    <ArrowLeft className={classes.iconRotateStyle} />
                  }
                  nextPageLabel={<ArrowRight />}
                  className={classes.test}
                  innerButtonCount={1}
                  outerButtonCount={1}
                />
              )}
            </div>
          </Grid>
          <Divider vertical style={{ left: "30%" }}>
            <Typography style={{ lineHeight: 0, marginTop: "-25%" }}>
              <Icon
                name="chevron circle right"
                size="large"
                style={{ marginLeft: 8 }}
              />
            </Typography>
          </Divider>
          <Grid item xs={12} md={9}>
            <Grid container style={{ padding: "0 0 0 70px" }}>
              <Grid item xs={12} style={{ marginBottom: 15 }}>
                {this.state.controls.length > 0 ? (
                  <div>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      {t("NotificationOfControl")}
                    </Typography>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      {`"${this.state.selectedControl}"`}
                    </Typography>
                  </div>
                ) : (
                  <Typography variant={"h5"} align={"center"}>
                    {t("noControlsAvailable")}
                  </Typography>
                )}
              </Grid>
              {this.state.controls.length > 0 && (
                <Grid container style={{ padding: 4, marginBottom: 15 }}>
                  <Grid item xs={12} md={6} className={classes.emailsContainer}>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "center", marginBottom: 15 }}
                    >
                      {t("NotificationWay")}
                    </Typography>
                    <Checkbox
                      name="emailNotifications"
                      checked={this.state.notifications.emailNotifications}
                      className={classes.checkBox}
                      toggle
                      label={t("NotificationsByEmail")}
                      onChange={this.onNotificationChange}
                    />
                    <Divider className={classes.customDivider} />
                    {this.state.notifications.emailNotifications && (
                      <div>
                        <AludocEmailList
                          showProp="name"
                          notifications={this.state.notifications}
                          handleChange={this.onNotificationChange}
                          hasError={this.state.hasEmailError}
                          controlId={this.state.selectedControlId}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AludocControlNotifications
                      showDaysBeforeNotify={this.state.showDaysBeforeNotify}
                      notifications={this.state.notifications}
                      handleChange={this.onNotificationChange}
                      isLoadingData={this.state.isLoadingNotifications}
                      days1={this.state.days1}
                      days2={this.state.days2}
                      days3={this.state.days3}
                      onDaysChange={this.onDaysChange}
                      onClickDays={this.onConfirmDays}
                      successNotif={this.state.success}
                      isSending={this.props.loadingNotification}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      );
    else
      return (
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className={classes.message}>
              {t("ControlSelection")}
            </Typography>

            <Input
              icon="search"
              className={classes.searchInput}
              //type="text"
              value={this.state.searchText}
              iconPosition="left"
              placeholder={`${t("search")}...`}
              onChange={this.handleQueryChange}
            />
            <AludocControlTable
              handleSelectControl={this.selectControl}
              items={controls.slice(offset, offset + limit)}
              selectedControl={selectedControlId}
              showProp="name"
              isLoadingData={this.state.isLoadingControls}
            />
            <div style={{ marginTop: 15 }}>
              {controls.length > 0 && (
                <StyledPagination
                  limit={limit}
                  offset={offset}
                  total={controls.length}
                  onClick={(e, offset) => this.pageChange(offset, e)}
                  currentPageColor="inherit"
                  otherPageColor="inherit"
                  previousPageLabel={
                    <ArrowLeft className={classes.iconRotateStyle} />
                  }
                  nextPageLabel={<ArrowRight />}
                  className={classes.test}
                  innerButtonCount={1}
                  outerButtonCount={1}
                />
              )}
            </div>
          </Grid>
          <Divider className={classes.customDivider} />

          <Grid item xs={12} md={9}>
            <Grid container style={{ padding: 0 }}>
              <Grid item xs={12} style={{ marginBottom: 15 }}>
                {this.state.controls.length > 0 ? (
                  <div>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      {t("NotificationOfControl")}
                    </Typography>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      {`"${this.state.selectedControl}"`}
                    </Typography>
                  </div>
                ) : (
                  <Typography variant={"h5"} align={"center"}>
                    {t("noControlsAvailable")}
                  </Typography>
                )}
              </Grid>
              {this.state.controls.length > 0 && (
                <Grid container style={{ padding: 4, marginBottom: 15 }}>
                  <Grid item xs={12} md={6} className={classes.emailsContainer}>
                    <Typography
                      variant="h6"
                      style={{ textAlign: "center", marginBottom: 15 }}
                    >
                      {t("NotificationWay")}
                    </Typography>
                    <Checkbox
                      name="emailNotifications"
                      checked={this.state.notifications.emailNotifications}
                      className={classes.checkBox}
                      toggle
                      label={t("NotificationsByEmail")}
                      onChange={this.onNotificationChange}
                    />
                    <Divider className={classes.customDivider} />
                    {this.state.notifications.emailNotifications && (
                      <div>
                        <AludocEmailList
                          showProp="name"
                          notifications={this.state.notifications}
                          handleChange={this.onNotificationChange}
                          hasError={this.state.hasEmailError}
                          controlId={this.state.selectedControlId}
                        />
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AludocControlNotifications
                      showDaysBeforeNotify={this.state.showDaysBeforeNotify}
                      notifications={this.state.notifications}
                      handleChange={this.onNotificationChange}
                      isLoadingData={this.state.isLoadingNotifications}
                      days1={this.state.days1}
                      days2={this.state.days2}
                      days3={this.state.days3}
                      onDaysChange={this.onDaysChange}
                      onClickDays={this.onConfirmDays}
                      successNotif={this.state.success}
                      isSending={this.props.loadingNotification}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      );
  }
}

const AludocNotificationsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AludocNotifications);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(AludocNotificationsConnected)
);
