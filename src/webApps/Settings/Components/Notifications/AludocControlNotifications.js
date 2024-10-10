import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { withTranslation } from "react-i18next";
import { Checkbox } from "semantic-ui-react";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomStyles from "../../../../assets/styles/Settings_styles/Notifications/AludocControlNotificationsStyles";
import green from "@mui/material/colors/green";

const AludocControlNotifications = props => {
  const {
    classes,
    emailNotifications,
    t,
    isLoadingData,
    successNotif,
    notifications,
    isSending,
    theme
  } = props;
  return (
    <div className={classes.container}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        {t("EventsToNotify")}
      </Typography>
      <div className={classes.notificationsContainer}>
        <Checkbox
          name="personAdition"
          checked={notifications.personAdition}
          className={classes.checkBox}
          toggle
          label={t("PersonAdition")}
          onChange={props.handleChange}
          disabled={!notifications.emailNotifications}
        />
        <Checkbox
          name="personRemoval"
          checked={notifications.personRemoval}
          className={classes.checkBox}
          toggle
          label={t("PersonRemoval")}
          onChange={props.handleChange}
          disabled={!notifications.emailNotifications}
        />
        <Checkbox
          name="documentAdition"
          checked={notifications.documentAdition}
          className={classes.checkBox}
          toggle
          label={t("DocumentAdition")}
          onChange={props.handleChange}
          disabled={!notifications.emailNotifications}
        />
        <Checkbox
          name="documentEdition"
          checked={notifications.documentEdition}
          className={classes.checkBox}
          toggle
          label={t("DocumentEdition")}
          onChange={props.handleChange}
          disabled={!notifications.emailNotifications}
        />
        <Checkbox
          name="documentRemoval"
          checked={notifications.documentRemoval}
          className={classes.checkBox}
          toggle
          label={t("DocumentRemoval")}
          onChange={props.handleChange}
          disabled={!notifications.emailNotifications}
        />
        <Checkbox
          name="documentExpiration"
          checked={notifications.documentExpiration}
          className={classes.checkBox}
          toggle
          label={t("DocumentExpiration")}
          onChange={props.handleChange}
          disabled={!notifications.emailNotifications}
        />
        {props.showDaysBeforeNotify && (
          <div style={{ width: "100%", padding: 6 }}>
            <Typography style={{ textAlign: "center" }}>
              {t("DaysBeforeNotify")}
            </Typography>

            <TextField
              label={t("fstNotification")}
              style={{ width: "100%" }}
              id="days1"
              value={props.days1}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              onChange={props.onDaysChange}
            />
            <TextField
              label={t("sndNotification")}
              style={{ width: "100%", marginTop: "0px" }}
              id="days2"
              value={props.days2}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              onChange={props.onDaysChange}
            />
            <TextField
              label={t("trdNotification")}
              style={{ width: "100%", marginTop: "0px" }}
              id="days3"
              value={props.days3}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              onChange={props.onDaysChange}
            />
            <Button
              variant="contained"
              fullWidth
              className={successNotif ? classes.buttonSuccess : classes.button}
              onClick={props.onClickDays}
              style={{
                background: successNotif
                  ? green[500]
                  : theme.palette.primary.main,
                color: theme.palette.text.main
              }}
            >
              {t("Save")}
              {isSending && (
                <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12,
                    marginLeft: -12,
                    color: theme.palette.text.main
                  }}
                />
              )}
            </Button>
          </div>
        )}
      </div>
      <Fade in={isLoadingData} className={classes.contentLoader}>
        <div style={{ pointerEvents: isLoadingData ? "inherit" : "none" }}>
          <CircularProgress className={classes.circularProgress} size={50} />
        </div>
      </Fade>
    </div>
  );
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(AludocControlNotifications)
);
