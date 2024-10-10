import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarSettings from "../utils/NavBarSettings";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../services/ApiHandler";
import { emphasize } from "@mui/system";
import PersonIcon from "@mui/icons-material/PersonRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import SnackbarHandler from "../../../utils/SnackbarHandler";
import { isValueEmptyOrNull } from "../../../utils/HelperFunctions";
import { withTranslation } from "react-i18next";
import { addSettings } from "../../../actions/Settings/system_actions";
import CustomStyles from "../../../assets/styles/Settings_styles/NotificationSettingsStyles";

const mapStateToProps = ({ Settings }) => {
  return {
    settings: Settings.settings
  };
};

const mapDispatchToProps = {
  AddSettings: addSettings
};

class NotificationSettings extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.state = {
      errorMessage: "",
      notifyDTO: {
        ID: -1,
        notiScreen: false,
        notiEmail: false,
        notiSkype: false,
        notiSupportSkype: false,
        addPerson: false,
        editPerson: false,
        deletePerson: false,
        addCard: false,
        editCard: false,
        deleteCard: false,
        changeStatusPerson: false
      },
      isSuccess: false,
      isCreating: false,
      formErrors: {},
      currentUser: currentUser
    };
  }

  componentDidMount() {
    this.loadNotifySettings();
  }

  loadNotifySettings = () => {
    ApiHandler.Setting.Setting.getNotifySetting()
      .then(({ data }) => {
        this.setState({
          notifyDTO: {
            ID: data.data.id,
            notiScreen: isValueEmptyOrNull(data.data.notiPantalla)
              ? false
              : data.data.notiPantalla,
            notiEmail: isValueEmptyOrNull(data.data.notiEmail)
              ? false
              : data.data.notiEmail,
            notiSkype: isValueEmptyOrNull(data.data.notiSkype)
              ? false
              : data.data.notiSkype,
            notiSupportSkype: isValueEmptyOrNull(data.data.soporteSkype)
              ? false
              : data.data.soporteSkype,
            addPerson: isValueEmptyOrNull(data.data.altaPersona)
              ? false
              : data.data.altaPersona,
            editPerson: isValueEmptyOrNull(data.data.editPersona)
              ? false
              : data.data.editPersona,
            deletePerson: isValueEmptyOrNull(data.data.bajaPersona)
              ? false
              : data.data.bajaPersona,
            addCard: isValueEmptyOrNull(data.data.altaTarjeta)
              ? false
              : data.data.altaTarjeta,
            editCard: isValueEmptyOrNull(data.data.editTarjeta)
              ? false
              : data.data.editTarjeta,
            deleteCard: isValueEmptyOrNull(data.data.bajaTarjeta)
              ? false
              : data.data.bajaTarjeta,
            changeStatusPerson: isValueEmptyOrNull(data.data.editEstadoPersona)
              ? false
              : data.data.editEstadoPersona
          }
        });
        NavBarSettings.hideLoader();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChangeBoolean = name => event => {
    let value = event.currentTarget.checked;
    this.setState(prevState => ({
      notifyDTO: {
        ID: prevState.notifyDTO.ID,
        notiScreen:
          name === "screen"
            ? value
              ? true
              : false
            : prevState.notifyDTO.notiScreen,
        notiEmail:
          name === "email"
            ? value
              ? true
              : false
            : prevState.notifyDTO.notiEmail,
        notiSkype:
          name === "skype"
            ? value
              ? true
              : false
            : prevState.notifyDTO.notiSkype,
        notiSupportSkype:
          name === "supportSkype"
            ? value
              ? true
              : false
            : prevState.notifyDTO.notiSupportSkype,
        addPerson:
          name === "addPerson"
            ? value
              ? true
              : false
            : prevState.notifyDTO.addPerson,
        editPerson:
          name === "editPerson"
            ? value
              ? true
              : false
            : prevState.notifyDTO.editPerson,
        deletePerson:
          name === "deletePerson"
            ? value
              ? true
              : false
            : prevState.notifyDTO.deletePerson,
        addCard:
          name === "addCard"
            ? value
              ? true
              : false
            : prevState.notifyDTO.addCard,
        editCard:
          name === "editCard"
            ? value
              ? true
              : false
            : prevState.notifyDTO.editCard,
        deleteCard:
          name === "deleteCard"
            ? value
              ? true
              : false
            : prevState.notifyDTO.deleteCard,
        changeStatusPerson:
          name === "changeStatusPerson"
            ? value
              ? true
              : false
            : prevState.notifyDTO.changeStatusPerson
      }
    }));
  };

  handleCreate = () => {
    this.setState({
      isCreating: true
    });
    const { t, settings } = this.props;
    ApiHandler.Setting.Setting.editNotifySetting(this.state.notifyDTO)
      .then(() => {
        this.props.AddSettings({
          ...settings,
          notifySettings: this.state.notifyDTO
        });
        SnackbarHandler.showMessage(t("SuccessfullySavedPreferences"));
        this.setState({
          isCreating: false,
          isSuccess: true
        });
        setTimeout(() => {
          this.setState({
            isSuccess: false
          });
        }, 1000);
      })
      .catch(error => {
        this.setState({
          isCreating: false
        });
        SnackbarHandler.showMessage(error.error, "error");
      });
    setTimeout(() => {
      this.setState({
        isSuccess: false
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
              opacity: this.state.isCreating ? "1" : "0"
            }}
            className={classes.customLinearProgress}
            variant="query"
          />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("Notifications")}
            </Typography>

            <Divider className={classes.customDivider} />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.notiScreen}
                      onChange={this.handleChangeBoolean("screen")}
                      value="screen"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("NotificationsByScreen")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>

              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.notiEmail}
                      onChange={this.handleChangeBoolean("email")}
                      value="email"
                      // color="primary"
                      className={classes.checkbox}
                    />
                  }
                  labelPlacement="start"
                  label={t("NotificationsByEmail")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.notiSkype}
                      onChange={this.handleChangeBoolean("skype")}
                      value="skype"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("NotificationsBySkype")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.notiSupportSkype}
                      onChange={this.handleChangeBoolean("supportSkype")}
                      value="supportSkype"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("SupportButton")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>

              <Divider className={classes.customDivider} />

              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.addPerson}
                      onChange={this.handleChangeBoolean("addPerson")}
                      value="addPerson"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("PersonCreation")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>

              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.deletePerson}
                      onChange={this.handleChangeBoolean("deletePerson")}
                      value="deletePerson"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("PersonDeletion")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.editPerson}
                      onChange={this.handleChangeBoolean("editPerson")}
                      value="editPerson"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("PersonModification")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.addCard}
                      onChange={this.handleChangeBoolean("addCard")}
                      value="addCard"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("BadgeCreation")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.deleteCard}
                      onChange={this.handleChangeBoolean("deleteCard")}
                      value="deleteCard"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("BadgeDeletion")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>

              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.editCard}
                      onChange={this.handleChangeBoolean("editCard")}
                      value="editCard"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("BadgeModification")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.notifyDTO.changeStatusPerson}
                      onChange={this.handleChangeBoolean("changeStatusPerson")}
                      value="changeStatusPerson"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={t("ChangeOfPersonStatus")}
                  className={classes.customFormControlLabel}
                  //disabled={isDetails}
                />
              </Grid>
            </Grid>
            {/* </Grid> */}
            <div
              className={classes.submit}
              style={{
                position: "relative",
                width: "100%"
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
                  color: "white"
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

NotificationSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const NotificationSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationSettings);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(NotificationSettingsConnected)
);
