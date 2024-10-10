import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { withTranslation } from "react-i18next";
import { isNullOrUndefined } from "util";
import { connect } from "react-redux";
import { addSettings } from "../../../../actions/Settings/system_actions";
import styles from "../../../../assets/styles/EasyAccess_styles/Enterprise_styles/enterpriseStyles";

const mapStateToProps = ({ User, Settings }) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings
  };
};

const mapDispatchToProps = {
  getSettings: addSettings
};

class DetailsEnterprise extends Component {
  constructor(props) {
    super(props);
    const { enterprise, settings } = props;
    this.state = {
      DetailsEnterprise: enterprise,
      enterpriseSettings: settings.enterpriseSettings
    };
  }

  render() {
    const { classes, isDialog, t } = this.props;
    const { DetailsEnterprise, enterpriseSettings } = this.state;

    return (
      <main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <BusinessIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("DetailsEnterprise")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  label={t("name")}
                  defaultValue={DetailsEnterprise.name}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.rut)}
              >
                <TextField
                  required
                  label={t("RUT")}
                  defaultValue={DetailsEnterprise.rut}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.address)}
              >
                <TextField
                  required
                  label={t("address")}
                  defaultValue={DetailsEnterprise.address}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.phone)}
              >
                <TextField
                  required
                  label={t("Phone")}
                  defaultValue={DetailsEnterprise.phone}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={classes.grid}
                hidden={isNullOrUndefined(enterpriseSettings.email)}
              >
                <TextField
                  required
                  label={t("email")}
                  defaultValue={DetailsEnterprise.email}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={DetailsEnterprise.receivesVisits}
                      value="receivesVisits"
                      color="primary"
                      activeText="On"
                      backgroundActive={"green"}
                      backgroundInactive={"green"}
                    />
                  }
                  labelPlacement="start"
                  label={`¿${t("receiveVisits")}?`}
                  style={{ marginTop: "6%", cursor: "default" }}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>
    );
  }
}
DetailsEnterprise.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const DetailsEnterpriseConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsEnterprise);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DetailsEnterpriseConnected)
);
