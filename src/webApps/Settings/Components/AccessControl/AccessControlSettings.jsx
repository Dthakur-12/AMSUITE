import React from "react";
// import PrintsList from "./TikasPrintsList";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';
import { Checkbox } from "semantic-ui-react";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomStyles from "../../../../assets/styles/Settings_styles/AccessControl/AccessControlStyle";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/PersonRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import NavBarSettings from "../../utils/NavBarSettings";
import CustomFieldsAdministration from "./CustomFieldsAdministration";
import withAccessControl from "../../../../core/Settings/AccessControl/withAccessControl";
import { compose } from "redux";

const mapStateToProps = ({ Tikas }) => {
  return {};
};
const mapDispatchToPrps = {};

class AccessControlSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }
  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    NavBarSettings.hideLoader();
  }

  render() {
    const {
      t,
      classes,
      systemDTO = {},
      handleChangeBoolean,
      handleChange,
      theme,
      handleCreate,
      isSuccess,
      isLoading,
    } = this.props;
    const { isDesktop } = this.state;
    return (
      <div style={{ width: "100%", paddingTop: 30 }}>
        {!isLoading && (
          <Grid
            container
            //   className={classes.tikasSettingsContainer}
            style={{ padding: 4, marginBottom: 15 }}
          >
            <Grid item xs={12} md={6}>
              <Checkbox
                name="SAML"
                checked={systemDTO.loginSAML}
                className={classes.checkBox}
                toggle
                label={t("LoginPanelSAML")}
                onChange={() => handleChangeBoolean("loginSAML")}
              />
            </Grid>
            {systemDTO.loginSAML && (
              <Grid item xs={12} md={12}>
                <InputLabel style={{ fontSize: "13px" }}>
                  {t("ConfigureLoginSAML")}
                </InputLabel>
                <Grid container spacing={24} style={{ marginTop: 10 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.textFieldAlignment}
                      type="text"
                      disabled={!systemDTO.loginSAML}
                      label={t("ProviderURL")}
                      fullWidth
                      value={systemDTO.issuer}
                      onChange={handleChange("issuer")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.textFieldAlignment}
                      type="text"
                      disabled={!systemDTO.loginProtocol}
                      label={t("Client ID")}
                      fullWidth
                      value={systemDTO.clientId}
                      onChange={handleChange("clientId")}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
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
                onClick={handleCreate}
                style={{
                  background: isSuccess ? green[500] : undefined,
                }}
              >
                {t("Save")}
              </Button>
              {/* {isCreating && (
              <CircularProgress
                size={24}
                className={classes.circularProgress}
              />
            )} */}
            </div>
          </Grid>
        )}
      </div>
    );
  }
}

export default compose(
  withAccessControl,
  withStyles(CustomStyles, { withTheme: true }),
  withTranslation()
)(AccessControlSettings);
