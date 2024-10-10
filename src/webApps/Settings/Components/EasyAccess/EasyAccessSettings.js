import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarSettings from "../../utils/NavBarSettings";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../../services/ApiHandler";
//import { emphasize } from "@mui/system";
import PersonIcon from "@mui/icons-material/PersonRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";
import { addSettings } from "../../../../actions/Settings/system_actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import { Divider as DividerSemantic } from "semantic-ui-react";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import {
  requestInsertTermsAndConditions,
  requestTermsAndConditions,
} from "../../../../actions/EasyAccess/TermsAndCondition_actions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomStyles from "../../../../assets/styles/Settings_styles/EasyAccess/easyAccessStyles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";

import { getRequestEasyAccessNotifications } from "../../../../actions/Notifications/easyAccessNotifications_action";
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const mapStateToProps = ({
  User,
  Settings,
  TermsAndCondition,
  EasyAccessNotificationsReducer,
}) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings,
    termsAndConditions: TermsAndCondition.termsAndConditions,
    easyAccessNotifications:
      EasyAccessNotificationsReducer.easyAccessNotifications,
  };
};

const mapDispatchToProps = {
  AddSettings: addSettings,
  InsertTermsAndConditions: requestInsertTermsAndConditions,
  requestTermsAndConditions: requestTermsAndConditions,
  getRequestEasyAccessNotifications: getRequestEasyAccessNotifications,
};

class EasyAccessSettings extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.state = {
      text: "",
      open: false,
      // easyAccessSettings: {
      //   showVisitorSelfRegistration: false
      // },
      formErrors: {},
      currentUser: currentUser,
      enableTermsAndConditions: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { settings, termsAndConditions, easyAccessNotifications } = nextProps;
    if (
      (settings !== prevState.settings &&
        (!prevState.settings ||
          settings.systemSettings.showVisitorSelfRegistration !==
            prevState.settings.systemSettings.showVisitorSelfRegistration)) ||
      easyAccessNotifications !== prevState.easyAccessNotifications ||
      termsAndConditions !== prevState.termsAndConditions
    ) {
      return { settings, termsAndConditions, easyAccessNotifications };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { termsAndConditions, easyAccessNotifications } = this.state;
    if (termsAndConditions !== prevState.termsAndConditions) {
      this.setState({
        text: termsAndConditions.value,
        enableTermsAndConditions:
          termsAndConditions.value !== "" && termsAndConditions.value !== null,
      });
    }
    if (easyAccessNotifications !== prevState.easyAccessNotifications) {
      this.setState({
        easyAccessSettings: easyAccessNotifications,
      });
    }
    // if (
    //   settings &&
    //   prevState.easyAccessSettings.showVisitorSelfRegistration !==
    //     settings.systemSettings.showVisitorSelfRegistration
    // ) {

    //   this.setState({
    //     easyAccessSettings: {
    //       showVisitorSelfRegistration:
    //         settings.systemSettings.showVisitorSelfRegistration
    //     }
    //   });
    // }
  }

  componentDidMount() {
    NavBarSettings.hideLoader();
    const {
      requestTermsAndConditions,
      getRequestEasyAccessNotifications,
    } = this.props;
    requestTermsAndConditions();
    getRequestEasyAccessNotifications();
    this.setState({
      easyAccessSettings: this.state.easyAccessNotifications
        ? this.state.easyAccessNotifications
        : {
            showVisitorSelfRegistration: false,
            newEventEmailNotification: false,
          },
    });
  }

  handleChangeBoolean = (name) => (event) => {
    let value = event.currentTarget.checked;
    this.setState((prevState) => ({
      easyAccessSettings: {
        ...prevState.easyAccessSettings,
        [name]: value,
      },
    }));
  };

