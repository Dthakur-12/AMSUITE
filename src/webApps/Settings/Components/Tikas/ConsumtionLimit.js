import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarSettings from "../../utils/NavBarSettings";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../../services/ApiHandler";
import PersonIcon from "@mui/icons-material/PersonRounded";
import AccountCircle from "@mui/icons-material/PortraitRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
//import SnackbarHandler from "../../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../../assets/styles/Settings_styles/MusteringSettingsStyles";
import SnackbarHandler from "../../../../utils/SnackbarHandler";

const mapStateToProps = ({ User, Settings }) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings,
  };
};

class ConsumtionLimit extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.state = {
      errorMessage: "",
      currentUser: currentUser,
      id: -1,
      isLoadingImg: true,
      offset: -1,
    };
  }

  componentDidMount() {
    NavBarSettings.hideLoader();
    this.loadSettings();
  }

  loadSettings = () => {
    ApiHandler.Setting.Setting.getSystemSetting()
      .then(({ data }) => {
        this.setState({
          systemSettings: data.data,
          offset: data.data.dailyLimit ? data.data.dailyLimit : 20,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    if (name === "offset") {
      this.setState({
        offset: value,
      });
    }
  };

  handleSave = () => {
    const { systemSettings } = this.state;
    // setTimeout(() => {
    //   this.setState({
    //     isSuccess: false,
    //   });
    // }, 1000);

    const { t } = this.props;
    ApiHandler.Setting.Setting.editSystemSetting({
      ...systemSettings,
      dailyLimit: this.state.offset,
    })
      .then(() => {
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
  };

  handleOpenEmployees = () => {
    this.setState({
      openDialogEmployees: true,
    });
  };

  handleOpenCards = () => {
    this.setState({
      openDialogCards: true,
    });
  };

  handleOpenVehicles = () => {
    this.setState({
      openDialogVehicles: true,
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
            color: "white",
          }}
        />
      );
    } else {
      return (
        <AccountCircle
          style={{
            fontSize: 150,
            color: "white",
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
    const { isCreating, offset, isSuccess } = this.state;

    return (
      <main className={classes.layoutTikas}>
        <LinearProgress
          style={{
            opacity: isCreating ? "1" : "0",
          }}
          className={classes.customLinearProgress}
          variant="query"
        />
        <div>
          {/* <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            {t("ConsumptionLimitPerDay")}
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
                InputProps={{ inputProps: { min: 0 } }}
                label={`${t("Limit")}`}
                fullWidth
                value={offset}
                onChange={this.handleChange("offset")}
              />
            </Grid>
          </Grid>
          {/* </Grid> */}
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
              disabled={isCreating}
              onClick={isCreating ? undefined : this.handleSave}
              style={{
                background: isSuccess ? green[500] : undefined,
                color: theme.palette.text.main,
              }}
            >
              {isSuccess ? "Guardado con éxito" : isCreating ? "" : t("Save")}
            </Button>
            {isCreating && (
              <CircularProgress
                size={24}
                className={classes.customCircularProgress}
              />
            )}
          </div>
        </div>
      </main>
    );
  }
}

ConsumtionLimit.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const ConsumtionLimitConnected = connect(
  mapStateToProps,
  null
)(ConsumtionLimit);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(ConsumtionLimitConnected)
);
