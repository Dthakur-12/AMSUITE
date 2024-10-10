import React, { Component } from "react";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Checkbox, Divider } from "semantic-ui-react";
import { Button as ButtonSemantic } from "semantic-ui-react";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import FormHelperText from "@mui/material/FormHelperText";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../../assets/styles/Settings_styles/System/AuthenticationStyles";
import Saml from "../SAML/Index";
import withSaml from "../../../../core/Settings/SAML/withIndex";
const SamlWrapper = withSaml(Saml);
// import {
//   requestTestConnection,
//   addSettings
// } from "../../../../actions/Settings/system_actions";

// const mapStateToProps = ({ Settings, SystemSettings }) => {
//   return {
//     settings: Settings.settings,
//     errorTest: SystemSettings.error,
//     loadingTest: SystemSettings.loading,
//     successTest: SystemSettings.success
//   };

// };

// const mapDispatchToProps = {
//   AddSettings: addSettings,
//   testConnection: requestTestConnection
// };

class Authentication extends Component {
  render() {
    const {
      classes,
      t,
      systemDTO,
      handleChangeBoolean,
      handleChange,
      loadingTest,
      domainChange,
      testAuthentication,
      isCreating,
    } = this.props;
    return (
      <main style={{ marginTop: "4%" }}>
        <div>
          <LinearProgress
            style={{
              opacity: isCreating ? "1" : "0",
            }}
            className={classes.customLinearProgress}
            variant="query"
          />
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid style={{ margin: "13px", width: "100%" }}>
                <Divider horizontal>
                  <InputLabel style={{ fontSize: "13px" }}>
                    {t("AuthenticationMethod")}
                  </InputLabel>
                </Divider>

                <Grid container spacing={24} className={classes.gridAlignment}>
                  <Grid container style={{ marginTop: 10 }}>
                    <Grid item xs={12} md={6}>
                      <Checkbox
                        name="requireLogin"
                        checked={systemDTO.requireLogin}
                        className={classes.checkBox}
                        toggle
                        label={t("LogInRequiredAlways")}
                        onChange={handleChangeBoolean}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Checkbox
                        name="enable_AMSuiteLogin"
                        checked={systemDTO.enable_AMSuiteLogin}
                        className={classes.checkBox}
                        toggle
                        onChange={handleChangeBoolean}
                        label={t("logIn")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Checkbox
                        name="enable_AD"
                        checked={systemDTO.enable_AD}
                        className={classes.checkBox}
                        toggle
                        onChange={handleChangeBoolean}
                        label={t("ActiveDirectory")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Checkbox
                        name="enable_SAML"
                        checked={systemDTO.enable_SAML}
                        className={classes.checkBox}
                        toggle
                        onChange={handleChangeBoolean}
                        label={t("SAML")}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      hidden={!this.props.formErrors.unselectedLoginMethod}
                      style={{
                        paddingLeft: 10,
                        marginTop: 5,
                        color: "red !important",
                      }}
                    >
                      <p style={{ color: "red" }}>
                        {t("NeedSelectLoginMethod")}
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                {systemDTO.enable_AD && (
                  <div style={{ width: "100%" }}>
                    <Divider horizontal>
                      <InputLabel style={{ fontSize: "13px" }}>
                        {t("DomainConfiguration")}
                      </InputLabel>
                    </Divider>
                    <Grid
                      container
                      spacing={24}
                      className={classes.gridAlignment}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          className={classes.textFieldAlignment}
                          type="text"
                          disabled={!systemDTO.enable_AD}
                          label={t("Domain")}
                          fullWidth
                          value={systemDTO.lDAP_Domain}
                          onChange={handleChange("lDAP_Domain")}
                        />
                        <FormHelperText
                          className={classes.infoDomain}
                          style={{
                            opacity: domainChange ? 1 : 0,
                          }}
                        >
                          {t("InfoDomain")}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} md={6} style={{ marginTop: "3%" }}>
                        <ButtonSemantic
                          variant="contained"
                          // color="secondary"
                          loading={loadingTest}
                          disabled={
                            !systemDTO.enable_AD || !systemDTO.lDAP_Domain
                          }
                          onClick={testAuthentication}
                          className={classes.buttonSemantic}
                          // style={{
                          //   backgroundColor: theme.palette.primary.main
                          //   // color: "white"
                          // }}
                        >
                          {t("TestAuthentication")}
                        </ButtonSemantic>
                      </Grid>
                    </Grid>
                  </div>
                )}
                {systemDTO.enable_SAML && (
                  <div style={{ width: "100%" }}>
                    <Divider horizontal>
                      <InputLabel style={{ fontSize: "13px" }}>
                        {t("samlConfiguration")}
                      </InputLabel>
                    </Divider>
                    <SamlWrapper {...this.props} />
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(Authentication)
);
