import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import StatusIcon from "@mui/icons-material/LibraryAddRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { FormHelperText } from "@mui/material";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/EasyAccess_styles/Status_styles/detailsStatusStyles";
class DetailsStatus extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;
    this.state = {
      isLoadingEnterprises: true,
      isLoadingStatus: true,
      statusDetails: initValues
        ? initValues
        : {
            name: "",
            changeBadgeStatus: false,
            enterpriseId: 0,
            changeStatusOnReader: false,
            unassignBadge: false
          },
      formErrors: {}
    };
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
  }

  render() {
    const { classes, isDialog, t } = this.props;
    const { statusDetails } = this.state;
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
              <StatusIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("DetailsStatus")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  label={t("name")}
                  defaultValue={statusDetails.name}
                  fullWidth
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 }
                  }}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  label={t("enterprise")}
                  defaultValue={statusDetails.enterpriseName}
                  fullWidth
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 }
                  }}
                  disabled
                />

                <FormHelperText
                  style={{
                    opacity: this.state.formErrors.enterpriseId ? 1 : 0
                  }}
                  error={this.state.formErrors.enterpriseId}
                >
                  {t("inputEmpty")}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={statusDetails.changeBadgeStatus}
                      value="changeBadgeStatus"
                      color="primary"
                      disabled
                    />
                  }
                  labelPlacement="start"
                  label={t("ModifyStatusBadge")}
                  style={{ marginTop: "6%", cursor: "default" }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={statusDetails.changeStatusOnReader}
                      value="changeStatusOnReader"
                      color="primary"
                      disabled
                    />
                  }
                  labelPlacement="start"
                  label={t("ModifyStatusWhenPassForReader")}
                  style={{ marginTop: "6%", cursor: "default" }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={statusDetails.unassignBadge}
                      value="unassignBadge"
                      color="primary"
                      disabled
                    />
                  }
                  labelPlacement="start"
                  label={t("FreeBadges")}
                  style={{ marginTop: "6%", cursor: "default" }}
                />
              </Grid>
            </Grid>
            <div
              className={classes.submit}
              style={{
                position: "relative",
                width: "100%"
              }}
            />
          </Paper>
        </div>
      </main>
    );
  }
}

DetailsStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DetailsStatus)
);