  handleChangeInputText = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      easyAccessSettings: {
        ...prevState.easyAccessSettings,
        [name]: value,
      },
    }));
  };

  handleChangeDisableTerms = () => {
    this.setState((prevState) => ({
      enableTermsAndConditions: !prevState.enableTermsAndConditions,
    }));
  };
  handleChangeTermsAndCondition = () => {
    this.setState((prevState) => ({
      termsAndCondition: !prevState.termsAndCondition,
    }));
  };
  handleChange = (value) => {
    this.setState({ text: value });
  };

  loadEasyAccessSettings = () => {
    ApiHandler.Setting.NotificationSettings.getEasyAccessSettings()
      .then(({ data }) => {
        this.setState((prevState) => ({
          easyAccessSettings: {
            ...prevState.easyAccessSettings,
            showVisitorSelfRegistration: data.data.showVisitorSelfRegistration,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  validate = () => {
    const { easyAccessSettings } = this.state;
    return {
      autoAssignmentPrinterName:
        easyAccessSettings.printQROnAutoAssignment &&
        isValueEmptyOrNull(easyAccessSettings.autoAssignmentPrinterName),
    };
  };

  handleCreate = () => {
    const errors = this.validate();
    this.setState({
      formErrors: errors,
    });
    setTimeout(() => {
      this.setState({
        isSuccess: false,
      });
    }, 1000);
    const { t, AddSettings, settings, InsertTermsAndConditions } = this.props;
    const { text, enableTermsAndConditions } = this.state;
    if (!Object.keys(errors).some((x) => errors[x])) {
      ApiHandler.Setting.NotificationSettings.setEasyAccessSettings(
        this.state.easyAccessSettings
      )
        .then(() => {
          if (enableTermsAndConditions) InsertTermsAndConditions(text);
          else InsertTermsAndConditions("");
          AddSettings({
            ...settings,
            systemSettings: {
              ...settings.systemSettings,
              showVisitorSelfRegistration: this.state.easyAccessSettings
                .showVisitorSelfRegistration,
            },
          });
          SnackbarHandler.showMessage(t("SuccessfullySavedConfiguration"));
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
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  handleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { classes, theme, t } = this.props;
    const {
      easyAccessSettings,
      open,
      termsAndCondition,
      enableTermsAndConditions,
    } = this.state;
    return (
      (<main className={classes.layout}>
        <div className={classes.fill}>
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
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              EasyAccess
            </Typography>

            <Divider className={classes.customDivider} />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} style={{ marginTop: "-3%" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        easyAccessSettings
                          ? easyAccessSettings.showVisitorSelfRegistration
                          : false
                      }
                      value={
                        easyAccessSettings
                          ? easyAccessSettings.showVisitorSelfRegistration
                          : false
                      }
                      color="primary"
                      name="showVisitorSelfRegistration "
                      onChange={this.handleChangeBoolean(
                        "showVisitorSelfRegistration"
                      )}
                    />
                  }
                  label={t("ShowVisitorSelfRegistration")}
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "-3%" }}>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={
                          easyAccessSettings
                            ? easyAccessSettings.newEventEmailNotification
                            : false
                        }
                        value={
                          easyAccessSettings
                            ? easyAccessSettings.newEventEmailNotification
                            : false
                        }
                        color="primary"
                        name="visitorsNotification"
                        onChange={this.handleChangeBoolean(
                          "newEventEmailNotification"
                        )}
                      />
                    }
                    label={t("ActiveVisitorsNotification")}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "-1%" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        easyAccessSettings
                          ? easyAccessSettings.printQROnAutoAssignment
                          : false
                      }
                      value={
                        easyAccessSettings
                          ? easyAccessSettings.printQROnAutoAssignment
                          : false
                      }
                      color="primary"
                      name="printQROnAutoAssignment "
                      onChange={this.handleChangeBoolean(
                        "printQROnAutoAssignment"
                      )}
                    />
                  }
                  label={t("PrintQROnAutoAssignment")}
                />
              </Grid>

              {easyAccessSettings &&
                easyAccessSettings.printQROnAutoAssignment && (
                  <Grid item xs={12} md={6} style={{ marginTop: "-3%" }}>
                    <TextField
                      fullWidth
                      type="text"
                      label={t("PrinterName")}
                      value={easyAccessSettings.autoAssignmentPrinterName}
                      onChange={this.handleChangeInputText(
                        "autoAssignmentPrinterName"
                      )}
                      placeholder={t("PrinterName")}
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: {
                          opacity: this.state.formErrors
                            .autoAssignmentPrinterName
                            ? 1
                            : 0,
                        },
                      }}
                      error={this.state.formErrors.autoAssignmentPrinterName}
                    />
                  </Grid>
                )}

              <Grid item xs={12} md={12}>
                <DividerSemantic horizontal>
                  <InputLabel style={{ fontSize: "13px" }}>
                    {t("TermsAndConditions")}
                  </InputLabel>
                </DividerSemantic>
                <FormControlLabel
                  control={
                    <Switch
                      checked={enableTermsAndConditions}
                      value={enableTermsAndConditions}
                      color="primary"
                      name="enableTermsAndConditions"
                      onChange={this.handleChangeDisableTerms}
                    />
                  }
                  label={t("enableTermsAndConditions")}
                />
                <ReactQuill
                  theme={"snow"}
                  onChange={this.handleChange}
                  value={this.state.text}
                  modules={EasyAccessSettings.modules}
                  formats={EasyAccessSettings.formats}
                  bounds={".app"}
                  placeholder={t("WriteTermsAndConditions")}
                />
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
                    onClick={this.handleOpen}
                  >
                    {t("Preview")}
                  </Button>
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
                style={{
                  background: this.state.isSuccess ? green[500] : undefined,
                  color: theme.palette.text.main,
                }}
              >
                {this.state.isSuccess
                  ? t("SuccessfullySaved")
                  : this.state.isCreating
                  ? ""
                  : this.props.t("Save")}
              </Button>
              {this.state.isCreating && (
                <CircularProgress
                  size={24}
                  className={classes.circularProgress}
                />
              )}
            </div>
            <Dialog
              fullScreen
              onClose={this.handleOpen}
              TransitionComponent={Transition}
              open={open}
              onBackdropClick={this.handleOpen}
              style={{ paddingRight: 0 }}
            >
              <AppBar
                className={classes.appBar}
                style={{ position: "inherit" }}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    onClick={this.handleOpen}
                    aria-label="Close"
                    className={classes.customButton}
                    size="large">
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.flex}
                  >
                    {t("TermsAndConditions")}
                  </Typography>

                  <Button
                    style={{
                      display: "inherit",
                      position: "absolute",
                      right: "2%",
                    }}
                    color="inherit"
                    onClick={this.handleOpen}
                    className={classes.customButton}
                  >
                    {t("confirm")}
                  </Button>
                </Toolbar>
              </AppBar>
              <Grid
                item
                xs={12}
                md={12}
                style={{
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  paddingTop: "1%",
                }}
              >
                <div
                  style={{
                    height: "80vh",
                    color: "white",
                    overflowY: "scroll",
                  }}
                >
                  {ReactHtmlParser(this.state.text)}
                </div>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "flex-end",
                    display: "flex",
                    color: "white",
                    marginTop: "2%",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termsAndCondition}
                        onChange={this.handleChangeTermsAndCondition}
                        value={t("AceptTermsAndConditions")}
                      />
                    }
                    label={t("AceptTermsAndConditions")}
                  />
                </div>
              </Grid>
            </Dialog>
          </Paper>
        </div>
      </main>)
    );
  }
}
EasyAccessSettings.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      // { indent: "-1" },
      // { indent: "+1" }
    ],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EasyAccessSettings.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  // "indent",
  "link",
  "image",
  "video",
];

EasyAccessSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const EasyAccessSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EasyAccessSettings);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(EasyAccessSettingsConnected)
);
