import {
  AppBar,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {

  withStyles,
} from "@mui/styles";
import { Person as PerosnIcon } from "@mui/icons-material";
import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import CustomStyles from "../../../../assets/styles/Settings_styles/AccessControl/AccessControlStyle";
import { withTranslation } from "react-i18next";
import AccessControlSettings from "./AccessControlSettings";
import CustomFieldsAdministration from "./CustomFieldsAdministration";

export class AccessControlSettingsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueTab: 0,
    };
  }

  handleChangeTab = (event, value) => {
    this.setState({ valueTab: value });
  };

  render() {
    const { t, classes } = this.props;
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PerosnIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Alutel Mobile
            </Typography>
            <AppBar
              style={{ marginTop: "5%", zIndex: 1 }}
              position="static"
              color="inherit"
            >
              <Tabs
                value={this.state.valueTab}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                centered
              >
                <Tab className={classes.textTab} label={t("SAML")} />
                <Tab className={classes.textTab} label={t("ConfigurableFields")} />
              </Tabs>
            </AppBar>
            {this.state.valueTab === 0 && <AccessControlSettings />}
            {this.state.valueTab === 1 && <CustomFieldsAdministration />}
          </Paper>
        </div>
      </main>
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, { withTeme: true })(AccessControlSettingsHome)
);
