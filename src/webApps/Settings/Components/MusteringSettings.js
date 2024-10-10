import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarSettings from "../utils/NavBarSettings";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../services/ApiHandler";
import PersonIcon from "@mui/icons-material/PersonRounded";
import AccountCircle from "@mui/icons-material/PortraitRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { isValueEmptyOrNull } from "../../../utils/HelperFunctions";
import SnackbarHandler from "../../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";
import { addSettings } from "../../../actions/Settings/system_actions";
import CustomStyles from "../../../assets/styles/Settings_styles/MusteringSettingsStyles";

const mapStateToProps = ({ User, Settings }) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings
  };
};

const mapDispatchToProps = {
  AddSettings: addSettings
};

class MusteringSettings extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.state = {
      errorMessage: "",
      currentUser: currentUser,
      id: -1,
      offset: -1,
      isLoadingImg: true
    };
  }

  componentDidMount() {
    NavBarSettings.hideLoader();
    this.loadMusteringSettings();
  }

  loadMusteringSettings = () => {
    ApiHandler.Setting.Setting.getMusteringSettings(1)
      .then(({ data }) => {
        this.setState({
          id: data.data.id,
          offset: data.data.offsetMustering
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    if (name === "offset") {
      this.setState({
        offset: value
      });
    }
  };

  handleCreate = () => {
    setTimeout(() => {
      this.setState({
        isSuccess: false
      });
    }, 1000);
    const { t } = this.props;
    ApiHandler.Setting.Setting.editMusteringSettings(
      this.state.id,
      this.state.offset
    )
      .then(() => {
        const settings = this.props.settings;

        this.props.AddSettings({
          ...settings,
          musteringSettings: {
            id: this.state.id,
            offsetMustering: this.state.offset
          }
        });
        // this.props.AddSettings({
        //   id: this.state.id,
        //   offsetMustering: this.state.offset
        // });
        SnackbarHandler.showMessage(t("SuccessfullySavedConfiguration"));
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

  handleOpenEmployees = () => {
    this.setState({
      openDialogEmployees: true
    });
  };

  handleOpenCards = () => {
    this.setState({
      openDialogCards: true
    });
  };

  handleOpenVehicles = () => {
    this.setState({
      openDialogVehicles: true
    });
  };

  setImageDefault() {
    if (this.state.isLoadingImg) {
      return (
        <CircularProgress
          size={50}
          style={{
            top: "50%",
            left: "50%",
            color: "white"
          }}
        />
      );
    } else {
      return (
        <AccountCircle
          style={{
            fontSize: 150,
            color: "white"
          }}
        />
      );
    }
  }
  setFile() {
    if (isValueEmptyOrNull(this.state.url)) {
      return undefined;
    } else {
      return [{ preview: "data:image/jpeg;base64," + this.state.url }];
    }
  }
  render() {
    const { classes, t, theme } = this.props;

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
              Mustering 
            </Typography>

            <Divider className={classes.customDivider} />
            <Grid container spacing={24}>
              <Grid
                item
                xs={12}
                md={12}
                className={classes.grid}
                style={{ marginTop: "35px" }}
              >
                <TextField
                  required
                  type="number"
                  label={`${t("Margin")}`}
                  fullWidth
                  value={this.state.offset}
                  onChange={this.handleChange("offset")}
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
                  color: theme.palette.text.main
                }}
              >
                {this.state.isSuccess
                  ? "Guardado con éxito"
                  : this.state.isCreating
                  ? ""
                  : this.props.t("Save")}
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

MusteringSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const MusteringSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MusteringSettings);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(MusteringSettingsConnected)
);
