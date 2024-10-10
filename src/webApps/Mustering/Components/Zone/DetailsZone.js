import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarMustering from "../../utils/NavBarMustering";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import LinearProgress from "@mui/material/LinearProgress";
import { List, ListItemIcon } from "@mui/material";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Mustering_styles/Zone_styles/detailsZoneStyles";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser
  };
};

class DetailsZone extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;
    this.state = {
      Zone: initValues,
      showReader: true,
      entranceReader: [],
      formErrors: {}
    };
  }

  componentDidMount() {
    NavBarMustering.hideLoader();
  }

  render() {
    const { classes, isDialog, t } = this.props;
    const { Zone } = this.state;

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
              {t("DetailsZone")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={12} className={classes.grid}>
                <TextField
                  label={t("name")}
                  fullWidth
                  value={Zone.name}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Divider style={{ marginBottom: 10 }} />
                <TextField
                  label={t("ZoneType")}
                  fullWidth
                  value={Zone.zonetype=='1'?t("Safe"):t("Hazardous")}
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography component="h1" variant="subtitle1">
                  {t("entranceReaders")}
                </Typography>
                <Divider style={{ marginBottom: 10 }} />
                <List className={classes.listRoot}>
                  <Collapse
                    in={this.state.showReader}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List dense component="div" disablePadding>
                      {Zone.readers.map(reader => (
                        <ListItem key={reader.id} className={classes.nested}>
                          <ListItemIcon>
                            <ChevronIcon />
                          </ListItemIcon>
                          <ListItemText inset primary={reader.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>
    );
  }
}

DetailsZone.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const DetailsZoneConnected = connect(
  mapStateToProps,
  null
)(DetailsZone);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DetailsZoneConnected)
);
