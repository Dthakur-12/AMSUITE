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
import LinearProgress from "@mui/material/LinearProgress";
import { InlineDateTimePicker } from "@mui/x-date-pickers";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
//import Chip from "@mui/material/Chip";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/Badge_styles/badgeDetailsStyles";
class BadgeDetails extends Component {
  constructor(props) {
    super(props);
    const { badge } = props;
    this.state = {
      BadgeDetails: badge,
    };
  }

  componentDidMount() {
    setInitValues(initValues.customFields1);
    setInitDateValues(initValues.customFields2);
  }

  render() {
    const { classes, isDialog, t } = this.props;
    const { BadgeDetails } = this.state;
    return (
      <main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
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
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <BusinessIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("cardDetails")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  label={t("number")}
                  defaultValue={BadgeDetails.number}
                  fullWidth
                  disabled
                  InputLabelProps={{
                    className: classes.disabledColor,
                  }}
                  InputProps={{
                    className: classes.disabledColor,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  label="PIN"
                  defaultValue={
                    BadgeDetails.pin ? BadgeDetails.pin : t("notAdmitted")
                  }
                  fullWidth
                  disabled
                  InputLabelProps={{
                    className: classes.disabledColor,
                  }}
                  InputProps={{
                    className: classes.disabledColor,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <InlineDateTimePicker
                  label={t("activeDate")}
                  value={BadgeDetails.activationDate}
                  fullWidth
                  disabled
                  onChange={() => undefined}
                  InputLabelProps={{
                    className: classes.disabledColor,
                  }}
                  InputProps={{
                    className: classes.disabledColor,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <InlineDateTimePicker
                  label={t("inactiveDate")}
                  value={BadgeDetails.deactivationDate}
                  fullWidth
                  disabled
                  onChange={() => undefined}
                  InputLabelProps={{
                    className: classes.disabledColor,
                  }}
                  InputProps={{
                    className: classes.disabledColor,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  label={t("status")}
                  defaultValue={BadgeDetails.statusName}
                  fullWidth
                  disabled
                  InputLabelProps={{
                    className: classes.disabledColor,
                  }}
                  InputProps={{
                    className: classes.disabledColor,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  label={t("person")}
                  defaultValue={
                    BadgeDetails.personName
                      ? BadgeDetails.personName
                      : t("unassignedCard")
                  }
                  fullWidth
                  disabled
                  InputLabelProps={{
                    className: classes.disabledColor,
                  }}
                  InputProps={{
                    className: classes.disabledColor,
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                style={{ paddingTop: 20, paddingBottom: 0, marginTop: 30 }}
              >
                <Typography component="h1" variant="subtitle1">
                  {t("AccessLevels")}
                </Typography>
                <Divider
                  style={{ marginBottom: 10, backgroundColor: "grey" }}
                />
                <List dense component="div" disablePadding>
                  {BadgeDetails.accessLevelsNames.map((accessName, index) => (
                    <ListItem key={index} className={classes.nested}>
                      <ListItemIcon>
                        <ChevronIcon />
                      </ListItemIcon>
                      <ListItemText inset primary={accessName} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>
    );
  }
}
BadgeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(BadgeDetails)
);
